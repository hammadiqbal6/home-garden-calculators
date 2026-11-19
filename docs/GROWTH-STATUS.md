# Growth / SEO status (living)

**Last updated:** 2026-11-19

Read this before planning growth, SEO, or content work. Update it in the **same PR** when you complete, start, or add an item. Do **not** invent metrics, directory confirmations, or off-repo actions — only record owner-confirmed facts.

Technical “already shipped / don’t re-implement” detail (IndexNow, schema policy, jev-seo false alarms) still lives in [AGENTS.md — SEO state](../AGENTS.md#seo-state-as-of-2026-11-15). This file is the **living** backlog and scoreboard.

Every change/PR must also refresh the **Done** / **Remaining** sections below (and the matching summary in [README.md](../README.md)) in the **same PR**.

## Baseline metrics

As of **2026-11-17** (GSC 28-day window unless noted):

| Signal | Value |
|---|---|
| Site | getyardtally.com |
| Stack | Astro on Cloudflare Workers (`home-garden-calculators`); build-time `PUBLIC_*` in Workers Builds env |
| GA4 | Measurement ID `G-N4VRDDEVLP` (property `559570732`) |
| GSC (last 28 days → 2026-11-17) | **0** clicks · **229** impressions · avg position **58.8** |
| Indexing | **37** pages indexed · **20** not indexed (includes **13** “Discovered - currently not indexed”; also GSC emails Nov 16/19: Page with redirect, Excluded by noindex, Alternate canonical) |
| GA4 users (28 days) | **3** users |
| Cloudflare page views (prior window, 2026-11-18 note) | ~**6.2k** (GA4 fires only after cookie consent Accept; Cloudflare includes bot traffic) |
| Domain rating (owner-reported, Ahrefs-style) | **3** |

## Done

- **2026-11-19 — this PR (Sonotube upgrade):** Optional footing base (`none` / bell frustum / pad cylinder); mixed tube sizes (size B count 0 = unused); live `bags50` (QUIKRETE 0.375 cu ft); bags-per-foot HTML table for 8–36″; `toggleModeFields` hides unused bell/pad inputs; FAQ/body/HowTo refresh; `dateModified` 2026-11-19; unit tests.
- **2026-11-19 — CI / build speed (this PR):** Faster GitHub Actions + in-repo Cloudflare install config without dropping checks. Baseline PR CI job ~22–32s (install ~10–15s, build ~3–5s, tests ~1–2s). Changes: `.npmrc` (`prefer-offline`, `audit=false`, `fund=false`) for Actions + Workers Builds; `npm ci --prefer-offline --no-audit --fund=false`; Astro/Vite `actions/cache`; parallel `build` + `test` in `build-test-audit`; docs/skills-only path skip that still reports the required check; Full checks Playwright Chromium cache (still chromium-only). Concurrency cancel-in-progress was already present.
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
| Page with redirect (~4) | Intentional 301 aliases (`/about-us/`, `/contact-us/`, `/privacy-policy/`, `/terms-of-service/`, `/sitemap.xml`, `/authors/`, old guide slug, `/calculators/*/embed/`) | Keep redirects; sitemap + internal links already use final 200 URLs. Request GSC validation after next crawl. |
| Excluded by noindex (~2) | `/embed/<slug>/` (`noindex,follow`) and `/404.html` | Intentional. Not in sitemap. |
| Alternate page with proper canonical | Embed pages canonicalize to `/calculators/<slug>/` | Intentional widget pattern. |
| Discovered - currently not indexed (~13) | Weak internal linking historically | Addressed in PR #33 via homepage grid + hubs + related/contextual links; request indexing after deploy. |

## Remaining / risks

1. **After deploy:** ping IndexNow (include new deck footing URL); GSC URL Inspection → Request indexing / validate for previously “Discovered - not indexed” and redirect/noindex buckets.
1. **After deploy:** ping IndexNow; GSC URL Inspection → Request indexing / validate for previously “Discovered - not indexed” and redirect/noindex buckets (include new `/calculators/concrete-slab-cost-calculator/`).
2. **GA4 Consent Mode v2** (default denied + cookieless pings) so traffic is measured; currently GA fires only after Accept.
3. **`PUBLIC_BING_SITE_VERIFICATION` unset** in Workers Builds — Bing HTML meta tag not emitted until set (Bing Webmaster itself was previously verified; confirm if meta tag is still desired).
4. **Author / `sameAs` env vars unset** (`PUBLIC_AUTHOR_URL` / profile URLs) — Organization/Person schema sameAs stays thin until set.
5. **Editorial backlinks** — essentially none yet; embed outreach + directories still open.
6. **Reddit promotion paused (2026-11-19, owner decision).** `u/ihammadiqbal117` is ~1 day old with 1 karma. Reddit’s site-wide filter removed the Docuklin `r/SideProject` post and `r/Contractor` comments (`[ Removed by Reddit ]`). Before any further posts, build karma with plain, **link-free** helpful comments. Do **not** mark the YardTally `r/SideProject` post as removed unless verified.
7. Free-tool / calculator **directory submissions** beyond TinyLaunch (owner says some may be done; only record confirmed names + URLs here).
8. **Embed-widget outreach** to DIY / landscaping bloggers.
9. Add closely related **variants of tools that already get impressions** (stair stringer, sod, etc. still in `docs/ideas/README.md`) — deck footing variant shipped 2026-11-19.
9. Add closely related **variants of tools that already get impressions**, rather than new topics (footing calculator shipped 2026-11-19; other variants still open).
9. Add closely related **variants of tools that already get impressions**, rather than new topics (slab cost shipped; other cost/variant tools still open).
10. **Weekly GSC check** and refresh baseline metrics in this file.
11. **AdSense:** keep publishing on schedule; expect review ~3–4 weeks from application (Nov 2026).
12. **TinyLaunch launch day 2026-12-07** — prepare listing assets; badge already via `PUBLIC_DIRECTORY_BADGES`.
13. **CI follow-up (optional, off-repo):** if Workers Builds install still dominates, tune dashboard Node/cache settings (not expressible in-repo beyond `.npmrc`).

## In progress

- **2026-11-19:** Sonotube calculator upgrade PR (this branch) — footing/bell, mixed sizes, bags50, bags-per-foot table.
- **2026-11-19:** CI / build speed PR (this branch) — workflow + `.npmrc` changes; awaiting green CI.
- **2026-11-19:** Bulk cost upgrade for gravel/topsoil/sand/mulch (this branch) — pending merge/deploy + IndexNow.
- _(none for this PR — deck footing calculator shipping as Done above)_
- _(none in this PR)_
- _(none for this PR)_

## Off-repo work

Things done outside this repo (consoles, social, ads, directories). Confirm before treating as done.

| Date | What | Notes |
|---|---|---|
| Nov 2026 | Google AdSense applied | Status **Getting ready** |
| 2026-11-19 | TinyLaunch approved | Launch **2026-12-07** — https://tinylaunch.com/launch/30955 · footer badge via `PUBLIC_DIRECTORY_BADGES` in Workers Builds |
| 2026-11-19 | Reddit promotion **paused** | New account filter risk; see Remaining / risks #6 |
| 2026-11-18 | Reddit YardTally `r/SideProject` launch (`u/ihammadiqbal117`) | https://www.reddit.com/r/SideProject/comments/1xz9yzs/ — **not** marked removed (unverified). Advice-only comments in `r/landscaping` / `r/gardening` |
| — | Directory submissions | TinyLaunch confirmed; others unconfirmed by name |

Also historically confirmed (see AGENTS.md): Bing Webmaster + GSC verified; IndexNow active in Bing (~336 URLs, 2026-11-13).

## How to update this file

1. **Before** starting growth / SEO / content work: read this file + [AGENTS.md SEO state](../AGENTS.md#seo-state-as-of-2026-11-15).
2. When you **start** an item: move it to **In progress** (with date / PR / owner).
3. When you **finish** an item: move it to **Done** with date, PR number or off-repo evidence, and bump **Last updated**. Mirror a short Done/Remaining summary in [README.md](../README.md).
4. When you **add** work: append under **Remaining / risks** (keep priority order) or **Off-repo work**.
5. **Weekly GSC check:** refresh **Baseline metrics** (or add a dated delta subsection) — clicks, impressions, avg position, indexed / not-indexed counts.
6. Ship the update in the **same PR** as the work (docs-only PR is fine when the work was off-repo).
7. **Never invent** stats, credentials, directory listings, or “done” claims. If unsure, leave it pending or mark “unconfirmed”.
