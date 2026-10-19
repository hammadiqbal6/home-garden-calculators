# SEO guide — launch & 90-day plan

Governing playbooks: [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md), [MARKET-RESEARCH.md](./MARKET-RESEARCH.md), [KEYWORD-MAP.md](./KEYWORD-MAP.md).

## Launch checklist

### Technical

- [ ] HTTPS + single canonical host (www or apex)
- [ ] `robots.txt` allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot
- [ ] Sitemap at `/sitemap-index.xml` with accurate `lastmod`
- [ ] Canonicals on every page; clean hyphenated URLs; trailing slashes
- [ ] JSON-LD: WebSite, Organization, BreadcrumbList, WebApplication (tools), Article (guides)
- [ ] 404 page with links; no orphan pages (`npm run audit:seo`)
- [ ] Core Web Vitals budgets green (`npm run audit` / Lighthouse CI)

### Content / E-E-A-T

- [ ] 12+ working tools with 600–1200 words each
- [ ] 5+ guides with citations
- [ ] About, Contact, Privacy, Terms, Methodology, Authors
- [ ] Visible last-updated dates + author box

## Google Search Console

1. Add a **Domain** property for `yardcalc.example` (DNS TXT verification).
2. Or URL-prefix property + HTML tag (`siteConfig.analytics.searchConsoleVerification`).
3. Submit `https://www.your-domain/sitemap-index.xml`.
4. URL Inspection → Request indexing for home, hubs, and top tools.
5. Monitor Page indexing, Experience / Core Web Vitals, and Performance (including Generative AI reports when available).

## Bing Webmaster Tools + IndexNow

1. Import from GSC or verify DNS.
2. Submit the same sitemap.
3. Place IndexNow key file at `public/<key>.txt` matching `siteConfig.indexNowKey` (committed key: `c2a68b8b8e7e6ba2253b408fa0fe2c4c`).
4. After deploy, run `node scripts/indexnow.mjs` (or use Workers Builds deploy: `npx wrangler deploy && node scripts/indexnow.mjs`). It submits every URL from the built sitemap. Use `--dry-run` to preview; `INDEXNOW_DISABLE=1` to skip.
5. **Note:** Google does not participate in IndexNow. Do not ping from `npm run build` — the key must be live first.

## GA4

1. Create a GA4 property; copy Measurement ID `G-XXXXXXXX`.
2. Set `siteConfig.analytics.ga4MeasurementId`.
3. Redeploy; confirm page_view in DebugView.

## Keyword research workflow (free)

1. Expand seeds with Google Autocomplete (`[tool]`, `[tool] for`, a–z, year).
2. Mine People Also Ask + Reddit for FAQ phrasing.
3. Check volumes/KD manually in Ahrefs free tools, Semrush free, or Keyword Planner.
4. Prefer KD ≤30 where SERPs already show small tool sites.
5. After launch, mine GSC queries at positions 8–30 for FAQ/options—not new thin URLs.

## Target keyword map

See [KEYWORD-MAP.md](./KEYWORD-MAP.md) for every live URL.

## Content calendar — next 20 articles

| # | Working title | Primary intent | Links to |
|---|---|---|---|
| 1 | Concrete slab thickness guide | how thick concrete slab | concrete calculator |
| 2 | How much gravel for a driveway | driveway gravel depth | gravel calculator |
| 3 | How many fence posts do I need | fence post spacing | fence calculator |
| 4 | Deck joist spacing explained | deck joist 16 inch | deck calculator |
| 5 | Asphalt shingles waste factor | roofing waste percent | shingles calculator |
| 6 | Best mulch for flower beds | mulch types | mulch calculator |
| 7 | How to calculate cubic yards | cubic yards formula | several tools |
| 8 | Sonotube sizes chart | sonotube diameter | sonotube calculator |
| 9 | Paver base depth guide | paver base gravel | paver calculator |
| 10 | Retaining wall height limits DIY | SRW height | retaining wall |
| 11 | How much paint for exterior siding | exterior paint coverage | paint calculator |
| 12 | Topsoil vs garden soil | topsoil types | topsoil calculator |
| 13 | Raised bed soil mix ratios | soil mix | raised bed calculator |
| 14 | Grass seed types by region | cool vs warm season | grass seed |
| 15 | Fertilizer numbers explained | NPK meaning | fertilizer calculator |
| 16 | How to estimate sand for a sandbox | play sand volume | sand calculator |
| 17 | Concrete bag brands yield comparison | sakrete vs quikrete | bags guide |
| 18 | How to calculate roof squares | roofing square | shingles calculator |
| 19 | Fence concrete vs gravel set | post setting methods | post holes |
| 20 | Cost estimate worksheet (materials only) | material cost DIY | hub pages |

## Link-building plan

1. Resource-page outreach: `"[topic] resources"` / university extension link lists.
2. Helpful Reddit/forum answers (r/fencing, r/decks, r/landscaping)—value first.
3. Product Hunt / Indie Hackers launch post.
4. Embeddable widgets (`/embed/<slug>/`) with visible credit link (no keyword-stuffed widgets).
5. Original data story later (anonymous aggregate “what people calculate”).
6. Avoid PBNs, paid links without `rel=sponsored`, and widget spam.

## AI-search (GEO) steps

- Allow AI search bots in `robots.txt` (already configured).
- Keep answer-first paragraphs, tables with dates/sources, clear entity name **YardCalc**.
- Optional `llms.txt` is published; Google ignores it—do not rely on it.
- Measure AI Overview/Mode traffic inside GSC when available.

## 90-day plan

| Weeks | Focus |
|---|---|
| 1–2 | Launch, GSC/Bing/IndexNow, fix CWV |
| 3–4 | 5+ calendar articles; request indexing |
| 5–6 | Apply AdSense if traffic + page count OK |
| 7–8 | Embed widget outreach; 30–50 resource emails |
| 9–10 | Optimize titles/FAQs from GSC positions 8–30 |
| 11–12 | Add 3–5 backlog tools (stair stringer, sod, pool volume…) |

## KPI suggestions

Pages indexed, impressions/clicks per tool, average position for primaries, referring domains (quality), AdSense approval, then RPM by country.
