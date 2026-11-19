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

- **2026-11-19 — this PR:** Gravel/topsoil/sand/mulch upgrade: tons↔yards both ways, bag vs bulk cost compare with user-entered prices.
- **2026-11-19 — this PR (bulk cost upgrade):** Gravel, topsoil, sand, and mulch calculators — tons↔yards both ways (gravel/sand 2,700 lb/yd³, topsoil 2,200 lb/yd³); optional `convertTons` → `yardsFromTons` / `tonsFromYards` result rows; bag counts (0.5 cu ft for gravel/sand/topsoil; 2 & 3 cu ft for mulch); optional `pricePerYard` / `pricePerTon` / `pricePerBag` cost compare when >0 (no invented prices); FAQ/body notes + `dateModified` bump on those four tools.
- **2026-11-19 — PR #33 merged:** Homepage full calculator grid (all tools by category); hub cross-links; stronger `relatedSlugs` / body links; `npm run audit:indexing`; embed `X-Robots-Tag: noindex, follow` in `public/_headers`.
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
| Discovered - currently not indexed (~13) | Weak internal linking historically | Addressed in this PR via homepage grid + hubs + related/contextual links; request indexing after deploy. |

## Remaining / risks

1. **After deploy:** ping IndexNow; GSC URL Inspection → Request indexing / validate for previously “Discovered - not indexed” and redirect/noindex buckets.
2. **GA4 Consent Mode v2** (default denied + cookieless pings) so traffic is measured; currently GA fires only after Accept.
3. **`PUBLIC_BING_SITE_VERIFICATION` unset** in Workers Builds — Bing HTML meta tag not emitted until set (Bing Webmaster itself was previously verified; confirm if meta tag is still desired).
4. **Author / `sameAs` env vars unset** (`PUBLIC_AUTHOR_URL` / profile URLs) — Organization/Person schema sameAs stays thin until set.
5. **Editorial backlinks** — essentially none yet; embed outreach + directories still open.
6. **Reddit promotion paused (2026-11-19, owner decision).** `u/ihammadiqbal117` is ~1 day old with 1 karma. Reddit’s site-wide filter removed the Docuklin `r/SideProject` post and `r/Contractor` comments (`[ Removed by Reddit ]`). Before any further posts, build karma with plain, **link-free** helpful comments. Do **not** mark the YardTally `r/SideProject` post as removed unless verified.
7. Free-tool / calculator **directory submissions** beyond TinyLaunch (owner says some may be done; only record confirmed names + URLs here).
8. **Embed-widget outreach** to DIY / landscaping bloggers.
9. Add closely related **variants of tools that already get impressions**, rather than new topics.
10. **Weekly GSC check** and refresh baseline metrics in this file.
11. **AdSense:** keep publishing on schedule; expect review ~3–4 weeks from application (Nov 2026).
12. **TinyLaunch launch day 2026-12-07** — prepare listing assets; badge already via `PUBLIC_DIRECTORY_BADGES`.

## In progress

- **2026-11-19:** Bulk cost upgrade for gravel/topsoil/sand/mulch (this branch) — pending merge/deploy + IndexNow.

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
