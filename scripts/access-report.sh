#!/usr/bin/env bash
# access-report.sh — traffic report for ANY site on the Coolify box, from the central
# Traefik access log (/data/coolify/proxy/access.log). Real client IPs, geo-located.
#
# Usage:  bash scripts/access-report.sh <host> [path-prefix] [hours]
#   e.g.  bash scripts/access-report.sh n8plusus.com /demo 168
#         bash scripts/access-report.sh woords.io "" 24
set -euo pipefail

# Founder-IP filter (corrected 2026-08-10): founder = Xfinity/Comcast home
# (24.118.128.135, Falcon Heights) + AT&T cellular iPhone (69.225.203.246;
# AT&T mobile geolocates to Detroit — founder-confirmed). AT&T-cellular iPhone
# hits matching that pattern are likely founder unless proven otherwise.
# NOT founder: 97.116.150.103 (CenturyLink MN iPhone) — a real visitor to the
# family page, 2026-08-08.

HOST="${1:?usage: access-report.sh <host> [path-prefix] [hours]}"
PREFIX="${2:-}"
HOURS="${3:-168}"
BOX=5.78.129.14
KEY="${SORB_KEY:-$HOME/.ssh/id_ed25519_sorb}"

TMP="$(mktemp)"; trap 'rm -f "$TMP"' EXIT
ssh -i "$KEY" -o StrictHostKeyChecking=no -o ConnectTimeout=10 root@$BOX \
  "cat /data/coolify/proxy/access.log /data/coolify/proxy/access.log.* 2>/dev/null" 2>/dev/null > "$TMP" || true

python3 - "$TMP" "$HOST" "$PREFIX" "$HOURS" <<'PY'
import sys, json, urllib.request, collections, datetime
logf, host, prefix, hours = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
cutoff = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=hours)
rows = []
for line in open(logf, encoding='utf-8', errors='replace'):
    line = line.strip()
    if not line or host not in line: continue
    try: e = json.loads(line)
    except: continue
    if e.get('RequestHost') != host: continue
    path = e.get('RequestPath', '') or ''
    if prefix and not path.startswith(prefix): continue
    ts = e.get('StartUTC') or e.get('time') or ''
    try: dt = datetime.datetime.fromisoformat(ts.replace('Z', '+00:00'))
    except: dt = None
    if dt and dt < cutoff: continue
    ua = e.get('request_User-Agent', '') or ''
    rows.append(dict(ip=e.get('ClientHost', '?'), ts=(ts[:19].replace('T', ' ')),
                     path=path, status=e.get('DownstreamStatus', ''), ua=ua))

def is_bot(ua): return bool(__import__('re').search(r'bot|crawl|spider|curl|wget|python|monitor|better ?stack|uptime|scan|http-client|semrush|ahrefs|node', ua, 2))
human = [r for r in rows if not is_bot(r['ua'])]

ips = sorted({r['ip'] for r in human})
geo = {}
for i in range(0, len(ips), 100):
    try:
        req = urllib.request.Request('http://ip-api.com/batch',
              data=json.dumps([{"query": ip, "fields": "query,country,regionName,city"} for ip in ips[i:i+100]]).encode(),
              headers={'Content-Type': 'application/json'})
        for g in json.loads(urllib.request.urlopen(req, timeout=15).read()):
            geo[g.get('query')] = f"{g.get('city') or '?'}, {g.get('country') or '?'}"
    except Exception: pass
def loc(ip): return geo.get(ip, '(geo n/a)')

label = f"{host}{prefix or ''}"
print(f"\n=== access report — {label} — last {hours}h ===")
print(f"requests: {len(rows)} total | {len(human)} human (bots/monitors filtered)\n")
tag = f"{prefix or 'PATH'}"
print(f"--- accesses (time · IP · location · path · status) ---")
if not human: print("  (no human traffic in window yet)")
for r in human[-40:]:
    print(f"  {r['ts']}  {r['ip']:<16} {loc(r['ip']):<24} {r['path'][:34]:<34} {r['status']}")
print("\n--- by PATH ---")
for p, n in collections.Counter(r['path'] for r in human).most_common(15): print(f"  {n:>4}  {p}")
print("\n--- by DATE ---")
for d, n in sorted(collections.Counter(r['ts'][:10] for r in human).items()): print(f"  {d}  {n}")
print("\n--- by LOCATION ---")
for l, n in collections.Counter(loc(r['ip']) for r in human).most_common(15): print(f"  {n:>4}  {l}")
PY
