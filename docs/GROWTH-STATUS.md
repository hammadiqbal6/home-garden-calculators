# Growth / SEO status (living)

**Last updated:** 2026-11-27

Read this before planning growth, SEO, or content work. Update it in the **same PR** when you complete, start, or add an item. Do **not** invent metrics, directory confirmations, or off-repo actions — only record owner-confirmed facts.

Technical “already shipped / don’t re-implement” detail (IndexNow, schema policy, jev-seo false alarms) still lives in [AGENTS.md — SEO state](../AGENTS.md#seo-state-as-of-2026-11-15). This file is the **living** backlog and scoreboard.

Every change/PR must also refresh the **Done** / **Remaining** sections below (and the matching summary in [README.md](../README.md)) in the **same PR**.

## Baseline metrics

As of **2026-11-25** (GSC `sc-domain:getyardtally.com`, last **3 months** unless noted):

| Signal | Value |
|---|---|
| Site | getyardtally.com |
| Stack | Astro on Cloudflare Workers (`home-garden-calculators`); build-time `PUBLIC_*` in Workers Builds env |
| GA4 | Measurement ID `G-N4VRDDEVLP` (property `559570732`) — Consent Mode v2 Advanced with **geo defaults** (EEA/UK/CH denied; elsewhere analytics granted + Reject / Do not sell or share) |
| GSC (last 3 months → 2026-11-25) | **0** clicks · **437** impressions · avg position **47.7** |
| GSC (prior 28-day → 2026-11-17) | **0** clicks · **229** impressions · avg position **58.8** |
| Indexing | **13** pages “Discovered - currently not indexed” (strengthen inbound links); also Page with redirect / Excluded by noindex / Alternate canonical buckets |
| Top queries (impr / pos) | concrete slab calculator 14/36.4; concrete measurement 9/90.3; sonotube concrete calculator 8/43.2; dimensional lumber weight per foot 7/22.0; dimensional lumber weight calculator 6/27.2; brick estimator 5/40.8; lawn fertilizer calculator 5/52.6; concrete sonotube calculator 5/62.2; sonotube calculator 4/55.2; calculator for mulch 4/66.0 |
| Top pages (impr / pos) | brick 48/47.8; concrete 43/52.9; mulch-depth guide 42/34.7; Sonotube 31/50.9; fence-post guide 29/66.4; lumber 27/25.2; roof-pitch guide 26/76.8; paint guide 20/37.2; gravel-types 19/57.6; asphalt 15/52.4 |
| GA4 users (28 days, prior) | **3** users (pre–Consent Mode Advanced) |
| Cloudflare page views (prior window, 2026-11-18 note) | ~**6.2k** (Cloudflare includes bot traffic) |
| Domain rating (owner-reported, Ahrefs-style) | **3** |

## Done

- **2026-11-27 — this PR (Worker `/404/` body):** Live `/404/` returned empty body + `Location: /404/` because the Worker fetched `/404.html` and Assets `force-trailing-slash` 307’d it. Now fetches ASSETS `/404/`, strips Location, forces status 404 (also covers `/404.html`). **No IndexNow.**
- **2026-11-27 — embed framing (#54):** `/embed/*` can be iframed cross-origin (`! X-Frame-Options` + CSP `frame-ancestors *`); site-wide `X-Frame-Options: SAMEORIGIN` unchanged.
- **2026-11-27 — analytics reliability (#53):** GA no longer deferred via `requestIdleCallback` (loads immediately); Accept path sends at most one `page_view` (explicit only if `config` already ran); CSP `script-src` includes `https://*.adtrafficquality.google`.
- **2026-11-27 — geo analytics consent (#52):** Consent Mode region defaults — EEA/UK/CH analytics+ads denied until Google CMP; elsewhere `analytics_storage` granted by default (ads still denied until Accept). Cookie bar Reject label → “Do not sell or share”; new `/cookies/` preference page (`noindex,follow`, sitemap-excluded). Privacy/terms/ADSENSE/AGENTS/consent-csp rules updated to the owner policy (Sidney, 2026-11-27).
- **2026-11-25 — SEO authority + GSC-prioritized variants:** Advanced Consent Mode v2 (always load gtag; default denied; Accept grant / Reject stay denied; hardcoded `DEFAULT_GA4_MEASUREMENT_ID=G-N4VRDDEVLP`). Author/Organization `sameAs` defaults to real GitHub `https://github.com/hammadiqbal6` + About personal-bio expansion. New additive calculators (no URL/title/H1 changes to existing pages): `/calculators/concrete-steps-calculator/`, `/calculators/sod-calculator/`, `/calculators/paver-base-calculator/`, `/calculators/mulch-calculator-circular-beds/`. Expanded lumber-weight chart + brick estimator FAQ; lawn hub + homepage thickened; GSC under-linked pages (brick, asphalt, lumber-weight, fence posts, roof pitch, paint) get stronger home/hub/related inbound. Privacy + terms `noindex, follow` and excluded from sitemap (audits updated). First-party console: directory badge `onerror` + calculator unknown-id guard. **Embed credit (backlink support):** visible dofollow “Calculator by YardTally” → canonical `/calculators/<slug>/` in the copyable snippet and on `/embed/<slug>/` (policy flip from prior nofollow). README links the live site and documents the embed snippet. **No deploy / IndexNow from this agent.**
- **2026-11-22 — this PR (durable SEO + AI Overview agent rules):** Added [`.cursor/rules/seo.mdc`](../.cursor/rules/seo.mdc) and [`.cursor/skills/add-seo-page/SKILL.md`](../.cursor/skills/add-seo-page/SKILL.md); expanded AGENTS.md §5 (titles ≤60 branded, cannibalization/301, inbound-link minimums, answer-under-H2, no hard-coded counts, AI crawlers allowed). Extended existing seo-pages / seo-guardrails / add-calculator / add-guide / pre-merge skills to point at them. **Post-deploy (documented, not run pre-deploy):** `npm run indexnow` submits all sitemap URLs (new pages + redirect targets; key unchanged) + GSC Request indexing for changed pages.
- **2026-11-22 — this PR (SEO title/H1/meta all pages):** Hub/index/calculator/guide titles and H1s rewritten to ≤48 chars without brand (≤60 with `| YardTally`). Concrete calculator titled/answer-first for top web query **concrete slab calculator**. Priority FAQs/bodies expanded. Home popular exact-match anchors + ItemList. 10×10 guide owns 12×12/20×20 sections (no new guide URLs). No sonotube-sizes or fertilizer-per-1000 new URLs.
- **2026-11-22 — this PR (mulch guide merge + weak-page internal links):** Merged `/guides/how-much-mulch-do-i-need/` into `/calculators/mulch-calculator/`; **301** in `_redirects` + `PATH_ALIAS_REDIRECTS`; **kept** `/guides/mulch-depth-guide/` (GSC AI Overview exemplar). Strengthened inbound links for weakly linked footing/slab-cost/deck-footing/French-drain/thickness/how-much-concrete/Sonotube-footing pages.
- **2026-11-22 — this PR (lumber weight + chart guide):** Extended `/calculators/lumber-calculator/` with softwood weight (Wood Handbook densities). New `/guides/lumber-weight-chart/`; no separate lumber-weight calculator URL.
- **2026-11-20 — this PR (Agathox ownership verification):** Home (and all pages via `BaseLayout`) emit `<meta name="agathox-verification" content="agathox-verify-ebf97075afd69f9a">`; static `public/.well-known/agathox-verification.txt` (exact token body). Worker already skips trailing-slash 308 for `.txt` via `FILE_EXT` — covered by unit test; no Worker/CSP/consent changes. Directory listing confirmation remains off-repo until Agathox accepts ownership.
- **2026-11-19 — this PR (Sonotube upgrade):** Optional footing base (`none` / bell frustum / pad cylinder); mixed tube sizes (size B count 0 = unused); live `bags50` (QUIKRETE 0.375 cu ft); bags-per-foot HTML table for 8–36″; `toggleModeFields` hides unused bell/pad inputs; FAQ/body/HowTo refresh; `dateModified` 2026-11-19; unit tests.
- **2026-11-19 — CI / build speed (this PR):** Faster GitHub Actions + in-repo Cloudflare install config without dropping checks. Baseline PR CI job ~22–32s (install ~10–15s, build ~3–5s, tests ~1–2s). Changes: `.npmrc` (`prefer-offline`, `audit=false`, `fund=false`) for Actions + Workers Builds; `npm ci --prefer-offline --no-audit --fund=false`; Astro/Vite `actions/cache`; parallel `build` + `test` in `build-test-audit`; docs/skills-only path skip that still reports the required check; Full checks Playwright Chromium cache (still chromium-only). Concurrency cancel-in-progress was already present.
- **2026-11-19 — French drain gravel calculator (this PR):** `/calculators/french-drain-gravel-calculator/` — trench L×W×D minus perforated pipe volume → gravel cu yd + tons (density input), geotextile wrap fabric area, pipe length; Vitest coverage; linked from gravel + retaining-wall tools and landscape hub via `tools[]`; keyword map + llms Q→URL updated.
- **2026-11-19 — CI / build speed (merged #34):** Faster GitHub Actions + in-repo Cloudflare install config without dropping checks. Baseline PR CI job ~22–32s (install ~10–15s, build ~3–5s, tests ~1–2s). Changes: `.npmrc` (`prefer-offline`, `audit=false`, `fund=false`) for Actions + Workers Builds; `npm ci --prefer-offline --no-audit --fund=false`; Astro/Vite `actions/cache`; parallel `build` + `test` in `build-test-audit`; docs/skills-only path skip that still reports the required check; Full checks Playwright Chromium cache (still chromium-only). Concurrency cancel-in-progress was already present.
- **2026-11-19 — this PR (PAA / AlsoAsked guides, Site B):** Four new question-driven guides — `concrete-slab-thickness`, `how-much-concrete-do-i-need`, `sonotube-footing-and-depth`, `how-much-mulch-do-i-need` — with bodies/FAQs/HowTo, reciprocal tool `relatedGuideSlugs`, KEYWORD-MAP cannibalization notes, and `llms.txt` / `llms-full.txt` Q→URL lines. Primaries avoid colliding with bags / 10×10 / Sonotube volume / mulch-depth / common-beds guides.
- **2026-11-19 — CI / build speed (PR #34):** Faster GitHub Actions + in-repo Cloudflare install config without dropping checks. Baseline PR CI job ~22–32s. `.npmrc` + `npm ci --prefer-offline`; Astro/Vite cache; parallel build+test; docs-only path skip; Playwright Chromium cache on Full checks.
- **2026-11-19 — this PR (human-writing rewrite):** Added [`docs/WRITING-GUIDE.md`](WRITING-GUIDE.md) + AGENTS.md rule (future copy must follow it; detector target AI &lt;30%). Rewrote all `guideBodies.ts` (18) and `toolBodies.ts` (22) for practitioner voice (burstiness, contractions, banned AI tells). Local HF detectors via `scripts/audit/ai-detect.mjs` / `.py` (`Hello-SimpleAI/chatgpt-detector-roberta` + `openai-community/roberta-base-openai-detector`); scores in [`docs/ai-detect-scores.md`](ai-detect-scores.md). Kept URLs, keywords, sourced numbers, internal links.
- **2026-11-19 — PR #34 merged (CI / build speed):** Faster GitHub Actions + in-repo Cloudflare install config without dropping checks. Baseline PR CI job ~22–32s (install ~10–15s, build ~3–5s, tests ~1–2s). Changes: `.npmrc` (`prefer-offline`, `audit=false`, `fund=false`) for Actions + Workers Builds; `npm ci --prefer-offline --no-audit --fund=false`; Astro/Vite `actions/cache`; parallel `build` + `test` in `build-test-audit`; docs/skills-only path skip that still reports the required check; Full checks Playwright Chromium cache (still chromium-only). Concurrency cancel-in-progress was already present.
- **2026-11-19 — PR #33 merged (internal links + indexing audit):** Homepage full calculator grid (all tools by category); hub cross-links (concrete ↔ brick/asphalt, outdoor ↔ rebar/asphalt, lawn fertilizer guide); stronger `relatedSlugs` / body links for weakly linked tools (asphalt, brick, lumber, rebar, paint, roof-pitch, roofing-shingles, fertilizer) and `/guides/how-much-paint-for-a-room/`; `npm run audit:indexing` over `dist/` (sitemap self-canonical, no noindex in sitemap, redirect aliases not linked, every calculator has sitemap `lastmod`); embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — this PR:** Concrete calculator upgrade: optional bag/ready-mix cost inputs (user-entered prices), round order up to ¼ yd.
- **2026-11-19 — this PR (internal links + indexing audit):** Homepage full calculator grid (all tools by category); hub cross-links (concrete ↔ brick/asphalt, outdoor ↔ rebar/asphalt, lawn fertilizer guide); stronger `relatedSlugs` / body links for weakly linked tools (asphalt, brick, lumber, rebar, paint, roof-pitch, roofing-shingles, fertilizer) and `/guides/how-much-paint-for-a-room/`; `npm run audit:indexing` over `dist/` (sitemap self-canonical, no noindex in sitemap, redirect aliases not linked, every calculator has sitemap `lastmod`); embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — this PR:** Gravel/topsoil/sand/mulch upgrade: tons↔yards both ways, bag vs bulk cost compare with user-entered prices.
- **2026-11-19 — this PR (bulk cost upgrade):** Gravel, topsoil, sand, and mulch calculators — tons↔yards both ways (gravel/sand 2,700 lb/yd³, topsoil 2,200 lb/yd³); optional `convertTons` → `yardsFromTons` / `tonsFromYards` result rows; bag counts (0.5 cu ft for gravel/sand/topsoil; 2 & 3 cu ft for mulch); optional `pricePerYard` / `pricePerTon` / `pricePerBag` cost compare when >0 (no invented prices); FAQ/body notes + `dateModified` bump on those four tools.
- **2026-11-19 — PR #33 merged:** Homepage full calculator grid (all tools by category); hub cross-links; stronger `relatedSlugs` / body links; `npm run audit:indexing`; embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — deck footing calculator (this PR):** New `/calculators/deck-footing-calculator/` — deck size + beam/post spacing → footing count, frost-depth hole depth, hole/Sonotube diameter, concrete per pier and total, 40/60/80 lb bags; links to Sonotube calculator; outdoor + concrete hub rows; keyword map + llms Q→URL; unit tests.
- **2026-11-19 — internal links + indexing audit (PR #33):** Homepage full calculator grid (all tools by category); hub cross-links (concrete ↔ brick/asphalt, outdoor ↔ rebar/asphalt, lawn fertilizer guide); stronger `relatedSlugs` / body links for weakly linked tools; `npm run audit:indexing` over `dist/`; embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — this PR (concrete footing calculator):** New `/calculators/concrete-footing-calculator/` for continuous/strip and spread pad footings (L×W×D×count → cu yd + waste % + 40/60/80 lb bags + optional rebar takeoff). Wired math/tests, Calculator island, SSR defaults, tool body/FAQ/HowTo, keyword map, concrete hub row, related links from slab/rebar tools, `llms.txt` / `llms-full.txt` Q→URL, methodology link, OG via `prebuild`.
- **2026-11-19 — PR #33 (internal links + indexing audit):** Homepage full calculator grid (all tools by category); hub cross-links (concrete ↔ brick/asphalt, outdoor ↔ rebar/asphalt, lawn fertilizer guide); stronger `relatedSlugs` / body links for weakly linked tools (asphalt, brick, lumber, rebar, paint, roof-pitch, roofing-shingles, fertilizer) and `/guides/how-much-paint-for-a-room/`; `npm run audit:indexing` over `dist/` (sitemap self-canonical, no noindex in sitemap, redirect aliases not linked, every calculator has sitemap `lastmod`); embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — concrete slab cost calculator:** New `/calculators/concrete-slab-cost-calculator/` — slab volume × user-entered ready-mix $/yd or bag price, waste %, optional gravel/rebar/forms/delivery/labor; outputs volume, material cost, total, $/sq ft. Example price defaults labeled (not market facts). Linked from concrete hub + related volume/rebar tools; keyword map + llms Q→URL updated.
- **2026-11-19 — internal links + indexing audit (merged):** Homepage full calculator grid (all tools by category); hub cross-links (concrete ↔ brick/asphalt, outdoor ↔ rebar/asphalt, lawn fertilizer guide); stronger `relatedSlugs` / body links for weakly linked tools (asphalt, brick, lumber, rebar, paint, roof-pitch, roofing-shingles, fertilizer) and `/guides/how-much-paint-for-a-room/`; `npm run audit:indexing` over `dist/` (sitemap self-canonical, no noindex in sitemap, redirect aliases not linked, every calculator has sitemap `lastmod`); embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
- **2026-11-19 — TinyLaunch:** Approved; launch date **2026-12-07** — https://tinylaunch.com/launch/30955. Footer badge set via `PUBLIC_DIRECTORY_BADGES` in Cloudflare Workers Builds (env-only; not hardcoded in repo).
- **2026-11-18 — PR #31 merged:** Worker 301 aliases mirrored in `public/_redirects` (`/about-us/`, `/contact-us/`, `/contacts/`, `/privacy-policy/`, `/terms-of-service/`, `/sitemap_index.xml`, `/calculators/<slug>/embed/` → `/embed/<slug>/`, `/guides/16x24-deck-material-list/` → `/guides/deck-material-list-16x24/`, `/authors/` → `/about/`); `public/favicon.png`; `security.txt`.
- **2026-11-18 — PR #31 also:** SEO for GSC-impression pages (concrete calculator + Sonotube calculator): stronger titles/metas, 6-item visible FAQ + FAQPage JSON-LD, internal links from homepage/hubs/cross-links, `llms.txt` updates.
- **2026-11-18 — Reddit:** `r/SideProject` YardTally launch post by `u/ihammadiqbal117` — https://www.reddit.com/r/SideProject/comments/1xz9yzs/ (do **not** mark removed unless verified). Advice-only comments (no links) in `r/landscaping` and `r/gardening`.
- Earlier technical SEO baseline (IndexNow, GSC/Bing verification, sitemap 301, embed noindex, trust/embed widgets, GSC-impression content PRs #28–#30): see [AGENTS.md — SEO state](../AGENTS.md#seo-state-as-of-2026-11-15). Do not re-implement those.

### GSC exclusion buckets (code audit 2026-11-19)

| GSC reason | What it is in this codebase | Action |
|---|---|---|
| Page with redirect (~4+) | Intentional 301 aliases (`/about-us/`, `/contact-us/`, `/privacy-policy/`, `/terms-of-service/`, `/sitemap.xml`, `/authors/`, old guide slugs incl. `/guides/how-much-mulch-do-i-need/` → mulch calculator, `/calculators/*/embed/`) | Keep redirects; sitemap + internal links already use final 200 URLs. Request GSC validation after next crawl. |
| Excluded by noindex (~2+) | `/embed/<slug>/` (`noindex,follow`), `/404.html`, `/privacy/`, `/cookies/`, `/terms/` | Intentional. Not in sitemap. |
| Alternate page with proper canonical | Embed pages canonicalize to `/calculators/<slug>/` | Intentional widget pattern. |
| Discovered - currently not indexed (~13) | Weak internal linking historically | PR #33 + this PR (home/hub/related inbound to GSC impression pages); request indexing after deploy. |

## Remaining / risks

1. **After deploy (this PR — do not run IndexNow pre-deploy):** `npm run indexnow` (all `dist/` sitemap URLs including new variant tools + redirect targets; **do not change the IndexNow key**) **and** GSC URL Inspection → Request indexing for new/changed pages + validate discovered-not-indexed / redirect / noindex buckets.
2. **After deploy (Agathox):** confirm Agathox can read the meta tag and/or `/.well-known/agathox-verification.txt` (200, no slash redirect); record listing URL here only when owner-confirmed.
3. **Optional `sameAs` enrichment:** LinkedIn / X / Product Hunt URLs only when real — set via `PUBLIC_AUTHOR_SAME_AS` / `PUBLIC_ORG_SAME_AS` (GitHub default already ships). Do not invent profiles.
4. **`PUBLIC_BING_SITE_VERIFICATION` unset** in Workers Builds — Bing HTML meta tag not emitted until set (Bing Webmaster itself was previously verified; confirm if meta tag is still desired).
5. **Editorial backlinks** — essentially none yet; embed outreach + directories still open.
6. **Reddit promotion paused (2026-11-19, owner decision).** Build karma with plain, **link-free** helpful comments before posting again. Do **not** mark the YardTally `r/SideProject` post as removed unless verified.
7. Free-tool / calculator **directory submissions** beyond TinyLaunch (Agathox ownership tokens shipped 2026-11-20; listing URL unconfirmed until Agathox accepts).
8. **Embed-widget outreach** to DIY / landscaping bloggers.
9. Further impression-adjacent variants still open (e.g. stair **stringer**, not poured-step volume)—see `docs/ideas/README.md`. Avoid lumber-weight or CMU split URLs.
10. **Weekly GSC check** and refresh baseline metrics in this file.
11. **AdSense:** keep publishing on schedule; expect review ~3–4 weeks from application (Nov 2026).
12. **TinyLaunch launch day 2026-12-07** — prepare listing assets; badge already via `PUBLIC_DIRECTORY_BADGES`.
13. **CI follow-up (optional, off-repo):** if Workers Builds install still dominates, tune dashboard Node/cache settings (not expressible in-repo beyond `.npmrc`).
14. **Re-run `npm run audit:ai-detect`** after future guide/tool body rewrites; keep [`docs/ai-detect-scores.md`](ai-detect-scores.md) in sync.

## In progress

- **2026-11-27:** Remaining fix PR — SEO page copy (#56).

## Off-repo work

Things done outside this repo (consoles, social, ads, directories). Confirm before treating as done.

| Date | What | Notes |
|---|---|---|
| Nov 2026 | Google AdSense applied | Status **Getting ready** |
| 2026-11-19 | TinyLaunch approved | Launch **2026-12-07** — https://tinylaunch.com/launch/30955 · footer badge via `PUBLIC_DIRECTORY_BADGES` in Workers Builds |
| 2026-11-19 | Reddit promotion **paused** | New account filter risk; see Remaining / risks #6 |
| 2026-11-18 | Reddit YardTally `r/SideProject` launch (`u/ihammadiqbal117`) | https://www.reddit.com/r/SideProject/comments/1xz9yzs/ — **not** marked removed (unverified). Advice-only comments in `r/landscaping` / `r/gardening` |
| — | Directory submissions | TinyLaunch confirmed; Agathox ownership tokens in site (2026-11-20), listing URL pending acceptance; others unconfirmed by name |

Also historically confirmed (see AGENTS.md): Bing Webmaster + GSC verified; IndexNow active in Bing (~336 URLs, 2026-11-13).

## How to update this file

1. **Before** starting growth / SEO / content work: read this file + [AGENTS.md SEO state](../AGENTS.md#seo-state-as-of-2026-11-15).
2. When you **start** an item: move it to **In progress** (with date / PR / owner).
3. When you **finish** an item: move it to **Done** with date, PR number or off-repo evidence, and bump **Last updated**. Mirror a short Done/Remaining summary in [README.md](../README.md).
4. When you **add** work: append under **Remaining / risks** (keep priority order) or **Off-repo work**.
5. **Weekly GSC check:** refresh **Baseline metrics** (or add a dated delta subsection) — clicks, impressions, avg position, indexed / not-indexed counts.
6. Ship the update in the **same PR** as the work (docs-only PR is fine when the work was off-repo).
7. **Never invent** stats, credentials, directory listings, or “done” claims. If unsure, leave it pending or mark “unconfirmed”.
