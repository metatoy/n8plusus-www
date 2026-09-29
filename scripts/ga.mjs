// The analytics tags for n8plusus.com — one definition each, used by the portfolio generator
// (build-portfolio.mjs) and the static-page injector (scripts/inject-ga.mjs).
export const GA_ID = "G-FJ2Q9HVPTZ";
export const GA_SNIPPET = `<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
`;

// Self-hosted Umami on the Coolify box (stats.n8plusus.com). data-domains keeps local dev
// and preview hosts out of the numbers.
export const UMAMI_ID = "1ffbf343-e2b5-41ec-be9c-f723ec2a0121";
export const UMAMI_SNIPPET = `<!-- Umami (stats.n8plusus.com) -->
<script defer src="https://stats.n8plusus.com/script.js" data-website-id="${UMAMI_ID}" data-domains="n8plusus.com,www.n8plusus.com"></script>
`;

// Every tag a page should carry, keyed by the string that proves it is already there.
export const TAGS = [
  { id: GA_ID, snippet: GA_SNIPPET },
  { id: UMAMI_ID, snippet: UMAMI_SNIPPET },
];
