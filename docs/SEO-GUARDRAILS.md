# SEO / AEO guardrails (YardCalc)

Machine-checked where noted (`npm run audit:seo`, `npm run check:links`). Human rules for authors and agents.

## Do

- **One origin:** set `PUBLIC_SITE_URL` (or rely on `DEFAULT_SITE_URL` in `src/config/site-origin.mjs`). Use `siteConfig.siteUrl` / `resolveSiteOrigin()` for canonicals, sitemap, robots Sitemap line, llms.txt, OG, JSON-LD, IndexNow. See [CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md).
- **Titles ≤60 characters** (including brand suffix). Keyword near the start.
- **Meta descriptions 50–165 characters** (aim 120–160).
- **Exactly one H1** per page; answer-first intro (about 40–60 words) under the H1 on home, tools, and guides.
- **Self-canonical** absolute URL ending in `/`, same host as `PUBLIC_SITE_URL`.
- **og:image** absolute URL that does **not** end with `/`. Prefer per-page `/og/*.svg` (or default PNG).
- **Tool → guide:** every calculator page links ≥1 topical guide (“Learn more” near the tool).
- **Guides ≥800 words** (aim ~1,000+) with worked example, table, visible FAQ, sources, author/dateModified.
- **FAQPage** JSON-LD on guides/tools that show FAQs; Article + author Person on guides.
- **Topic-matched related links** (tools and guides)—never a fixed concrete/gravel/mulch list on every page.
- **Sitemap:** every indexable HTML page in `sitemap-index.xml` children; `/sitemap.xml` **301** → `/sitemap-index.xml` (Worker + `_redirects`).
- **Worker `FILE_EXT`:** treat extensions up to 16 chars as files (e.g. `.webmanifest`) so they are not slash-redirected.
- **Cache:** `/_astro/*` immutable long-cache; images/favicons sensible `max-age` in `public/_headers`.
- **IndexNow:** real key file in `public/<key>.txt` matching `siteConfig.indexNowKey` (no placeholders).

## Don’t

- Don’t hardcode this site’s `*.workers.dev` hostname outside `site-origin.mjs` (CI fails).
- Don’t ship `example.com` / `yardcalc.example` in app output or app source.
- Don’t use a **200 proxy copy** for `/sitemap.xml`—use **301**.
- Don’t put `import` inside classic inline `<script>` (breaks GA; use `data-*` + bundled module or IIFE).
- Don’t put build-only `PUBLIC_*` only in top-level wrangler `vars` if you need `npx wrangler preview`—that pattern broke previews on file-converter-tools. Prefer build-time env (Workers Builds / GitHub Actions); document preview env separately.
- Don’t invent statistics, studies, or quotes; label rules of thumb; point to labels and local codes.
- Don’t cannibalize primary keywords (see [KEYWORD-MAP.md](./KEYWORD-MAP.md)).
- Don’t merge custom-domain cutover into code until DNS + GSC are ready ([CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md)).

## CI failure conditions (`audit:seo`)

| Check | Fail when |
|---|---|
| example.com in `dist/` | placeholder domains in build output |
| Hardcoded this-site workers.dev | appears outside `site-origin.mjs` / `CUSTOM-DOMAIN.md` |
| og:image trailing `/` | image URL ends with `/` |
| Title | missing or `>60` chars |
| Meta description | missing or outside 50–165 |
| Canonical | missing or wrong host |
| H1 | missing or more than one |
| Tool without guide link | no `/guides/…` href on tool pages |
| Guide length | `<800` words in `<article>` |
| Sitemap coverage | HTML page URL not in sitemap |
| Broken internal links | href target missing in `dist/` |
| JSON-LD | missing on key templates or `JSON.parse` fails |
| Inline `import` | non-module script body contains `import` |
| IndexNow | placeholder key or missing key file |

Also run `npm test`, `npm run build`, `npm run check:links`, `npm run audit` (SEO + AdSense + perf).
