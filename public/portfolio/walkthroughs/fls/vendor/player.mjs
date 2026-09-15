export class Timeline {
  constructor(durationMs, now = () => performance.now()) {
    this.durationMs = durationMs;
    this.now = now;
    this.elapsed = 0;
    this.startedAt = null;
  }

  get currentTime() {
    return Math.min(this.durationMs, this.elapsed + (this.startedAt === null ? 0 : this.now() - this.startedAt));
  }

  play() {
    if (this.startedAt === null) this.startedAt = this.now();
  }

  pause() {
    this.elapsed = this.currentTime;
    this.startedAt = null;
  }

  seek(timeMs) {
    this.elapsed = Math.max(0, Math.min(this.durationMs, timeMs));
    if (this.startedAt !== null) this.startedAt = this.now();
  }
}

const icons = {
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zm8 0h4v14h-4z',
  prev: 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  next: 'M8.59 16.59 10 18l6-6-6-6-1.41-1.41L13.17 12z',
  replay: 'M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z',
  sound: 'M3 9v6h4l5 5V4L7 9H3zm11-2.03v10.06a5.5 5.5 0 0 0 0-10.06z',
  muted: 'M3 9v6h4l5 5V4L7 9H3zm12.41-.41L14 10l2 2-2 2 1.41 1.41 2-2 2 2L20.83 14l-2-2 2-2-1.42-1.41-2 2z',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg>`;
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const timestamp = (milliseconds) => `${Math.floor(milliseconds / 60000)}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, '0')}`;

export function Walkthrough(config) {
  const root = document.querySelector(config.mount);
  if (!root) throw new Error('Walkthrough mount not found');
  if (!config.manifest?.length) throw new Error('Walkthrough needs at least one chapter');
  const steps = config.manifest;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let clock;
  let audio;
  let silent = false;
  let playing = false;
  let muted = false;
  let frame = 0;
  let generation = 0;
  let playRequest = 0;
  let scene;
  let lastHeight = 0;
  let destroyed = false;
  let audioTimeout;

  root.classList.add('wt');
  root.setAttribute('role', 'region');
  root.setAttribute('aria-label', config.title || 'Walkthrough');
  root.innerHTML = `
    <div class="wt-stage paused"><div class="wt-stageInner"></div><span class="wt-moneyTag" hidden></span></div>
    <div class="wt-cues" aria-label="Scene beats"></div>
    <div class="wt-transport">
      <div class="wt-buttons">
        <button class="wt-icon wt-play" data-act="play" aria-label="Play" title="Play">${icon('play')}</button>
        <button class="wt-icon" data-act="replay" aria-label="Replay chapter" title="Replay chapter">${icon('replay')}</button>
        <button class="wt-icon" data-act="prev" aria-label="Previous chapter" title="Previous chapter">${icon('prev')}</button>
        <button class="wt-icon" data-act="next" aria-label="Next chapter" title="Next chapter">${icon('next')}</button>
        <button class="wt-icon" data-act="mute" aria-label="Mute narration" aria-pressed="false" title="Mute narration">${icon('sound')}</button>
      </div>
      <div class="wt-position"><span class="wt-time">0:00</span><div class="wt-progress" role="progressbar" aria-label="Chapter progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="wt-progressFill"></div></div><span class="wt-duration"></span></div>
      <span class="wt-state" aria-live="polite">Ready</span>
      <label class="wt-chapter">Chapter<select aria-label="Choose chapter">${steps.map((step, number) => `<option value="${number}">${escape(step.title)}</option>`).join('')}</select></label>
    </div>
    <div class="wt-error" role="status" hidden><span>Narration unavailable.</span><button data-act="retry">Retry audio</button><button data-act="silent">Continue silently</button></div>
    <details class="wt-transcript"><summary>Transcript<span class="wt-transcript-meta"></span></summary><h2 class="wt-captionTitle"></h2><p class="wt-captionBody"></p></details>`;

  const find = (selector) => root.querySelector(selector);
  const stage = find('.wt-stage');
  const inner = find('.wt-stageInner');
  const playButton = find('[data-act="play"]');
  const errorBox = find('.wt-error');
  const cueBar = find('.wt-cues');
  const select = find('select');
  const progress = find('.wt-progress');
  const fill = find('.wt-progressFill');
  const time = find('.wt-time');

  function postHeight() {
    if (destroyed || parent === window || !location.origin.startsWith('http')) return;
    const height = Math.ceil(root.getBoundingClientRect().height + root.getBoundingClientRect().top);
    if (height === lastHeight) return;
    lastHeight = height;
    parent.postMessage({ type: 'wt-height', id: config.id || 'wt', height }, location.origin);
  }

  function elapsed() {
    return audio && !silent ? audio.currentTime * 1000 : clock.currentTime;
  }

  function paint() {
    const current = Math.min(clock.durationMs, elapsed());
    const fraction = current / clock.durationMs;
    fill.style.transform = `scaleX(${fraction})`;
    progress.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
    time.textContent = timestamp(current);
    root.dataset.elapsed = String(Math.round(current));
    root.dataset.playing = String(playing);
    scene?.render?.(inner, current, clock.durationMs, reduced.matches, steps[index].cues);
    // Every animation in the scene is scrubbed off the NARRATION clock, not wall-clock, so
    // scrubbing the voice scrubs the picture and pausing freezes it.
    //
    // Under reduced motion each one jumps to its end — the composed final frame rather than a
    // blank stage. That worked for one-shot animations and silently failed for looping ones: an
    // `infinite` animation's `endTime` is `Infinity`, `Number.isFinite` rejects it, and it fell
    // through to `currentTime = current` — so an ambient loop kept animating for exactly the
    // people who asked it not to. A loop has no final frame to hold, so it is cancelled outright.
    for (const animation of inner.getAnimations({ subtree: true })) {
      animation.pause();
      const end = animation.effect.getComputedTiming().endTime;
      if (!reduced.matches) { animation.currentTime = current; continue; }
      if (Number.isFinite(end)) animation.currentTime = end;
      else animation.cancel();
    }
    const cues = steps[index].cues || [];
    let active = 0;
    cues.forEach((cue, number) => { if (current >= cue.atMs) active = number; });
    cueBar.querySelectorAll('button').forEach((button, number) => {
      button.setAttribute('aria-current', String(number === active));
    });
    postHeight();
  }

  function setState(label) {
    playButton.innerHTML = icon(playing ? 'pause' : 'play');
    playButton.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    playButton.title = playing ? 'Pause' : 'Play';
    stage.classList.toggle('paused', !playing);
    find('.wt-state').textContent = label;
    paint();
  }

  function pause() {
    clearTimeout(audioTimeout);
    playRequest += 1;
    playing = false;
    clock.pause();
    audio?.pause();
    cancelAnimationFrame(frame);
    setState('Paused');
  }

  function failAudio() {
    pause();
    errorBox.hidden = false;
    setState('Audio unavailable');
  }

  function watchAudio() {
    clearTimeout(audioTimeout);
    const mounted = generation;
    audioTimeout = setTimeout(() => {
      if (mounted === generation && playing && !silent) failAudio();
    }, 15000);
  }

  function finish() {
    pause();
    if (index < steps.length - 1) mount(index + 1, true);
    else setState('Complete');
  }

  function tick() {
    if (!playing || destroyed) return;
    paint();
    if ((!audio || silent) && clock.currentTime >= clock.durationMs) {
      finish();
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  async function play() {
    if (destroyed || playing) return;
    if (elapsed() >= clock.durationMs - 50) seek(0);
    const request = ++playRequest;
    const mounted = generation;
    if (audio && !silent) {
      playing = true;
      setState('Loading audio');
      watchAudio();
      try {
        await audio.play();
      } catch {
        if (request === playRequest && mounted === generation) failAudio();
        return;
      }
      if (request !== playRequest || mounted !== generation) return;
      clearTimeout(audioTimeout);
    } else clock.play();
    playing = true;
    errorBox.hidden = true;
    setState(audio && !silent ? 'Playing' : 'Silent playback');
    cancelAnimationFrame(frame);
    tick();
  }

  function seek(timeMs) {
    const bounded = Math.max(0, Math.min(clock.durationMs, timeMs));
    clock.seek(bounded);
    if (audio && !silent) audio.currentTime = bounded / 1000;
    paint();
  }

  function mount(number, autoplay = false) {
    if (number < 0 || number >= steps.length) return;
    clearTimeout(audioTimeout);
    playRequest += 1;
    generation += 1;
    const mounted = generation;
    cancelAnimationFrame(frame);
    audio?.pause();
    playing = false;
    silent = false;
    index = number;
    const step = steps[index];
    clock = new Timeline(step.durationMs || 8000);
    const definition = config.scenes?.[step.scene];
    scene = typeof definition === 'object' ? definition : null;
    inner.innerHTML = '';
    if (step.poster) {
      const image = document.createElement('img');
      image.className = 'wt-poster';
      image.src = step.poster;
      image.alt = step.alt || step.body;
      inner.append(image);
    } else if (scene) inner.innerHTML = scene.html;
    else inner.innerHTML = `<div class="wt-scene">${definition || ''}</div>`;
    find('.wt-captionTitle').textContent = step.title;
    find('.wt-captionBody').textContent = step.body;
    find('.wt-transcript-meta').textContent = `${step.body.split(/\s+/).length} words`;
    find('.wt-duration').textContent = timestamp(clock.durationMs);
    find('[data-act="prev"]').disabled = index === 0;
    find('[data-act="next"]').disabled = index === steps.length - 1;
    select.value = String(index);
    select.disabled = steps.length === 1;
    find('.wt-chapter').hidden = steps.length === 1;
    const badge = find('.wt-moneyTag');
    badge.hidden = !step.money;
    badge.textContent = step.money === 'after' ? 'After' : 'Before';
    cueBar.innerHTML = (step.cues || []).map((cue, number) => `<button data-cue="${number}" aria-current="${number === 0}"><span>${String(number + 1).padStart(2, '0')}</span>${escape(cue.label)}</button>`).join('');
    cueBar.hidden = !step.cues?.length;
    cueBar.style.setProperty('--cue-count', String(step.cues?.length || 1));
    errorBox.hidden = true;
    audio = step.audio ? new Audio(step.audio) : null;
    if (audio) {
      const media = audio;
      media.preload = 'metadata';
      media.muted = muted;
      media.addEventListener('seeked', () => { if (mounted === generation && !silent) paint(); });
      media.addEventListener('ended', () => { if (mounted === generation && playing && !silent) finish(); });
      media.addEventListener('error', () => { if (mounted === generation && !silent) failAudio(); });
      media.addEventListener('waiting', () => {
        if (mounted === generation && playing && !silent) {
          find('.wt-state').textContent = 'Buffering';
          watchAudio();
        }
      });
      media.addEventListener('playing', () => {
        if (mounted === generation && playing && !silent) {
          clearTimeout(audioTimeout);
          find('.wt-state').textContent = 'Playing';
        }
      });
      media.addEventListener('loadedmetadata', () => {
        if (mounted !== generation || !Number.isFinite(media.duration) || media.duration <= 0) return;
        clock.durationMs = media.duration * 1000;
        find('.wt-duration').textContent = timestamp(clock.durationMs);
      });
    }
    setState('Ready');
    config.onChapterChange?.(step, index);
    if (autoplay) void play();
  }

  function click(event) {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.cue !== undefined) {
      pause();
      seek(steps[index].cues[Number(button.dataset.cue)].atMs);
      return;
    }
    const action = button.dataset.act;
    if (action === 'play') playing ? pause() : void play();
    else if (action === 'replay') { pause(); seek(0); void play(); }
    else if (action === 'prev') mount(index - 1, playing);
    else if (action === 'next') mount(index + 1, playing);
    else if (action === 'mute') {
      muted = !muted;
      if (audio) audio.muted = muted;
      button.innerHTML = icon(muted ? 'muted' : 'sound');
      button.setAttribute('aria-pressed', String(muted));
      button.setAttribute('aria-label', muted ? 'Unmute narration' : 'Mute narration');
      button.title = muted ? 'Unmute narration' : 'Mute narration';
    } else if (action === 'silent') {
      const current = elapsed();
      pause();
      silent = true;
      clock.seek(current);
      void play();
    } else if (action === 'retry') {
      const current = elapsed();
      pause();
      silent = false;
      if (audio) { audio.load(); audio.currentTime = current / 1000; }
      void play();
    }
  }

  const onVisibility = () => { if (document.hidden) pause(); };
  const onChange = () => mount(Number(select.value), playing);
  const onKey = (event) => {
    if (event.target.closest('button, select, summary, a, input, textarea')) return;
    if (event.key === ' ') { event.preventDefault(); playing ? pause() : void play(); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); mount(index + 1, playing); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); mount(index - 1, playing); }
  };
  root.tabIndex = 0;
  root.addEventListener('click', click);
  root.addEventListener('keydown', onKey);
  select.addEventListener('change', onChange);
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', paint);
  const observer = new ResizeObserver(postHeight);
  observer.observe(root);
  document.fonts.ready.then(postHeight);
  mount(0);

  return {
    play, pause, seek,
    go: (number) => mount(number, playing),
    get state() { return { index, playing, muted, elapsedMs: elapsed(), durationMs: clock.durationMs }; },
    destroy() {
      pause();
      destroyed = true;
      generation += 1;
      observer.disconnect();
      root.removeEventListener('click', click);
      root.removeEventListener('keydown', onKey);
      select.removeEventListener('change', onChange);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', paint);
    },
  };
}

if (typeof window !== 'undefined') window.Walkthrough = Walkthrough;