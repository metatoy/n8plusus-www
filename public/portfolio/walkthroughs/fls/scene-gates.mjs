// Chapter 3 — "It ends at a gate".
//
// THE THIRD LENS ON THE SAME FIVE COLUMNS. Chapter 1 plotted COST against them, chapter 2 plotted
// FIDELITY, and this one puts a GATE at the end of each. Three chapters, one stage, three readings
// — so by the time the demo half starts, the viewer has looked at the same five steps three times
// and does not need to learn a fourth picture. The column constants are shared with the other two
// scenes on purpose; if they drift, the whole concept half stops cohering.
//
// THIS ONE HAS A PROTAGONIST, because it has the room for one. Beat 2 runs ELEVEN SECONDS — by far
// the longest in the piece — and a static annotation held for that long goes dead. So a single
// token climbs the row and is stopped, which is the chapter's argument acted out rather than
// labelled: it passes the gates that answered, and halts at the one that did not.
//
// TIMING, from walkthrough.json — 28.839s, five cues:
//   beat 1 HUMAN    0.0s  (4.5s)  "cannot be taken back"   — the gates, and who opens them
//   beat 2 CLOSED   4.5s (11.0s)  "advances on optimism"   — climb, two ticks, then a "?" and a halt
//   beat 3 DESCEND 15.5s  (7.0s)  "drops back down"        — back one step, leaving a lesson
//   beat 4 COST    22.5s  (3.3s)  "says what it cost"      — a price under every step
//   beat 5 KEEP    25.8s  (3.0s)  "gates that are kept"    — the gates take the emphasis
//
// POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 — the same pass as chapters 1 and 2, option 1c.
// Paper ground, --muted where the file hardcoded #6f6a5d and #b3ab9a, --line for the price bars,
// the five step names and the closing statement in the display voice, and the admin surface's
// furniture around a drawing that stays bare. The axis label is retired into that furniture, which
// is where a chapter title belongs; chapter 1 did the same.
//
// TWO RED MARKS MOVED TO INK, and it is the same rule both times: #e63329 on paper is 3.89:1,
// which fails AA at every size in this scene. The gate-3 verdict and the "stops and waits" label
// are now ink. Nothing is lost — the gate's own post turns red at the exact instant the verdict
// appears, so the state still reads as red; it rides on the shape instead of on the type. That is
// DS-A's own division, and chapter 1's "most expensive" took the same treatment.
//
// NO BANDS, NO RULED GROUND. Same reasoning as chapter 2: chapter 1 earned both because it is a
// chart with two labelled rows of marks. This is a lane with gates on it.
//
// NO MONEY ON SCREEN. Beat 4 shows that every step is priced, never a figure. Spend on this
// instance is $0.00 metered and the visible number elsewhere is a normalized shadow price, so a
// dollar amount here would be the one dishonesty this chapter cannot afford — it is the chapter
// about not overclaiming.

const STEPS = [
  ['01', 'Spec'],
  ['02', 'Wireframe'],
  ['03', 'Preview'],
  ['04', 'Build'],
  ['05', 'Ship'],
];

// Shared with scene-ladder.mjs and scene-problem.mjs. See the note above.
const X0 = 44, GAP = 179, W = 142;
const cx = (i) => X0 + i * GAP;
const mid = (i) => cx(i) + W / 2;
const gateX = (i) => cx(i) + W + 18;          // the gate stands just past its column
const LANE = 150, GATE_TOP = 104, GATE_H = 84;
// The verdict sits ON its gate at lane height, not in a row of its own. In the first pass it lived
// below the columns, where it read as belonging to the column label beside it rather than to the
// gate — and it cost a whole row of vertical space to be ambiguous in. V_X is the gap from the post
// to the icon's left edge; the icon is centred on the lane by its own box.
const V_X = 9;

const columns = STEPS.map(([n, name], i) => `
  <g class="col">
    <text class="cnum"  x="${mid(i)}" y="${LANE + 96}">${n}</text>
    <text class="cname" x="${mid(i)}" y="${LANE + 112}">${name}</text>
    <rect class="price p${i}" x="${mid(i) - 16}" y="${LANE + 128}" width="32" height="5" rx="1" />
  </g>`).join('');

// A gate: an upright, and a small figure standing at it. The figure is the point — the upright
// alone would read as a barrier, and the claim is not "there is a barrier", it is "a person is the
// one who opens it".
// ICONS FROM THE STUDIO SET — Phosphor, bold weight, the same library TattleTown ships
// (assets/tattletown/icons/phosphor-icons/SVGs/bold). Geometry only: the presentation attributes
// the files carry are stripped so fill, stroke and weight come from CSS with everything else.
// All three are authored on Phosphor's 256 grid and scaled at the point of use, so they stay in
// proportion with each other no matter what size a scene asks for.
//
// The figure was hand-drawn before — a 3.4px circle over a 10px arc — and it did not read as a
// person. That is not a size problem to be solved by enlarging a bad shape: a dot above a curve is
// a dot above a curve at any size. Phosphor's `user` has the head-to-shoulder proportion that makes
// the glyph legible, and at 24px it is unmistakable.
const ICON = {
  user: '<circle cx="128" cy="96" r="64" /><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />',
  check: '<polyline points="40 144 96 200 224 72" />',
  question: '<path d="M128,156V144c30.93,0,56-21.49,56-48s-25.07-48-56-48S72,69.49,72,96" /><circle class="pip" cx="128" cy="208" r="20" />',
};
/** Place a 256-grid icon in a box of `size`, with its top-left at (x, y). */
const icon = (name, x, y, size) =>
  `<g class="ic" transform="translate(${x} ${y}) scale(${(size / 256).toFixed(5)})">${ICON[name]}</g>`;

const FIG = 24, VS = 26;   // the person at each gate, and the verdict it hands down

const gates = STEPS.map((_, i) => `
  <g class="gate g${i}">
    <line class="post" x1="${gateX(i)}" y1="${GATE_TOP}" x2="${gateX(i)}" y2="${GATE_TOP + GATE_H}" />
    <g class="who">${icon('user', gateX(i) - FIG / 2, GATE_TOP - 6 - FIG, FIG)}</g>
    <g class="verdict v${i}">${icon(i === 2 ? 'question' : 'check', gateX(i) + V_X, LANE - VS / 2, VS)}</g>
  </g>`).join('');

export const gatesScene = {
  html: `
<div class="review-scene story-scene gt-wrap" data-phase="0">
<figure class="gt" role="img" aria-label="Five steps in a row on a lane — Spec, Wireframe, Preview, Build, Ship — each ending at an upright gate with a small figure standing beside it. A token climbs the row, passes the first two gates which are marked with ticks, and halts at the third, which is marked with a question mark. The token then drops back one step, leaving a note behind. A short bar appears under every step showing it was priced, and finally the gates themselves take the emphasis.">
  <!-- The box grows upward, as chapter 2's does: every constant here is absolute, and the top of
       the drawing is already occupied by the gate figures. Starting at -34 buys the furniture its
       band without moving anything. -->
  <svg class="gt-svg" viewBox="0 -34 960 382" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§3 · NOT AT A SUMMIT</text>
      <text class="slab slab-r" x="916" y="-20">EVERY STEP ENDS AT A GATE</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
      <text class="slab" x="44" y="334">FIDELITY LADDER SYSTEM · CHAPTER 3 OF 9</text>
    </g>

    <text class="ax" x="44" y="70">EVERY STEP ENDS AT A GATE</text>
    <line class="lane" x1="44" y1="${LANE}" x2="916" y2="${LANE}" />

    ${columns}
    ${gates}

    <!-- the protagonist: one token, climbing -->
    <g class="tok"><rect x="-9" y="-9" width="18" height="18" rx="2" /></g>

    <!-- beat 2's halt, and beat 3's lesson -->
    <text class="halt" x="${gateX(2) + 14}" y="${LANE - 26}">stops and waits</text>
    <g class="lesson">
      <path class="lesson-arc" pathLength="1" d="M${gateX(2) - 6} ${LANE + 16} C ${gateX(2) - 40} ${LANE + 44}, ${mid(2) - 40} ${LANE + 44}, ${mid(1) + 14} ${LANE + 16}" />
      <text class="lesson-tag" x="${mid(1) + 30}" y="${LANE + 62}">and writes down why</text>
    </g>

    <!-- No "what it cost" label. The narration says exactly that, at exactly this beat, so a
         caption repeating it is the duplicated-speech fault this whole redesign exists to
         remove — and it collided with the first bar anyway. The bars carry it. -->
    <text class="keep" x="916" y="70">the value is the gates you keep</text>
  </svg>
</figure>
</div>`,

  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};
