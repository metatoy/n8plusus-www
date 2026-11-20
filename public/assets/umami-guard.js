/*
 * Umami bot guard (stats.n8plusus.com). Shared by n8plusus.com and metatoy.com;
 * keep the two copies identical.
 *
 * Load it before the Umami tracker and point the tracker at it with
 * data-before-send="umamiBeforeSend". It does three things:
 *
 * 1. Drops browsers whose details are impossible or automated: navigator.webdriver,
 *    headless or crawler user agents, a window with no size (headless), a phone user
 *    agent with a desktop-size screen, an 800x600 screen, Windows 7 or 8, Chrome two
 *    or more years old, and the "@posix" language that scripted runtimes report.
 * 2. Drops page bursts: when one browser opens three or more pages of the site within
 *    1.5 seconds (how link scanners such as Microsoft 365's email security open every
 *    link at once), that browser is marked automated for 24 hours and none of its
 *    pageviews are sent, including ones it is still holding.
 * 3. Holds every pageview until the visitor does something only a person's input
 *    produces: a click or tap, a key press, a mouse-wheel or trackpad scroll, or a
 *    pointer that moves to different spots over at least a tenth of a second. Events
 *    created by page scripts (isTrusted false) don't count, and neither does a plain
 *    scroll event, which scripts can cause. Held pageviews are sent at that moment, with
 *    their original URL, title and referrer; anything held when the page closes without
 *    interaction is never sent.
 *
 * Debug: window.umamiGuard shows the drop reason and whether interaction was seen.
 */
(function (w) {
  var nav = w.navigator || {};
  var ua = nav.userAgent || '';
  var scr = w.screen || {};
  var sw = scr.width || 0;
  var sh = scr.height || 0;
  var lang = String(nav.language || '');

  var FLAG_KEY = 'umamiGuardAutomated';
  var LOADS_KEY = 'umamiGuardLoads';
  var BURST_PAGES = 3;
  var BURST_MS = 1500;
  var FLAG_MS = 24 * 3600 * 1000;

  // Chrome ships a major version about every 28 days; 120 shipped 2023-12-05.
  function chromeNow() {
    return 120 + Math.floor((Date.now() - Date.UTC(2023, 11, 5)) / (28 * 864e5));
  }

  function dropReason() {
    if (nav.webdriver) return 'webdriver';
    if (/HeadlessChrome|PhantomJS|Lighthouse|bot\b|crawler|spider/i.test(ua)) return 'automated-ua';
    if (w.outerWidth === 0 || w.outerHeight === 0) return 'no-window';
    if (/iPhone|iPod|Android.+Mobile/.test(ua) && Math.max(sw, sh) > 1200) return 'phone-with-desktop-screen';
    if (sw === 800 && sh === 600) return 'screen-800x600';
    if (/Windows NT (5\.|6\.[0-3])/.test(ua)) return 'old-windows';
    var c = ua.match(/Chrome\/(\d+)/);
    if (c && +c[1] < chromeNow() - 26) return 'old-chrome';
    if (/@posix/i.test(lang)) return 'posix-language';
    return '';
  }

  function storage() {
    try {
      return w.localStorage || null;
    } catch (e) {
      return null;
    }
  }

  // True while this browser carries a burst flag from the last 24 hours.
  function flagged() {
    var ls = storage();
    if (!ls) return false;
    try {
      var at = +ls.getItem(FLAG_KEY) || 0;
      return at > 0 && Date.now() - at < FLAG_MS;
    } catch (e) {
      return false;
    }
  }

  // Record this page load; flag the browser if it opened BURST_PAGES pages within BURST_MS.
  function recordLoad() {
    var ls = storage();
    if (!ls) return '';
    var now = Date.now();
    try {
      var recent = JSON.parse(ls.getItem(LOADS_KEY) || '[]').filter(function (t) {
        return now - t < BURST_MS;
      });
      recent.push(now);
      ls.setItem(LOADS_KEY, JSON.stringify(recent.slice(-10)));
      if (recent.length >= BURST_PAGES) {
        ls.setItem(FLAG_KEY, String(now));
        return 'page-burst';
      }
    } catch (e) {}
    return '';
  }

  var reason = dropReason() || (flagged() ? 'page-burst' : '') || recordLoad();
  var human = false;
  var held = [];
  var moves = [];
  var DIRECT = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
  var ALL = DIRECT.concat(['pointermove']);

  function blocked() {
    if (!reason && flagged()) reason = 'page-burst';
    w.umamiGuard.reason = reason;
    return !!reason;
  }

  function release() {
    if (human) return;
    human = true;
    w.umamiGuard.human = true;
    ALL.forEach(function (e) {
      w.removeEventListener(e, onInput, true);
    });
    var queue = held;
    held = [];
    if (blocked() || !w.umami) return;
    queue.forEach(function (p) {
      w.umami.track(p);
    });
  }

  function onInput(e) {
    if (human || !e || e.isTrusted === false) return;
    if (e.type !== 'pointermove') return release();
    // A pointer counts once it has moved to at least two spots over 100 ms or more.
    moves.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (moves.length > 20) moves.shift();
    if (moves.length < 3) return;
    var first = moves[0];
    var last = moves[moves.length - 1];
    var spots = {};
    moves.forEach(function (m) {
      spots[m.x + ',' + m.y] = 1;
    });
    if (last.t - first.t >= 100 && Object.keys(spots).length >= 2) release();
  }

  w.umamiGuard = { reason: reason, human: false };

  if (!reason) {
    ALL.forEach(function (e) {
      w.addEventListener(e, onInput, { capture: true, passive: true });
    });
  }

  w.umamiBeforeSend = function (type, payload) {
    if (blocked()) return null;
    if (human) return payload;
    // A pageview is an "event" with no name. Hold it (keep the last five).
    if (type === 'event' && payload && !payload.name) {
      held.push(payload);
      if (held.length > 5) held.shift();
    }
    return null;
  };
})(window);
