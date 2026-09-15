// Chapter 5 — "Three rough shapes". The second chapter of the demo half.
//
// WHY THIS ONE IS DRAWN AND CHAPTER 4 WAS PHOTOGRAPHED.
// The narration's claim is exact: the three candidates "differ in shape rather than in wording —
// three different answers, not three ways of saying one." The real capture of this step
// (shots/wireframe.png) shows three cards of PROSE. Put it on screen and the picture says the
// opposite of the sentence: three paragraphs, differing in wording. The screenshot actively
// undercuts the only thing the chapter is for.
//
// So the shapes are drawn — and drawn FROM the run, not invented. Every word of the three titles
// below is verbatim from that capture, and each seat is the geometry its own description specifies:
//
//   SHAPE 1  "Stacked pod: bb on a third line"
//            "The hero seat stays one centred column and the bb becomes a third line in the flow
//             directly under the chip count, inside a fixed-height pod..."
//   SHAPE 2  "Two columns: numbers stack on the right"
//            "The seat splits into an identity column and a right-aligned numeric column, letting
//             the bb sit under the chip count while the seat stays two rows tall rather than three."
//   SHAPE 3  "A pill pinned to the seat's lower edge"
//            "The bb leaves the text stack entirely and becomes an anchored pill on the seat's
//             bottom edge, so the name and chip count never reflow..."
//
// The run picked SHAPE 1, and shots/preview.png proves it rather than asserting it: the seat there
// reads "You / 2,500 / 25.0bb" — a third line, under the chip count, inside the seat. Chapter 6
// shows that screen. So the badge on card one here is a fact, and the next chapter is its receipt.
//
// THE SHARED FRAME IS THE ARGUMENT. All three seats carry the same name bar and the same chip
// count, because all three candidates do. What differs is where the big-blind figure goes — that is
// the whole question the step was asked. So beat 1 lays down what they SHARE and beat 2 lands the
// one element that differs, three times, in three places. The viewer does not have to be told they
// differ in shape; they watch the same object land somewhere different in each.
//
// POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 — the same pass as chapters 1-4, option 1c. Paper
// ground, --muted / --line / --paper-2 / --gate-text in place of six hand-picked hexes, and the
// admin surface's furniture around a drawing that stays bare.
//
// THE DISPLAY VOICE WAS NEVER ARRIVING. The three shape titles asked for `var(--sans, inherit)`,
// and --sans is defined nowhere in this project — pilot.css calls it --display. So the fallback won
// every time, `inherit` resolved to the var(--mono) set on .wf-svg, and the titles that ARE this
// chapter's argument have been rendering in the annotation voice since they shipped. Exactly the
// failure `var(--red, #e63329)` had with no --red defined: a fallback quietly doing all the work
// while the declaration looks correct.
//
// THE AXIS LABEL STAYS, unlike chapters 1 and 3 where it was retired into the furniture. Theirs
// repeated the chapter title; "THE SAME SEAT, THREE SHAPES" is the scene's thesis and says
// something the title does not. The key stays for the same reason — it names the one element the
// viewer has to track, which is the only thing on screen they could not work out for themselves.
//
// THE BADGE KEEPS ITS TEXT TICK. Chapter 3's verdicts became Phosphor icons because they are the
// walkthrough's own diagram vocabulary. This is a REPRODUCTION of the product's badge — its black
// strip, its wording, its glyph — and a walkthrough that redraws the thing it is showing you is
// showing you something else. No bands and no ruled ground either: three cards, not a chart.
//
// TIMING, from walkthrough.json — 19.461s, four cues:
//   beat 1 THREE     0.0s  (6.1s)  "three rough shapes"          — three frames, the shared seat
//   beat 2 DISTINCT  6.1s  (6.6s)  "differ in shape"             — the bb lands, three ways
//   beat 3 PICK     12.8s  (5.2s)  "pick the one you want built" — one is taken
//   beat 4 KEPT     17.9s  (1.5s)  "what was not taken"          — 1.5s. The other two come back up.
//
// Same conventions as chapters 1-3: absolute delays off the narration clock, `both` fill, composed
// at rest, nothing loops.

// Titles verbatim from the capture, split into two lines because SVG text does not wrap.
const SHAPES = [
  ['01', ['Stacked pod:', 'bb on a third line']],
  ['02', ['Two columns: numbers', 'stack on the right']],
  ['03', ['A pill pinned to the', "seat's lower edge"]],
];

// Three cards on the same 44..916 margins the concept chapters stand on, so the demo half sits on
// the same grid as the half that set it up.
const X0 = 44, W = 268, GAP = 302;
const CT = 96, CH = 204;                 // card top and height
const cx = (i) => X0 + i * GAP;

/** One candidate's seat, drawn to its own description.
 *
 *  `shared` is the part every candidate has — the plate, the name, the chip count. `bb` is the one
 *  element that moves, and it is the same object in all three: same fill, same height, near enough
 *  the same width, so the eye tracks it across the row. Anything else differing here would muddy
 *  the claim.
 *
 *  The drawings fill most of their frame on purpose. The first pass left each seat floating in a
 *  card twice its size, and three small marks in three large boxes reads as three empty boxes.
 */
function seat(i) {
  const x = cx(i), c = x + W / 2;        // c is the card's centre line
  if (i === 0) {
    // One centred column, three rows: name, chip count, and the bb beneath it inside a fixed pod.
    return {
      shared: `
        <rect class="plate" x="${c - 84}" y="128" width="168" height="150" rx="5" />
        <rect class="nm"    x="${c - 28}" y="150" width="56" height="7" rx="3.5" />
        <rect class="chips" x="${c - 50}" y="172" width="100" height="18" rx="3" />`,
      bb: `
        <rect class="pod" x="${c - 64}" y="166" width="128" height="88" rx="4" />
        <rect class="bb"  x="${c - 31}" y="212" width="62" height="11" rx="5.5" />`,
    };
  }
  if (i === 1) {
    // Two columns and only two rows: identity on the left, numbers right-aligned on the right.
    return {
      shared: `
        <rect class="plate" x="${c - 106}" y="148" width="212" height="110" rx="5" />
        <rect class="nm"    x="${c - 90}"  y="180" width="52" height="7" rx="3.5" />
        <rect class="chips" x="${c + 14}"  y="168" width="92" height="18" rx="3" />`,
      bb: `
        <line class="split" x1="${c - 16}" y1="154" x2="${c - 16}" y2="252" />
        <rect class="bb"    x="${c + 50}"  y="204" width="56" height="11" rx="5.5" />`,
    };
  }
  // The bb leaves the text stack entirely: an anchored pill on the seat's bottom edge.
  return {
    shared: `
      <rect class="plate" x="${c - 84}" y="136" width="168" height="120" rx="5" />
      <rect class="nm"    x="${c - 28}" y="160" width="56" height="7" rx="3.5" />
      <rect class="chips" x="${c - 50}" y="182" width="100" height="18" rx="3" />`,
    bb: `
      <rect class="bb pill" x="${c - 36}" y="246" width="72" height="20" rx="10" />`,
  };
}

const cards = SHAPES.map(([n, [l1, l2]], i) => {
  const { shared, bb } = seat(i);
  return `
  <g class="card k${i}">
    <text class="snum" x="${cx(i)}" y="52">SHAPE ${n}</text>
    <text class="stitle" x="${cx(i)}" y="70">${l1}</text>
    <text class="stitle" x="${cx(i)}" y="84">${l2}</text>
    <rect class="sheet" x="${cx(i)}" y="${CT}" width="${W}" height="${CH}" rx="3" />
    <g class="shared">${shared}</g>
    <g class="lands">${bb}</g>
  </g>`;
}).join('');

// The badge is the product's own, word for word and styling for styling: a dark strip across the
// top of the chosen card. Written here rather than paraphrased, because "BUILDING THIS ONE" is what
// the run actually says and a walkthrough that rewords its own product is telling you about a
// different one.
const badge = `
  <g class="badge">
    <rect class="badge-bar" x="${cx(0)}" y="${CT}" width="${W}" height="24" />
    <text class="badge-txt" x="${cx(0) + 14}" y="${CT + 16}">✓ BUILDING THIS ONE</text>
  </g>`;

export const wireframeScene = {
  html: `
<div class="review-scene story-scene wf-wrap" data-phase="0">
<figure class="wf" role="img" aria-label="Three candidate drawings side by side on paper, labelled Shape 01 stacked pod with bb on a third line, Shape 02 two columns with numbers stacked on the right, and Shape 03 a pill pinned to the seat's lower edge. Each holds the same seat with a name and a chip count; the big-blind figure lands in a different place in each one. A dark badge reading building this one appears on the first, and the other two stay on the page.">
  <!-- The box grows upward, as chapters 2 and 3 do: every constant in this file is absolute, so
       starting at -34 buys the furniture its band without moving the drawing a pixel. -->
  <svg class="wf-svg" viewBox="0 -34 960 ${CT + CH + 48}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§5 · STEP TWO / THREE ROUGH SHAPES</text>
      <text class="slab slab-r" x="916" y="-20">WIREFRAME</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
    </g>

    <text class="ax" x="44" y="30">THE SAME SEAT, THREE SHAPES</text>
    <!-- A key, not a second headline. The first pass ran a second axis label here that said the
         same thing as the first in more words. What the viewer actually cannot know is what the
         blue thing IS — so this names it, and arrives with it in beat 2 rather than labelling
         something not yet on screen. -->
    <g class="key">
      <rect class="bb" x="770" y="23" width="16" height="8" rx="4" />
      <text class="ax" x="794" y="30">THE NEW FIGURE</text>
    </g>
    ${cards}
    ${badge}
  </svg>
</figure>
<figcaption class="wf-cap"><span class="wf-tag">DRAWN FROM THE THREE REAL CANDIDATES</span><span class="wf-foot">FIDELITY LADDER SYSTEM · CHAPTER 5 OF 9</span></figcaption>
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
