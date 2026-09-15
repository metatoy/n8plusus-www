// Pure HTML template builders for the n8plusus portfolio.
// UMD: usable both in the browser (window.PF) and in Node (require) for static
// site generation (build-portfolio.mjs). No DOM, no fetch — strings only.
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.PF = api; // also expose a global (browser <script>, and Node ESM require)
})(typeof self !== "undefined" ? self : typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // each project is its own page now: /portfolio/<slug>.html
  const projectUrl = (slug) => `/portfolio/${encodeURIComponent(slug)}.html`;

  function fmt(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  // A stepped carousel: one <img> per step, captions carried on data- attributes so the
  // markup is complete before any script runs. Source form is a header line plus one line
  // per step, which keeps a seven-step walkthrough readable in portfolio.json:
  //
  //   cs![<dom-id> :: <aria-label>]
  //   - <src>[!small] :: <step title> :: <step body>
  //
  // Wired by wireCarousels() in portfolio-render.js; styles live in project.css. Both are
  // loaded by every generated page, which is why this is a template block and not a
  // hand-edit to one page's <head> and <body> — that is exactly what `npm run build`
  // used to throw away.
  function carousel(head, steps) {
    const parts = head.split(" :: ");
    const id = parts[0].trim();
    const label = parts.slice(1).join(" :: ").trim();
    const items = steps.map((line) => {
      const f = line.replace(/^\s*-\s+/, "").split(" :: ");
      const src = f[0].trim();
      return { small: /!small$/.test(src), src: src.replace(/!small$/, ""), title: (f[1] || "").trim(), body: f.slice(2).join(" :: ").trim() };
    });
    const imgs = items
      .map((it, i) => `<img class="cs-poster${it.small ? " cs-small" : ""}" src="${esc(it.src)}" alt="${esc(it.title)}" data-title="${esc(it.title)}" data-body="${esc(it.body)}"${i ? " hidden" : ""} />`)
      .join("");
    const dots = items
      .map((it, i) => `<button type="button" class="cs-dot${i ? "" : " active"}" data-i="${i}" role="tab" aria-label="Step ${i + 1}: ${esc(it.title)}"></button>`)
      .join("");
    return `<div class="cs"${id ? ` id="${esc(id)}"` : ""}${label ? ` aria-label="${esc(label)}"` : ""} tabindex="0">
  <div class="cs-stage" title="Click to advance">${imgs}</div>
  <div class="cs-progress"><div class="cs-progressFill"></div></div>
  <div class="cs-caption"><h3 class="cs-captionTitle"></h3><p class="cs-captionBody"></p></div>
  <div class="cs-controls">
    <button type="button" class="cs-ctrlBtn" data-act="prev" aria-label="Previous step">&larr;</button>
    <button type="button" class="cs-ctrlBtn" data-act="next" aria-label="Next step">&rarr;</button>
    <span class="cs-spacer"></span>
    <div class="cs-dots" role="tablist" aria-label="Jump to step">${dots}</div>
    <span class="cs-stepLabel"></span>
  </div>
</div>`;
  }

  function md(s) {
    return String(s || "").split(/\n{2,}/).map((block) => {
      const lines = block.split("\n");
      if (/^cs!\[[^\]]*\]\s*$/.test(lines[0] || "")) {
        return carousel(lines[0].trim().slice(4, -1), lines.slice(1).filter((l) => /^\s*-\s+/.test(l)));
      }
      if (lines.length && lines.every((l) => /^\s*-\s+/.test(l))) {
        return "<ul>" + lines.map((l) => `<li>${fmt(l.replace(/^\s*-\s+/, ""))}</li>`).join("") + "</ul>";
      }
      const emb = block.trim().match(/^@\[([^\]]*)\]\(([^)]+)\)$/);
      if (emb) return `<figure class="media embed"><iframe src="${esc(emb[2])}" title="${esc(emb[1])}" loading="lazy" scrolling="no" onload="try{this.style.height=this.contentWindow.document.body.scrollHeight+'px'}catch(e){}"></iframe><figcaption>${esc(emb[1])}</figcaption></figure>`;
      const coll = block.trim().match(/^\+!\[([^\]]*)\]\(([^)]+)\)$/);
      if (coll) {
        const parts = coll[1].split(" :: ");
        const sum = parts.length > 1 ? parts[0] : "Show diagram";
        const cap = parts.length > 1 ? parts.slice(1).join(" :: ") : coll[1];
        return `<details class="media-collapse"><summary>${esc(sum)}</summary><figure class="media"><img loading="lazy" src="${esc(coll[2])}" alt="${esc(cap)}" /><figcaption>${esc(cap)}</figcaption></figure></details>`;
      }
      const pthm = block.trim().match(/^tp!\[([^\]]*)\]\(([^)]+)\)$/);
      if (pthm) {
        const parts = pthm[1].split(" :: ");
        const label = parts.length > 1 ? parts[0] : pthm[1];
        const cap = parts.length > 1 ? parts.slice(1).join(" :: ") : pthm[1];
        return `<figure class="media media-thumb media-phone"><span class="phone-frame"><img loading="lazy" src="${esc(pthm[2])}" alt="${esc(cap)}" /></span><figcaption>${esc(label)} <span class="mt-cta">expand</span></figcaption></figure>`;
      }
      // f![caption :: alt](src) — a wide flow diagram. Same expand affordance as t!, but
      // full-bleed rather than thumbnail-sized, because a pipeline drawn small is unreadable.
      const flow = block.trim().match(/^f!\[([^\]]*)\]\(([^)]+)\)$/);
      if (flow) {
        const parts = flow[1].split(" :: ");
        const cap = parts[0];
        const alt = parts.length > 1 ? parts.slice(1).join(" :: ") : parts[0];
        return `<figure class="media flowfig"><img loading="lazy" src="${esc(flow[2])}" alt="${esc(alt)}" /><figcaption>${esc(cap)} <span class="mt-cta">expand</span></figcaption></figure>`;
      }
      const thm = block.trim().match(/^t!\[([^\]]*)\]\(([^)]+)\)$/);
      if (thm) {
        const parts = thm[1].split(" :: ");
        const label = parts.length > 1 ? parts[0] : thm[1];
        const cap = parts.length > 1 ? parts.slice(1).join(" :: ") : thm[1];
        return `<figure class="media media-thumb"><img loading="lazy" src="${esc(thm[2])}" alt="${esc(cap)}" /><figcaption>${esc(label)} <span class="mt-cta">expand</span></figcaption></figure>`;
      }
      const img = block.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (img) return `<figure class="media"><img loading="lazy" src="${esc(img[2])}" alt="${esc(img[1])}" /><figcaption>${esc(img[1])}</figcaption></figure>`;
      return `<p>${fmt(block)}</p>`;
    }).join("");
  }

  function mediaBlock(m) {
    if (m.type === "video") {
      return `<figure class="media"><video controls preload="none" ${m.poster ? `poster="${esc(m.poster)}"` : ""}><source src="${esc(m.src)}" type="video/mp4" /></video>
        <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption></figure>`;
    }
    return `<figure class="media"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.title)}" />
      <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption></figure>`;
  }

  function renderSection(sec) {
    if (sec.format === "listgroup" && Array.isArray(sec.items)) {
      const intro = sec.intro ? md(sec.intro) : "";
      const nav = sec.items
        .map((it, i) => `<button type="button" class="lg-item${i === 0 ? " active" : ""}" data-fi="${i}">${it.emoji ? `<span class="lg-emoji" aria-hidden="true">${esc(it.emoji)}</span>` : ""}<span>${esc(it.label)}</span></button>`)
        .join("");
      const panels = sec.items
        .map((it, i) => `<div class="feat-panel${i === 0 ? " active" : ""}" data-fi="${i}">${md(it.body)}</div>`)
        .join("");
      return `<div class="subsec"><h2>${esc(sec.title)}</h2>${intro}
        <div class="feat-wrap">
          <div class="lg" role="tablist">${nav}</div>
          <div class="feat-panels">${panels}</div>
        </div></div>`;
    }
    return `<div class="subsec"><h2>${esc(sec.title)}</h2>${md(sec.body)}</div>`;
  }

  // ---- index cards + shelves ----
  function cardHTML(p) {
    const skills = (p.skills || []).slice(0, 6).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const more = (p.skills || []).length > 6 ? `<span class="chip more">+${p.skills.length - 6}</span>` : "";
    const ph = p.status === "placeholder" ? '<span class="soon">archive coming</span>' : "";
    const thumb = p.thumb
      ? `<div class="card-thumb"><img loading="lazy" src="${esc(p.thumb)}" alt="${esc(p.title)}" /></div>`
      : `<div class="card-thumb card-thumb--none"><span class="mono">${esc(p.client)}</span></div>`;
    return `<a class="card" href="${projectUrl(p.slug)}">
      ${thumb}
      <div class="card-body">
        <div class="card-top"><span class="yr mono">${esc(p.year)}</span>${ph}</div>
        <h3>${esc(p.title)}</h3>
        <p class="client mono">${esc(p.client)} · ${esc(p.role)}</p>
        <p class="sum">${esc(p.summary)}</p>
        <div class="chips">${skills}${more}</div>
      </div>
    </a>`;
  }

  function indexInnerHTML(data) {
    const gridOf = (arr) => `<div class="grid">${arr.map(cardHTML).join("")}</div>`;
    const shelf = (title, sub, inner) =>
      `<section class="shelf"><div class="shelf-h"><h2>${esc(title)}</h2>${sub ? `<span class="shelf-sub">${esc(sub)}</span>` : ""}</div>${inner}</section>`;
    const bySlug = Object.fromEntries((data.projects || []).map((p) => [p.slug, p]));
    const idx = (data.meta && data.meta.index) || {};
    const pick = (slugs) => (slugs || []).map((s) => bySlug[s]).filter(Boolean);
    const selected = pick(idx.selected);
    const more = pick(idx.more);
    const prod = idx.inProduction || [];
    const prodStrip = prod.length
      ? `<div class="prodgrid">${prod
          .map((x) => {
            const icon = x.icon
              ? `<span class="pl-ico" aria-hidden="true" style="-webkit-mask-image:url(/portfolio/assets/prodicons/${esc(x.icon)}.svg);mask-image:url(/portfolio/assets/prodicons/${esc(x.icon)}.svg)"></span>`
              : "";
            return `<a class="prodlink" href="${esc(x.url)}" target="_blank" rel="noopener">${icon}<span class="pl-main"><span class="pl-top"><span class="pl-label">${esc(x.label)}</span><span class="pl-arrow">↗</span></span>${x.sub ? `<span class="pl-sub mono">${esc(x.sub)}</span>` : ""}</span></a>`;
          })
          .join("")}</div>`
      : "";
    let html = "";
    if (selected.length) html += shelf("Selected work", "", gridOf(selected));
    if (prod.length) html += shelf("In production", "Live and verifiable — go poke at it", prodStrip);
    if (more.length) html += shelf("More", "", gridOf(more));
    return html;
  }

  // ---- project detail ----
  function projectMeta(p) {
    return {
      title: `${p.title} — Nathan O'Brien`,
      description: p.description || p.summary || "",
      image: p.thumb || "",
    };
  }

  function projectInnerHTML(p) {
    const skills = (p.skills || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const links = (p.links || []).map((l) => `<a class="ext" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
    // One slot, directly after "What I built", for the thing that shows the work moving. It holds
    // either a self-hosted walkthrough player or a YouTube video. `video` wins when both are set,
    // so switching is a one-field edit rather than a template change.
    //
    // The two size themselves completely differently. The player knows its own height and posts it
    // back over `wt-height` (see wireWalkthrough in portfolio-render.js); a cross-origin YouTube
    // frame can post nothing, so it gets a fixed 16:9 box from CSS instead.
    const ytId = p.video ? String(p.video).match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/) : null;
    const wtHtml = ytId
      // youtube-nocookie defers YouTube's cookies until the viewer actually presses play, and
      // rel=0 keeps the end screen on this channel instead of advertising competitors.
      ? `<div class="walkthrough-sec"><figure class="media embed video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${esc(ytId[1])}?rel=0" title="${esc(p.title)} walkthrough" loading="lazy" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></figure></div>`
      : p.walkthrough
      ? `<div class="walkthrough-sec"><figure class="media embed walkthrough-embed"><iframe class="wt-iframe" src="${esc(p.walkthrough)}" title="${esc(p.title)} walkthrough" loading="lazy" scrolling="no"></iframe></figure></div>`
      : "";
    const secArr = (p.sections || []).map(renderSection);
    if (wtHtml) {
      const wi = (p.sections || []).findIndex((s) => /what i built/i.test(s.title || ""));
      secArr.splice((wi >= 0 ? wi : -1) + 1, 0, wtHtml);
    }
    const sections = secArr.join("");
    const body = p.body ? `<div class="body">${md(p.body)}</div>` : "";
    const gallery = (p.media || []).length ? `<div class="gallery">${p.media.map(mediaBlock).join("")}</div>`
      : (p.status === "placeholder" ? `<p class="soon-note mono">Details and media coming from the project archive.</p>` : "");
    const norm = (it) => (typeof it === "string" ? { name: it, applied: "" } : it);
    const tableMode = (p.skillsGroups || []).some((g) => (g.items || []).some((it) => typeof it === "object" && it.applied));
    const skillsInner = (p.skillsGroups || [])
      .map((g) => {
        const rows = (g.items || []).map(norm);
        if (tableMode) {
          return `<div class="skgroup2"><h3 class="mono">${esc(g.label)}</h3><table class="sktable"><tbody>${rows
            .map((r) => `<tr><th>${esc(r.name)}</th><td>${esc(r.applied)}</td></tr>`)
            .join("")}</tbody></table></div>`;
        }
        return `<div class="skgroup"><h3 class="mono">${esc(g.label)}</h3><ul>${rows.map((r) => `<li>${esc(r.name)}</li>`).join("")}</ul></div>`;
      })
      .join("");
    const skillsSec = (p.skillsGroups || []).length
      ? `<div class="subsec skills-sec"><h2>Skills</h2><div class="${tableMode ? "skstack" : "skgrid"}">${skillsInner}</div></div>`
      : "";
    return `
      <header class="phead">
        <p class="mono meta-line">${esc(p.year)} · ${esc(p.client)} · ${esc(p.role)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="lede">${esc(p.description || p.summary)}</p>
        <div class="chips">${skills}</div>
        ${links ? `<div class="links">${links}</div>` : ""}
      </header>
      ${sections}${body}${gallery}${skillsSec}`;
  }

  return { esc, fmt, md, mediaBlock, renderSection, cardHTML, indexInnerHTML, projectMeta, projectInnerHTML, projectUrl };
});
