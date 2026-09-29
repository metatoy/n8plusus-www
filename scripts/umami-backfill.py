#!/usr/bin/env python3
"""Backfill Umami (stats.n8plusus.com) with page views from the central Traefik access log.

Umami only records visits from the moment its tag is live. The Traefik log has every request
since 2026-08-05, so this turns that history into Umami rows: one SQL file you load into the
Umami Postgres. Nothing here talks to the server; it reads a local log extract and writes SQL.

  1. Pull the log extract (both hosts, gzipped JSON lines):
       ssh sorb 'grep -E "\\"RequestHost\\":\\"(www\\.)?n8plusus\\.com\\"" /data/coolify/proxy/access.log' \\
         | gzip > n8-access.jsonl.gz
  2. Build the SQL. --until is when the live Umami tag went out, so nothing is counted twice:
       python3 scripts/umami-backfill.py n8-access.jsonl.gz --until 2026-09-28T23:30:00Z > backfill.sql
  3. Load it:
       ssh sorb 'docker exec -i postgresql-x111mignh0kb6igpws5h1ion psql -U umami -d umami' < backfill.sql
  Undo (every row is tagged):
       DELETE FROM website_event WHERE tag = 'backfill-accesslog';
       DELETE FROM session WHERE distinct_id = 'backfill-accesslog';

What counts as a page view, and who is dropped (same rules as the access-log traffic report):
  - GET, status 200 or 304, a page path (no extension, trailing slash or .html), not /api/.
  - Founder IPs (FOUNDER below), bot/tool user agents, and ip-api "hosting"/"proxy" IPs.
  - Any IP+UA pair that never fetched a .css or .js file: real browsers always do, scanners
    and single-request crawlers do not. This is the filter that removes most of the noise.
A visitor is one IP+UA pair; a new visit starts after 30 idle minutes. The log keeps no referrer
or screen size, so those Umami fields stay empty. Geo is from ip-api.com (batch, free tier).
Schema: Umami v3 (session / website_event), checked against v3.4.0.
"""
import argparse, gzip, json, re, sys, time, urllib.request, uuid
from datetime import datetime, timedelta, timezone
from html import unescape
from pathlib import Path

WEBSITE_ID = "1ffbf343-e2b5-41ec-be9c-f723ec2a0121"
TAG = "backfill-accesslog"
HOSTNAME = "n8plusus.com"
# Home (Comcast) and AT&T cellular iPhone, per scripts/access-report.sh.
FOUNDER = {"24.118.128.135", "69.225.203.246"}
BOT_UA = re.compile(r"bot|crawl|spider|curl|wget|python|monitor|better ?stack|uptime|scan|http-client"
                    r"|semrush|ahrefs|node|headless|lighthouse|preview|facebookexternalhit|slurp", re.I)
VISIT_GAP = timedelta(minutes=30)
NS = uuid.UUID("6f0c5a8e-2b1d-4c3e-9a7f-0d4e5b6c7a8b")  # fixed, so re-runs give the same IDs

PUBLIC = Path(__file__).resolve().parent.parent / "public"


def is_page(path):
    p = path.split("?", 1)[0]
    if p.startswith("/api/"):
        return False
    last = p.rsplit("/", 1)[-1]
    return last == "" or last.endswith(".html") or "." not in last


def is_asset(path):
    return bool(re.search(r"\.(css|js|mjs)(\?|$)", path))


def parse_ua(ua):
    """(browser, os, device) in Umami's vocabulary (detect-browser names)."""
    u = ua
    if "Edg/" in u: browser = "edge-chromium"
    elif "CriOS" in u: browser = "crios"
    elif "FxiOS" in u: browser = "fxios"
    elif "SamsungBrowser" in u: browser = "samsung"
    elif "OPR/" in u or "Opera" in u: browser = "opera"
    elif "Instagram" in u: browser = "instagram"
    elif "FBAN" in u or "FBAV" in u: browser = "facebook"
    elif "Firefox/" in u: browser = "firefox"
    elif "Chrome/" in u: browser = "chrome"
    elif "iPhone" in u or "iPad" in u: browser = "ios"
    elif "Safari/" in u: browser = "safari"
    else: browser = None
    if "iPhone" in u or "iPad" in u: os_ = "iOS"
    elif "Android" in u: os_ = "Android OS"
    elif "CrOS" in u: os_ = "Chrome OS"
    elif "Windows NT 10" in u: os_ = "Windows 10"
    elif "Windows" in u: os_ = "Windows"
    elif "Mac OS X" in u or "Macintosh" in u: os_ = "Mac OS"
    elif "Linux" in u: os_ = "Linux"
    else: os_ = None
    if "iPad" in u or ("Android" in u and "Mobile" not in u): device = "tablet"
    elif "Mobile" in u or "iPhone" in u: device = "mobile"
    else: device = "desktop"
    return browser, os_, device


def page_titles():
    """url path -> <title>, read from the site's own HTML."""
    titles = {}
    for f in PUBLIC.rglob("*.html"):
        m = re.search(r"<title>(.*?)</title>", f.read_text(errors="ignore"), re.S | re.I)
        if not m:
            continue
        rel = "/" + f.relative_to(PUBLIC).as_posix()
        t = unescape(m.group(1).strip())[:500]
        titles[rel] = t
        if rel.endswith("/index.html"):
            titles[rel[: -len("index.html")]] = t
    return titles


def geolocate(ips):
    """ip -> ip-api record. Batch endpoint: 100 IPs a call, 15 calls a minute on the free tier."""
    out, ips = {}, sorted(ips)
    fields = "status,query,countryCode,region,city,proxy,hosting"
    for i in range(0, len(ips), 100):
        chunk = ips[i:i + 100]
        req = urllib.request.Request(f"http://ip-api.com/batch?fields={fields}",
                                     data=json.dumps(chunk).encode(), headers={"Content-Type": "application/json"})
        for r in json.load(urllib.request.urlopen(req, timeout=30)):
            if r.get("status") == "success":
                out[r["query"]] = r
        if i + 100 < len(ips):
            time.sleep(4.5)
    return out


def parse_utc(s):
    """Traefik StartUTC is RFC 3339 with 0-9 fraction digits (trailing zeros trimmed);
    Python 3.9's fromisoformat only takes 3 or 6, so pad or cut to 6."""
    m = re.match(r"(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d)(?:\.(\d+))?", s)
    if not m:
        return None
    frac = (m.group(2) or "").ljust(6, "0")[:6]
    return datetime.fromisoformat(f"{m.group(1)}.{frac}+00:00")


def sql(v):
    if v is None:
        return "NULL"
    return "'" + str(v).replace("'", "''") + "'"


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("log", help="gzipped Traefik JSON-lines extract for n8plusus.com")
    ap.add_argument("--until", required=True, help="UTC cutoff, ISO 8601: when the live Umami tag went out")
    ap.add_argument("--no-geo", action="store_true", help="skip ip-api lookups (offline test)")
    a = ap.parse_args()
    until = datetime.fromisoformat(a.until.replace("Z", "+00:00"))

    rows, assets = [], set()
    opener = gzip.open if a.log.endswith(".gz") else open
    with opener(a.log, "rt") as fh:
        for line in fh:
            try:
                r = json.loads(line)
            except ValueError:
                continue
            if r.get("RequestHost", "").removeprefix("www.") != HOSTNAME:
                continue
            ip, ua, path = r.get("ClientHost", ""), r.get("request_User-Agent", "") or "", r.get("RequestPath", "")
            ts = parse_utc(r.get("StartUTC", ""))
            if not ts or ts >= until or ip in FOUNDER or not ua or BOT_UA.search(ua):
                continue
            if is_asset(path):
                assets.add((ip, ua))
            if r.get("RequestMethod") == "GET" and r.get("DownstreamStatus") in (200, 304) and is_page(path):
                rows.append((ts, ip, ua, path))

    rows = [x for x in rows if (x[1], x[2]) in assets]
    geo = {} if a.no_geo else geolocate({ip for _, ip, _, _ in rows})
    rows = [x for x in rows if not (geo.get(x[1], {}).get("hosting") or geo.get(x[1], {}).get("proxy"))]
    rows.sort()
    titles = page_titles()

    sessions, events, last_seen = {}, [], {}
    for ts, ip, ua, path in rows:
        key = (ip, ua)
        sid = uuid.uuid5(NS, f"session|{ip}|{ua}")
        if key not in sessions:
            g = geo.get(ip, {})
            b, o, d = parse_ua(ua)
            cc = g.get("countryCode")
            sessions[key] = (sid, ts, b, o, d, cc, f"{cc}-{g['region']}" if cc and g.get("region") else None,
                             (g.get("city") or None))
        prev = last_seen.get(key)
        if not prev or ts - prev[0] > VISIT_GAP:
            vid = uuid.uuid5(NS, f"visit|{ip}|{ua}|{ts.isoformat()}")
        else:
            vid = prev[1]
        last_seen[key] = (ts, vid)
        url_path, _, query = path.partition("?")
        eid = uuid.uuid5(NS, f"event|{ip}|{ua}|{ts.isoformat()}|{path}")
        title = titles.get(url_path) or titles.get(url_path + ".html") or titles.get(url_path + "/")
        events.append((eid, sid, vid, ts, url_path[:500], query[:500] or None, title))

    print(f"-- Umami backfill from Traefik access log, cutoff {until.isoformat()}")
    print(f"-- {len(sessions)} visitors, {len({e[2] for e in events})} visits, {len(events)} page views")
    print("BEGIN;")
    for sid, ts, b, o, d, cc, region, city in sessions.values():
        print("INSERT INTO session (session_id, website_id, browser, os, device, country, region, city,"
              f" distinct_id, created_at) VALUES ({sql(sid)}, {sql(WEBSITE_ID)}, {sql(b)}, {sql(o)}, {sql(d)},"
              f" {sql(cc)}, {sql(region and region[:20])}, {sql(city and city[:50])}, {sql(TAG)},"
              f" {sql(ts.isoformat())}) ON CONFLICT (session_id) DO NOTHING;")
    for eid, sid, vid, ts, p, q, title in events:
        print("INSERT INTO website_event (event_id, website_id, session_id, visit_id, created_at, url_path,"
              " url_query, page_title, event_type, tag, hostname) VALUES"
              f" ({sql(eid)}, {sql(WEBSITE_ID)}, {sql(sid)}, {sql(vid)}, {sql(ts.isoformat())}, {sql(p)},"
              f" {sql(q)}, {sql(title)}, 1, {sql(TAG)}, {sql(HOSTNAME)}) ON CONFLICT (event_id) DO NOTHING;")
    print("COMMIT;")
    print(f"{len(sessions)} visitors, {len(events)} page views, cutoff {until.isoformat()}", file=sys.stderr)


if __name__ == "__main__":
    main()
