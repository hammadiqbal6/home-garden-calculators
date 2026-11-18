# Growth / SEO status (living)

**Last updated:** 2026-11-18

Read this before planning growth, SEO, or content work. Update it in the **same PR** when you complete, start, or add an item. Do **not** invent metrics, directory confirmations, or off-repo actions — only record owner-confirmed facts.

Technical “already shipped / don’t re-implement” detail (IndexNow, schema policy, jev-seo false alarms) still lives in [AGENTS.md — SEO state](../AGENTS.md#seo-state-as-of-2026-11-15). This file is the **living** backlog and scoreboard.

## Baseline metrics

As of **2026-11-18** (unless noted):

| Signal | Value |
|---|---|
| Site | getyardtally.com |
| Stack | Astro on Cloudflare Workers (`home-garden-calculators`); build-time `PUBLIC_*` in Workers Builds env |
| GA4 | Measurement ID `G-N4VRDDEVLP` (property `559570732`) |
| GSC (last 28 days → 2026-11-18) | 1 click · 198 impressions · avg position **61.6** |
| GSC homepage | Avg position ~**3.7** (brand) |
| Indexing | **36** pages indexed · **14** not indexed (of which **13** “Discovered - currently not indexed”) |
| GA4 users (28 days) | **3** users |
| Cloudflare page views (same window) | ~**6.2k** (GA4 fires only after cookie consent Accept; Cloudflare includes bot traffic) |
| Domain rating (owner-reported, Ahrefs-style) | **3** |

## Done (dated)

- **2026-11-18 — PR #31 merged:** Worker 301 aliases mirrored in `public/_redirects` (`/about-us/`, `/contact-us/`, `/contacts/`, `/privacy-policy/`, `/terms-of-service/`, `/sitemap_index.xml`, `/calculators/<slug>/embed/` → `/embed/<slug>/`, `/guides/16x24-deck-material-list/` → `/guides/deck-material-list-16x24/`, `/authors/` → `/about/`); `public/favicon.png`; `security.txt`.
- **2026-11-18 — PR #31 also:** SEO for GSC-impression pages (concrete calculator + Sonotube calculator): stronger titles/metas, 6-item visible FAQ + FAQPage JSON-LD, internal links from homepage/hubs/cross-links, `llms.txt` updates.
- Earlier technical SEO baseline (IndexNow, GSC/Bing verification, sitemap 301, embed noindex, trust/embed widgets, GSC-impression content PRs #28–#30): see [AGENTS.md — SEO state](../AGENTS.md#seo-state-as-of-2026-11-15). Do not re-implement those.

## In progress

None recorded as of 2026-11-18.

## Pending / next (prioritized)

1. **GA4 Consent Mode v2** (default denied + cookieless pings) so traffic is measured; currently GA fires only after Accept.
2. **After deploy:** ping IndexNow and use GSC URL Inspection → “Request indexing” for the updated concrete / Sonotube pages.
3. Strengthen internal links to, then resubmit, the **13** “Discovered - currently not indexed” pages in GSC.
4. Free-tool / calculator **directory submissions** (owner says some already done; only record which ones here once confirmed).
5. Keep answering real **Reddit / Quora** questions (`r/DIY`, `r/HomeImprovement`, `r/landscaping`, `r/gardening`, `r/Decks`) — value-first; most of these subs ban self-promo links.
6. **Embed-widget outreach** to DIY / landscaping bloggers (embeds carry credit backlinks).
7. Add closely related **variants of tools that already get impressions**, rather than new topics.
8. **Weekly GSC check** (clicks, impressions, avg position, indexing) and record deltas in this file.
9. **AdSense:** keep publishing on schedule; expect review ~3–4 weeks from application (Nov 2026).

## Off-repo work

Things done outside this repo (consoles, social, ads, directories). Confirm before treating as done.

| Date | What | Notes |
|---|---|---|
| Nov 2026 | Google AdSense applied | Status **Getting ready** |
| 2026-11-18 | Reddit launch + advice comments (`u/ihammadiqbal117`) | `r/SideProject` launch post: https://www.reddit.com/r/SideProject/comments/1xz9yzs/ · Advice-only comments (no links; subs ban self-promo) in `r/landscaping` (gravel driveway, tree-ring mulch) and `r/gardening` (raised-bed topsoil) |
| — | Directory submissions | Some may already be done per owner; **none confirmed by name in this file yet** — move confirmed ones here with date + URL when known |

Also historically confirmed (see AGENTS.md): Bing Webmaster + GSC verified; IndexNow active in Bing (~336 URLs, 2026-11-13).

## How to update this file

1. **Before** starting growth / SEO / content work: read this file + [AGENTS.md SEO state](../AGENTS.md#seo-state-as-of-2026-11-15).
2. When you **start** an item: move it to **In progress** (with date / PR / owner).
3. When you **finish** an item: move it to **Done (dated)** with date, PR number or off-repo evidence, and bump **Last updated**.
4. When you **add** work: append under **Pending / next** (keep priority order) or **Off-repo work**.
5. **Weekly GSC check:** refresh **Baseline metrics** (or add a dated delta subsection) — clicks, impressions, avg position, indexed / not-indexed counts.
6. Ship the update in the **same PR** as the work (docs-only PR is fine when the work was off-repo).
7. **Never invent** stats, credentials, directory listings, or “done” claims. If unsure, leave it pending or mark “unconfirmed”.
