// Shared renderer for the n8plusus portfolio. Reads portfolio.json.
// browse.html calls renderIndex(); project.html calls renderProject().
(function () {
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  async function load() {
    const res = await fetch("/portfolio/portfolio.json", { cache: "no-cache" });
    return res.json();
  }

  function card(p) {
    const skills = (p.skills || []).slice(0, 4).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const ph = p.status === "placeholder" ? '<span class="soon">archive coming</span>' : "";
    return `<a class="card" href="/portfolio/project.html?slug=${encodeURIComponent(p.slug)}">
      <div class="card-top"><span class="yr mono">${esc(p.year)}</span>${ph}</div>
      <h3>${esc(p.title)}</h3>
      <p class="client mono">${esc(p.client)} · ${esc(p.role)}</p>
      <p class="sum">${esc(p.summary)}</p>
      <div class="chips">${skills}</div>
    </a>`;
  }

  window.renderIndex = async function (mountId) {
    const data = await load();
    const mount = document.getElementById(mountId);
    const byEra = {};
    (data.projects || []).forEach((p) => (byEra[p.era] = byEra[p.era] || []).push(p));
    const html = (data.meta.eras || [])
      .filter((era) => byEra[era.id] && byEra[era.id].length)
      .map((era) => {
        const items = byEra[era.id]
          .sort((a, b) => (b.featured === true) - (a.featured === true))
          .map(card)
          .join("");
        return `<section class="era">
          <h2 class="era-h"><span>${esc(era.label)}</span><span class="mono range">${esc(era.range)}</span></h2>
          <div class="grid">${items}</div>
        </section>`;
      })
      .join("");
    mount.innerHTML = html;
  };

  function mediaBlock(m) {
    if (m.type === "video") {
      return `<figure class="media">
        <video controls preload="none" ${m.poster ? `poster="${esc(m.poster)}"` : ""}>
          <source src="${esc(m.src)}" type="video/mp4" /></video>
        <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption>
      </figure>`;
    }
    return `<figure class="media">
      <img loading="lazy" src="${esc(m.src)}" alt="${esc(m.title)}" />
      <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption>
    </figure>`;
  }

  // minimal markdown: paragraphs, **bold**, *italic*, and ![alt](src) images
  function md(s) {
    return String(s || "")
      .split(/\n{2,}/)
      .map((para) => {
        const img = para.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) return `<figure class="media"><img loading="lazy" src="${esc(img[2])}" alt="${esc(img[1])}" /></figure>`;
        let t = esc(para).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
        return `<p>${t}</p>`;
      })
      .join("");
  }

  window.renderProject = async function (mountId) {
    const slug = new URLSearchParams(location.search).get("slug");
    const data = await load();
    const mount = document.getElementById(mountId);
    const p = (data.projects || []).find((x) => x.slug === slug);
    if (!p) {
      mount.innerHTML = `<p class="sum">Project not found. <a href="/portfolio/browse.html">Back to portfolio</a>.</p>`;
      return;
    }
    document.title = `${p.title} — Nathan O'Brien`;
    const skills = (p.skills || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const links = (p.links || []).map((l) => `<a class="ext" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
    const sections = (p.sections || [])
      .map((sec) => `<div class="subsec"><h3>${esc(sec.title)}</h3>${md(sec.body)}</div>`)
      .join("");
    const body = p.body ? `<div class="body">${md(p.body)}</div>` : "";
    const gallery = (p.media || []).length
      ? `<div class="gallery">${p.media.map(mediaBlock).join("")}</div>`
      : (p.status === "placeholder" ? `<p class="soon-note mono">Details and media coming from the project archive.</p>` : "");
    mount.innerHTML = `
      <a class="back mono" href="/portfolio/browse.html">← all work</a>
      <header class="phead">
        <p class="mono meta-line">${esc(p.year)} · ${esc(p.client)} · ${esc(p.role)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="lede">${esc(p.description || p.summary)}</p>
        <div class="chips">${skills}</div>
        ${links ? `<div class="links">${links}</div>` : ""}
      </header>
      ${sections}
      ${body}
      ${gallery}
    `;
  };
})();
