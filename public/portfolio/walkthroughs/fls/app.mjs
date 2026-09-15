import { Walkthrough } from './vendor/player.mjs';
import { scenes } from './scenes.mjs';

const params = new URLSearchParams(location.search);
if (params.has('embed')) document.body.classList.add('embedded');
const formatTime = (milliseconds) => `${Math.floor(milliseconds / 60000)}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, '0')}`;
try {
  const response = await fetch(new URL('./walkthrough.json', import.meta.url));
  if (!response.ok) throw new Error('Manifest unavailable');
  const config = await response.json();
  const list = document.querySelector('#chapter-list');
  config.manifest.forEach((step, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.dataset.chapter = String(index);
    button.textContent = `${String(index + 1).padStart(2, '0')} / ${step.title}`;
    item.append(button);
    list.append(item);
  });
  document.querySelector('#total-duration').textContent = formatTime(config.manifest.reduce((total, step) => total + step.durationMs, 0));
  const player = Walkthrough({ ...config, mount: '#walkthrough', scenes, onChapterChange(step, index) {
    document.querySelector('#chapter-label').textContent = step.title;
    document.querySelector('#chapter-position').textContent = `${String(index + 1).padStart(2, '0')} / 09`;
    document.querySelector('.chapter-duration').textContent = formatTime(step.durationMs);
    document.querySelector('.audio-status').textContent = step.audio ? 'Narrated walkthrough' : 'Narration pending';
    list.querySelectorAll('button').forEach((button) => button.setAttribute('aria-current', String(Number(button.dataset.chapter) === index)));
    const url = new URL(location.href);
    url.searchParams.set('chapter', step.id);
    history.replaceState(null, '', url);
  } });
  document.querySelector('.wt-transcript').open = true;
  list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-chapter]');
    if (!button) return;
    player.pause();
    player.go(Number(button.dataset.chapter));
    document.querySelector('#walkthrough').focus({ preventScroll: true });
  });
  const initial = config.manifest.findIndex((step) => step.id === params.get('chapter'));
  if (initial > 0) player.go(initial);
} catch {
  document.querySelector('#walkthrough').textContent = 'The walkthrough could not load. Reload the page to try again.';
}