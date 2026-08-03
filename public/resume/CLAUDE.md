# CLAUDE.md — `/resume` (Nathan O'Brien's résumé system)

Guidance for Claude Code (and any agent or human) working in this directory. This is the
**canonical, version-controlled home** for the résumé as of 2026-08-03. It lives inside the
`n8plusus-www` repo (git), served by Express at `https://n8plusus.com/resume/`.

> **Why this exists:** résumé edits kept getting lost across parallel files and formats
> (a `.docx`, a "gold" PDF, and ~6 `resume-*.md` copies in `misc/nhunsaker-linkedin/`, which was
> **not** a git repo). This directory fixes that: one source of truth, in git.

## The one hard rule

**`resume.json` is the single source of truth. Edit it — nothing else — for content changes.**

Everything else is generated from or renders `resume.json`:

| File | Role | Edit it? |
|---|---|---|
| **`resume.json`** | The data. Source of truth. | ✅ **Yes — this is the only content file.** |
| `resume.md` | Markdown mirror, for pasting into LinkedIn / ATS / email. | ❌ No — **regenerate** from JSON (see below). |
| `resume-render.js` | Shared renderer: `renderBody()`, `mdInline()`, `contactLinks()`, `toMarkdown()`, `loadResume()`. | Only to change *markup/logic*, never content. |
| `index.html` | Branded dark "display" view. Fetches `resume.json`, renders via `resume-render.js`. | Only for styling/layout. |
| `resume.html` | Light, print/ATS view. `Cmd/Ctrl+P` → clean PDF. Same renderer. | Only for styling/layout. |
| `resume-edit.html` | Interactive editor: form fields + live preview; exports `resume.json` + `resume.md`. | Only to change the editor UI. |

Because all three HTML views render from `resume.json` at runtime, a single edit to the JSON
updates every view at once. That is the whole point — do not reintroduce parallel copies.

## How to edit the résumé

**Option A — the editor (no code):**
1. Open `https://n8plusus.com/resume/resume-edit.html` (or locally, see below).
2. Edit fields. The right pane previews live. Work autosaves to your browser (localStorage).
3. **Browser autosave is NOT the repo file.** To persist, click **Download resume.json** and
   **Download .md**, then replace `resume.json` and `resume.md` in this folder and commit.

**Option B — edit `resume.json` directly**, then regenerate the markdown mirror:
```bash
# from n8plusus-www/ — regenerate resume.md from resume.json
node -e "import('./public/resume/resume-render.js').then(m=>{const d=JSON.parse(require('fs').readFileSync('public/resume/resume.json','utf8'));require('fs').writeFileSync('public/resume/resume.md',m.toMarkdown(d));console.log('resume.md regenerated')})"
```
Then commit both files together.

## Content conventions (match the existing data)

- Inline emphasis in any text field uses **markdown**: `**bold**`, `*italic*`. The renderer converts
  a safe subset; all other HTML is escaped. Don't put raw HTML in the JSON.
- Bullets are one string each (no leading `-`). In the editor's bullets box, one line = one bullet.
- Skill `items` and "Earlier" entries use ` · ` (middot-space) as the separator — keep it consistent.
- `contact.phone` blank = hidden. This variant currently ships **no phone** and uses
  `skills@metatoy.com` (the deliberate résumé/ATS email) and `linkedin.com/in/nathanhunsaker`.
  ⚠️ The old gold PDF used `n8plusus@gmail.com` + `/in/nhunsaker` + a phone number — a known
  divergence. If you're told to switch the header, change it in **`resume.json` only**.

## Provenance / lineage

- Content synced from `misc/nhunsaker-linkedin/resume-slim-v4-gold.pdf` (the founder's hand-refined
  "gold" version) on 2026-08-03. The gold PDF's Staff-SWE intro rewrite + a removed bullet were the
  "lost" edits this recovered.
- Variant = **non-leadership / conservative** (pure employment history; ATS-friendly). If a
  leadership-focused variant is needed later, add a second JSON (e.g. `resume-leadership.json`) and a
  view that loads it — do **not** fork the HTML.
- The old `misc/nhunsaker-linkedin/` folder was git-init'd on 2026-08-03 as a safety snapshot, but
  **this directory is now the home** for edits going forward.

## Local preview

Served by the repo's Express app (`../../server.js`), which uses `extensions:['html']`, so
`/resume/resume` resolves to `resume.html` and `/resume/` serves `index.html`.
```bash
cd n8plusus-www && node server.js        # http://localhost:3000/resume/
```
The pages `fetch('./resume.json')`, so they must be **served over http**, not opened as `file://`
(a bare file open will show a load error). The editor's *Upload JSON* button is the one exception —
it works offline for quick edits, but you still Download to persist.

## Repo hygiene

- This is the `n8plusus-www` repo — **JS only, Node 20, ESM, no build step, no framework.** Keep
  these files dependency-free and self-contained (only the shared `resume-render.js` import).
- Commit `resume.json` and `resume.md` **together** so they never drift.
- Don't commit generated PDFs here; the print view generates them on demand. The published PDF lives
  at `../assets/resume-slim-v4-gold.pdf` and is linked from the views.
