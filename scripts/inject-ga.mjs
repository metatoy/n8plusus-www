// Inject the GA4 tag into every static HTML page under public/ that doesn't have it.
// Idempotent: skips files that already carry the measurement ID, and files with no <head>.
//
// Run:  node scripts/inject-ga.mjs          (report only — lists what would change)
//       node scripts/inject-ga.mjs --write  (apply)
//
// Generated project pages (/portfolio/<slug>.html) get the tag from build-portfolio.mjs
// instead — this script is for the hand-written pages.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUB = join(ROOT, "public");

import { GA_ID, GA_SNIPPET } from "./ga.mjs";

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (name === "node_modules" || name.startsWith(".")) return [];
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

// Where the snippet goes. Normally just before </head>. Several pages here are written
// with an *implicit* head (`<!doctype html>` then bare <meta>/<title>, no <head> element) —
// for those, anchor after the last leading head-ish tag so the script still lands in the head.
function insertionPoint(html) {
  const close = html.search(/<\/head\s*>/i);
  if (close !== -1) return close;
  const lead = /<(?:meta|title|link|base)\b[^>]*>(?:[^<]*<\/title\s*>)?\s*/gi;
  let end = -1;
  let m;
  while ((m = lead.exec(html))) {
    if (m.index > (end === -1 ? 0 : end) + 200) break; // stop once we leave the leading run
    end = m.index + m[0].length;
  }
  return end;
}

const write = process.argv.includes("--write");
const changed = [];
const skipped = [];

for (const file of walk(PUB).sort()) {
  const html = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  if (html.includes(GA_ID)) continue; // already tagged
  const at = insertionPoint(html);
  if (at === -1) {
    skipped.push([rel, "no <head> and no leading meta/title to anchor to"]);
    continue;
  }
  changed.push(rel);
  if (write) writeFileSync(file, html.slice(0, at) + GA_SNIPPET + html.slice(at));
}

for (const rel of changed) console.log(`${write ? "tagged " : "would tag"}  ${rel}`);
for (const [rel, why] of skipped) console.log(`skipped     ${rel} (${why})`);
console.log(`\n${write ? "✓ tagged" : "→ would tag"} ${changed.length} file(s); skipped ${skipped.length}.`);
if (!write && changed.length) console.log("Re-run with --write to apply.");
