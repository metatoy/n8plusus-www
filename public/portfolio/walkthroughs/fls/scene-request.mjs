// Chapter 4 — "Request". The first chapter of the demo half.
//
// A DIFFERENT PROBLEM FROM THE CONCEPT CHAPTERS. Those three were authored diagrams because there
// was nothing to photograph. This one has a real screenshot of a real run, and the founder's note
// was exact: "for screen shots we can crop/pan so just the important details are shown, in some
// cases we are showing full size and it takes up too much room."
//
// So the screenshot is not a picture pasted into a slide — it is a SET, and the chapter moves a
// camera over it. Each beat frames the one control the narration is naming, and the last beat pulls
// back to the whole form, which is the only moment the full width earns its space.
//
// THE CAMERA IS CONTINUOUS, AND IT IS COMPUTED HERE, NOT IN CSS.
// The first pass parked a per-phase `transform` in a stylesheet and let a 900ms CSS transition move
// between them. Two things were wrong with that:
//
//   1. It was WRONG BY A QUARTER. The transform was authored in image pixels against a frame
//      assumed to be 960px wide, but `.rq-shot` is `width: 100%` of whatever the stage happens to
//      be — about 1180px in the real player. So every frame showed ~23% more of the screenshot than
//      it asked for, and the surplus landed on the right and bottom as a band of empty dotted page.
//      That is the exact "takes up too much room" fault this chapter exists to fix, reintroduced by
//      a unit mismatch. The fix is below: the image is sized as a PERCENTAGE of the frame and the
//      pans are percentages of the image, so a declared region means what it says at any stage
//      width.
//   2. A CSS transition runs on wall-clock time. Everything else in this player is scrubbed off the
//      narration clock, so dragging the voice moved the graphics in every other chapter and not in
//      this one. Computing the camera from `elapsedMs` fixes that for free — and needs no WAAPI
//      animation for the player to pause and scrub.
//
// This pan-and-zoom contradicts the portfolio walkthroughs' v2 guideline, which forbids it over
// screenshots. That rule exists to stop a slideshow inventing drama it has not earned. Here the
// alternative is a 2880px-wide form shrunk until its labels are unreadable, which fails the thing
// the chapter is for. Precedent for the move exists in the React ancestor's rAF pan. Deliberate
// exception, argued rather than assumed.
//
// POLISHED AGAINST DESIGN SYSTEM A, 2026-09-14 — the same pass as chapters 1-3, option 1c. Paper
// ground, --muted and --paper in place of hand-picked near-matches, and the admin surface's
// furniture: §n · EYEBROW left, the chapter's title right, a hairline under both, and the chapter
// marker at the foot beside the provenance tag.
//
// THE FURNITURE IS HTML HERE. Every other chapter draws its labels inside its own viewBox. This
// one frames a photograph, so they are real elements around the frame instead. Same two rows, same
// tone, same pattern — the vocabulary is the constant, not the mechanism.
//
// AND NO DISPLAY VOICE, which is a decision rather than an omission. The other chapters give
// Archivo to the words that carry their argument. The words that carry this chapter's argument are
// the product's own, inside the capture. There is nothing left for a second voice to say.
//
// TIMING, from walkthrough.json — 26.462s, four cues:
//   beat 1 WHO      0.0s  (7.7s)  "a name and a shared passcode"
//   beat 2 ASK      7.7s  (7.5s)  "one sentence about Pocket"
//   beat 3 CONSENT 15.2s (10.0s)  "Nothing runs until you press"
//   beat 4 GATE    25.2s  (1.3s)  "more to go on"   <- 1.3s. One move: pull back. Nothing else.

const SRC_W = 2880, SRC_H = 3328;
// The window's shape, and the only place it is written down. `.rq-shot` carries the same ratio as
// its `aspect-ratio`; they must agree or the vertical framing drifts.
const AR = 960 / 560;

// Regions of the SCREENSHOT, in its own pixels: [x, y, width]. Height follows AR, so a region can
// never be specified in a shape the window cannot show.
//
// MEASURED, NOT GUESSED. The form occupies x 811-2476 (1665 wide) and y 2104-3270 of the 2880x3328
// capture; the top bar is y 0-115 across the full width. Every number below was probed off the
// image rather than eyeballed, because the first pass eyeballed it and was wrong by 300px.
//
// Each beat is a MOVE, not a still: `a` is where the beat opens, `b` where it comes to rest. Beats
// here run 7.5-10s, and a frozen crop held that long goes dead — the same reason chapter 3 gave its
// eleven-second beat a protagonist.
// Each beat is a CAMERA and a HIGHLIGHT. The camera barely moves; the highlight does the pointing.
//
// It used to be four hard zooms — the bar, the sentence, the button, then a pull-back — and each
// one threw away the context that made the frame legible. You could read the control but not see
// where it lived. Now there are two framings, both at roughly three-quarters of the page width, and
// what changes between beats is which part is lit. The eye is led rather than dragged.
//
// `hl` is a rectangle of the SCREENSHOT, measured off it: [x, y, width, height] in source pixels.
// render() converts it to a percentage of whatever the camera is showing at that instant, so the
// spotlight stays welded to the thing it points at while the camera drifts underneath it.
const SHOTS = [
  // The top bar, at almost full page width, lit on the name you signed in with.
  { k: 'who',     a: [280, 0, 2600],    b: [280, 0, 2600],
    hl: [2606, 26, 212, 66] },
  // Down to the form, and it stays there for the rest of the chapter.
  { k: 'ask',     a: [603, 2081, 2080], b: [603, 2081, 2080],
    hl: [840, 2350, 1608, 226] },
  // Ten seconds. The camera pushes in very slightly so the beat is not frozen, and the light
  // narrows to the one control that starts anything.
  { k: 'consent', a: [603, 2081, 2080], b: [648, 2156, 1958],
    hl: [836, 3114, 174, 110] },
  // 1.3s, one move: the light opens out to the whole request. Nothing is singled out any more
  // because the next thing that happens is that all of it gets checked.
  { k: 'gate',    a: [603, 2081, 2080], b: [603, 2081, 2080],
    hl: [811, 2104, 1665, 1166] },
];

// WHEN THE SCRIM ARRIVES, which is not when the beat does. Beat 1 opens on "Here is the same
// system from the outside" — a sentence about the WHOLE page — and dimming five-sixths of it while
// that is being said contradicts the words. The screen stays clean and complete until the narration
// reaches "You give a name and a shared passcode", and only then does the light narrow to the name.
//
// 3251ms is measured, not chosen: it is the start time of the character "Y" in "You give a name",
// read out of audio/request-36cdbe24a3c9.alignment.json — the per-character timings ElevenLabs
// returned with the recording. The cue itself cannot carry this, because beat 1's cue is pinned to
// 0 by virtue of being first; the phrase it names happens three and a quarter seconds in.
const SCRIM_IN = 3251, SCRIM_FADE = 450;

// How long the camera takes to travel from the end of one beat to the start of the next. Capped at
// 60% of the beat so the shortest beat still comes to rest inside itself.
const MOVE_MS = 900;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
// Travel, per GUIDELINES §6.4 — accelerate out, cushion in, symmetric.
const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - ((-2 * u + 2) ** 3) / 2);

/** Keep a region inside the image. A frame running past an edge shows dead space, and dead space
 *  is the whole complaint. */
function norm([x, y, w]) {
  const h = w / AR;
  return {
    x: Math.max(0, Math.min(x, SRC_W - w)),
    y: Math.max(0, Math.min(y, SRC_H - h)),
    w,
  };
}

/** Blend two regions. Width moves GEOMETRICALLY and the centre linearly: a zoom interpolated
 *  linearly in width appears to accelerate as it closes, because what the eye reads is the ratio. */
/** Blend two highlight rectangles. Linear in source space: unlike the camera these are not zooms,
 *  they are two places on the same page, and a geometric blend would make the light hesitate. */
const mixRect = (p, q, t) => p.map((v, i) => v + (q[i] - v) * t);

function mix(p, q, t) {
  const w = p.w * (q.w / p.w) ** t;
  const pcx = p.x + p.w / 2, pcy = p.y + p.w / AR / 2;
  const qcx = q.x + q.w / 2, qcy = q.y + q.w / AR / 2;
  const cx = pcx + (qcx - pcx) * t, cy = pcy + (qcy - pcy) * t;
  return norm([cx - w / 2, cy - w / AR / 2, w]);
}

/** The region as a transform.
 *
 *  The image is laid out at `width: 300%` of the frame — three frame-widths across 2880 source
 *  pixels — so `scale(960/w)` puts exactly `w` source pixels across the frame whatever the frame's
 *  pixel width turns out to be. The translate is a percentage of the IMAGE, for the same reason:
 *  no value in this file is in device pixels, so nothing here can drift when the stage resizes. */
function css({ x, y, w }) {
  const k = 960 / w;
  return `scale(${k.toFixed(4)}) translate(${(-x / SRC_W * 100).toFixed(4)}%, ${(-y / SRC_H * 100).toFixed(4)}%)`;
}

// The frame a bare page shows before the player has ticked once: the whole form. Chosen so a
// screenshot taken with no JS, or a failed module load, still shows the chapter's subject.
const RESTING = css(norm(SHOTS[3].a));

export const requestScene = {
  html: `
<div class="review-scene story-scene rq-wrap" data-phase="0">
<figure class="rq">
  <div class="rq-head">
    <span class="slab">§4 · STEP ONE / YOUR WORDS</span>
    <span class="slab slab-r">REQUEST</span>
  </div>
  <div class="rq-shot" data-phase="0">
    <!-- the spotlight: a hole in a paper-tinted scrim, positioned per frame by render() -->
    <div class="rq-mark"></div>
    <img src="shots/request-src.png" width="${SRC_W}" height="${SRC_H}" style="transform: ${RESTING}"
         alt="The visitor page of the Fidelity Ladder harness, with a change typed into the request box: under my chip count at my seat, also show what that stack is worth in big blinds. Below it a field for how you would know it worked, an optional file attachment, and a Start button." />
  </div>
  <!-- The tag says NAME REPLACED because it was. The run was signed in as "Walkthrough capture" —
       a label someone typed to make this recording, not a person — and a demo whose whole first
       beat is "the record says who asked" cannot have the answer be a stage direction. The top
       bar now reads Jane Smith, composited into the capture at its own resolution and baseline.
       Nothing else in the image is touched, and the tag says so rather than letting "captured from
       a real run" quietly cover it. -->
  <!-- Note 0 ships with its "on" class already set. render() only touches the notes when the phase CHANGES,
       and the phase opens at 0 — so the first note was authored, mounted, and never once shown. -->
  <figcaption class="rq-cap">
    <span class="rq-tag">CAPTURED FROM A REAL RUN · NAME REPLACED</span>
    <span class="rq-note on" data-note="0">the name on every decision</span>
    <span class="rq-note" data-note="1">one sentence, in your words</span>
    <span class="rq-note" data-note="2">the only thing that starts it</span>
    <span class="rq-note" data-note="3">then it is checked against what this product is for</span>
    <span class="rq-foot">FIDELITY LADDER SYSTEM · CHAPTER 4 OF 9</span>
  </figcaption>
</figure>
</div>`,

  /** Unlike the concept scenes, this one does real per-frame work: it IS the camera, and it also
   *  places the spotlight.
   *
   *  Under reduced motion nothing moves — each beat holds its own camera and its own highlight and
   *  cuts to the next. That is the designed state, not an absence: four composed stills, each one
   *  lit on the thing its sentence is about, which is what a storyboard of this chapter would be. */
  render(root, elapsedMs, durationMs, reduced, cues) {
    const shell = root.querySelector('.review-scene');
    const shot = root.querySelector('.rq-shot');
    const img = shot?.querySelector('img');
    const mark = shot?.querySelector('.rq-mark');
    if (!shell || !img || !cues?.length) return;

    let phase = 0;
    cues.forEach((cue, i) => { if (elapsedMs >= cue.atMs) phase = i; });
    const index = Math.min(phase, SHOTS.length - 1);
    const here = SHOTS[index];

    let position = norm(here.b);
    let rect = here.hl;

    if (!reduced) {
      const at = cues[index].atMs;
      const end = index + 1 < cues.length ? cues[index + 1].atMs : durationMs;
      const span = Math.max(1, end - at);
      const travel = index > 0 ? Math.min(MOVE_MS, span * 0.6) : 0;
      const tau = elapsedMs - at;
      if (tau < travel) {
        // moving between beats: camera and light travel together, on one eased clock
        const t = ease(clamp01(tau / travel));
        const prev = SHOTS[index - 1];
        position = mix(norm(prev.b), norm(here.a), t);
        rect = mixRect(prev.hl, here.hl, t);
      } else {
        // settled: only the camera's own slow drift is left
        position = mix(norm(here.a), norm(here.b), ease(clamp01((tau - travel) / Math.max(1, span - travel))));
      }
    }

    img.style.transform = css(position);

    // The spotlight, in the frame's own percentages. Computed here rather than declared in CSS so
    // the border stays a constant 2px: anything living inside the transformed layer would be
    // scaled by the camera, and a highlight whose weight changes with the zoom stops reading as
    // one object.
    if (mark) {
      const frameH = position.w / AR;
      mark.style.opacity = reduced ? '1' : clamp01((elapsedMs - SCRIM_IN) / SCRIM_FADE).toFixed(3);
      mark.style.left = `${((rect[0] - position.x) / position.w * 100).toFixed(3)}%`;
      mark.style.top = `${((rect[1] - position.y) / frameH * 100).toFixed(3)}%`;
      mark.style.width = `${(rect[2] / position.w * 100).toFixed(3)}%`;
      mark.style.height = `${(rect[3] / frameH * 100).toFixed(3)}%`;
    }

    if (shell.dataset.phase === String(phase)) return;
    shell.dataset.phase = String(phase);
    shot.dataset.phase = String(phase);
    root.querySelectorAll('.rq-note').forEach((n) => {
      n.classList.toggle('on', n.dataset.note === String(phase));
    });
  },
};
