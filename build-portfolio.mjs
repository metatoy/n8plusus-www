// Static site generation for the portfolio: one real HTML page per project,
// content baked in from portfolio.json, so every project has its own URL
// (/portfolio/<slug>.html) for tracking, SEO, and progressive first paint.
//
// Run:  node build-portfolio.mjs   (or `npm run build`)
// Regenerate whenever portfolio.json or the templates change.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "public");
const _mod = require(join(PUB, "portfolio", "portfolio-templates.js"));
const PF = _mod && _mod.projectInnerHTML ? _mod : globalThis.PF;

const V = "20260810b"; // asset cache-bust; bump when css/js change
const ORIGIN = "https://www.n8plusus.com";
const data = JSON.parse(readFileSync(join(PUB, "portfolio", "portfolio.json"), "utf8"));

const page = (p) => {
  const meta = PF.projectMeta(p);
  const canonical = `${ORIGIN}/portfolio/${encodeURIComponent(p.slug)}.html`;
  const ogImg = meta.image
    ? `\n<meta property="og:image" content="${ORIGIN}${PF.esc(meta.image)}" />\n<meta name="twitter:card" content="summary_large_image" />`
    : `\n<meta name="twitter:card" content="summary" />`;
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
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/portfolio/project.css?v=${V}" />
</head>
<body>
  <div class="bar"><div class="inner">
    <span class="bl">
      <a class="barhome" href="/" aria-label="Home">N8+US</a>
      <a class="barback" href="/portfolio/">← all work</a>
    </span>
    <span class="hlinks">
      <a class="hlink" href="https://linkedin.com/in/nathanhunsaker" target="_blank" rel="noopener"><svg class="ico" aria-hidden="true"><use href="/portfolio/icons.svg#linkedin-logo"></use></svg>LinkedIn</a>
      <a class="hlink solid" href="/resume/resume.pdf" download><svg class="ico" aria-hidden="true"><use href="/portfolio/icons.svg#file-arrow-down"></use></svg>Résumé (PDF)</a>
    </span>
  </div></div>
  <div class="wrap">
    <div id="project">${PF.projectInnerHTML(p)}</div>
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

let n = 0;
for (const p of data.projects || []) {
  if (!p.slug) continue;
  const out = join(PUB, "portfolio", `${p.slug}.html`);
  writeFileSync(out, page(p));
  n++;
  console.log("wrote", `portfolio/${p.slug}.html`);
}
console.log(`\n✓ generated ${n} project pages`);
