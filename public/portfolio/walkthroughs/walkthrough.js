/* Vanilla walkthrough player. Ported from the metatoy-www React WalkthroughPlayer.
   Driven by a manifest + a map of scene HTML strings. Narration-driven pacing:
   advances on audio 'ended' when unmuted; falls back to durationMs when muted.
   Playback starts from a Sorb LifecycleDemo-style start overlay (big play +
   "Adjust volume for narration" hint); that click is the autoplay-policy
   gesture, so narration begins audible and the transport's mute toggle is
   inactive (sound on) by default. Always embedded in a portfolio project page
   via same-origin iframe; posts its height to the parent so the iframe can
   size to it.

   Usage (in the per-walkthrough HTML):
     Walkthrough({ mount: "#wt", id: "ai-triage", title: "Walkthrough: ...", manifest: [...], scenes: window.WT_AI_TRIAGE_SCENES });
*/
(function () {
  const ICONS = {
    muted: "M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
    sound: "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
    prev: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z",
    next: "M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z",
    play: "M8 5v14l11-7z",
    pause: "M6 5h4v14H6zm8 0h4v14h-4z",
  };
  const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  window.Walkthrough = function (config) {
    const root = document.querySelector(config.mount);
    if (!root) return;
    const M = config.manifest, SCENES = config.scenes || {}, total = M.length, id = config.id || "wt";
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let i = 0, started = false, muted = false, playing = false, done = false,
      rafId = 0, timer = 0, progStart = 0, progBase = 0;

    root.className = "wt";
    root.setAttribute("tabindex", "0");
    root.setAttribute("role", "group");
    root.setAttribute("aria-roledescription", "carousel");
    root.innerHTML = `
      ${config.title ? `<div class="wt-topbar"><h2 class="wt-title">${esc(config.title)}</h2></div>` : ""}
      <div class="wt-stage">
        <div class="wt-stageInner" style="position:absolute;inset:0"></div>
        <span class="wt-moneyTag" hidden></span>
        <div class="wt-startOverlay">
          <button type="button" class="wt-bigPlay" data-act="start" aria-label="Play the walkthrough">${svg(ICONS.play)}</button>
          <p class="wt-startHint"><span class="wt-startHintIcon" aria-hidden="true">${svg(ICONS.sound)}</span>Adjust volume for narration</p>
        </div>
      </div>
      <div class="wt-progress"><div class="wt-progressFill"></div></div>
      <div class="wt-caption"><h3 class="wt-captionTitle"></h3><p class="wt-captionBody"></p></div>
      <div class="wt-controls">
        <button type="button" class="wt-ctrlBtn" data-act="prev" aria-label="Previous step">${svg(ICONS.prev)}</button>
        <button type="button" class="wt-ctrlBtn wt-playBtn" data-act="play" aria-label="Play">${svg(ICONS.play)}</button>
        <button type="button" class="wt-ctrlBtn" data-act="next" aria-label="Next step">${svg(ICONS.next)}</button>
        <button type="button" class="wt-ctrlBtn" data-act="mute" aria-pressed="true" aria-label="Mute narration" title="Mute narration">${svg(ICONS.sound)}</button>
        <span class="wt-spacer"></span>
        <div class="wt-dots" role="tablist" aria-label="Jump to step">${M.map((s, n) => `<button type="button" class="wt-dot" data-i="${n}" role="tab" aria-label="Step ${n + 1}: ${s.title.replace(/"/g, "&quot;")}"></button>`).join("")}</div>
        <span class="wt-stepLabel"></span>
      </div>`;

    const el = (s) => root.querySelector(s);
    const stage = el(".wt-stage"), stageInner = el(".wt-stageInner"), moneyTag = el(".wt-moneyTag");
    const overlay = el(".wt-startOverlay"), startBtn = el('[data-act="start"]');
    const fill = el(".wt-progressFill"), titleEl = el(".wt-captionTitle"), bodyEl = el(".wt-captionBody");
    const muteBtn = el('[data-act="mute"]');
    const playBtn = el('[data-act="play"]'), prevBtn = el('[data-act="prev"]'), nextBtn = el('[data-act="next"]');
    const stepLabel = el(".wt-stepLabel"), dots = Array.from(root.querySelectorAll(".wt-dot"));
    const audio = new Audio(); audio.preload = "none";

    const scene = () => M[i];
    const hasAudio = () => Boolean(scene().audio);
    const durMs = () => scene().durationMs || 8000;

    function postHeight() {
      try { parent.postMessage({ type: "wt-height", id, height: root.offsetHeight }, "*"); } catch (e) {}
    }

    function stopClocks() { cancelAnimationFrame(rafId); clearTimeout(timer); }

    // any interaction dismisses the start overlay (the click is the autoplay gesture)
    function ensureStarted() {
      if (started) return;
      started = true;
      overlay.remove();
    }

    function runProgress() {
      progStart = performance.now();
      const stepFrame = (now) => {
        let frac;
        if (!muted && hasAudio() && audio.duration) frac = audio.currentTime / audio.duration;
        else frac = (progBase + (now - progStart)) / durMs();
        fill.style.width = Math.min(100, Math.max(0, frac * 100)) + "%";
        if (frac >= 1 && playing && (muted || !hasAudio())) { advance(); return; }
        if (playing) rafId = requestAnimationFrame(stepFrame);
      };
      rafId = requestAnimationFrame(stepFrame);
    }

    function startPacing() {
      stopClocks();
      progBase = 0;
      if (!playing) { stage.classList.add("paused"); return; }
      stage.classList.remove("paused");
      if (!muted && hasAudio()) { audio.currentTime = 0; audio.play().catch(() => {}); }
      runProgress();
    }

    function mount() {
      const s = scene();
      stopClocks();
      // stage content: poster or scene svg (re-inject to restart CSS animations)
      stageInner.innerHTML = s.poster
        ? `<img class="wt-poster" src="${s.poster}" alt="">`
        : `<div class="wt-scene">${SCENES[s.scene] || ""}</div>`;
      if (s.money) { moneyTag.hidden = false; moneyTag.textContent = s.money === "after" ? "After" : "Before"; }
      else moneyTag.hidden = true;
      titleEl.textContent = s.title;
      bodyEl.textContent = s.body;
      fill.style.width = "0%";
      dots.forEach((d, n) => { d.classList.toggle("active", n === i); if (n === i) d.setAttribute("aria-selected", "true"); else d.removeAttribute("aria-selected"); });
      stepLabel.textContent = `Step ${i + 1} / ${total}`;
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === total - 1;
      audio.src = s.audio || "";
      audio.muted = muted;
      startPacing();
      // height settles after layout
      requestAnimationFrame(postHeight);
    }

    function go(n) { if (n < 0 || n > total - 1) return; i = n; done = false; mount(); }
    function advance() { if (i < total - 1) go(i + 1); else { playing = false; done = true; setPlayUI(); stage.classList.add("paused"); stopClocks(); } }

    function setPlayUI() { playBtn.innerHTML = svg(playing ? ICONS.pause : ICONS.play); playBtn.setAttribute("aria-label", playing ? "Pause" : "Play"); }
    function setMuteUI() {
      muteBtn.innerHTML = svg(muted ? ICONS.muted : ICONS.sound);
      muteBtn.setAttribute("aria-pressed", String(!muted));
      muteBtn.setAttribute("aria-label", muted ? "Unmute narration" : "Mute narration");
      muteBtn.title = muted ? "Unmute narration" : "Mute narration";
    }

    // events
    audio.addEventListener("ended", () => { if (playing && !muted && hasAudio()) advance(); });
    startBtn.addEventListener("click", () => { ensureStarted(); playing = true; setPlayUI(); mount(); });
    muteBtn.addEventListener("click", () => { muted = !muted; audio.muted = muted; setMuteUI(); if (started) mount(); });
    playBtn.addEventListener("click", () => {
      ensureStarted();
      if (!playing && done) { done = false; playing = true; setPlayUI(); go(0); return; } // replay from the top
      playing = !playing; setPlayUI();
      if (playing) { stage.classList.remove("paused"); if (!muted && hasAudio()) audio.play().catch(() => {}); runProgress(); }
      else { stage.classList.add("paused"); audio.pause(); stopClocks(); }
    });
    prevBtn.addEventListener("click", () => { ensureStarted(); go(i - 1); });
    nextBtn.addEventListener("click", () => { ensureStarted(); go(i + 1); });
    dots.forEach((d) => d.addEventListener("click", () => { ensureStarted(); go(Number(d.dataset.i)); }));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); ensureStarted(); go(i + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); ensureStarted(); go(i - 1); }
      else if (e.key === " ") { e.preventDefault(); playBtn.click(); }
    });
    window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(postHeight, 120); });

    setMuteUI(); setPlayUI(); mount();
  };
})();
