// Chapter 2 — "It only moves one way". The v3 proof scene.
//
// WHY THIS IS BESPOKE. The other eight chapters still use the generic factory in scenes.mjs. This
// one is hand-authored because it is the direction being proved: one idea on screen, expressed as
// motion, with the narration as its soundtrack. If it is approved the pattern gets applied to the
// rest; until then nothing else is disturbed.
//
// WHAT IT DRAWS, AND WHY THAT AND NOT SOMETHING ELSE. The brand already specifies this animation.
// `brand-kit/brand/tokens.css` opens "DESIGN SYSTEM A — RESOLUTION · Fidelity made visible: coarse
// pixels resolve into crisp vector", and the creative brief's Direction A — the one that shipped —
// says the mark "performs the product: fidelity improving left-to-right … five discrete steps, one
// per rung. Not a gradient, a ratchet." That is this chapter's argument word for word, so the scene
// is the brand's own thesis finally moving rather than a new invention.
//
// The brief also names the failure mode, and it governs every choice below: "the pixel→vector trope
// has AI-era mileage on it; execution must be unusually disciplined (exactly five steps, annotated
// like a diagram — rung numbers under each step — so it reads as an INSTRUMENT, not a logo trend."
// Hence: hairlines, numbered cells, mono labels. No glow, no bounce, no ambient shimmer.
//
// TIMING. All delays are absolute milliseconds from the chapter's start, because the player scrubs
// every animation's currentTime off the narration clock (pilot/player.mjs). The four cue times come
// from walkthrough.json and are restated here so a mismatch is visible rather than silent:
//
//   beat 1 CLIMB    0.0s  (5.5s)  "the work climbs"          — five cells lay down, all coarse
//   beat 2 REAL     5.5s  (7.0s)  "something you can click"  — each resolves in turn
//   beat 3 RATCHET 12.4s  (7.2s)  "only moves one way"       — the pawl drops, back is refused
//   beat 4 NO SKIP 19.6s  (2.5s)  "skip a step"              — a jump to the end is rejected
//
// Beat 4 has 2.5 seconds. Everything in it is one move.
//
// POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 — the same pass chapter 1 had, option 1c. The paint
// is now the system's: paper ground, the ruled schoolroom texture under the row, charcoal rather
// than ink for the block and vector fills (DS-A reserves ink for type), --muted where the file had
// hardcoded #6f6a5d and #b3ab9a, and the five step names in the display voice because they are the
// chapter's argument rather than its annotation. The admin surface's furniture frames it.
//
// NO BANDS AND NO RULED GROUND HERE, and both omissions are the same decision. Chapter 1 earned
// its annotation bands because it has two labelled rows of marks, which is what a band is for; and
// it earned the ruling because it is a chart, and the ruling is the thing you plot on. This chapter
// has one row of cards and two refusals. A full-bleed band behind a single struck-through arrow
// would be furniture pretending to be structure, and the ruling — tried, shot, and cut — only ever
// showed in the gaps BETWEEN the cells, which is precisely where the chevrons have to read. It
// added texture and took away legibility. The vocabulary is shared; it is not a checklist.
//
// AUTHORED FINAL-STATE-FIRST. Every animation uses `both`, so scrubbing to 0 shows its `from` and
// the end of the chapter shows its `to`. Under reduced motion the player jumps each animation to
// its endTime, which lands on the composed final frame — a designed state, not an absence. Nothing
// here loops; a loop has no final frame to hold.

const STEPS = [
  ['01', 'Spec', 'words'],
  ['02', 'Wireframe', 'shapes'],
  ['03', 'Preview', 'clickable'],
  ['04', 'Build', 'code'],
  ['05', 'Ship', 'in the project'],
];

// Cell geometry on a 960x430 stage.
const X0 = 44, GAP = 179, W = 142, TOP = 96, H = 128;
const cx = (i) => X0 + i * GAP;

/** The glyph inside a cell — the SAME rising-steps shape, drawn twice.
 *
 *  This is the whole argument in one device, and it needs BOTH layers to make it: every cell holds
 *  a coarse rendering (four fat blocks) and its own resolved rendering, stacked. On beat 2 they
 *  cross-fade, cell by cell, left to right — so the viewer does not merely see five things that
 *  happen to differ in sharpness, they watch each one RESOLVE. Showing only the end states would
 *  have illustrated the idea; cross-fading performs it.
 *
 *  The shape never changes — only how finely it is rendered. Five different icons would have said
 *  "five different things", which is the opposite of a fidelity ladder.
 */
const STEPS_PATH = (gx, gy, gh) => `M${gx} ${gy + gh} L${gx} ${gy + gh - 14} L${gx + 22} ${gy + gh - 14} L${gx + 22} ${gy + gh - 31} L${gx + 45} ${gy + gh - 31} L${gx + 45} ${gy + gh - 48} L${gx + 68} ${gy + gh - 48} L${gx + 68} ${gy} L${gx + 90} ${gy}`;

function blocks(gx, gy, gw, gh, res) {
  const u = gw / res;
  const out = [];
  for (let c = 0; c < res; c += 1) {
    const h = Math.max(1, Math.round(((c + 1) / res) * (gh / u)));
    for (let r = 0; r < h; r += 1) {
      out.push(`<rect x="${(gx + c * u).toFixed(1)}" y="${(gy + gh - (r + 1) * u).toFixed(1)}" width="${Math.max(1, u - 1).toFixed(1)}" height="${Math.max(1, u - 1).toFixed(1)}" />`);
    }
  }
  return out.join('');
}

function glyph(i) {
  const gx = cx(i) + 26, gy = TOP + 30, gw = 90, gh = 68;
  const target = [6, 9, 14, 22, 0][i];   // 0 = the vector rendering, reached only at the last cell
  const resolved = target === 0
    ? `<path class="vec" d="${STEPS_PATH(gx, gy, gh)}" />`
    : `<g class="fine">${blocks(gx, gy, gw, gh, target)}</g>`;
  return `<g class="coarse">${blocks(gx, gy, gw, gh, 4)}</g>${resolved}`;
}

const cells = STEPS.map(([n, name, note], i) => `
  <g class="cell c${i}" data-node="${i}">
    <rect class="tile" x="${cx(i)}" y="${TOP}" width="${W}" height="${H}" rx="2" />
    ${glyph(i)}
    <text class="num"   x="${cx(i)}"          y="${TOP + H + 22}">${n}</text>
    <text class="name"  x="${cx(i) + 24}"     y="${TOP + H + 22}">${name}</text>
    <text class="note"  x="${cx(i)}"          y="${TOP + H + 38}">${note}</text>
  </g>`).join('');

// Direction lives in the GAPS between the cells — no second object.
//
// Two passes were cut to get here. The first had teeth, a pawl, a backward arc, a skip arc and an
// ANCHOR→VESSEL→REQUEST band: five devices for two ideas, with two near-identical red arcs reading
// as one objection twice. The second kept a ratchet rack, and it still failed — the teeth read as
// loose triangles rather than a rack, and the pawl floated between cells instead of engaging, so
// the metaphor cost a whole second object and did not land.
//
// The row is already on screen and the gaps between its cells are empty. Putting the direction
// there says "one way" using the thing the viewer is already looking at, which is both cheaper and
// more legible than drawing a mechanism beside it and hoping the analogy carries.
// The prohibition sign: centre and radius, so the ring, the bar and the arrow inside it cannot
// drift apart. It sits in the gap past cell three, below the row, pointing back the way it came.
const BX = cx(2) + W + 2, BY = TOP + H + 62, BR = 19;

// The skip arc, and the two things that have to sit exactly on it. Both are DERIVED from the
// curve rather than measured off a screenshot: the apex is the cubic evaluated at t = 0.5, and the
// arrowhead's angle is the curve's own end tangent. Move a control point and both follow.
const SKIP_A = [cx(0) + 70, TOP - 14], SKIP_C1 = [cx(1) + 90, 18], SKIP_C2 = [cx(3), 18], SKIP_B = [cx(4) + 70, TOP - 14];
const SKIP_APEX = [0, 1].map((k) => (SKIP_A[k] + 3 * SKIP_C1[k] + 3 * SKIP_C2[k] + SKIP_B[k]) / 8);
const SKIP_ANGLE = (Math.atan2(SKIP_B[1] - SKIP_C2[1], SKIP_B[0] - SKIP_C2[0]) * 180 / Math.PI).toFixed(2);

const chevrons = [0, 1, 2, 3].map((i) => {
  const x = cx(i) + W + (GAP - W) / 2, y = TOP + H / 2;
  return `<path class="chev k${i}" d="M${x - 5} ${y - 7} L${x + 4} ${y} L${x - 5} ${y + 7}" />`;
}).join('');

export const ladderScene = {
  html: `
<div class="review-scene story-scene lad-wrap" data-phase="0">
<figure class="lad" role="img" aria-label="Five numbered cells in a row on ruled graph paper, labelled Spec, Wireframe, Preview, Build and Ship. Each holds the same rising-steps shape drawn at a finer resolution than the one before it, from four coarse blocks in the first to a single clean line in the last. Arrows between the cells point one way, left to right. A backward arrow is struck through and marked never back a step, and an arc reaching from the first cell straight to the last, arrowed at its far end, carries the same sign at its top.">
  <!-- The viewBox grows UPWARD rather than shifting the contents down. Every constant in this file
       is absolute, the skip arc reaches to y=18, and the top is the only place the furniture can
       go — so the box starts at -34 and the drawing does not move a pixel. -->
  <svg class="lad-svg" viewBox="0 -34 960 404" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§2 · FIDELITY IS A RATCHET</text>
      <text class="slab slab-r" x="916" y="-20">IT ONLY MOVES ONE WAY</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
      <text class="slab" x="44" y="356">FIDELITY LADDER SYSTEM · CHAPTER 2 OF 9</text>
    </g>

    <!-- pathLength="1" is NOT optional here. The CSS gives this line a stroke-dasharray of 1 to draw
         it on, and without pathLength that 1 is ONE USER UNIT — so instead of a rule that draws
         left to right, it rendered as a 1px dotted line for the whole chapter. This file's own
         header warns about exactly that; the line was the one place it had not been applied. It
         only became visible once the scene sat on paper instead of white. -->
    <g class="rule"><line pathLength="1" x1="44" y1="${TOP - 26}" x2="916" y2="${TOP - 26}" /></g>
    <text class="axis axis-l" x="44"  y="${TOP - 36}">COARSE</text>
    <text class="axis axis-r" x="916" y="${TOP - 36}">RESOLVED</text>

    ${cells}

    <!-- beat 3: the direction, in the gaps the row already has -->
    <g class="chevs">${chevrons}</g>

    <!-- Refusal one, beat 3: a backward step, inside a prohibition sign.
         It was a bare red line struck across a grey arrow, which reads as "crossed out" but not as
         "not allowed" — a slash over a thing can equally mean deleted, wrong, or corrected. The
         circle-and-bar is the one mark that means exactly and only *forbidden*, and a viewer does
         not have to be taught it. It also separates this refusal from beat 4's, which is a struck
         SPAN across the whole row: one says you may not take this move, the other says you may not
         cross this distance. Two refusals, two different shapes, no ambiguity about which is which.
         Geometry is centred on the arrow so the sign encloses it rather than sitting beside it. -->
    <g class="back">
      <path class="back-arrow" d="M${BX + 13} ${BY} L${BX - 13} ${BY} M${BX - 5} ${BY - 6} L${BX - 13} ${BY} L${BX - 5} ${BY + 6}" />
      <circle class="back-ring" pathLength="1" cx="${BX}" cy="${BY}" r="${BR}" />
      <path class="back-bar" pathLength="1" d="M${(BX - BR * 0.707).toFixed(1)} ${(BY - BR * 0.707).toFixed(1)} L${(BX + BR * 0.707).toFixed(1)} ${(BY + BR * 0.707).toFixed(1)}" />
      <text class="back-label" x="${BX}" y="${BY + BR + 20}">never back a step</text>
    </g>

    <!-- Refusal two, beat 4: one long span across the whole row — you cannot jump ahead.
         The SAME prohibition sign as the back step, deliberately. An earlier pass gave the two
         refusals two different marks on the theory that different shapes would keep them distinct.
         They are already distinct: what is underneath each sign says which is which — a short arrow
         back, a long arc across everything. Two negation marks for two negations invites the reader
         to look for a difference in KIND that does not exist. One sign, one meaning, used twice.
         The ring is paper-filled so it masks the arc: the leap visibly stops at the sign rather
         than running through it.
         The arrowhead makes the arc a move rather than a line. Its angle is the curve's own end
         tangent, computed from the control points rather than guessed, so it sits ON the path. -->
    <g class="skip">
      <path class="skip-arc" pathLength="1" d="M${SKIP_A[0]} ${SKIP_A[1]} C ${SKIP_C1[0]} ${SKIP_C1[1]}, ${SKIP_C2[0]} ${SKIP_C2[1]}, ${SKIP_B[0]} ${SKIP_B[1]}" />
      <path class="skip-head" d="M-10 -5.5 L0 0 L-10 5.5" transform="translate(${SKIP_B[0]} ${SKIP_B[1]}) rotate(${SKIP_ANGLE})" />
      <circle class="skip-ring" pathLength="1" cx="${SKIP_APEX[0]}" cy="${SKIP_APEX[1]}" r="${BR}" />
      <path class="skip-bar" pathLength="1" d="M${(SKIP_APEX[0] - BR * 0.707).toFixed(1)} ${(SKIP_APEX[1] - BR * 0.707).toFixed(1)} L${(SKIP_APEX[0] + BR * 0.707).toFixed(1)} ${(SKIP_APEX[1] + BR * 0.707).toFixed(1)}" />
    </g>
  </svg>
</figure>
</div>`,

  /** The motion is entirely declarative CSS on absolute delays — that is what lets the player
   *  scrub and freeze it for free — so this does no per-frame drawing.
   *
   *  What it DOES do is declare which beat is showing. `.review-scene[data-phase]` is the scene
   *  contract every other scene honours and `full.spec.mjs:97` enforces: seek to a cue, and the
   *  scene must say which beat it is on. Skipping it broke five tests, and rightly — a scene that
   *  will not say where it is cannot be verified, and the beat is also the hook any per-beat
   *  emphasis will need later.
   */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};
