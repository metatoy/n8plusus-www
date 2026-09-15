// Static site generation for the portfolio: one real HTML page per project,
// content baked in from portfolio.json, so every project has its own URL
// (/portfolio/<slug>.html) for tracking, SEO, and progressive first paint.
//
// Run:  node build-portfolio.mjs           (or `npm run build`)
//       node build-portfolio.mjs --check   verify, don't write — wired into `npm test`
// Regenerate whenever portfolio.json or the templates change.
//
// These pages are GENERATED. Editing one by hand works right up until the next build, which
// silently deletes the edit. That happened twice: image-publishing's four case-study sections,
// its three carousels and their <style>/<script> blocks, and foundation-ui's six screenshots,
// all lived only in the committed HTML. --check makes that a test failure on the spot: the
// content belongs in portfolio.json, and anything the markup language cannot express belongs
// in portfolio-templates.js / project.css / portfolio-render.js, which every page already loads.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { GA_SNIPPET } from "./scripts/ga.mjs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "public");
const _mod = require(join(PUB, "portfolio", "portfolio-templates.js"));
const PF = _mod && _mod.projectInnerHTML ? _mod : globalThis.PF;

const V = "20260915a"; // asset cache-bust; bump when css/js change
const ORIGIN = "https://n8plusus.com"; // canonical host (non-www), consistent with the homepage
const data = JSON.parse(readFileSync(join(PUB, "portfolio", "portfolio.json"), "utf8"));

const page = (p) => {
  const meta = PF.projectMeta(p);
  const canonical = `${ORIGIN}/portfolio/${encodeURIComponent(p.slug)}.html`;
  const ogImg = meta.image
    ? `\n<meta property="og:image" content="${ORIGIN}${PF.esc(meta.image)}" />\n<meta name="twitter:card" content="summary_large_image" />`
    : `\n<meta name="twitter:card" content="summary" />`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: meta.title,
    headline: p.title,
    description: meta.description,
    url: canonical,
    ...(meta.image ? { image: `${ORIGIN}${meta.image}` } : {}),
    ...(p.year ? { dateCreated: String(p.year) } : {}),
    author: { "@type": "Person", name: "Nathan O'Brien", url: `${ORIGIN}/` },
    ...(p.client ? { about: p.client } : {}),
    isPartOf: { "@type": "CollectionPage", name: "N8+US Portfolio", url: `${ORIGIN}/portfolio/` },
  });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${PF.esc(meta.title)}</title>
<meta name="description" content="${PF.esc(meta.description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${PF.esc(p.title)}" />
<meta property="og:description" content="${PF.esc(meta.description)}" />
<meta property="og:url" content="${canonical}" />${ogImg}
<script type="application/ld+json">${jsonld}</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/portfolio/project.css?v=${V}" />
${GA_SNIPPET}</head>
<body>
  <div class="bar"><div class="inner">
    <span class="bl">
      <a class="barhome" href="/" aria-label="N8+US home">N8+US</a>
      <a class="barback" href="/portfolio/">← all work</a>
    </span>
    <span class="hlinks">
      <a class="hlink" href="https://linkedin.com/in/nathanhunsaker" target="_blank" rel="noopener"><svg class="ico" aria-hidden="true"><use href="/portfolio/icons.svg#linkedin-logo"></use></svg>LinkedIn</a>
      <a class="hlink solid" href="/resume/resume.pdf" download><svg class="ico" aria-hidden="true"><use href="/portfolio/icons.svg#file-arrow-down"></use></svg>Résumé (PDF)</a>
    </span>
  </div></div>
  <div class="wrap">
    <main id="project">${PF.projectInnerHTML(p)}</main>
    <footer>
      <a href="/portfolio/">all work</a> · <a href="https://n8plusus.com">n8plusus.com</a>
    </footer>
  </div>
  <script src="/portfolio/portfolio-render.js?v=${V}"></script>
  <script>window.wirePortfolio&&wirePortfolio("project");</script>
</body>
</html>
`;
};

const check = process.argv.includes("--check");
let n = 0;
const stale = [];
for (const p of data.projects || []) {
  if (!p.slug) continue;
  const rel = `portfolio/${p.slug}.html`;
  const out = join(PUB, rel);
  const html = page(p);
  n++;
  if (!check) {
    writeFileSync(out, html);
    console.log("wrote", rel);
    continue;
  }
  let onDisk = null;
  try { onDisk = readFileSync(out, "utf8"); } catch { /* missing counts as stale */ }
  if (onDisk !== html) stale.push({ rel, reason: onDisk === null ? "not generated yet" : "differs from portfolio.json + templates" });
}

if (!check) {
  console.log(`\n✓ generated ${n} project pages`);
} else if (stale.length) {
  console.error("portfolio-build: FAIL — committed pages do not match what the generator produces:");
  for (const s of stale) console.error(`  ${s.rel} — ${s.reason}`);
  console.error("\n  These pages are generated. Do not hand-edit them: put prose in portfolio.json,");
  console.error("  and anything the markup language cannot express in portfolio-templates.js /");
  console.error("  project.css / portfolio-render.js. Then: node build-portfolio.mjs");
  process.exit(1);
} else {
  console.log(`portfolio-build: OK — ${n} pages match portfolio.json + templates`);
}
