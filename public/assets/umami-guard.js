/*
 * Umami bot guard (stats.n8plusus.com). Shared by n8plusus.com and metatoy.com;
 * keep the two copies identical.
 *
 * Load it before the Umami tracker and point the tracker at it with
 * data-before-send="umamiBeforeSend". It does two things:
 *
 * 1. Drops browsers whose details are impossible or automated: navigator.webdriver,
 *    headless or crawler user agents, a phone user agent with a desktop-size screen,
 *    an 800x600 screen, Windows 7 or 8, Chrome two or more years old, and the
 *    "@posix" language that scripted runtimes report.
 * 2. Holds every pageview until the visitor does something a person does
 *    (moves or presses the pointer, scrolls, touches, types). Held pageviews are sent
 *    at that moment, with their original URL, title and referrer; anything held when
 *    the page closes without interaction is never sent.
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

  // Chrome ships a major version about every 28 days; 120 shipped 2023-12-05.
  function chromeNow() {
    return 120 + Math.floor((Date.now() - Date.UTC(2023, 11, 5)) / (28 * 864e5));
  }

  function dropReason() {
    if (nav.webdriver) return 'webdriver';
    if (/HeadlessChrome|PhantomJS|Lighthouse|bot\b|crawler|spider/i.test(ua)) return 'automated-ua';
    if (/iPhone|iPod|Android.+Mobile/.test(ua) && Math.max(sw, sh) > 1200) return 'phone-with-desktop-screen';
    if (sw === 800 && sh === 600) return 'screen-800x600';
    if (/Windows NT (5\.|6\.[0-3])/.test(ua)) return 'old-windows';
    var c = ua.match(/Chrome\/(\d+)/);
    if (c && +c[1] < chromeNow() - 26) return 'old-chrome';
    if (/@posix/i.test(lang)) return 'posix-language';
    return '';
  }

  var reason = dropReason();
  var human = false;
  var held = [];
  var EVENTS = ['pointermove', 'pointerdown', 'scroll', 'wheel', 'touchstart', 'keydown'];

  function release() {
    if (human) return;
    human = true;
    w.umamiGuard.human = true;
    EVENTS.forEach(function (e) {
      w.removeEventListener(e, release, true);
    });
    var queue = held;
    held = [];
    if (reason || !w.umami) return;
    queue.forEach(function (p) {
      w.umami.track(p);
    });
  }

  w.umamiGuard = { reason: reason, human: false };

  if (!reason) {
    EVENTS.forEach(function (e) {
      w.addEventListener(e, release, { capture: true, passive: true });
    });
  }

  w.umamiBeforeSend = function (type, payload) {
    if (reason) return null;
    if (human) return payload;
    // A pageview is an "event" with no name. Hold it (keep the last five).
    if (type === 'event' && payload && !payload.name) {
      held.push(payload);
      if (held.length > 5) held.shift();
    }
    return null;
  };
})(window);
