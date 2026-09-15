// The nine chapters of the walkthrough, and the beats each one steps through.
//
// Beat tuple contract, consumed by two files:
//   [0] label      -> cue button text            (build-manifest.mjs, scenes.mjs [data-story-label])
//   [1] cuePhrase  -> MUST be a unique verbatim substring of this chapter's SPEC §6 body
//   [2] title      -> the scene's big h2
//   [3] note       -> supporting sentence
//   [4] code       -> the canonical-vocabulary slot. This is where ANCHOR / RUNG / signal / dial are
//                     allowed to appear, because the founder's ruling was "plain spoken, canonical
//                     terms as ON-SCREEN LABELS" — the voice never says them; this line shows them.
//
// `stage` replaces the old `rung`: 0-4, the visitor's five steps (demo.py `_RUNG_TO_STAGE`), not the
// engine's rungs 0-5. Concept chapters use -1 (no step highlighted on the rail).

export const chapters = [
  // ── Part 1 — what it is ───────────────────────────────────────────────────────────────────
  {
    id: 'problem', title: 'The expensive place to be wrong', eyebrow: 'WHY THIS EXISTS',
    kind: 'problem', stage: -1,
    beats: [
      ['COST', 'the most expensive place', 'Code is the last place to find out', 'A wrong idea costs least before anyone builds it.', 'wrong × late = expensive'],
      ['WORKS', 'whether code works', 'Tools already check that it works', 'Tests, types and review all answer one question.', 'verify(correctness) ✓'],
      ['RIGHT', 'worth building', 'Almost nothing checks it was right', 'Direction is the question nobody automated.', 'verify(direction) — ?'],
      ['EARLY', 'before anyone writes a line', 'So ask it early, where it is cheap', 'The same question, answered before the code exists.', 'ask early = ask cheap'],
    ],
  },
  {
    id: 'ladder', title: 'It only moves one way', eyebrow: 'FIDELITY IS A RATCHET',
    kind: 'ladder', stage: -1,
    beats: [
      ['CLIMB', 'the work climbs', 'One idea, five steps', 'Each step is more real than the one before it.', 'RUNG 1 → 5'],
      ['REAL', 'something you can click', 'Words, then drawings, then something real', 'Fidelity rises — and so does commitment.', 'spec → wireframe → preview → build → ship'],
      ['RATCHET', 'only moves one way', 'A ratchet, not a throttle', 'Rules tighten on the way down. Never loosen.', 'ANCHOR → VESSEL → REQUEST'],
      ['NO SKIP', 'skip a step', 'Confidence is not permission', 'It cannot talk its way past a step.', 'skip() → refused'],
    ],
  },
  {
    id: 'gates', title: 'It ends at a gate', eyebrow: 'NOT AT A SUMMIT',
    kind: 'gates', stage: -1,
    beats: [
      ['HUMAN', 'cannot be taken back', 'A person owns every irreversible act', 'The gates are the product, not the friction.', 'human owns commitment'],
      ['CLOSED', 'advances on optimism', 'A check that did not run never passed', 'Uncertainty stops. It never becomes permission.', 'unknown → stop'],
      ['DESCEND', 'drops back down', 'Failure goes back a step, and leaves a lesson', 'The next attempt knows more than the last one did.', 'fail → descend + LESSON'],
      ['COST', 'says what it cost', 'Every step reports what it cost', 'A claim with no price attached is not reviewable.', 'every claim carries its cost'],
      ['KEEP', 'gates that are kept', 'The value is the gates you keep', 'Open every dial and you have bought nothing.', 'autonomy: earned, never set'],
    ],
  },

  // ── Part 2 — watch it build something ─────────────────────────────────────────────────────
  {
    id: 'request', title: 'Request', eyebrow: 'STEP ONE / YOUR WORDS',
    kind: 'request', stage: 0,
    beats: [
      ['WHO', 'a name and a shared passcode', 'Your name goes on every decision', 'So the record says who asked, not "someone".', 'actor = you'],
      ['ASK', 'one sentence about Pocket', 'One sentence, in your own words', 'Pocket is a poker app that really exists.', 'intent: one sentence'],
      ['CONSENT', 'Nothing runs until you press', 'Nothing runs until you press it', 'One at a time — a queue against a live budget is an invoice.', 'one in flight'],
      ['GATE', 'more to go on', 'Checked against what this product is for', 'It can hand the request straight back for more to go on.', 'ANCHOR: admit · needs-human'],
    ],
  },
  {
    id: 'wireframe', title: 'Wireframe', eyebrow: 'STEP TWO / THREE ROUGH SHAPES',
    kind: 'wireframe', stage: 1,
    beats: [
      ['THREE', 'three rough shapes', 'Three rough shapes come back', 'Real frames, drawn into a real design file.', 'candidates: 3'],
      ['DISTINCT', 'differ in shape', 'Different answers, not different words', 'Three approaches — not three phrasings of one.', 'shape ≠ wording'],
      ['PICK', 'pick the one you want built', 'You pick the one to build', 'Here the decision IS the artifact.', 'signal: pick(n)'],
      ['KEPT', 'what was not taken', 'The other two stay on the page', 'So you can still see the road not taken.', 'rejected ≠ deleted'],
    ],
  },
  {
    id: 'preview', title: 'Preview', eyebrow: 'STEP THREE / SOMETHING TO CLICK',
    kind: 'preview', stage: 2,
    beats: [
      ['CLICK', 'a clickable version', 'A clickable version of your pick', "Built from the product's own design system.", 'pack → prototype'],
      ['ASK', 'is this the right thing', 'Is this the right thing?', 'The plainest question the system knows how to ask.', 'gate: await-approve'],
      ['THROWAWAY', 'before anyone writes real code', 'A throwaway, deliberately', 'It exists to test direction, not to be kept.', 'disposable by design'],
      ['REVISE', 'sends the step back', 'Asking for changes re-runs this step', 'Your note goes with it.', 'signal: feedback(text)'],
      ['BOUNDED', 'does not skip ahead', 'It never starts over, and never skips ahead', 'Only approval with no revisions moves up a step.', 'approve = no revisions'],
    ],
  },
  {
    id: 'build', title: 'Build', eyebrow: 'STEP FOUR / REAL CODE, RUNNING',
    kind: 'build', stage: 3,
    beats: [
      ['ISOLATED', 'an isolated copy', 'Real code, in an isolated copy', 'Its own workspace, away from everything else.', 'worktree'],
      ['EVIDENCE', "take the agent's word", 'The tests get run again here', "An agent's own “green” is never taken on trust.", 'verify(result) ≠ claim'],
      ['OPENABLE', 'not a receipt', 'Not a receipt — something you can open', '“36 changed lines” is not a thing anyone can judge.', 'artifact = a URL'],
      ['SWITCH', 'already flipped on', 'The link arrives with the switch already on', 'A bare link would look like nothing had happened.', '?flags-<name>=true'],
      ['WAIT', 'nothing needs you', 'While the checks run, nothing needs you', 'Waiting is a state. It is not a stall.', 'checks green → stage'],
    ],
  },
  {
    id: 'ship', title: 'Ship', eyebrow: 'STEP FIVE / INTO THE PROJECT',
    kind: 'ship', stage: 4,
    beats: [
      ['THE YES', 'The yes you just gave', 'Your last approval is the one that merges', 'The decision point is a step earlier than it looks.', 'approve(4) → ship_activity'],
      ['OFF', 'feature flag off in both environments', 'It arrives with the flag off, everywhere', 'Which is the only reason one yes is enough.', 'flag: stage=off · prod=off'],
      ['MOVES', 'does not release the feature', 'Merging moves code', 'It does not release anything to anyone.', 'merge ≠ release'],
      ['SIGN', 'sign off', 'Then it shows you what it did', 'The last gate signs off on a merge that happened.', 'await-signoff'],
      ['LATER', 'a separate decision', 'Turning it on is a different decision', 'A person, deliberately, outside all of this.', 'flag on ∉ ladder'],
    ],
  },
  {
    id: 'your-turn', title: 'Your turn', eyebrow: 'FROM INTENT TO EVIDENCE',
    kind: 'recap', stage: -1,  // the close is not step five; nothing is 'in focus' here
    beats: [
      ['FIVE', 'a person decided every one', 'Five steps. You decided every one.', 'Coordination is not judgment.', 'human owns each gate'],
      ['COST', 'hides what it spends', 'The cost stays on the page throughout', 'Hiding spend asks to be trusted instead of checked.', 'claim + cost'],
      ['HONEST', 'makes being wrong cheap', 'It does not make an agent safe to leave alone', 'It makes being wrong cheap.', 'not autonomy-in-a-box'],
      ['OPEN', 'read the whole thing', 'Go run one, or read the source', 'MIT. The mechanisms are the product.', '/build/ · github.com'],
    ],
  },
];
