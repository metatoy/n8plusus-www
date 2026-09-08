// The GA4 tag for n8plusus.com — one definition, used by the portfolio generator
// (build-portfolio.mjs) and the static-page injector (scripts/inject-ga.mjs).
export const GA_ID = "G-FJ2Q9HVPTZ";
export const GA_SNIPPET = `<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
`;
