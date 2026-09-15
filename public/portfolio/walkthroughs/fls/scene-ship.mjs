// Chapter 8 — "Ship". The last chapter of the demo half, and the most counter-intuitive one.
//
// THE ORDERING IS THE ARGUMENT. Everyone assumes the approval happens at the merge. It does not:
// the yes given at the BUILD step is what fires the merge, and the gate that follows is a sign-off
// on something that has already happened. Chapter 3 taught the vocabulary for this — an upright
// post with a small figure standing at it — so this chapter can say which gate did the work simply
// by drawing two of them and marking only one. Gate one carries a tick (the yes already given, one
// step back). Gate two carries nothing and points BACKWARD at a merge node that is already filled.
// That pair, and the direction of that little arc, is the whole of beats 1 and 4.
//
// THE OFF-STATE IS THE HERO, AND IT IS DRAWN AS AN OPEN CIRCUIT. Both environments get the same
// thing: the code arrives, the line out of it runs as far as the feature flag, and the flag is an
// open knife-lever — hinged on the near contact, raised, not touching the far one. Nothing continues
// past it. That is a picture a viewer reads in one glance without a word of label, and it is the
// only reason a single approval is safe.
//
// THE FLAG NEVER MOVES. Not once, not by a degree, in any beat. It does not even rotate into
// place — it fades in already open, because a lever that swings into the open position would be
// showing you a feature being turned OFF, and nothing in this chapter turns anything. Beat 5 puts
// the flip where the narration puts it: a dashed boundary closes around everything the walkthrough
// has shown, the system inside it goes quiet, and a person appears OUTSIDE that line with two
// dotted reaches that stop ~18px short of the levers. The gap is the honesty. The held final frame
// is two flags, still open.
//
// WHAT IS REAL HERE. Everything drawn is in shots/ship.png or the words under it: the change was
// "merged into main, with the feature still switched off for everyone (branch exp-35)". So `main`,
// `exp-35`, one merge, two environments, both off. The card also shows $3.84 and "4 files, 88
// lines" — deliberately NOT drawn. Chapter 3 already refused to put a figure on screen, chapter 9
// closes on cost, and a dollar amount here would be a second idea competing with the only one this
// chapter has room for.
//
// TIMING, from walkthrough.json — 25.522s, five cues:
//   beat 1 THE YES  0.0s  (7.7s)  "The yes you just gave"           — branch, gate + tick, merge
//   beat 2 OFF      7.7s  (4.4s)  "feature flag off in both environments" — two environments, two open flags
//   beat 3 MOVES   12.1s  (5.1s)  "does not release the feature"    — code lands; the line dies at the flag
//   beat 4 SIGN    17.2s  (2.9s)  "sign off"                        — the second gate, arriving after the fact
//   beat 5 LATER   20.1s  (5.4s)  "a separate decision"             — the boundary, and a person outside it
//
// House conventions: absolute delays off the narration clock, `both` fill, composed at rest,
// nothing loops, pathLength="1" on every drawn path.

// ── geometry ────────────────────────────────────────────────────────────────────────────────
// Standing on the same 44 … 916 margins as chapters 1-5.
const MAIN_Y = 112;                       // the project's own line
const BR_Y = 150;                         // the branch, below it
const BR_OUT = 150, BR_IN = 362;          // where exp-35 leaves main and rejoins it
const G1 = 262, G2 = 444;                 // gate one (on the branch) and gate two (after the merge)
const TEE = 508, SPINE = 526;             // where the trunk tees off main, and the spine it drops on
const ROW = [211, 279];                   // stage, production
const PL_X = 560, PL_W = 132, PL_H = 38;  // an environment plate
const NEAR = 724, FAR = 768;              // the flag's two contacts
const LEVER_X = 760, LEVER_RISE = 22;     // the raised lever's tip

// Phosphor, bold, from the studio set — geometry only, styled from CSS, placed on its own 256
// grid. Identical to the helper in scene-gates.mjs: the person who stands at a gate in chapter 3
// and the person who stands at one here are the same person, so they are the same path. The tick
// is chapter 3's verdict tick for the same reason.
const ICON = {
  user: '<circle cx="128" cy="96" r="64" /><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />',
  check: '<polyline points="40 144 96 200 224 72" />',
};
const icon = (name, x, y, size) =>
  `<g class="ic" transform="translate(${x} ${y}) scale(${(size / 256).toFixed(5)})">${ICON[name]}</g>`;
const FIG = 22, OUTFIG = 26, TICK = 22;

/** A gate, in chapter 3's vocabulary: an upright, and the person who stands at it.
 *  `below` puts the figure under the post instead of over it — gate one hangs off the branch,
 *  which runs under the main line, so its figure needs the room on the other side. */
const gate = (cls, x, top, height, below) => {
  const hy = below ? top + height + 14 : top - 14;
  return `
  <g class="gate ${cls}">
    <line class="post" x1="${x}" y1="${top}" x2="${x}" y2="${top + height}" />
    <g class="who">${icon('user', x - FIG / 2, hy - 5, FIG)}</g>
  </g>`;
};

/** One environment's plate: the place the merged code lands. Both are drawn identically on
 *  purpose — the claim is "both", so any difference between them is a difference the viewer starts
 *  looking for. */
const plate = (i, name) => {
  const y = ROW[i];
  return `
  <g class="env e${i}">
    <text class="elabel" x="${PL_X}" y="${y - 27}">${name}</text>
    <rect class="plate" x="${PL_X}" y="${y - PL_H / 2}" width="${PL_W}" height="${PL_H}" rx="3" />
    <g class="code">
      <rect x="${PL_X + 14}" y="${y - 10}" width="76" height="5" rx="2.5" />
      <rect x="${PL_X + 14}" y="${y - 2}"  width="104" height="5" rx="2.5" />
      <rect x="${PL_X + 14}" y="${y + 6}"  width="58" height="5" rx="2.5" />
    </g>
  </g>`;
};

/** The feature flag, drawn as an open circuit: a short line out of the plate, a near contact, a lever
 *  hinged on it and raised clear of the far contact, and NOTHING past the far contact. The absence
 *  is the point — it is what "merging moves the code, it does not release the feature" looks like.
 *  These live outside the `.sys` group so beat 5 can quiet the whole system around them and leave
 *  the two open levers holding the final frame. */
const swtch = (i) => {
  const y = ROW[i];
  return `
  <g class="sw s${i}">
    <path class="outlet" pathLength="1" d="M${PL_X + PL_W} ${y} H ${NEAR}" />
    <circle class="live" cx="${NEAR}" cy="${y}" r="7.5" />
    <circle class="contact" cx="${NEAR}" cy="${y}" r="3.6" />
    <circle class="term" cx="${FAR}" cy="${y}" r="3.6" />
    <line class="lever" x1="${NEAR}" y1="${y}" x2="${LEVER_X}" y2="${y - LEVER_RISE}" />
  </g>
  <circle class="pulse q${i}" r="3.4" />`;
};

export const shipScene = {
  html: `
<div class="review-scene story-scene sh-wrap" data-phase="0">
<figure class="sh" role="img" aria-label="A branch named exp-35 leaves the project's main line, passes a gate with a person at it that is marked with a tick, and merges back into main at a filled node. From the merge a trunk carries the change down into two environment plates labelled stage and production. Out of each plate a short line runs to a feature flag drawn as an open lever, hinged on the near contact and raised clear of the far one, with nothing beyond it. The code arrives in both plates and the line lights only as far as the open flag. A second gate then appears after the merge, with a small arc pointing back at it. Finally a dashed boundary closes around the whole system, everything inside it goes quiet, and a person appears outside the boundary with two dotted reaches that stop short of the levers. Both feature flags stay off throughout.">
  <!-- The box grows upward for the furniture, as every polished chapter does. -->
  <svg class="sh-svg" viewBox="0 -34 960 370" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g class="furn">
      <text class="slab" x="44" y="-20">§8 · STEP FIVE / INTO THE PROJECT</text>
      <text class="slab slab-r" x="916" y="-20">SHIP</text>
      <line class="fline" x1="44" y1="-10" x2="916" y2="-10" />
    </g>
    <text class="ax" x="44" y="66">ONE BRANCH, TWO ENVIRONMENTS</text>

    <!-- Beat 5's boundary. Authored first so it sits BEHIND everything it encloses. -->
    <rect class="bound" x="30" y="44" width="760" height="272" rx="4" />

    <!-- Everything inside the boundary except the flags. Beat 5 quiets this group as one
         object, which is what lets the two open levers hold the final frame on their own. -->
    <g class="sys">
      <text class="mlabel" x="44" y="${MAIN_Y + 4}">main</text>
      <!-- main runs the full width of the system and does not stop where this change tees off it:
           the project carries on, and a line that stopped at the trunk would say otherwise. It is
           also the only thing on screen at t=0, so the stage opens composed rather than blank. -->
      <line class="mainline" x1="96" y1="${MAIN_Y}" x2="772" y2="${MAIN_Y}" />

      <path class="branch" pathLength="1"
            d="M${BR_OUT} ${MAIN_Y} C ${BR_OUT} 136, ${BR_OUT + 10} ${BR_Y}, ${BR_OUT + 34} ${BR_Y}
               H ${BR_IN - 34} C ${BR_IN} ${BR_Y}, ${BR_IN} 136, ${BR_IN} ${MAIN_Y}" />
      <text class="blabel" x="${BR_OUT + 34}" y="${BR_Y + 22}">exp-35</text>

      ${gate('g0', G1, 124, 52, true)}
      <!-- The yes that did the work. It is the ONLY tick in the chapter. -->
      <g class="ok">${icon('check', G1 + 8, BR_Y - 4 - TICK / 2, TICK)}</g>

      <g class="tok"><rect x="-4.5" y="-4.5" width="9" height="9" rx="1.5" /></g>
      <circle class="node" cx="${BR_IN}" cy="${MAIN_Y}" r="5.5" />
      <circle class="ring" cx="${BR_IN}" cy="${MAIN_Y}" r="11.5" />

      ${gate('g1', G2, 84, 52, false)}
      <!-- Beat 4's arc runs BACKWARD, from the late gate to a merge that already happened. That
           direction is the entire surprise of the beat; drawn forward it would say the opposite. -->
      <path class="backarc" pathLength="1" d="M${G2 - 11} 139 C ${G2 - 28} 160, 386 152, 368 122" />
      <path class="arrow" d="M368 122 l 8.5 1.5 M368 122 l 1.5 8.5" />

      <path class="trunk" pathLength="1" d="M${TEE} ${MAIN_Y} C 520 ${MAIN_Y}, ${SPINE} 118, ${SPINE} 132 V ${ROW[1]}" />
      <path class="arm a0" pathLength="1" d="M${SPINE} ${ROW[0]} H ${PL_X}" />
      <path class="arm a1" pathLength="1" d="M${SPINE} ${ROW[1]} H ${PL_X}" />

      ${plate(0, 'stage')}
      ${plate(1, 'production')}
    </g>

    <!-- Outside the .sys group, so beat 5's quieting does not touch them. -->
    ${swtch(0)}
    ${swtch(1)}

    <!-- Beat 5. Outside the boundary, which is where the narration puts this decision. The reaches
         stop short of the levers and never arrive — the gap is the claim. -->
    <g class="outwho">${icon('user', 866 - OUTFIG / 2, 246 - 9, OUTFIG)}</g>
    <path class="reach r0" d="M854 238 C 826 214, 800 196, 778 189" />
    <path class="reach r1" d="M854 252 C 828 254, 800 257, 778 257" />
  </svg>
</figure>
<figcaption class="sh-cap"><span class="sh-tag">DRAWN FROM THE RUN'S OWN SHIP CARD</span><span class="sh-foot">FIDELITY LADDER SYSTEM · CHAPTER 8 OF 9</span></figcaption>
</div>`,

  /** Every bit of motion is declarative CSS on absolute delays — the player scrubs it off the
   *  narration clock — so this only declares which beat is showing, the contract full.spec.mjs
   *  enforces. */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    if (!shell || !cues?.length) return;
    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    if (shell.dataset.phase !== String(phase)) shell.dataset.phase = String(phase);
  },
};
