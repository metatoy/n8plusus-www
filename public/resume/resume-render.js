/* Shared resume renderer for /resume.
   resume.json is the single source of truth; index.html, resume.html and
   resume-edit.html all import these functions so a change to markup or to the
   data updates every view. No parallel copies to drift.  JS only, no deps. */

/** Escape HTML-special chars so data can't inject markup. */
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Minimal inline markdown: **bold** and *italic*, on already-escaped text. */
export function mdInline(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
}

/** Build the contact line as an array of {label, href} for the header. */
export function contactLinks(c = {}) {
  const out = [];
  if (c.email) out.push({ label: c.email, href: `mailto:${c.email}` });
  if (c.phone) out.push({ label: c.phone, href: `tel:${c.phone.replace(/[^+\d]/g, '')}` });
  if (c.linkedin) out.push({ label: c.linkedin, href: `https://${c.linkedin.replace(/^https?:\/\//, '')}` });
  if (c.github) out.push({ label: c.github, href: `https://${c.github.replace(/^https?:\/\//, '')}` });
  return out;
}

/** Render the full resume body (everything under the header) to an HTML string. */
export function renderBody(d) {
  const parts = [];

  if (d.summary) parts.push(`<p class="summary">${mdInline(d.summary)}</p>`);

  parts.push(sectionLabel('Experience'));
  for (const job of d.experience || []) {
    parts.push(`<div class="job">
      <div class="job-head"><h3>${esc(job.company)}</h3><span class="job-meta mono">${esc(job.tenure || '')}</span></div>`);
    for (const r of job.roles || []) {
      parts.push(`<div class="role">
        <div class="role-head"><h4>${esc(r.title)}</h4><span class="role-meta mono">${esc([r.dates, r.location].filter(Boolean).join(' · '))}</span></div>
        ${r.intro ? `<p class="role-intro">${mdInline(r.intro)}</p>` : ''}
        ${(r.bullets && r.bullets.length) ? `<ul>${r.bullets.map(b => `<li>${mdInline(b)}</li>`).join('')}</ul>` : ''}
      </div>`);
    }
    if (job.note) parts.push(`<p class="job-note">${mdInline(job.note)}</p>`);
    parts.push(`</div>`);
  }

  if (d.earlier && d.earlier.length) {
    parts.push(`<h3 class="earlier-head">Earlier</h3><ul class="earlier">${d.earlier.map(e => `<li>${mdInline(e)}</li>`).join('')}</ul>`);
    if (d.earlierNote) parts.push(`<p class="earlier-note">${mdInline(d.earlierNote)}</p>`);
  }

  if (d.skills && d.skills.length) {
    parts.push(sectionLabel('Skills'));
    parts.push(`<div class="skills">${d.skills.map(s =>
      `<p><span class="skill-group">${esc(s.group)}:</span> ${mdInline(s.items)}</p>`).join('')}</div>`);
  }

  if (d.education && d.education.length) {
    parts.push(sectionLabel('Education'));
    parts.push(`<div class="education">${d.education.map(e => `<p>${mdInline(e)}</p>`).join('')}</div>`);
  }

  return parts.join('\n');
}

function sectionLabel(text) {
  return `<div class="section-label mono">// ${esc(text).toUpperCase()}</div>`;
}

/** Serialize the data object back to the resume.md markdown format. */
export function toMarkdown(d) {
  const L = [];
  L.push(`# ${d.name}\n`);
  L.push(`**${d.title}**`);
  const c = d.contact || {};
  const line = [d.location,
    c.email, c.phone,
    c.linkedin ? `[${c.linkedin}](https://${c.linkedin.replace(/^https?:\/\//, '')})` : '',
    c.github ? `[${c.github}](https://${c.github.replace(/^https?:\/\//, '')})` : '']
    .filter(Boolean).join(' · ');
  L.push(line + '\n');
  if (d.summary) L.push(d.summary + '\n');
  L.push('---\n');
  L.push('## Experience\n');
  for (const job of d.experience || []) {
    L.push(`### ${job.company} · ${job.tenure}\n`);
    for (const r of job.roles || []) {
      L.push(`**${r.title}** · ${[r.dates, r.location].filter(Boolean).join(' · ')}\n`);
      if (r.intro) L.push(r.intro + '\n');
      for (const b of r.bullets || []) L.push(`- ${b}`);
      L.push('');
    }
    if (job.note) L.push(job.note + '\n');
  }
  if (d.earlier && d.earlier.length) {
    L.push('### Earlier\n');
    for (const e of d.earlier) L.push(`- ${e}`);
    L.push('');
    if (d.earlierNote) L.push(d.earlierNote + '\n');
  }
  L.push('---\n');
  L.push('## Skills\n');
  for (const s of d.skills || []) L.push(`**${s.group}:** ${s.items}\n`);
  L.push('---\n');
  L.push('## Education\n');
  for (const e of d.education || []) L.push(e);
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

/** Fetch resume.json relative to the current page. */
export async function loadResume(url = './resume.json') {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not load ${url}: ${res.status}`);
  return res.json();
}
