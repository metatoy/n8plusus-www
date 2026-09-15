import { chapters } from './content.mjs';
// Chapter 2 is hand-authored — the v3 motion direction being proved. The other eight still use the
// generic factory below, so nothing else moves until this one is approved.
import { ladderScene } from './scene-ladder.mjs';
import { problemScene } from './scene-problem.mjs';
import { gatesScene } from './scene-gates.mjs';
import { requestScene } from './scene-request.mjs';
import { wireframeScene } from './scene-wireframe.mjs';
import { previewScene } from './scene-preview.mjs';
import { buildScene } from './scene-build.mjs';
import { shipScene } from './scene-ship.mjs';
import { yourTurnScene } from './scene-your-turn.mjs';

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const rows = (items) => items.map(([label, title, text], index) => `<li data-node="${index}"><span class="node-label">${label}</span><div><h3>${title}</h3><p>${text}</p></div><span class="node-marker" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></li>`).join('');

// The rail carries the VISITOR's five steps, not the engine's rungs.
//
// It used to read Spec / Wireframe / Prototype / Build / Flagged PR — the ladder's own names for
// its own machinery. Those are not the words on the screen a viewer reaches one click later: the
// demo surface calls them Request, Wireframe, Preview, Build, Ship (`engine/src/fls/demo.py`,
// STAGES), and a walkthrough that teaches different names than the product uses has taught the
// wrong thing, however accurate it was internally.
//
// `stage` is 0-4 and indexes that list; the three concept chapters pass -1, so nothing is marked
// current while the piece is still explaining what a step IS.
const STAGES = ['Request', 'Wireframe', 'Preview', 'Build', 'Ship'];
const ladder = (stage) => `<aside class="ladder" aria-label="The five steps"><div class="ladder-label">FIVE STEPS</div><ol>${STAGES.map((name, index) => `<li class="${index === stage ? 'current' : ''}"><span class="rung-number">0${index + 1}</span><span>${name}</span><span class="rung-state">${index === stage ? 'In focus' : index < stage ? 'Done' : 'Ahead'}</span></li>`).join('')}</ol><div class="ladder-foot">${stage < 0 ? 'What the steps<br>are for.' : 'A person decides<br>at every one.'}</div></aside>`;

// A capture frame. The demo half is REAL SCREENSHOTS of a real expedition rather than authored
// illustrations, so these hold an image and caption what it is. An unattributed screenshot, in a
// piece whose whole argument is evidence over claims, would be the wrong way to make the argument.
const shot = (file, alt, caption) => `<figure class="shot"><img src="shots/${file}" alt="${escape(alt)}" loading="lazy"><figcaption>${escape(caption)}</figcaption></figure>`;

const surfaces = {
  // ── Part 1: the concept. Authored diagrams — there is nothing to photograph. ──────────────
  problem: `<ol class="concept-rows">${rows([
    ['CORRECTNESS', 'Does it work?', 'Tests, types and review already answer this one.'],
    ['DIRECTION', 'Was it worth building?', 'The question almost nothing asks.'],
    ['TIMING', 'When you find out', 'The later the answer arrives, the more it costs.'],
  ])}</ol><div class="cost-scale" aria-hidden="true"><span>IDEA</span><span>SPEC</span><span>DRAWING</span><span>CLICKABLE</span><strong>CODE</strong></div><div class="cost-ramp" aria-hidden="true"></div><p class="cost-legend"><span>cheap to be wrong</span><span>expensive to be wrong</span></p>`,

  ladder: `<ol class="concept-rows">${rows([
    ['01', 'Spec', 'Words you can argue with.'],
    ['02', 'Wireframe', 'Shapes you can compare.'],
    ['03', 'Preview', 'Something you can click.'],
    ['04', 'Build', 'Code that runs.'],
    ['05', 'Ship', 'A change in the project.'],
  ])}</ol><div class="cascade"><span>ANCHOR</span><i aria-hidden="true">&rarr;</i><span>VESSEL</span><i aria-hidden="true">&rarr;</i><span>REQUEST</span><b>tighten only</b></div>`,

  gates: `<ol class="concept-rows">${rows([
    ['HUMAN', 'A person decides', 'Every step that cannot be taken back.'],
    ['FAIL CLOSED', 'Unknown stops', 'A check that did not run is never reported as passed.'],
    ['DESCEND', 'Failure goes back a step', 'And leaves a lesson the next attempt reads.'],
    ['COST', 'Every step is priced', 'A claim with no price attached is not reviewable.'],
  ])}</ol><div class="gate-foot"><span class="gate-mark" aria-hidden="true">&times;</span><p>The climb ends at a gate, not a summit.</p></div>`,

  // ── Part 2: the demo, as photographed. ───────────────────────────────────────────────────
  request: `${shot('request.png', 'The request box on the visitor page, with a change typed into it and the Start button below it.', 'The visitor page, before anything runs.')}<ol class="concept-rows">${rows([
    ['WHO', 'A name and a shared passcode', 'The record says who asked, not "someone".'],
    ['ONE SENTENCE', 'What you want changed', 'And, if you like, how you would know it worked.'],
    ['CONSENT', 'Nothing runs until you press it', 'One request at a time.'],
  ])}</ol>`,

  wireframe: `${shot('wireframe.png', 'Three candidate shapes side by side, each with a link to its drawing and a Build this one button.', 'Three shapes, and the banner asking you to choose.')}<ol class="concept-rows">${rows([
    ['THREE', 'Three rough shapes', 'Real frames in a real design file.'],
    ['DISTINCT', 'They differ in shape, not wording', 'Three answers, not three phrasings of one.'],
    ['KEPT', 'The other two stay', 'You can still see what was not taken.'],
  ])}</ol>`,

  preview: `${shot('preview.png', 'The preview card offering a clickable version, above a box for saying what to change.', 'A clickable version of the shape that was picked.')}<ol class="concept-rows">${rows([
    ['CLICKABLE', 'Built from the design system', 'Not the finished product.'],
    ['THROWAWAY', 'It exists to test direction', 'Before anyone writes real code.'],
    ['REVISE', 'Changes re-run this step', 'It does not start over, or skip ahead.'],
  ])}</ol>`,

  build: `${shot('build.png', 'The code card showing files changed, lines, and the project tests re-run, beside a link that opens the change running on stage.', 'Real code, and a link that opens it running.')}<ol class="concept-rows">${rows([
    ['ISOLATED', 'An isolated copy of the project', 'Its own workspace.'],
    ['EVIDENCE', 'The tests are run again here', "The agent's own result is not taken on trust."],
    ['OPENABLE', 'A link, not a receipt', 'With the switch already on, so you can see it.'],
  ])}</ol>`,

  ship: `${shot('ship.png', 'The finished card reading "The ladder is done — five steps, and you decided every one", with what it cost, the files changed, and a line saying the change was merged into main with the feature still switched off for everyone.', 'What it left behind, in its own words.')}<ol class="concept-rows">${rows([
    ['MERGED', 'It is in the project', 'Merged into main — on the yes you gave a step earlier.'],
    ['OFF', 'Switched off in both environments', 'Merging moves code. It does not release a feature.'],
    ['LATER', 'Turning it on is separate', 'A person, deliberately, outside all of this.'],
  ])}</ol>`,

  recap: `<div class="recap-mark"><img src="vendor/brand/png/mark-full.png" alt="Fidelity Ladder System mark" width="104" height="104"><h3>From intent<br>to evidence.</h3></div><ol class="concept-rows">${rows([
    ['FIVE STEPS', 'You decided every one', 'The system coordinates. It does not judge.'],
    ['IN THE OPEN', 'Every step says what it cost', 'Hiding spend asks to be trusted, not checked.'],
    ['THE POINT', 'Being wrong made cheap', 'Not an agent that is safe to leave alone.'],
  ])}</ol><div class="explore-links"><a href="https://harness.n8plusus.com/build/" target="_blank" rel="noopener">Run one yourself <span aria-hidden="true">&nearr;</span></a><a href="https://github.com/nhunsaker/fidelity-ladder-system" target="_blank" rel="noopener">Read the source <span aria-hidden="true">&nearr;</span></a></div>`,
};

// One row per beat, listing which surface nodes light up on that beat.
const highlightedNodes = {
  problem: [[2], [0], [1], [2]],
  ladder: [[0, 1, 2, 3, 4], [0, 1, 2], [0, 1, 2, 3, 4], []],
  gates: [[0], [1], [2], [3], [0, 1, 2, 3]],
  request: [[0], [1], [2], [2]],
  wireframe: [[0], [1], [1], [2]],
  preview: [[0], [0], [1], [2], [2]],
  build: [[0], [1], [2], [2], [2]],
  ship: [[0], [0], [1], [2], [2]],
  recap: [[0], [1], [2], []],
};

// What each chapter's picture actually IS, said on the picture. The old version stamped
// "ILLUSTRATIVE / NOT A LIVE EXPEDITION" on all eight authored scenes and made an exception of the
// recap. That is now backwards: the demo half is photographed from a real run, so calling it
// illustrative would UNDERstate it, while leaving the concept diagrams unlabelled would OVERstate
// them. Each chapter states its own basis.
const PROVENANCE = {
  problem: 'DIAGRAM', ladder: 'DIAGRAM', gates: 'DIAGRAM',
  request: 'CAPTURED FROM A REAL RUN', wireframe: 'CAPTURED FROM A REAL RUN',
  preview: 'CAPTURED FROM A REAL RUN', build: 'CAPTURED FROM A REAL RUN',
  ship: 'CAPTURED FROM A REAL RUN',
  recap: 'PUBLIC DEMO & SOURCE / EXTERNAL LINKS',
};

function createScene(chapter) {
  const first = chapter.beats[0];
  return {
    html: `<div class="review-scene story-scene story-${chapter.kind}" data-phase="0">${ladder(chapter.stage)}<div class="scene-main"><header class="scene-heading"><div><p class="eyebrow">${chapter.eyebrow}</p><h2 data-story-title>${first[2]}</h2></div></header><div class="story-grid"><section class="story-surface" aria-label="${escape(chapter.title)} illustration">${surfaces[chapter.kind]}<p class="scene-provenance">${PROVENANCE[chapter.kind] || ''}</p></section><aside class="story-annotation" aria-label="Explanation"><span class="eyebrow">UNDER THE INTERFACE</span><h3 data-story-label>${first[0]}</h3><div class="story-code"><span>In the system</span><code data-story-code>${escape(first[4])}</code></div><p class="story-note" data-story-note>${escape(first[3])}</p><div class="story-counter"><span data-story-number>01</span><span>/ ${String(chapter.beats.length).padStart(2, '0')}</span></div></aside></div></div></div>`,
    render(root, elapsedMs, durationMs, reduced, cues) {
      if (!cues?.length) return;
      const current = Math.round(elapsedMs);
      const phase = Math.max(0, cues.findLastIndex((cue) => current >= cue.atMs));
      const shell = root.querySelector('.story-scene');
      if (!shell) return;
      if (shell.dataset.phase !== String(phase) || !shell.dataset.initialized) {
        shell.dataset.phase = String(phase);
        shell.dataset.initialized = 'true';
        const [label, , title, note, code] = chapter.beats[phase];
        root.querySelector('[data-story-title]').textContent = title;
        root.querySelector('[data-story-label]').textContent = label;
        root.querySelector('[data-story-note]').textContent = note;
        root.querySelector('[data-story-code]').textContent = code;
        root.querySelector('[data-story-number]').textContent = String(phase + 1).padStart(2, '0');
        const lit = highlightedNodes[chapter.kind][phase] || [];
        root.querySelectorAll('[data-node]').forEach((node) => node.classList.toggle('active-node', lit.includes(Number(node.dataset.node))));
      }
      const reveal = reduced ? 1 : Math.min(1, Math.max(0, (current - cues[phase].atMs) / 350));
      const title = root.querySelector('[data-story-title]');
      title.style.transform = `translateY(${(1 - reveal) * 4}px)`;
      title.style.opacity = String(.7 + reveal * .3);
    },
  };
}

// Fail at BUILD time, not at the viewer's render. A highlight row shorter than its chapter's beat
// list used to be a TypeError thrown inside an animation frame — which freezes the scene on
// whichever beat it reached and tells nobody watching anything they can act on.
for (const chapter of chapters) {
  // Hand-authored, not factory-built. Their entries are still sitting in `surfaces` above and are
  // now unreachable, along with the screenshots those entries name — request.png and wireframe.png
  // are ~900KB between them that nothing loads. Left in place rather than pruned one at a time:
  // every chapter is on its way out of the factory, so the table and its orphaned shots come out
  // together at the end of the fan-out, not in one commit per chapter.
  if (['ladder', 'problem', 'gates', 'request', 'wireframe', 'preview', 'build', 'ship', 'recap'].includes(chapter.kind)) continue;
  if (!surfaces[chapter.kind]) throw new Error(`No surface for kind '${chapter.kind}' (chapter ${chapter.id})`);
  const lit = highlightedNodes[chapter.kind];
  if (!lit || lit.length < chapter.beats.length) {
    throw new Error(`highlightedNodes['${chapter.kind}'] has ${lit ? lit.length : 0} rows for ${chapter.beats.length} beats (chapter ${chapter.id})`);
  }
}

export const scenes = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter.kind === 'ladder' ? ladderScene
    : chapter.kind === 'problem' ? problemScene
    : chapter.kind === 'gates' ? gatesScene
    : chapter.kind === 'request' ? requestScene
    : chapter.kind === 'wireframe' ? wireframeScene
    : chapter.kind === 'preview' ? previewScene
    : chapter.kind === 'build' ? buildScene
    : chapter.kind === 'ship' ? shipScene
    : chapter.kind === 'recap' ? yourTurnScene
    : createScene(chapter)]));
