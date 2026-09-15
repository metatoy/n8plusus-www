// Chapter 1 — "The expensive place to be wrong".
//
// PAIRED WITH CHAPTER 2, DELIBERATELY. Both chapters stand on the same five columns in the same
// order. Chapter 1 plots COST against them; chapter 2 plots FIDELITY. Same stage, two axes, so the
// second chapter lands as "the same five steps, seen another way" rather than a fresh diagram the
// viewer has to learn from scratch. Reusing the column geometry is the whole point — if these
// drift apart, the pairing is lost and both are weaker.
//
// THE ARGUMENT. The narration makes three moves and then a turn:
//   "Code is the most expensive place to discover you built the wrong thing"  -> the curve
//   "Plenty of tools can tell you whether code works"                          -> ticks, everywhere
//   "Almost nothing tells you whether it was worth building"                   -> one question mark
//   "cheapest to answer before anyone writes a line of it"                     -> the cheap end
//
// So the scene is a cost curve with two rows of marks under it: a row of ticks that reaches all the
// way across (correctness is well served) and a single unanswered question (direction is not). The
// last beat does not add anything — it takes the question mark back to the cheap end, which is the
// chapter's actual claim.
//
// TIMING, from walkthrough.json — 19.775s, four cues:
//   beat 1 COST   0.0s  (5.6s)  "the most expensive place"
//   beat 2 WORKS  5.6s  (3.1s)  "whether code works"
//   beat 3 RIGHT  8.7s  (3.4s)  "worth building"
//   beat 4 EARLY 12.1s  (7.7s)  "before anyone writes a line"
//
// Authored final-state-first with `both` fill, same as chapter 2: scrubbing to 0 shows the opening
// state, the end holds the composition, and reduced motion lands on that composition.
//
// ── POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 (founder picked option 1c, "On the chart") ──
//
// The scene was painted against a SHADOW palette. `brand-kit/brand/tokens.css` in this tree IS
// Design System A verbatim, but pilot.css aliased only six of its tokens, so the rest got picked by
// eye: #6f6a5d where the system says --a-muted #6c6659, and `var(--red, #e63329)` with --red never
// defined, so every red in nine chapters was coming out of a CSS fallback. Those aliases now exist.
//
// Three things changed beyond the colour values, and each is the system's own rule:
//
//   THE GROUND IS RULED. DS-A ships a graph-paper texture (--a-grid at 16px, --a-grid-bold every
//   80px) described as "the schoolroom-chart accent". This chapter is a schoolroom cost chart and
//   was drawn on blank paper. It is an SVG pattern rather than the design system's CSS background
//   because this SVG is width:100% — viewBox units are not pixels here, and a CSS background would
//   not stay registered to the plot.
//
//   THE CURVE IS CHARCOAL, NOT INK. DS-A: ink is "the crispest fidelity (reserved for TYPE, not
//   fills)". The curve was ink. --gate is the system's dark for fills.
//
//   THE DISPLAY VOICE ARRIVES. DS-A runs on two voices, display grotesque and mono annotation. Every
//   scene in the piece set `font-family: var(--mono)` on its whole svg, so the piece had only ever
//   spoken one of them. The two questions and the stop names are now Archivo; the annotation stays
//   mono.
//
// And the furniture is the admin surface's, per the hybrid the founder chose: a section label and
// the chart's title above a hairline, the two questions carried in the Expedition row's annotation
// bands — yellow hazard for the question nothing answers, blue for the one everything does — and a
// provenance line at the foot. The drawing itself stays bare.
//
// "most expensive" is INK on a red ring, not red type. #e63329 on paper is 3.89:1, which fails AA
// for an 11px label; the ring is a graphical object and passes at 3:1. So the red still carries the
// state and the words are legible, which is the same division DS-A already asks for.

const COLS = [
  ['01', 'Idea', 0.06],
  ['02', 'Spec', 0.14],
  ['03', 'Drawing', 0.26],
  ['04', 'Clickable', 0.46],
  ['05', 'Code', 1.00],
];

// Same column geometry as scene-ladder.mjs. Kept in step on purpose — see the note above.
const X0 = 44, GAP = 179, W = 142;
const cx = (i) => X0 + i * GAP;
const PLOT_TOP = 64, PLOT_H = 140, BASE = PLOT_TOP + PLOT_H;
// Each row label gets its OWN line above its marks. They used to share a baseline, so the label
// ran straight through column one's tick and the question mark landed on top of the word "worth".
const R1_LAB = BASE + 64, R1_MARK = BASE + 84, R2_LAB = BASE + 118, R2_MARK = BASE + 144, R2_NOTE = BASE + 162;
// The annotation bands behind those labels. Full-bleed to the viewBox edge, the way the admin
// surface's bands run to the card edge, with a 3px rule on the leading edge.
const B1_Y = BASE + 48, B1_H = 46, B2_Y = BASE + 102, B2_H = 64;

const mid = (i) => cx(i) + W / 2;
const y = (f) => BASE - f * PLOT_H;

// The curve through the five costs. A polyline rather than a smooth spline: the ladder is discrete,
// and a curve that glides between stops would quietly say the cost is continuous when the whole
// argument is that it steps.
const curve = COLS.map(([, , f], i) => `${i === 0 ? 'M' : 'L'}${mid(i)} ${y(f).toFixed(1)}`).join(' ');

const columns = COLS.map(([n, name, f], i) => `
  <g class="col q${i}">
    <line class="grid" x1="${mid(i)}" y1="${PLOT_TOP - 6}" x2="${mid(i)}" y2="${BASE}" />
    <circle class="dot" cx="${mid(i)}" cy="${y(f).toFixed(1)}" r="4" />
    <text class="cnum" x="${mid(i)}" y="${BASE + 24}">${n}</text>
    <text class="cname" x="${mid(i)}" y="${BASE + 40}">${name}</text>
  </g>`).join('');

// The schoolroom ruling. Ids are chapter-prefixed because every scene shares one document when the
// player swaps chapters, and a bare `gp` would be the first one to load rather than this one.
const ruling = `
  <defs>
    <pattern id="pb-gp" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M16 0 L0 0 0 16" fill="none" stroke="var(--grid)" stroke-width="1" />
    </pattern>
    <pattern id="pb-gpb" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="80" height="80" fill="url(#pb-gp)" />
      <path d="M80 0 L0 0 0 80" fill="none" stroke="var(--grid-bold)" stroke-width="1.4" />
    </pattern>
  </defs>`;

// Row one: correctness. A tick under every column — the point is that this row is COMPLETE.
const ticks = COLS.map((_, i) => `<path class="tick k${i}" d="M${mid(i) - 6} ${R1_MARK} l4 4 l7 -8" />`).join('');

export const problemScene = {
  html: `
<div class="review-scene story-scene pb-wrap" data-phase="0">
<figure class="pb" role="img" aria-label="A cost curve plotted on ruled graph paper across five columns — Idea, Spec, Drawing, Clickable, Code — rising gently at first and then steeply at Code, where it is ringed in red and marked most expensive. Beneath the chart, a blue band labelled 'does it work?' carries a tick under every column. A second band, yellow, labelled 'was it worth building?', holds a single question mark, which moves from the Code end to the Idea end.">
  <svg class="pb-svg" viewBox="0 0 960 412" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${ruling}

    <!-- the furniture, in the admin surface's vocabulary: where you are, what you are looking at,
         and a hairline under both. The chart's own title moved up here, so the plot area holds
         nothing but the plot. -->
    <g class="furn">
      <text class="slab" x="44" y="24">§1 · WHY THIS EXISTS</text>
      <text class="slab slab-r" x="916" y="24">COST OF BEING WRONG</text>
      <line class="fline" x1="44" y1="34" x2="916" y2="34" />
      <text class="slab" x="44" y="404">FIDELITY LADDER SYSTEM · CHAPTER 1 OF 9</text>
    </g>

    <rect class="plot" x="44" y="${PLOT_TOP}" width="872" height="${PLOT_H}" fill="url(#pb-gpb)" />
    <line class="base" x1="44" y1="${BASE}" x2="916" y2="${BASE}" />

    ${columns}
    <path class="curve" pathLength="1" d="${curve}" />
    <g class="peak">
      <circle class="peak-dot" cx="${mid(4)}" cy="${y(1).toFixed(1)}" r="7" />
      <text class="peak-label" x="${mid(4)}" y="${y(1) - 18}">most expensive</text>
    </g>

    <!-- row one: the question that IS answered, everywhere. Blue band — the admin surface's
         "this is fine" annotation. -->
    <g class="row-works">
      <rect class="band" x="0" y="${B1_Y}" width="960" height="${B1_H}" />
      <rect class="band-rule" x="0" y="${B1_Y}" width="3" height="${B1_H}" />
      <text class="rlab" x="44" y="${R1_LAB}">does it work?</text>
      ${ticks}
    </g>

    <!-- row two: the question that is not. One mark, and it moves. Yellow band — the hazard
         annotation, and the only place the third primary appears in the whole piece. -->
    <g class="row-right">
      <rect class="band band-2" x="0" y="${B2_Y}" width="960" height="${B2_H}" />
      <rect class="band-rule band-rule-2" x="0" y="${B2_Y}" width="3" height="${B2_H}" />
      <text class="rlab rlab-2" x="44" y="${R2_LAB}">was it worth building?</text>
      <text class="qmark" x="${mid(4)}" y="${R2_MARK}">?</text>
      <text class="cheap" x="${mid(0)}" y="${R2_NOTE}">ask here instead</text>
    </g>
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
