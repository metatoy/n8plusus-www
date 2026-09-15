// Chapter 7 — "Build". The fourth chapter of the demo half.
//
// THE ARGUMENT IS A GEOMETRY, NOT A CAPTION.
// The paragraph makes one sharp claim and then hands back an object. The sharp claim is beat 2:
// the agent says its tests passed, and the system does not accept that — it runs them again on its
// own side, and THAT result is the one that counts. Two results are in play and only the second is
// evidence. So the picture puts a line across the stage:
//
//   · the agent's verdict travels the upper lane and is STOPPED at the line. It never reaches the
//     slot it was headed for. It is not marked wrong — it is dashed, and it goes quiet. The tests
//     really did pass; a claim simply is not evidence, and painting it red would say the agent
//     lied, which is a different and untrue chapter.
//   · the CODE crosses, on the lower lane, under the line. It is re-run here, and the solid mark
//     that comes out of that run is the one that lands in the slot.
//
// Nothing has to say "claimed" versus "verified" for that to read: one thing is refused passage
// and the other is not. The two small keys (CLAIMED · RE-RUN HERE) name the lanes; "re-run here"
// is the product's own label, printed under ITS OWN TESTS on the real card.
//
// EVERY NUMBER AND NAME HERE IS OFF THE RUN.
//   shots/build.png   FILES CHANGED 4 · LINES 88 · ITS OWN TESTS ✓ pass "re-run here"
//                     "none committed — work is on exp-35"
//   shots/ship.png    "4 files / 88 lines, tests pass" · "merged into main ... (branch exp-35)"
//   flags.json        "hero-stack-depth": { "stage": false, "prod": false }   ← this change's flag
//   Table.tsx:830     isEnabled('hero-stack-depth') ? stackDepth(hero.stack, hand.bigBlind) : null
//   github_surface.py  f"{url}?flags-{flag}=true"  — the stage link is RECORDED with the flag set,
//                     because "a bare stage link shows the app looking exactly as before and the
//                     visitor concludes nothing happened. That confusion has already happened."
// The four file rows are drawn unlabelled: the capture names three of the four paths and cuts off
// before the fourth, so four marks is the honest drawing and four names would be three plus a lie.
//
// BEAT 3 IS A SUBSTITUTION, NOT A REVEAL. "What comes back is not a receipt." So the receipt is
// drawn — the real 4 / 88 — and then it stays on the page at a third of the weight while the thing
// that actually comes back opens beside it, six times its size. You can see what was traded.
//
// BEAT 4 IS CAUSE AND EFFECT IN ONE MOVE. The link opens in beat 3 showing the app unchanged,
// because that is what a bare link shows. Then the query parameter arrives attached to the link
// (it slides in, nobody types it) and the third line lands in the seat as it does. The seat is the
// one chapter 5 drew and chapter 6 photographed — same shape, now real code on a stage copy.
// No switch is drawn: chapter 8 owns switch imagery, and a URL is not a toggle.
//
// POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 — the same pass as chapters 1-6, option 1c. Paper
// ground, the admin furniture, and twenty-six hand-picked hexes replaced by tokens.
//
// THIS CHAPTER HAD THE MOST INVENTED COLOUR IN THE PIECE — six near-papers (#faf8f2, #fdfcf8,
// #f1eee5, #ece8de) and two quieting tones (#cbc4b4, #a9a294) that exist nowhere in the system.
// They collapse onto the two grounds DS-A actually has: --paper-2 for the sheets, the detached
// copy, the claim chip and the url bar, --line for the mock page's content bars and for both
// "goes quiet" end states.
//
// THE GREY / BLUE DISTINCTION SURVIVES INTACT, because it is the chapter's argument: blue is what
// this side produced — the code, the re-run, the verdict that counts, the line in the app — and
// grey is the agent's own run and the word out of it. Both greys were tokenised to --muted
// together, so the identical bar is still grey inside the copy and blue past the line. Nothing
// about which party produced what changed; only the paint did.
//
// THE STOP STAYS INK, NEVER RED. The agent's tests really did pass; red would say it lied.
//
// NO BANDS AND NO RULED GROUND: this is a two-lane mechanism, not a chart with labelled rows.
//
// TIMING, from walkthrough.json — 28134ms, five cues:
//   beat 1 ISOLATED  0.0s  (7.2s)  "an isolated copy"     — a copy detaches; four files get written
//   beat 2 EVIDENCE  7.2s  (8.8s)  "take the agent's word" — the claim is stopped; the code is re-run
//   beat 3 OPENABLE 15.9s  (5.8s)  "not a receipt"        — the receipt shrinks; the link opens
//   beat 4 SWITCH   21.7s  (5.2s)  "already flipped on"   — the parameter arrives; the change appears
//   beat 5 WAIT     26.9s  (1.2s)  "nothing needs you"    — 1.2s. One move: the machinery goes quiet.
//
// Same conventions as chapters 1-5: absolute delays off the narration clock, `both` fill, composed
// at rest, nothing loops.

// ── the project, and the copy that detaches from it ───────────────────────────────────────────
const PX = 44, PY = 54, PW = 112, PH = 100;         // the project
const CX = 188, CY = 72;                            // the copy, offset right and down — "away"
const FILES = 4;                                    // FILES CHANGED 4, from the card

// ── the two lanes, the line across them, and the slot a result lands in ───────────────────────
const LANE = 116;                                   // the claim's lane, and the slot's centre
const STOP = 560;                                   // where a claim gets no further
const BAR_X = 596, BAR_W = 150, BAR_Y = 188;        // the re-run, on this side of the line
const SLOT_X = 820, SLOT_Y = 94, SLOT = 44;

// ── the deliverable ───────────────────────────────────────────────────────────────────────────
const PL_X = 228, PL_Y = 228, PL_W = 688, PL_H = 116;
const URL_X = 252;                                  // host starts here; the parameter follows it
const PARAM_X = 417;                                // 25 mono chars at 11px ≈ 165u after the host

const rows = Array.from({ length: FILES }, (_, i) => {
  const y = 94 + i * 18;
  return `
    <rect class="bd-file f${i}" x="200" y="${y - 6}" width="7" height="7" rx="1" />
    <path class="bd-wrote w${i}" pathLength="1" d="M214 ${y - 2} H 284" />`;
}).join('');

export const buildScene = {
  html: `
<div class="review-scene story-scene bd-wrap" data-phase="0">
<figure class="bd" role="img" aria-label="At the left, the project, and a copy of it labelled exp-35 that detaches and moves away; four files are written inside the copy and its own tests run. The copy's verdict then travels along an upper lane towards an empty slot and is stopped by a line part way, where it goes grey. The code itself carries on along a lower lane, under that line, into a bar that runs the tests again on this side; the mark that comes out of that run rises into the slot. Below, a small card reading four files and eighty-eight lines fades back as a wide browser plate opens beside it, showing a stage address. A query parameter that switches the feature on then arrives on the end of that address, and the new line appears inside the seat in the app. Finally the whole upper half goes quiet and the plate is left lit.">
  <!-- The box grows upward for the furniture, as every polished chapter does, so no constant in
       this file moves. This chapter has no HTML caption, so its footer slab lives in here too. -->
  <svg class="bd-svg" viewBox="0 -34 960 424" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§7 · STEP FOUR / REAL CODE, RUNNING</text>
      <text class="slab slab-r" x="916" y="-20">BUILD</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
      <text class="slab" x="44" y="374">FIDELITY LADDER SYSTEM · CHAPTER 7 OF 9</text>
    </g>

    <g class="bd-top">
      <text class="ax" x="44" y="24">THE PROJECT, AND A COPY OF IT</text>

      <!-- the project. Untouched for the whole chapter: nothing here ever moves again. -->
      <g class="bd-proj">
        <text class="tag" x="${PX}" y="47">main</text>
        <rect class="sheet" x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="3" />
        <g class="bd-code">
          <line x1="58" y1="76" x2="142" y2="76" /><line x1="58" y1="92" x2="128" y2="92" />
          <line x1="58" y1="108" x2="142" y2="108" /><line x1="58" y1="124" x2="118" y2="124" />
          <line x1="58" y1="140" x2="136" y2="140" />
        </g>
      </g>

      <!-- the copy. Dashed, because it is not the project — it is a workspace that will be thrown
           away. exp-35 is the branch the run actually used. -->
      <g class="bd-copy">
        <text class="tag" x="${CX}" y="65">exp-35</text>
        <rect class="sheet dash" x="${CX}" y="${CY}" width="${PW}" height="${PH}" rx="3" />
        ${rows}
        <rect class="bd-own-track" x="200" y="157" width="84" height="5" rx="2.5" />
        <rect class="bd-own-fill" x="200" y="157" width="84" height="5" rx="2.5" />
      </g>

      <!-- where the claim was headed. Drawn from the start and never filled in above the line. -->
      <line class="bd-lane" x1="306" y1="${LANE}" x2="${SLOT_X}" y2="${LANE}" />
      <text class="key bd-key-claim" x="306" y="98">CLAIMED</text>

      <g class="bd-claim">
        <g class="bd-claim-in">
          <rect class="bd-claim-box" x="0" y="0" width="34" height="20" rx="3" />
          <text class="bd-claim-tick" x="17" y="14.5">✓</text>
        </g>
      </g>

      <!-- no further. Ink, not red: the tests DID pass. What is refused is the word, not the run. -->
      <line class="bd-stop" x1="${STOP}" y1="84" x2="${STOP}" y2="148" />

      <!-- the code crosses, underneath -->
      <path class="bd-cross" pathLength="1" d="M300 150 C 380 150, 430 ${BAR_Y + 8}, 520 ${BAR_Y + 8} L ${BAR_X - 8} ${BAR_Y + 8}" />
      <text class="key bd-key-run" x="${BAR_X}" y="178">RE-RUN HERE</text>
      <rect class="bd-bar-track" x="${BAR_X}" y="${BAR_Y}" width="${BAR_W}" height="8" rx="4" />
      <rect class="bd-bar-fill" x="${BAR_X}" y="${BAR_Y}" width="${BAR_W}" height="8" rx="4" />
      <path class="bd-rise" pathLength="1" d="M${BAR_X + BAR_W} ${BAR_Y + 4} C ${BAR_X + BAR_W + 56} ${BAR_Y + 4}, ${SLOT_X + 22} ${BAR_Y - 12}, ${SLOT_X + 22} ${SLOT_Y + SLOT + 4}" />

      <rect class="bd-slot" x="${SLOT_X}" y="${SLOT_Y}" width="${SLOT}" height="${SLOT}" rx="3" />
      <g class="bd-verdict">
        <rect x="0" y="0" width="28" height="28" rx="3" />
        <text x="14" y="19.5">✓</text>
      </g>

    </g>

    <!-- Beat 3 draws this and then puts it down. The figures are the card's own. It sits OUTSIDE
         .bd-top on purpose: beat 5 quietens the machinery, and if the receipt went with it the
         comparison the chapter just made — this, versus the thing beside it — would be gone from
         the frame it rests on. -->
    <g class="bd-receipt">
      <g class="bd-receipt-in">
        <rect class="sheet" x="44" y="236" width="152" height="70" rx="3" />
        <text class="bd-fig" x="58" y="266">4 files</text>
        <text class="bd-fig" x="58" y="292">88 lines</text>
      </g>
    </g>

    <!-- what actually comes back -->
    <g class="bd-plate">
      <rect class="bd-plate-box" x="${PL_X}" y="${PL_Y}" width="${PL_W}" height="${PL_H}" rx="4" />
      <rect class="bd-urlbar" x="240" y="240" width="664" height="26" rx="3" />
      <text class="bd-host" x="${URL_X}" y="257">pocket-stage.n8plusus.com</text>
      <text class="bd-param" x="${PARAM_X}" y="257">?flags-hero-stack-depth=true</text>
      <rect class="bd-param-rule" x="${PARAM_X}" y="262" width="186" height="2" />

      <g class="bd-app">
        <rect class="bd-furn" x="446" y="284" width="418" height="7" rx="3.5" />
        <rect class="bd-furn" x="446" y="300" width="330" height="7" rx="3.5" />
        <rect class="bd-furn" x="446" y="316" width="386" height="7" rx="3.5" />
        <rect class="bd-seat" x="252" y="280" width="168" height="54" rx="4" />
        <rect class="bd-nm" x="280" y="290" width="56" height="6" rx="3" />
        <rect class="bd-chips" x="266" y="302" width="100" height="12" rx="2" />
      </g>

      <!-- the parameter, and the line it puts in the seat. Drawn as one gesture. -->
      <path class="bd-arc" pathLength="1" d="M430 270 C 418 300, 386 306, 358 320" />
      <rect class="bd-bb" x="288" y="320" width="62" height="9" rx="4.5" />
    </g>
  </svg>
</figure>
</div>`,

  /** Declarative CSS on absolute delays — the player scrubs it off the narration clock — so this
   *  only declares which beat is showing, the contract full.spec.mjs enforces. */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};
