// Sync the FLS narrated walkthrough from its single source into this repo's deploy target.
//
//   SOURCE (edit here):  ~/workspace/metatoy/fls-harness/deploy/walkthrough/
//   TARGET (generated):  public/portfolio/walkthroughs/fls/
//
// The walkthrough has ONE source and MORE THAN ONE server. The harness VM gets its copy from
// `fls-harness/deploy/install.sh` (rsync); the portfolio gets its copy from this script. Both are
// deploy targets: written by a script, never hand-edited. See fls-harness/CLAUDE.md, "One source,
// more than one server".
//
// The target is COMMITTED, because this repo's Dockerfile is `COPY public ./public` — Coolify
// builds what git holds, with no network at build time. That is the same reason the 24 generated
// `public/portfolio/*.html` pages are committed. What keeps a committed copy honest is
// `.source-hash` plus `scripts/test-walkthrough-sync.mjs`, wired into `npm test`.
//
// Run:  node scripts/sync-walkthrough.mjs        (or `npm run build`, which calls it)
//       node scripts/sync-walkthrough.mjs --if-present   — no-op when the source isn't there
import { cp, rm, mkdir, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { hashTree, HASH_FILE } from "./walkthrough-hash.mjs";

const SRC = fileURLToPath(new URL("../../fls-harness/deploy/walkthrough/", import.meta.url));
const DST = fileURLToPath(new URL("../public/portfolio/walkthroughs/fls/", import.meta.url));

const exists = (p) => stat(p).then(() => true, (e) => { if (e.code === "ENOENT") return false; throw e; });

const optional = process.argv.includes("--if-present");

if (!(await exists(SRC))) {
  const msg = `walkthrough source not found: ${SRC}`;
  if (optional) { console.log(`sync-walkthrough: ${msg} — skipping (--if-present)`); process.exit(0); }
  console.error(
    `sync-walkthrough: ${msg}\n\n` +
    `  This script copies the FLS walkthrough from the fls-harness repo, which it expects as a\n` +
    `  sibling of this one. Clone it next to n8plusus-www, or run with --if-present to skip.\n`);
  process.exit(1);
}

// Sanity-check the source before destroying the target: a truncated source must never become the
// deploy target. The manifest is the one file that names every chapter.
const manifestPath = `${SRC}walkthrough.json`;
if (!(await exists(manifestPath))) {
  console.error(`sync-walkthrough: ${SRC} has no walkthrough.json — refusing to sync a partial tree`);
  process.exit(1);
}
const manifest = JSON.parse(await (await import("node:fs/promises")).readFile(manifestPath, "utf8"));
if (manifest.id !== "fls-walkthrough" || !Array.isArray(manifest.manifest) || manifest.manifest.length === 0) {
  console.error(`sync-walkthrough: unexpected manifest in ${manifestPath} — refusing to sync`);
  process.exit(1);
}
const missingAudio = manifest.manifest.filter((c) => !c.audio).map((c) => c.id);

const src = await hashTree(SRC);
await rm(DST, { recursive: true, force: true });
await mkdir(DST, { recursive: true });
await cp(SRC, DST, { recursive: true });
await writeFile(`${DST}${HASH_FILE}`, `${src.hash}\n`);

const out = await hashTree(DST);
if (out.hash !== src.hash) {
  console.error(`sync-walkthrough: copy verification FAILED (${src.hash} != ${out.hash})`);
  process.exit(1);
}

console.log(JSON.stringify({
  source: SRC, target: DST, files: out.files, chapters: manifest.manifest.length,
  status: manifest.status, hash: src.hash.slice(0, 12),
  ...(missingAudio.length ? { warning: `chapters with no audio: ${missingAudio.join(", ")}` } : {}),
}, null, 2));
