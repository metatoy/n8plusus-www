// Content hash of a walkthrough tree — the one definition both the sync and its guard use.
//
// A deploy target of the FLS walkthrough is a GENERATED copy of
// `fls-harness/deploy/walkthrough/`. It is never hand-edited. This hash is how a copy proves it
// still matches the source, so a stale copy is a test failure rather than the silent 22-commit
// drift that killed `walkthrough-src/` (see fls-harness/CLAUDE.md, "One source, more than one
// server").
//
// The hash covers relative path + bytes for every file, sorted, so it is stable across machines
// and catches a renamed or deleted file as readily as an edited one. `.source-hash` is excluded:
// it records the result and cannot be part of it.
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

export const HASH_FILE = ".source-hash";

async function walk(dir, base = dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, base, out);
    else if (entry.name !== HASH_FILE && entry.name !== ".DS_Store") out.push(full);
  }
  return out;
}

/** sha256 over (relative path, bytes) for every file in `dir`, path-sorted. */
export async function hashTree(dir) {
  const files = (await walk(dir)).sort();
  const h = createHash("sha256");
  for (const file of files) {
    // POSIX-normalise so a hash made on Windows would still compare equal
    h.update(relative(dir, file).split(sep).join("/"));
    h.update("\0");
    h.update(await readFile(file));
    h.update("\0");
  }
  return { hash: h.digest("hex"), files: files.length };
}
