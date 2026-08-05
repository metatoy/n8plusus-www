#!/usr/bin/env bash
# access-report.sh — demo-path (and overall) access report for n8plusus-www.
# Pulls the live morgan access logs from the prod container, parses them, geo-locates
# the client IPs (ip-api.com, free), and prints time/date · IP→location · demo file · distribution.
#
# Usage:  bash scripts/access-report.sh [HOURS]   (default 168 = 7 days)
# Note: in-container logs reset on each redeploy, so history starts at the last deploy.
set -euo pipefail
HOURS="${1:-168}"
BOX=5.78.129.14
APP_PREFIX=s11umntkdx81mbu416ec81bu
KEY="${SORB_KEY:-$HOME/.ssh/id_ed25519_sorb}"

TMP="$(mktemp)"; trap 'rm -f "$TMP"' EXIT
CID=$(ssh -i "$KEY" -o StrictHostKeyChecking=no -o ConnectTimeout=10 root@$BOX \
  "docker ps --filter name=$APP_PREFIX -q" 2>/dev/null | tail -1)
ssh -i "$KEY" -o StrictHostKeyChecking=no -o ConnectTimeout=10 root@$BOX \
  "docker logs --since ${HOURS}h $CID 2>&1" 2>/dev/null | grep -E '"(GET|POST|HEAD)' > "$TMP" || true

python3 - "$TMP" "$HOURS" <<'PY'
import sys, re, json, urllib.request, collections
logf, hours = sys.argv[1], sys.argv[2]
# Apache combined: IP - - [ts] "METHOD path HTTP/x" status size "ref" "ua"
rx = re.compile(r'^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) [^"]*" (\d+) (\S+) "([^"]*)" "([^"]*)"')
rows = []
for line in open(logf, encoding='utf-8', errors='replace'):
    m = rx.match(line.strip())
    if not m: continue
    ip, ts, meth, path, status, size, ref, ua = m.groups()
    rows.append(dict(ip=ip, ts=ts, meth=meth, path=path, status=status, ref=ref, ua=ua))

def is_bot(ua):
    return bool(re.search(r'bot|crawl|spider|curl|wget|python|scan|http-client|semrush|ahrefs', ua, re.I))

human = [r for r in rows if not is_bot(r['ua'])]
demo  = [r for r in human if r['path'].startswith('/demo')]

# geo-locate distinct IPs via ip-api batch (free, no key)
ips = sorted({r['ip'] for r in human})
geo = {}
for i in range(0, len(ips), 100):
    chunk = ips[i:i+100]
    try:
        req = urllib.request.Request('http://ip-api.com/batch',
              data=json.dumps([{"query": ip, "fields": "query,country,regionName,city"} for ip in chunk]).encode(),
              headers={'Content-Type': 'application/json'})
        for g in json.loads(urllib.request.urlopen(req, timeout=15).read()):
            geo[g.get('query')] = f"{g.get('city') or '?'}, {g.get('regionName') or ''} {g.get('country') or '?'}".strip()
    except Exception:
        pass

def loc(ip): return geo.get(ip, '(geo n/a)')

print(f"\n=== n8plusus-www access report — last {hours}h ===")
print(f"total requests: {len(rows)} | human (non-bot): {len(human)} | DEMO-path: {len(demo)}\n")

print("--- DEMO-PATH ACCESSES (time · IP · location · file) ---")
if not demo: print("  (none yet — logging just started; real demo visits will appear here)")
for r in demo[-40:]:
    print(f"  {r['ts']}  {r['ip']:<16} {loc(r['ip']):<28} {r['path']}")

print("\n--- distribution: by DEMO file ---")
for path, n in collections.Counter(r['path'] for r in demo).most_common(15):
    print(f"  {n:>4}  {path}")

print("\n--- distribution: by DATE (human, all paths) ---")
for day, n in sorted(collections.Counter(r['ts'][:11] for r in human).items()):
    print(f"  {day}  {n}")

print("\n--- distribution: by LOCATION (human, all paths) ---")
for l, n in collections.Counter(loc(r['ip']) for r in human).most_common(15):
    print(f"  {n:>4}  {l}")
PY
