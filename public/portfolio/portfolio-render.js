// Client layer for the n8plusus portfolio. Templates live in portfolio-templates.js
// (window.PF). This file does fetch + DOM wiring only.
//  - index page (/portfolio/) calls renderIndex() to client-render the shelves.
//  - static per-project pages (/portfolio/<slug>.html) bake their content at build
//    time and call wirePortfolio() to attach interactivity (features/lightbox/walkthrough).
//  - project.html?slug= is a legacy redirect; renderProject() is kept for safety.
(function () {
  const PF = window.PF || {};

  async function load() {
    const res = await fetch("/portfolio/portfolio.json", { cache: "no-cache" });
    return res.json();
  }

  // list-group items switch which feature panel is shown
  function wireFeatures(root) {
    root.querySelectorAll(".feat-wrap").forEach((wrap) => {
      const items = wrap.querySelectorAll(".lg-item");
      const panels = wrap.querySelectorAll(".feat-panel");
      items.forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = btn.getAttribute("data-fi");
          items.forEach((b) => b.classList.toggle("active", b === btn));
          panels.forEach((pn) => pn.classList.toggle("active", pn.getAttribute("data-fi") === i));
        });
      });
    });
  }

  // same-origin walkthrough iframes post their height so we can size the frame
  function wireWalkthrough(root) {
    const frames = root.querySelectorAll(".wt-iframe");
    if (!frames.length) return;
    window.addEventListener("message", (e) => {
      const d = e.data;
      if (!d || d.type !== "wt-height" || !d.height) return;
      frames.forEach((f) => { if (f.contentWindow === e.source) f.style.height = d.height + "px"; });
    });
  }

  // click any diagram/screenshot to open it full-size in a lightbox
  function wireLightbox(root) {
    let ov = document.getElementById("pf-lightbox");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "pf-lightbox";
      ov.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><img alt="" />';
      document.body.appendChild(ov);
      const close = () => ov.classList.remove("open");
      ov.addEventListener("click", close);
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    }
    const big = ov.querySelector("img");
    root.querySelectorAll(".media img").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        big.src = el.currentSrc || el.src;
        big.alt = el.alt || "";
        ov.classList.add("open");
      });
    });
  }

  // stepped carousels (cs![] blocks). The markup ships complete — every step's image,
  // title and body are already in the HTML — so this only moves between them. Nothing
  // here is required for the content to be readable if the script never runs.
  function wireCarousels(root) {
    root.querySelectorAll(".cs").forEach((cs) => {
      const imgs = [...cs.querySelectorAll(".cs-poster")];
      const dots = [...cs.querySelectorAll(".cs-dot")];
      const n = imgs.length;
      if (!n) return;
      const title = cs.querySelector(".cs-captionTitle");
      const body = cs.querySelector(".cs-captionBody");
      const label = cs.querySelector(".cs-stepLabel");
      const fill = cs.querySelector(".cs-progressFill");
      let i = 0;
      const go = (k) => {
        i = (k + n) % n;
        imgs.forEach((im, j) => {
          im.hidden = j !== i;
          // restart the enter animation on the step being shown
          if (j === i) { im.style.animation = "none"; void im.offsetWidth; im.style.animation = ""; }
        });
        title.textContent = imgs[i].getAttribute("data-title");
        body.textContent = imgs[i].getAttribute("data-body");
        label.textContent = "Step " + (i + 1) + " / " + n;
        fill.style.width = ((i + 1) / n) * 100 + "%";
        dots.forEach((d, j) => {
          d.classList.toggle("active", j === i);
          if (j === i) d.setAttribute("aria-selected", "true"); else d.removeAttribute("aria-selected");
        });
      };
      // Focus on click, so the keys work from the moment you touch it. Without this the carousel
      // only answers the keyboard after a tab-stop, and nobody tabs to a picture.
      cs.querySelector(".cs-stage").addEventListener("click", () => { cs.focus(); go(i + 1); });
      cs.querySelector('[data-act="prev"]').addEventListener("click", (e) => { e.stopPropagation(); go(i - 1); });
      cs.querySelector('[data-act="next"]').addEventListener("click", (e) => { e.stopPropagation(); go(i + 1); });
      dots.forEach((d) => d.addEventListener("click", () => go(+d.getAttribute("data-i"))));
      // ← back · → forward · Esc back to the first step. Every one calls preventDefault: a focused
      // carousel that also scrolls the page under you is worse than one that ignores the key.
      cs.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(i + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
        else if (e.key === "Escape") { e.preventDefault(); go(0); }
      });
      go(0);
    });
  }

  function wireAll(root) {
    if (!root) return;
    wireFeatures(root);
    wireLightbox(root);
    wireWalkthrough(root);
    wireCarousels(root);
  }

  // attach interactivity to already-baked content (static per-project pages)
  window.wirePortfolio = function (mountId) {
    wireAll(document.getElementById(mountId || "project"));
  };

  // client-render the curated index
  window.renderIndex = async function (mountId) {
    const data = await load();
    document.getElementById(mountId).innerHTML = PF.indexInnerHTML(data);
  };

  // legacy client-render of a project by ?slug= (kept for safety; project.html now redirects)
  window.renderProject = async function (mountId) {
    const slug = new URLSearchParams(location.search).get("slug");
    const data = await load();
    const mount = document.getElementById(mountId);
    const p = (data.projects || []).find((x) => x.slug === slug);
    if (!p) { mount.innerHTML = `<p class="sum">Project not found. <a href="/portfolio/">Back to portfolio</a>.</p>`; return; }
    document.title = PF.projectMeta(p).title;
    mount.innerHTML = PF.projectInnerHTML(p);
    wireAll(mount);
  };
})();
