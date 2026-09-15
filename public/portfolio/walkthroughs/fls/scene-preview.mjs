// Chapter 6 — "Preview". The third chapter of the demo half, and the receipt for chapter 5.
//
// WHY THIS ONE IS PHOTOGRAPHED AND CHAPTER 5 WAS DRAWN.
// Chapter 5 drew its three candidates because the real capture of that step is three cards of
// PROSE, and its sentence is "they differ in shape, not in wording" — the photograph said the
// opposite of the narration. Here the sentence is "a clickable version", and the inverse applies:
// a DRAWING of a clickable thing proves nothing at all. The only evidence that something exists
// and runs is a picture of it existing and running. So beats 1-3 hand the stage to the capture and
// the drawn layer works around it.
//
// SHOWN AT ITS OWN SIZE, FRAMED TO THE TABLE, NOT ZOOMED.
// shots/preview.png is a 1400x957 1x capture — there is no resolution to spend on a magnification,
// and chapter 4's camera trick is not available to a chapter whose asset is half the pixel density
// of chapter 4's. So the capture is CROPPED rather than scaled: x 408-992, y 390-918 of the source,
// which is the poker table's own panel interior from the pot down through the action row, with the
// page, the header and the three opponent seats left outside the frame. 584 source pixels are laid
// across 460 viewBox units; at the ~1184px stage the player actually renders, that is 567 device
// pixels for 584 source pixels — 0.97x, near enough 1:1 that nothing in the capture is resampled
// upward. Every crop bound below was probed off the image, not eyeballed.
//
// THE CONTINUITY IS THE FIRST BEAT. The viewer has just watched chapter 5 badge SHAPE 01 —
// "Stacked pod: bb on a third line" — as the one being built. So this chapter opens on that exact
// drawing, alone on chapter 5's cream sheet, inside a frame; and then the photograph fades up
// underneath it and the drawing dissolves off, leaving the real seat reading "You / 2,500 / 25.0bb"
// in the place the drawing had marked. The blue bb bar is held back a few hundred milliseconds so
// the last mark to leave is the one sitting on the line that was added. The drawing does not
// describe the thing; it becomes it.
//
// BEATS 2-5 ARE NOT IN THE PIXELS and are not tried for. The question asked, the disposability and
// the shape of the loop are claims ABOUT the artifact, so they are drawn around and over it:
//
//   beat 2  a person is stood in front of it, and the question is theirs (chapter 3's figure —
//           the same actor who opens every gate, reused rather than reinvented).
//   beat 3  the frame's border turns from solid to dashed and the wireframe comes BACK, over the
//           seat, the board and all three buttons. The rhyme with beat 1 is the argument: drawing
//           became photograph, and under the photograph there is still only a drawing. Provisional,
//           in the one convention every drawing uses for provisional.
//   beat 4  the person's note leaves them, joins a loop that drops out of the frame's bottom edge
//           and returns into the SAME frame, and the dashed border starts marching — the step
//           running again.
//   beat 5  1.55 seconds. Two more exits are drawn, one each way, and each one runs into a stop.
//
// WHY BEAT 5 IS NOT CHAPTER 2's ROW. Chapter 2 made the one-way argument as chevrons in the gaps
// between five cells and chapter 3 hung a gate off the end of each of the same five columns. A
// third pass over that row would be the fourth picture of one diagram. Here there is no row: there
// is one object with three ways out of it, and the two that are refused are refused in place —
// no other step is drawn at all, which is itself the point. You cannot skip to somewhere that is
// not on screen.
//
// TIMING, from walkthrough.json — 28.604s, five cues:
//   beat 1 CLICK      0.0s  (8.6s)  "a clickable version"           — drawing -> photograph -> a pointer
//   beat 2 ASK        8.6s  (7.2s)  "is this the right thing"       — a person, a sightline, a question
//   beat 3 THROWAWAY 15.8s  (5.5s)  "before anyone writes real code"— the border and the parts go dashed
//   beat 4 REVISE    21.3s  (5.7s)  "sends the step back"           — the note, the loop, the march
//   beat 5 BOUNDED   27.1s  (1.6s)  "does not skip ahead"           — 1.6s. One move: both exits stop.
//
// Same conventions as chapters 1-3 and 5: absolute delays off the narration clock, `both` fill,
// composed at rest, nothing loops.

// ── the capture, and the geometry that hangs off it ────────────────────────────────────────────
const SRC_W = 1400, SRC_H = 957;
// Probed, not guessed: the table panel runs x 175-1225, y 114-924 in the capture, so this crop is
// entirely panel interior — no page background bleeds in at any edge.
const CROP = { x: 408, y: 390, w: 584, h: 528 };
const FX = 250, FY = 52, FW = 460;            // the frame, centred in the 960 viewBox
const S = FW / CROP.w;                        // 0.7877 viewBox units per source pixel
const FH = CROP.h * S;                        // 415.9
const FB = FY + FH;                           // the frame's bottom edge — the loop leaves from here
const H = 576;                                // viewBox height; leaves a band under the frame

const n = (v) => Number(v.toFixed(2));

// Phosphor `user`, bold, from assets/tattletown/icons/phosphor-icons — geometry only, styled from
// CSS, placed on its own 256 grid. Identical to the helper in scene-gates.mjs: the figure that
// stands at chapter 3's gates and the figure that stands in front of this preview are the same
// person, so they are the same path.
const ICON_USER = '<circle cx="128" cy="96" r="64" /><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />';
const icon = (name, x, y, size) =>
  `<g class="ic" transform="translate(${x} ${y}) scale(${(size / 256).toFixed(5)})">${ICON_USER}</g>`;
const vx = (sx) => n(FX + (sx - CROP.x) * S);
const vy = (sy) => n(FY + (sy - CROP.y) * S);
/** A region of the CAPTURE, in the capture's own pixels, as a rect in viewBox units. */
const box = (x0, y0, x1, y1) => ({ x: vx(x0), y: vy(y0), w: n((x1 - x0) * S), h: n((y1 - y0) * S) });
const rect = (cls, b, rx = 0, pad = 0) =>
  `<rect class="${cls}" x="${n(b.x - pad)}" y="${n(b.y - pad)}" width="${n(b.w + pad * 2)}" height="${n(b.h + pad * 2)}" rx="${rx}" />`;

// Every one of these was measured off shots/preview.png by thresholding, because the whole point of
// the chapter is that the drawn layer lands ON the real thing. A drawn outline three pixels off its
// subject reads as a mistake, and an outline drawn over a guess reads as a lie.
const SEAT   = box(617, 595, 782, 823);       // the hero seat, blue-bordered, "YOUR TURN"
const NAME   = box(688, 613, 711, 623);       // "You"
const CHIPS  = box(665, 663, 734, 684);       // "2,500"
const BB     = box(675, 693, 724, 702);       // "25.0bb" — the line chapter 5's SHAPE 01 asked for
const CARDS  = box(552, 486, 849, 559);       // the board: three faces and two unturned slots
const POT_L  = box(689, 409, 709, 416);       // the word POT
const POT_N  = box(651, 434, 749, 464);       // "1,450"
const TURN   = box(652, 782, 747, 807);       // the "YOUR TURN" pill
// Five card slots on a 61.3px pitch, 52px wide — measured off the column profile of the row, not
// divided out of the row's width, because the two unturned slots sit a hair wider apart.
const SLOT = [551, 612.3, 673.5, 734.8, 796].map((x) => box(x, 486, x + 52, 559));
const FOLD   = box(437, 850, 603, 897);
const CHECK  = box(616, 850, 784, 897);
const CALL   = box(796, 850, 962, 897);       // "Call 300" — the primary, and the one that is pressed

// The pointer rests with its tip a little left of each button's centre, the way a real one does.
const TIP = (b) => ({ x: n(b.x + b.w * 0.35), y: n(b.y + b.h * 0.42) });
const P_FOLD = TIP(FOLD), P_CHECK = TIP(CHECK), P_CALL = TIP(CALL);
// One hover ring, moved between three buttons that happen to be the same width to within 1.5 units.
const RING_DX1 = n(CHECK.x - FOLD.x), RING_DX2 = n(CALL.x - FOLD.x);
const PRESS = { x: n(CALL.x + CALL.w / 2), y: n(CALL.y + CALL.h / 2) };

// ── the person, their question, and their note ────────────────────────────────────────────────
// Chapter 3's gate figure, scaled up: the same circle-and-shoulders, because it is the same actor.
const WHO_X = 146, WHO_Y = 236;
const NOTE_X = 114, NOTE_Y = 286, NOTE_W = 64, NOTE_H = 24;
// Where the note comes to rest, on the return path under the frame.
const NOTE_TO_X = 508, NOTE_TO_Y = 540;
const NOTE_DX = NOTE_TO_X - NOTE_X, NOTE_DY = NOTE_TO_Y - NOTE_Y;

// The loop: out of the frame's bottom edge, down into the band, and back up into the same edge.
// Start and end on ONE edge of ONE box is the whole claim — it cannot be read as arriving anywhere
// else, because there is nowhere else drawn.
const LOOP_OUT = 430, LOOP_BACK = 640;
const LOOP = `M${LOOP_OUT} ${n(FB - 2)} C 424 556, 660 556, ${LOOP_BACK} ${n(FB + 2)}`;

// The two refused exits, level with each other on the frame's flanks.
const REF_Y = 400;

const cursor = `<path d="M0 0 L0 17.5 L4.6 13.2 L7.7 20 L10.8 18.5 L7.8 11.9 L13.4 11.6 Z" />`;

export const previewScene = {
  html: `
<div class="review-scene story-scene pv-wrap" data-phase="0">
<figure class="pv" role="img" aria-label="A wireframe drawing of a poker table screen on a cream sheet inside a frame: a pot, a row of five card slots, one highlighted seat holding a name, a chip count and a blue bar on a third line beneath it, and three action buttons. A screenshot of the real running table fades up underneath the drawing and the drawing dissolves away, leaving the real seat reading You, 2,500, 25.0bb. A pointer moves across the three action buttons and presses Call 300. A small figure rises beside the frame with a sightline to it and a question mark above it. The frame's border turns from a solid line to a dashed one and dashed outlines appear over the card row, the seat and all three buttons. A note leaves the figure and rides a looping arrow that drops out of the bottom of the frame and returns into the same frame, and the dashed border starts moving. Finally two more arrows leave the frame, one to each side, and each one runs into a red stop bar.">
  <!-- The box grows upward for the furniture, as chapters 2, 3 and 5 do, so no constant here moves. -->
  <svg class="pv-svg" viewBox="0 -34 960 ${H + 34}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§6 · STEP THREE / SOMETHING TO CLICK</text>
      <text class="slab slab-r" x="916" y="-20">PREVIEW</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
    </g>
    <defs>
      <clipPath id="pv-frame-clip">
        <rect x="${FX}" y="${FY}" width="${FW}" height="${n(FH)}" rx="3" />
      </clipPath>
    </defs>

    <!-- Not a second headline. Chapter 5's axis read "THE SAME SEAT, THREE SHAPES"; this one closes
         that sentence and says nothing the narration says. -->
    <text class="ax" x="44" y="30">THE SAME SEAT, NOW RUNNING</text>

    <g clip-path="url(#pv-frame-clip)">
      <!-- Chapter 5's card stock, so beat 1 opens on the surface chapter 5 ended on. -->
      <rect class="pv-sheet" x="${FX}" y="${FY}" width="${FW}" height="${n(FH)}" />
      <image class="pv-shot" href="shots/preview.png"
             x="${n(FX - CROP.x * S)}" y="${n(FY - CROP.y * S)}"
             width="${n(SRC_W * S)}" height="${n(SRC_H * S)}" />

      <!-- beat 1 · the drawing. The FIRST pass drew only the seat, and a 130x180 drawing marooned in
           a 460x416 sheet read as an empty sheet — the same fault chapter 5's own note warns about.
           So the whole screen is drawn: the pot, the five board slots, the seat as chapter 5's
           SHAPE 01 (plate, name, chip count, fixed-height pod, bb on a third line), the turn pill
           and the three actions. Every rectangle stands exactly where the real element stands, so
           the dissolve in the second half of the beat is a registration, not a cut. The bb is the
           only blue mark in a grey drawing, which is the key chapter 5 ended on. -->
      <g class="pv-seed">
        ${rect('pv-quiet pv-s-pot', POT_L, 2)}
        ${rect('pv-chips pv-s-pot', POT_N, 3)}
        ${SLOT.map((s, i) => rect(`pv-plate pv-s-cards`, s, 4)).join('')}
        ${rect('pv-plate pv-s-plate', SEAT, 4)}
        ${rect('pv-quiet pv-s-nm', NAME, 3)}
        ${rect('pv-chips pv-s-chips', CHIPS, 2)}
        <rect class="pv-pod pv-s-pod" x="${n(CHIPS.x - 8)}" y="${n(CHIPS.y - 7)}"
              width="${n(CHIPS.w + 16)}" height="${n(BB.y + BB.h + 7 - CHIPS.y + 7)}" rx="3" />
        ${rect('pv-bb pv-s-bb', BB, 3.5)}
        ${rect('pv-quiet pv-s-turn', TURN, 10)}
        ${rect('pv-plate pv-s-btn', FOLD, 4)}
        ${rect('pv-plate pv-s-btn', CHECK, 4)}
        ${rect('pv-plate pv-s-btn', CALL, 4)}
      </g>

      <!-- beat 3 · the same parts, dashed, over the photograph. -->
      <g class="pv-ghost">
        ${rect('pv-gseat', SEAT, 4, 5)}
        ${rect('pv-gcards', CARDS, 3, 5)}
        ${rect('pv-gb0', FOLD, 4, 6)}
        ${rect('pv-gb1', CHECK, 4, 6)}
        ${rect('pv-gb2', CALL, 4, 6)}
      </g>

      <!-- beat 1 · something you can actually press. -->
      <rect class="pv-hover" x="${FOLD.x}" y="${FOLD.y}" width="${FOLD.w}" height="${FOLD.h}" rx="4" />
      <circle class="pv-press" cx="${PRESS.x}" cy="${PRESS.y}" r="46" />
      <g class="pv-cursor">${cursor}</g>
    </g>

    <!-- Two borders, one rect: the solid one draws itself on in beat 1 and hands over to the
         dashed one in beat 3. The change of line IS the claim that it is a throwaway. -->
    <rect class="pv-edge" x="${FX}" y="${FY}" width="${FW}" height="${n(FH)}" rx="3" pathLength="1" />
    <rect class="pv-edge-dash" x="${FX}" y="${FY}" width="${FW}" height="${n(FH)}" rx="3" />

    <!-- beat 2 · the person the question belongs to. -->
    <!-- Beat 2 · a person, and the question is theirs. Phosphor's user icon from the studio set, the
         same icon chapter 3 stands at every gate — one actor, drawn one way, across the piece.
         It replaces a hand-drawn head-and-bust: chapter 3 learned that a circle over a curve reads
         as a shape rather than a person, and that enlarging a bad glyph does not make it a good
         one. -->
        <g class="pv-who">${icon('user', WHO_X - 15, WHO_Y - 9, 30)}</g>
    <text class="pv-ask" x="${WHO_X}" y="206">?</text>
    <path class="pv-sight" pathLength="1" d="M${WHO_X + 20} 248 L 241 254" />
    <path class="pv-sight-head" d="M247 254 l-8 -4 l0 8 Z" />

    <!-- beat 4 · your words, and the way back into this same step. -->
    <g class="pv-note">
      <rect x="${NOTE_X}" y="${NOTE_Y}" width="${NOTE_W}" height="${NOTE_H}" rx="2" />
      <rect class="pv-note-line" x="${NOTE_X + 8}" y="${NOTE_Y + 7}" width="${NOTE_W - 16}" height="3" rx="1.5" />
      <rect class="pv-note-line" x="${NOTE_X + 8}" y="${NOTE_Y + 14}" width="${NOTE_W - 28}" height="3" rx="1.5" />
    </g>
    <path class="pv-loop" pathLength="1" d="${LOOP}" />
    <path class="pv-loop-head" d="M${LOOP_BACK} ${n(FB - 5)} l-5 9 l10 0 Z" />

    <!-- beat 5 · the two it will not do. No other step is drawn, which is the point. -->
    <g class="pv-refuse">
      <path class="pv-ref-arm" pathLength="1" d="M244 ${REF_Y} L 170 ${REF_Y}" />
      <path class="pv-ref-head" d="M164 ${REF_Y} l9 -5 l0 10 Z" />
      <line class="pv-stop" x1="156" y1="${REF_Y - 12}" x2="156" y2="${REF_Y + 12}" />
      <path class="pv-ref-arm" pathLength="1" d="M${n(FX + FW + 6)} ${REF_Y} L 790 ${REF_Y}" />
      <path class="pv-ref-head" d="M796 ${REF_Y} l-9 -5 l0 10 Z" />
      <line class="pv-stop" x1="804" y1="${REF_Y - 12}" x2="804" y2="${REF_Y + 12}" />
    </g>
  </svg>
</figure>
<p class="pv-cap"><span class="pv-tag">CAPTURED FROM A REAL RUN · CROPPED TO THE TABLE, SHOWN AT ITS OWN SIZE</span><span class="pv-foot">FIDELITY LADDER SYSTEM · CHAPTER 6 OF 9</span></p>
</div>`,

  /** Declarative CSS on absolute delays, scrubbed off the narration clock by the player — so this
   *  only has to declare which beat is showing, the contract full.spec.mjs enforces. The camera
   *  work chapter 4 does in JS is not needed here: this chapter never moves its crop. */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};

// Exported for the CSS to be checkable against the same numbers rather than a second copy of them.
export const previewGeometry = { CROP, FX, FY, FW, FH, S, SEAT, BB, FOLD, CALL, RING_DX1, RING_DX2, P_FOLD, P_CHECK, P_CALL, NOTE_DX, NOTE_DY };
