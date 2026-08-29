# Traffic report — metatoy.com + n8plusus.com (24h, 2026-08-05)

Source: central Traefik access log (`/data/coolify/proxy/access.log`), real client IPs.
Classified: exploit/scanner probes vs founder vs Google vs other.

## Headline

**Almost all traffic on both sites is automated — vulnerability scanners and crawlers, not
real visitors.** The only confirmed human is you (Saint Paul, `24.118.128.135`).

| | metatoy.com | n8plusus.com |
|---|---|---|
| Total requests (24h) | 599 | 1,076 |
| Exploit/scanner probes | **428** | **869** |
| ↳ that returned HTTP **200** | **0** ✅ | **460** ⚠️ |
| Founder (you) | 24 | 54 |
| Google (crawl/proxy) | 0 | 104 |
| Other non-scanner | 147 *(mostly bots too)* | 49 *(mostly bots too)* |

The "other" bucket on both sites is dominated by `/robots.txt` fetchers and bare-`/` crawlers
from cloud IPs (AWS, OVH, UCloud CN, Azure) — not organic human sessions. Realistic genuine
human traffic in the last 24h ≈ **just you**, on both sites.

## ⚠️ Finding: n8plusus.com returns HTTP 200 to exploit-probe paths

Scanners hammer both sites with WordPress/PHP exploit paths (`/wp-login.php`, `/admin.php`,
`/222.php`, `/alfa.php`, `/wp-content/plugins/hellopress/wp_filemanager.php`, …).

- **metatoy.com** correctly answers **404** for all of them (0 scanner 200s). ✅
- **n8plusus.com** answers **200** for **460** of them today. ⚠️

**This is not a compromise** — n8plusus is an Express static server with no PHP interpreter, so
nothing executes; it's just serving the static page (or its catch-all) with a 200 for any
unknown path. But it's poor hygiene: it tells every scanner "this path exists," inflates the
log with false 200s, and wastes bandwidth serving HTML to garbage requests.

**Recommended fix:** make the Express static handler return a real **404** for unknown paths
instead of falling through to `index.html`. (Say the word and I'll patch `server.js`.)

## Where the noise comes from

Top scanner sources (24h): Zurich CH, Gävle SE, Milan IT, Madrid ES, Lørenskog NO
(`20.100.186.69`, Azure — probes both sites), Warsaw PL, North Charleston US
(`34.24.47.144`, GCP — `/old/ /wp/ /backup/ /wordpress/`). Distributed, opportunistic,
targeting WordPress/PHP CVEs — background-radiation of the public internet, not a targeted
attack.

## Notes

- Access logging went live **2026-08-05** — no history before today.
- GA4 is live on both (`G-DNW50VHNVC` metatoy, `G-FJ2Q9HVPTZ` n8plusus). GA will show a much
  smaller number than these logs because gtag only fires in a **real browser with JS** —
  scanners and crawlers don't run it. That gap (GA « access-log) is itself the proof that this
  traffic is bots.
- Re-run: `bash scripts/access-report.sh <host> "" <hours>`.
