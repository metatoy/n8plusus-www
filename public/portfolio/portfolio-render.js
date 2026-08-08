// Shared renderer for the n8plusus portfolio. Reads portfolio.json.
// browse.html calls renderIndex(); project.html calls renderProject().
(function () {
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ico = (id) => `<svg class="pico" aria-hidden="true"><use href="/portfolio/icons.svg#${id}"></use></svg>`;

  async function load() {
    const res = await fetch("/portfolio/portfolio.json", { cache: "no-cache" });
    return res.json();
  }

  function card(p) {
    const skills = (p.skills || []).slice(0, 6).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const more = (p.skills || []).length > 6 ? `<span class="chip more">+${p.skills.length - 6}</span>` : "";
    const ph = p.status === "placeholder" ? '<span class="soon">archive coming</span>' : "";
    return `<a class="card" href="/portfolio/project.html?slug=${encodeURIComponent(p.slug)}">
      <div class="card-top"><span class="yr mono">${esc(p.year)}</span>${ph}</div>
      <h3>${esc(p.title)}</h3>
      <p class="client mono">${esc(p.client)} · ${esc(p.role)}</p>
      <p class="sum">${esc(p.summary)}</p>
      <div class="chips">${skills}${more}</div>
    </a>`;
  }

  // filter state: skills (multi) + roles (multi)
  const state = { skills: new Set(), roles: new Set() };
  const hasSelection = () => state.skills.size || state.roles.size;
  function projectMatches(p) {
    if (state.skills.size && !(p.skillTags || []).some((s) => state.skills.has(s))) return false;
    if (state.roles.size && !(p.roleTypes || []).some((r) => state.roles.has(r))) return false;
    return true;
  }

  function filterBar(data) {
    const f = data.meta.filters || {};
    const skillPills = (f.skills || [])
      .map((s) => `<button class="pill" data-group="skills" data-id="${s.id}" title="${esc(s.full)}">${ico(s.icon)}${esc(s.short)}</button>`)
      .join("");
    const rolePills = (f.roleTypes || [])
      .map((r) => `<button class="pill" data-group="roles" data-id="${r.id}" title="${esc(r.full)}">${esc(r.short)}</button>`)
      .join("");
    return `<div class="filters">
      <div class="fbar">
        <div class="fgroup skills"><span class="flabel mono">${ico("funnel")}Skills</span>${skillPills}</div>
        <div class="fgroup roles"><span class="flabel mono">Role</span>${rolePills}<button class="pill clear" data-clear="1">Clear</button></div>
      </div>
      <p class="fcount mono" id="fcount"></p>
    </div>`;
  }

  const byFeatured = (a, b) => (b.featured === true) - (a.featured === true);
  const gridOf = (arr) => `<div class="grid">${arr.slice().sort(byFeatured).map(card).join("")}</div>`;

  function paintGrid(data, gridMount) {
    const projects = data.projects || [];
    const c = document.getElementById("fcount");
    if (!hasSelection()) {
      const byEra = {};
      projects.forEach((p) => (byEra[p.era] = byEra[p.era] || []).push(p));
      gridMount.innerHTML = (data.meta.eras || [])
        .filter((era) => byEra[era.id] && byEra[era.id].length)
        .map((era) => `<section class="era"><h2 class="era-h"><span>${esc(era.label)}</span><span class="mono range">${esc(era.range)}</span></h2>${gridOf(byEra[era.id])}</section>`)
        .join("");
      if (c) c.textContent = "";
      return;
    }
    const selected = projects.filter(projectMatches);
    const other = projects.filter((p) => !projectMatches(p));
    let html = selected.length ? gridOf(selected) : `<p class="empty mono">Nothing matches that selection. <button class="linklike" data-clear="1">Clear</button></p>`;
    if (other.length) html += `<section class="era other"><h2 class="era-h"><span>Other</span></h2>${gridOf(other)}</section>`;
    gridMount.innerHTML = html;
    if (c) c.textContent = selected.length + " selected";
  }

  window.renderIndex = async function (mountId) {
    const data = await load();
    const mount = document.getElementById(mountId);
    mount.innerHTML = filterBar(data) + '<div id="pf-grid"></div>';
    const grid = document.getElementById("pf-grid");
    paintGrid(data, grid);
    mount.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-group],[data-clear]");
      if (!btn) return;
      e.preventDefault();
      if (btn.dataset.clear) { state.skills.clear(); state.roles.clear(); }
      else {
        const set = btn.dataset.group === "skills" ? state.skills : state.roles;
        set.has(btn.dataset.id) ? set.delete(btn.dataset.id) : set.add(btn.dataset.id);
      }
      mount.querySelectorAll(".pill[data-group]").forEach((el) => {
        const on = (el.dataset.group === "skills" ? state.skills : state.roles).has(el.dataset.id);
        el.classList.toggle("active", on);
      });
      paintGrid(data, grid);
    });
  };

  function mediaBlock(m) {
    if (m.type === "video") {
      return `<figure class="media"><video controls preload="none" ${m.poster ? `poster="${esc(m.poster)}"` : ""}><source src="${esc(m.src)}" type="video/mp4" /></video>
        <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption></figure>`;
    }
    return `<figure class="media"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.title)}" />
      <figcaption><b>${esc(m.title)}</b>${m.description ? " — " + esc(m.description) : ""}</figcaption></figure>`;
  }

  function md(s) {
    return String(s || "").split(/\n{2,}/).map((para) => {
      const img = para.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (img) return `<figure class="media"><img loading="lazy" src="${esc(img[2])}" alt="${esc(img[1])}" /></figure>`;
      let t = esc(para).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
      return `<p>${t}</p>`;
    }).join("");
  }

  window.renderProject = async function (mountId) {
    const slug = new URLSearchParams(location.search).get("slug");
    const data = await load();
    const mount = document.getElementById(mountId);
    const p = (data.projects || []).find((x) => x.slug === slug);
    if (!p) { mount.innerHTML = `<p class="sum">Project not found. <a href="/portfolio/browse.html">Back to portfolio</a>.</p>`; return; }
    document.title = `${p.title} — Nathan O'Brien`;
    const skills = (p.skills || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
    const links = (p.links || []).map((l) => `<a class="ext" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
    const sections = (p.sections || []).map((sec) => `<div class="subsec"><h3>${esc(sec.title)}</h3>${md(sec.body)}</div>`).join("");
    const body = p.body ? `<div class="body">${md(p.body)}</div>` : "";
    const gallery = (p.media || []).length ? `<div class="gallery">${p.media.map(mediaBlock).join("")}</div>`
      : (p.status === "placeholder" ? `<p class="soon-note mono">Details and media coming from the project archive.</p>` : "");
    mount.innerHTML = `
      <header class="phead">
        <p class="mono meta-line">${esc(p.year)} · ${esc(p.client)} · ${esc(p.role)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="lede">${esc(p.description || p.summary)}</p>
        <div class="chips">${skills}</div>
        ${links ? `<div class="links">${links}</div>` : ""}
      </header>
      ${sections}${body}${gallery}`;
  };
})();
