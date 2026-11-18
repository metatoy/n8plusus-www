// n8+us geometric patterns: seeded SVG generators for the two site tracks.
//
//   N8P.glyph(opts)     design track: "Glyph Tiles". Bold tiles cut from the N8+US mark:
//                       the 8's loops, the plus, the U's arch, the S's half-rounds, the full stop.
//   N8P.terminal(opts)  engineering track: "Terminal". The same vocabulary drawn as wire on
//                       ink, at the logo's stroke weight, on a faint 12% green grid.
//
// Both return an <svg> string (no DOM), so the same code runs in build-portfolio.mjs (static,
// deterministic pages that `npm test` can diff) and in the browser (homepage dividers).
// Output is deterministic for a given seed: pass a string (e.g. a project slug) or a number.
//
// Colours are CSS classes (f-ink, s-green, ...) resolved by n8-patterns.css to the site tokens,
// so the art follows the token values and the dark theme. Design source: the Figma file
// "n8+us — Geometric pattern directions" (directions 01 and 02), 2026-11-17.
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.N8P = api;
})(typeof self !== "undefined" ? self : typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function hash(s) {
    s = String(s);
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    var a = typeof seed === "number" ? seed >>> 0 : hash(seed);
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pickW(r, arr) {
    var tot = 0, i;
    for (i = 0; i < arr.length; i++) tot += arr[i][1];
    var x = r() * tot;
    for (i = 0; i < arr.length; i++) { x -= arr[i][1]; if (x < 0) return arr[i][0]; }
    return arr[0][0];
  }
  var n = function (v) { return Math.round(v * 100) / 100; };
  // clip-path ids derive from the inputs, so identical inputs give byte-identical SVG (the
  // portfolio build diffs its output) and two different patterns on one page never collide.
  var idFor = function (pre, o, s, cols, rows) { return pre + hash([o.seed, s, cols, rows].join("|")).toString(36) + "-"; };

  // ---- primitives (local tile coordinates) ----
  var rect = function (x, y, w, h, c, rx) { return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(w) + '" height="' + n(h) + '"' + (rx ? ' rx="' + n(rx) + '"' : "") + ' class="f-' + c + '"/>'; };
  var circ = function (cx, cy, r, c) { return '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r) + '" class="f-' + c + '"/>'; };
  var ring = function (cx, cy, r, c, sw) { return '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r) + '" fill="none" stroke-width="' + n(sw) + '" class="s-' + c + '"/>'; };
  var poly = function (pts, c) { return '<polygon points="' + pts.map(function (p) { return n(p[0]) + "," + n(p[1]); }).join(" ") + '" class="f-' + c + '"/>'; };
  var path = function (d, c, sw) { return '<path d="' + d + '" fill="none" stroke-width="' + n(sw) + '" stroke-linecap="round" stroke-linejoin="round" class="s-' + c + '"/>'; };
  var plus = function (cx, cy, L, w, c) { return rect(cx - L / 2, cy - w / 2, L, w, c, w / 2) + rect(cx - w / 2, cy - L / 2, w, L, c, w / 2); };
  var CORNER = [[0, 0], [1, 0], [1, 1], [0, 1]]; // TL TR BR BL, in units of s

  function svgOpen(w, h, kind, label) {
    return '<svg xmlns="http://www.w3.org/2000/svg" class="n8p n8p--' + kind + '" viewBox="0 0 ' + w + " " + h +
      '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"' + (label ? ' data-pattern="' + label + '"' : "") + ">";
  }

  // ---------------------------------------------------------------- Glyph Tiles
  // One tile; returns inner markup. fg/fg2/bg are colour keys.
  function glyphTile(type, s, fg, fg2, bg, v) {
    var o = "", c, i;
    switch (type) {
      case "quarter": c = CORNER[(v + 2) % 4]; return circ(c[0] * s, c[1] * s, s, fg);
      case "half":
        c = [[s / 2, s], [s / 2, 0], [0, s / 2], [s, s / 2]][v % 4];
        return circ(c[0], c[1], s / 2, fg);
      case "tri":
        return poly([[[0, 0], [s, 0], [0, s]], [[0, 0], [s, 0], [s, s]], [[s, 0], [s, s], [0, s]], [[0, 0], [s, s], [0, s]]][v % 4], fg);
      case "ring": return circ(s / 2, s / 2, s / 2, fg) + circ(s / 2, s / 2, s * 0.23, bg) + circ(s / 2, s / 2, s * 0.1, fg2);
      case "eight": { // two stacked loops, the 8 of the mark
        var r8 = s * 0.18, sw = s * 0.075;
        return ring(s / 2, s / 2 - r8 - sw * 0.1, r8, fg, sw) + ring(s / 2, s / 2 + r8 + sw * 0.1, r8, fg, sw);
      }
      case "plus": return plus(s / 2, s / 2, s * 0.62, s * 0.16, fg);
      case "arch": { // the U: a cup open at the top
        var aw = s * 0.64, ax = s * 0.18, ah = s * 0.82, iw = s * 0.28, ix = s * 0.36, ih = s * 0.64;
        return rect(ax, 0, aw, ah - aw / 2, fg) + circ(ax + aw / 2, ah - aw / 2, aw / 2, fg) +
          rect(ix, 0, iw, ih - iw / 2, bg) + circ(ix + iw / 2, ih - iw / 2, iw / 2, bg);
      }
      case "stripes": for (i = 0; i < 5; i++) o += rect(i * s / 5 + s / 20, 0, s / 10, s, fg); return o;
      case "dots": { var g = s / 5; for (i = 0; i < 5; i++) for (var j = 0; j < 5; j++) o += circ(i * g + g / 2, j * g + g / 2, g * 0.18, fg); return o; }
      case "leaf": {
        var a = s * 0.12, b = s * 0.88, R = s * 0.76;
        var d = v % 2
          ? "M" + n(a) + " " + n(b) + "A" + n(R) + " " + n(R) + " 0 0 1 " + n(b) + " " + n(a) + "A" + n(R) + " " + n(R) + " 0 0 1 " + n(a) + " " + n(b) + "Z"
          : "M" + n(a) + " " + n(a) + "A" + n(R) + " " + n(R) + " 0 0 1 " + n(b) + " " + n(b) + "A" + n(R) + " " + n(R) + " 0 0 1 " + n(a) + " " + n(a) + "Z";
        return '<path d="' + d + '" class="f-' + fg + '"/>';
      }
      case "bullseye": {
        var cx = v % 2 ? 0 : s, cy = v < 2 ? s : 0, rr = [2, 1.62, 1.25, 0.88];
        for (i = 0; i < 4; i++) o += circ(cx, cy, s * rr[i], i % 2 ? fg2 : fg);
        return o;
      }
      case "dot": return circ(s / 2, s / 2, s * 0.2, fg);
    }
    return "";
  }

  var GLYPH_PAL = [["ink", 3], ["green", 3], ["paper", 2.4], ["card", 1], ["dim", 0.8]];
  var GLYPH_TYPES = [["quarter", 3], ["half", 3], ["tri", 2.5], ["ring", 1.2], ["eight", 1], ["plus", 1.4], ["arch", 1], ["stripes", 0.8], ["dots", 0.8], ["leaf", 1.2], ["bullseye", 1], ["dot", 0.6]];
  var BIG_TYPES = [["quarter", 2], ["ring", 1], ["bullseye", 2], ["half", 1.5]];
  // Tiny tiles (card strips) lose the fine motifs; keep the ones that read at 24px.
  var SMALL_TYPES = [["quarter", 3], ["half", 3], ["tri", 2.5], ["ring", 1], ["plus", 1.2], ["leaf", 1], ["dot", 0.8]];

  function glyph(o) {
    o = o || {};
    var s = o.s || 80, cols = o.cols || 18, rows = o.rows || 2, w = s * cols, h = s * rows;
    var r = rng(o.seed == null ? 1 : o.seed), id = idFor("n8g", o, s, cols, rows);
    var types = s < 40 ? SMALL_TYPES : GLYPH_TYPES;
    var colors = function () {
      var bg = pickW(r, GLYPH_PAL), fg = pickW(r, GLYPH_PAL), k = 0;
      while (fg === bg && k++ < 12) fg = pickW(r, GLYPH_PAL);
      var fg2 = pickW(r, GLYPH_PAL); k = 0;
      while (fg2 === fg && k++ < 12) fg2 = pickW(r, GLYPH_PAL);
      return [bg, fg, fg2];
    };
    var occ = {}, out = "", defs = "";
    var clip = {};
    var tileAt = function (x, y, size, type) {
      if (!clip[size]) { clip[size] = 1; defs += '<clipPath id="' + id + size + '"><rect width="' + size + '" height="' + size + '"/></clipPath>'; }
      var c = colors();
      out += '<g transform="translate(' + x + " " + y + ')" clip-path="url(#' + id + size + ')">' + rect(0, 0, size, size, c[0]) +
        glyphTile(type, size, c[1], c[2], c[0], Math.floor(r() * 4)) + "</g>";
    };
    // A few 2x2 tiles break the rhythm (rows >= 2 only).
    var bigN = rows >= 2 ? (o.big == null ? Math.max(1, Math.round(cols / 7)) : o.big) : 0;
    for (var b = 0, tries = 0; b < bigN && tries < 40; tries++) {
      var bx = Math.floor(r() * (cols - 1)), by = Math.floor(r() * (rows - 1));
      if (occ[bx + "," + by] || occ[bx + 1 + "," + by] || occ[bx + "," + (by + 1)] || occ[bx + 1 + "," + (by + 1)]) continue;
      occ[bx + "," + by] = occ[bx + 1 + "," + by] = occ[bx + "," + (by + 1)] = occ[bx + 1 + "," + (by + 1)] = 1;
      tileAt(bx * s, by * s, s * 2, pickW(r, BIG_TYPES)); b++;
    }
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      if (occ[x + "," + y]) continue;
      tileAt(x * s, y * s, s, pickW(r, types));
    }
    return svgOpen(w, h, "glyph", o.label) + "<defs>" + defs + "</defs>" + out + "</svg>";
  }

  // ---------------------------------------------------------------- Terminal
  var TERM_TYPES = [["empty", 5], ["arc", 2.5], ["arcs", 1.6], ["eight", 1], ["ring", 1], ["plus", 1.4], ["diag", 1.2], ["dots", 1], ["u", 0.8], ["solid", 0.35], ["full", 0.5]];
  var TERM_COLS = [["green", 3], ["dim", 2], ["gray", 1]];

  function terminal(o) {
    o = o || {};
    var s = o.s || 80, cols = o.cols || 18, rows = o.rows || 2, w = s * cols, h = s * rows;
    var sw = o.sw || Math.max(1.25, s * 0.045); // the logo's stroke-to-height ratio
    var r = rng(o.seed == null ? 1 : o.seed), id = idFor("n8t", o, s, cols, rows);
    var out = '<rect width="' + w + '" height="' + h + '" class="f-ink"/>', i, j;
    // the site's 12% green rule lines
    var grid = "";
    for (i = 1; i < cols; i++) grid += "M" + i * s + " 0V" + h;
    for (j = 1; j < rows; j++) grid += "M0 " + j * s + "H" + w;
    if (grid) out += '<path d="' + grid + '" fill="none" stroke-width="1" class="s-green rule"/>';
    var defs = '<clipPath id="' + id + 'c"><rect width="' + s + '" height="' + s + '"/></clipPath>';
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var type = pickW(r, TERM_TYPES), c = pickW(r, TERM_COLS), v = Math.floor(r() * 4), x = i * s, y = j * s;
      if (type === "empty") { if (r() < 0.35) out += plus(x, y, s * 0.14, Math.max(1, sw / 3), "dim"); continue; }
      var cc = CORNER[v], t = "";
      switch (type) {
        case "arc": t = ring(cc[0] * s, cc[1] * s, s, c, sw); break;
        case "arcs": t = ring(cc[0] * s, cc[1] * s, s, c, sw) + ring(cc[0] * s, cc[1] * s, s * 0.7, c, sw) + ring(cc[0] * s, cc[1] * s, s * 0.4, c, sw); break;
        case "eight": t = ring(s / 2, s / 2 - s * 0.17, s * 0.17, c, sw) + ring(s / 2, s / 2 + s * 0.17, s * 0.17, c, sw); break;
        case "ring": t = ring(s / 2, s / 2, s * 0.32, c, sw) + circ(s / 2, s / 2, s * 0.06, c); break;
        case "plus": t = plus(s / 2, s / 2, s * 0.4, sw, c); break;
        case "diag": t = path(v % 2 ? "M0 0L" + s + " " + s : "M" + s + " 0L0 " + s, c, sw); break;
        case "dots": for (var a = 0; a < 4; a++) for (var b = 0; b < 4; b++) t += circ(a * s / 4 + s / 8, b * s / 4 + s / 8, Math.max(0.8, s * 0.02), c); break;
        case "u": t = path("M" + n(s * 0.25) + " " + n(s * 0.2) + "V" + n(s * 0.5) + "A" + n(s * 0.25) + " " + n(s * 0.25) + " 0 0 0 " + n(s * 0.75) + " " + n(s * 0.5) + "V" + n(s * 0.2), c, sw); break;
        case "solid": t = rect(0, 0, s, s, "green") + plus(s / 2, s / 2, s * 0.46, s * 0.12, "ink"); break;
        case "full": t = circ(s / 2, s / 2, s * 0.1, "green"); break;
      }
      out += '<g transform="translate(' + x + " " + y + ')" clip-path="url(#' + id + 'c)">' + t + "</g>";
    }
    return svgOpen(w, h, "terminal", o.label) + "<defs>" + defs + "</defs>" + out + "</svg>";
  }

  // Convenience: the right pattern for a track. "design" → Glyph Tiles, anything else → Terminal.
  function forTrack(track, o) { return track === "design" ? glyph(o) : terminal(o); }

  return { glyph: glyph, terminal: terminal, forTrack: forTrack, hash: hash };
});
