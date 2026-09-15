// Chapter 9 — "Your turn". The close.
//
// THE ROW COMES BACK, AND IT COMES BACK AS A DIFFERENT OBJECT.
//
// Chapters 1, 2 and 3 all stand on the same five columns (X0 44 / GAP 179 / W 142) and read them
// three ways: cost, fidelity, gates. The close is the only chapter allowed to look back, and the
// strongest thing available to it is that same stage a fourth time. But a fourth reading has to
// SAY something the first three could not, or it is a repeat — and the two obvious candidates are
// already spent. Chapter 3 drew a figure at every gate; chapter 3 drew a price bar under every
// step. Re-drawing either one is a recap in the bad sense.
//
// What the close has that chapters 1-3 did not is that a real run happened in between. So three
// things change, and each one is a claim the openings could not make:
//
//   1. THE SUBJECT INVERTS. In chapter 3 the gates were the objects and the little figures were
//      furniture standing next to them. Here the people are the objects — bigger, in ink and blue,
//      the only things in the frame that move — and the five steps are the faint scaffold they
//      stand on. And they are not decoration: each figure holds a stroke down onto the lane, and
//      the lane only advances out of a stroke. The row is drawn as something PEOPLE HOLD UP. That
//      is what makes beat 3 possible at all.
//   2. THE NAMES ARE THE RUN'S OWN. Chapters 1-3 label column one "Spec", because they are
//      describing the idea before the product exists. The viewer has since watched five chapters
//      of a real run whose first step is called Request (content.mjs, and demo.py's STAGES). The
//      record of a run gets the run's words. Same geometry, same numbers, four of five names
//      identical — it still reads as the same stage, and the one changed word says "this is not
//      the diagram any more, this is what happened".
//   3. THE AUDIT RUNS THE OTHER WAY. Every motion in chapters 1-3 travels left to right, because
//      the ladder only moves one way. Beat 2's reading line travels right to LEFT, back over a
//      spend that was accruing the whole time. The piece taught the forward direction for three
//      chapters; the close can spend that by going backwards, and the backwards pass is exactly
//      what the sentence is about — checking rather than trusting.
//
// BEAT 3 IS THE THESIS AND IT MUST NOT LOOK REASSURING. "None of this makes an agent safer to
// leave alone. It makes being wrong cheap, and it keeps every decision someone's." A composition
// of five green ticks would contradict the sentence it plays under. So beat 3 does the opposite of
// reassure: the people LEAVE, and the moment they do the strokes go, the lane between the steps
// goes, and the spend under the steps goes. For two seconds the stage is a bare ladder with
// nothing on it — that is an agent left alone. Then two people come back, and the record rebuilds
// only as far as they reach: two steps lit, three still empty. That held frame is "being wrong is
// cheap" as a picture rather than a caption — stop early and everything ahead was never spent.
// Then the rest return and the record is whole again.
//
// NO FIGURE ANYWHERE. shots/ship.png does show a dollar amount on the real card, and it is not
// used here: metered spend on this instance is $0.00 and the visible number is a normalised shadow
// price. The bars are all the same length on purpose — they claim COVERAGE (every step said what
// it spent), never amount. Chapter 3 made the same call for the same reason.
//
// THE TWO DESTINATIONS ARE REAL AND THEY ARE HTML, NOT DRAWING. The links below the figure are the
// ones the factory `recap` surface already carried, verbatim, and they are real anchors so the
// close of the piece is still something you can click. They do NOT fade in on beat 4: an
// opacity-0 link is focusable text with no contrast, and the axe run lands exactly on a cue time —
// the beat's boundary is the worst possible moment to be mid-fade. They are simply present.
//
// TIMING, from walkthrough.json — 24973ms, four cues:
//   beat 1 FIVE    0.0s  (7.4s)  "a person decided every one" — five people, five strokes, a lane
//   beat 2 COST    7.4s  (7.7s)  "hides what it spends"       — the spend, read back right to left
//   beat 3 HONEST 15.1s  (7.0s)  "makes being wrong cheap"    — they leave; it stops; two return
//   beat 4 OPEN   22.2s  (2.8s)  "read the whole thing"       — 2.8s. An empty lane, waiting.
//
// Same conventions as chapters 1-5: absolute delays off the narration clock, `both` fill, nothing
// loops, composed at rest.

// The run's own five steps. See note 2 above for why this says Request and chapters 1-3 say Spec.
const STEPS = [
  ['01', 'Request'],
  ['02', 'Wireframe'],
  ['03', 'Preview'],
  ['04', 'Build'],
  ['05', 'Ship'],
];

// Shared with scene-problem.mjs, scene-ladder.mjs and scene-gates.mjs. If these drift, the close
// stops landing on the stage the first three chapters built.
// Phosphor, bold, from the studio set — geometry only, styled from CSS, on its own 256 grid.
// The same person who stands at a gate in chapter 3 and beside a boundary in chapter 8, because it
// is the same person. Here they are the SUBJECT rather than furniture, so they are drawn at 30
// against chapter 3's 24: the hand-drawn pair this replaces was a filled dot over a `q` arc, which
// at this size read as a pin rather than a person.
const ICON = {
  user: '<circle cx="128" cy="96" r="64" /><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />',
};
const icon = (name, x, y, size) =>
  `<g class="ic" transform="translate(${x} ${y}) scale(${(size / 256).toFixed(5)})">${ICON[name]}</g>`;
const FIG = 30;

const X0 = 44, GAP = 179, W = 142;
const cx = (i) => X0 + i * GAP;
const mid = (i) => cx(i) + W / 2;              // 115 · 294 · 473 · 652 · 831

const LANE = 150;                              // the record's lane
const HEAD = 86;                               // where the people stand
const NUM_Y = 176, NAME_Y = 191;
const BAR_Y = 218, BAR_H = 7, BAR_W = 48;
const NEXT_LANE = 288, WAIT_Y = 262;           // the lane that has not been run yet
const H = 318;

/** One person, and the stroke they hold onto the lane.
 *
 *  The glyph is chapter 3's gate figure at about 1.35x — recognisably the same person, no longer
 *  furniture. The stroke is the decision: it reaches from the figure down to the step's node, and
 *  the lane's forward segment starts from that node. Nothing on the lane exists that a stroke is
 *  not holding, which is the mechanism beat 3 takes apart.
 */
const hands = STEPS.map((_, i) => `
  <g class="hand-life h${i}">
    <g class="hand">
      <g class="fig">${icon('user', mid(i) - FIG / 2, HEAD - FIG * 96 / 256, FIG)}</g>
      <path class="contact" pathLength="1" d="M${mid(i)} ${HEAD + 20} L${mid(i)} ${LANE - 8}" />
    </g>
  </g>`).join('');

// The lane advances out of a node, never into one unheld. Four segments, five nodes.
const segments = [0, 1, 2, 3].map((i) => `
  <g class="seg-life s${i}">
    <path class="seg" pathLength="1" d="M${mid(i) + 10} ${LANE} L${mid(i + 1) - 10} ${LANE}" />
  </g>`).join('');

const columns = STEPS.map(([n, name], i) => `
  <g class="col">
    <rect class="node" x="${mid(i) - 4.5}" y="${LANE - 4.5}" width="9" height="9" />
    <text class="cnum"  x="${mid(i)}" y="${NUM_Y}">${n}</text>
    <text class="cname" x="${mid(i)}" y="${NAME_Y}">${name}</text>
    <rect class="slot" x="${mid(i) - BAR_W / 2}" y="${BAR_Y}" width="${BAR_W}" height="${BAR_H}" rx="1" />
    <g class="fill-life f${i}">
      <rect class="fill" x="${mid(i) - BAR_W / 2}" y="${BAR_Y}" width="${BAR_W}" height="${BAR_H}" rx="1" />
    </g>
  </g>`).join('');

// The lane nobody has run yet: the same five stops, empty, with a waiting slot over step one.
const next = `
  <g class="next">
    <line class="next-lane" x1="44" y1="${NEXT_LANE}" x2="916" y2="${NEXT_LANE}" />
    ${STEPS.map((_, i) => `<rect class="next-node" x="${mid(i) - 4.5}" y="${NEXT_LANE - 4.5}" width="9" height="9" />`).join('')}
    <circle class="wait" cx="${mid(0)}" cy="${WAIT_Y}" r="9" pathLength="1" />
    <path class="wait-contact" pathLength="1" d="M${mid(0)} ${WAIT_Y + 13} L${mid(0)} ${NEXT_LANE - 8}" />
    <text class="ax next-ax" x="916" y="${WAIT_Y - 12}">NOT RUN YET</text>
  </g>`;

export const yourTurnScene = {
  html: `
<div class="review-scene story-scene yt-wrap" data-phase="0">
<figure class="yt" role="img" aria-label="A record of the run just watched: five steps in a row — Request, Wireframe, Preview, Build, Ship — with a figure standing over each one, holding a stroke down onto the lane that joins them, and a short bar under each step showing it reported what it spent. A reading line then travels back across those bars from right to left. The figures lift away and the lane and the bars go with them, leaving the bare steps; two figures return and the record rebuilds only as far as they reach, then the rest return and it is whole. Finally a second, empty lane appears below it with a waiting slot over its first step.">
  <!-- The box grows upward for the furniture, as every polished chapter does. -->
  <svg class="yt-svg" viewBox="0 -34 960 ${H + 34}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§9 · FROM INTENT TO EVIDENCE</text>
      <text class="slab slab-r" x="916" y="-20">YOUR TURN</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
    </g>
    <text class="ax" x="44" y="34">THE RECORD OF THIS RUN</text>
    <line class="lane" x1="44" y1="${LANE}" x2="916" y2="${LANE}" />

    ${columns}
    ${segments}
    ${hands}

    <!-- beat 2: the spend was accruing the whole way, and it is read back the other way. No
         figure, ever — the bars are all one length and claim coverage, not amount.
         NO LABEL ON THE TRACK. It carried "WHAT EACH STEP SPENT" for one pass; at x=44 the words
         ran under "Request" and touched the first bar, so the row's own axis label read as that
         column's caption. Nowhere else on this stage is clear of a column. It is also the line the
         narration is speaking at exactly this beat — "the cost is on the page the whole way" —
         which makes it the duplicated-speech fault this redesign exists to remove. Chapter 3 left
         its price bars unlabelled for the same reason. The reading line names them by reading them. -->
    <g class="reader">
      <line x1="916" y1="${BAR_Y - 17}" x2="916" y2="${BAR_Y + BAR_H + 17}" />
      <path d="M916 ${BAR_Y - 21} l-8.5 5 l8.5 5 z" />
    </g>

    ${next}
  </svg>
</figure>
<div class="yt-close">
  <!-- The mark keeps the .recap-mark class the factory surface used: it is the only asset on
       this page that lives outside walkthrough/, full.spec.mjs pins that exact selector to prove
       the relative path still resolves, and vendor.mjs rewrites the path for the deploy mirror. -->
  <div class="recap-mark"><img src="vendor/brand/png/mark-full.png" alt="Fidelity Ladder System mark" width="52" height="52"></div>
  <div class="explore-links yt-links">
    <a href="https://harness.n8plusus.com/build/" target="_blank" rel="noopener">Run one yourself <span aria-hidden="true">&nearr;</span></a>
    <a href="https://github.com/nhunsaker/fidelity-ladder-system" target="_blank" rel="noopener">Read the source <span aria-hidden="true">&nearr;</span></a>
  </div>
  <span class="yt-foot">FIDELITY LADDER SYSTEM &middot; CHAPTER 9 OF 9</span>
</div>
</div>`,

  /** All the motion is declarative CSS on absolute delays — the player scrubs it off the narration
   *  clock — so this only declares which beat is showing, the contract full.spec.mjs enforces. */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};
