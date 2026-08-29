# n8plusus.com — Demo traffic report (today, 2026-08-05)

Source: central Traefik access log (`/data/coolify/proxy/access.log`), real client IPs.
Window: last 24h. Generated via `scripts/access-report.sh n8plusus.com /demo 24`.

## Summary

**38 requests total · 31 passed the UA bot-filter — but on inspection, 0 are genuine outside visitors.**
All traffic on the `/demo` path today resolves to two sources:

| Source | IPs | Requests | What it is |
|---|---|---|---|
| **Founder (you)** | `24.118.128.135` (Saint Paul) | 13 | Your own visits/checks from home |
| **Google** | `64.233.172.40–42` (Mountain View) | 12 | Google image proxy / prefetch |
| **Googlebot** | `66.249.65.96–105` (Pryor, OK) | 6 | Google crawler indexing the demo |

> The `64.233.172.x` and `66.249.65.x` ranges are Google-owned. They slipped past the
> report's bot-filter because Google's image-fetch/proxy user-agents don't match the
> `bot|crawl|spider|...` regex. Treat them as automated, not human.

**Bottom line:** no organic external human landed on the demo today. The only "real" human
in the log is you. Google actively crawled/indexed the demo (good for SEO — it's discoverable),
but that hasn't yet converted to outside visitors.

## Timeline (today, all times UTC)

- **13:23–13:57** — your session from Saint Paul: loaded `/demo/20260803/` then all 6 portfolio images.
- **13:25–13:52** — Google (Mountain View proxy + Pryor Googlebot) fetched the 6 portfolio images,
  twice — consistent with indexing / cache-warming right after your visit.
- **17:00** — a second founder session (Saint Paul) re-pulled the 6 images.

## Assets fetched (each hit 5×)

All 200 OK — nothing broken:

- `assets/portfolio/e-migration/home-redesign.png`
- `assets/portfolio/i-snap-quiz/2-build-2.png`
- `assets/portfolio/g-callout/live.png`
- `assets/portfolio/b-tag-yourself/product-result-page.png`
- `assets/portfolio/c-turn-key-sharing/word-chain.png`
- `assets/portfolio/h-woords/2-board-solving.png`

## Notes / caveats

- Access logging only went live **2026-08-05** (central Traefik accesslog) — there is **no
  retroactive history** before today.
- GA4 (`G-FJ2Q9HVPTZ`) is also live on these pages now; Realtime/GA will corroborate this
  once standard reports catch up (24–48h lag).
- To re-run for any window: `bash scripts/access-report.sh n8plusus.com /demo <hours>`
  (e.g. `168` for the week).
