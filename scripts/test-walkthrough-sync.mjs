// Guard: the committed FLS walkthrough must match its source. Wired into `npm test`.
//
// This is the load-bearing half of "one source, more than one server". A deploy target that
// nothing checks is not a deploy target — it is `walkthrough-src/` with a new name, and that one
// sat 22 commits behind with six of nine scene files missing, because nothing ever looked.
//
// Two checks, in order:
//   1. TAMPER  — does the committed copy still hash to its own `.source-hash`?
//                Fails when someone hand-edited the target. Runs everywhere, needs no source.
//   2. STALE   — does that hash still match the source tree?
//                Fails when the source moved on and nobody re-synced. Skipped (with a printed
//                note, not silently) when the source isn't a sibling — e.g. a Coolify build,
//                which builds exactly the tree this test already passed on locally.
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { hashTree, HASH_FILE } from "./walkthrough-hash.mjs";

const SRC = fileURLToPath(new URL("../../fls-harness/deploy/walkthrough/", import.meta.url));
const DST = fileURLToPath(new URL("../public/portfolio/walkthroughs/fls/", import.meta.url));
const FIX = "  fix: node scripts/sync-walkthrough.mjs";

const exists = (p) => stat(p).then(() => true, (e) => { if (e.code === "ENOENT") return false; throw e; });
const fail = (...lines) => { console.error(["walkthrough-sync: FAIL", ...lines].join("\n")); process.exit(1); };

if (!(await exists(DST))) {
  // Not an error on its own: the entry may simply not be here yet. It IS an error if the
  // portfolio claims a walkthrough at this path.
  const pj = JSON.parse(await readFile(new URL("../public/portfolio/portfolio.json", import.meta.url), "utf8"));
  const claimed = pj.projects.filter((p) => (p.walkthrough || "").includes("/walkthroughs/fls/"));
  if (claimed.length) fail(`  ${claimed[0].slug} points at /walkthroughs/fls/ but that target does not exist.`, FIX);
  console.log("walkthrough-sync: SKIP — no fls deploy target, and no project claims one");
  process.exit(0);
}

const recorded = (await readFile(`${DST}${HASH_FILE}`, "utf8").catch(() => "")).trim();
if (!recorded) fail(`  ${DST}${HASH_FILE} is missing or empty — the target was not written by the sync script.`, FIX);

const target = await hashTree(DST);
if (target.hash !== recorded) {
  fail("  The committed walkthrough does not match its own .source-hash.",
       "  Something hand-edited the deploy target. It is generated; edit the source instead:",
       "    fls-harness/deploy/walkthrough/", FIX);
}

if (!(await exists(SRC))) {
  console.log(`walkthrough-sync: OK (tamper check only — source not present at ${SRC})`);
  console.log(`  ${target.files} files, hash ${recorded.slice(0, 12)}`);
  process.exit(0);
}

const source = await hashTree(SRC);
if (source.hash !== recorded) {
  fail("  The walkthrough source has moved on and this copy is stale.",
       `    source  ${source.hash.slice(0, 12)}  (${source.files} files)`,
       `    copy    ${recorded.slice(0, 12)}  (${target.files} files)`, FIX);
}

console.log(`walkthrough-sync: OK — ${target.files} files, matches source (${recorded.slice(0, 12)})`);
