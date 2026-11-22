---
name: add-seo-page
description: Step-by-step checklist for adding or editing a YardTally calculator or guide for SEO and AI Overviews (cannibalization, titles, answers, links, sitemap, build).
---

# Add or edit an SEO page (calculator or guide)

Use this checklist for **any** new or substantially edited tool/guide. File lists for greenfield work stay in:

- Calculator → [add-a-new-calculator/SKILL.md](../add-a-new-calculator/SKILL.md)
- Guide → [add-a-new-guide/SKILL.md](../add-a-new-guide/SKILL.md)

Standing rules: [AGENTS.md §5](../../../AGENTS.md#5-seo--aeo--ai-overview-rules), [`.cursor/rules/seo.mdc`](../../rules/seo.mdc), [pre-merge-seo-aeo-checklist](../pre-merge-seo-aeo-checklist/SKILL.md).

## 1. Cannibalization first

- [ ] One primary query; SERP / PAA / autocomplete wording noted
- [ ] `docs/KEYWORD-MAP.md` checked — **no second URL** for the same cluster
- [ ] If intent overlaps an existing page → **extend that page** (H2, table, FAQ) or **merge + 301** (`public/_redirects` + `src/lib/workerRedirect.ts` `PATH_ALIAS_REDIRECTS`)
- [ ] Assign roles when clusters share a topic (tool = compute; guide = method/chart; sized example = one footprint)

## 2. Title, H1, meta

- [ ] Title prop **≤ 48 characters** (final branded `<title>` ≤ **60** with ` | YardTally` from `formatPageTitle`)
- [ ] Unique title, H1, and meta aimed at the real query (not a near-clone of a sibling)
- [ ] Meta 70–160 chars (aim ~120–160); og/twitter will match via `BaseLayout`

## 3. Answer real questions (SEO + AI Overviews)

- [ ] Page-level `answerFirst` 40–60 words (number/verdict first when one exists)
- [ ] Under **each question H2**: 1–2 sentence direct answer, then detail
- [ ] Plain HTML **summary table** (bags, yards, sizes, weights) computed from formulas/sources — never copied from competitors
- [ ] Visible **formula** + **worked example** matching Vitest / calculator math
- [ ] FAQ 3–5 items; visible text feeds FAQPage (don’t invent schema-only Q&A)
- [ ] Guides: `Reviewed by … · Last updated …`; tools: `TrustBlock` + last reviewed; cite methodology / TDS / Wood Handbook / extension as appropriate
- [ ] Human voice per `docs/WRITING-GUIDE.md`; no invented stats

## 4. Internal links (required for new URLs)

- [ ] Hub `introHtml` (or category body) links the page in **prose**, not only cards
- [ ] Homepage and/or `/calculators/` / `/guides/` index links it
- [ ] 2–3 related siblings: reciprocal `relatedSlugs` / `relatedGuideSlugs` **and** descriptive body anchors
- [ ] Tool ↔ matching guide(s) both ways; trailing-slash paths only

## 5. Sitemap, canonicals, AI surfaces

- [ ] Registered in `tools[]` or `guides[]` (sitemap picks it up on build)
- [ ] `dateModified` bumped only because content/math changed
- [ ] Self-canonical + trailing slash; embeds remain `noindex,follow`
- [ ] `llms.txt` / `llms-full.txt` Q→URL or figures updated when answers change
- [ ] `robots.txt` still allows AI crawlers (do not add Disallow for GPTBot / Google-Extended / etc.)

## 6. Schema

- [ ] Calculator: WebApplication (+ FAQPage if FAQ on-page); BreadcrumbList; HowTo only from `toolHowTo.ts` when steps are visible
- [ ] Guide: Article (+ FAQPage); BreadcrumbList; HowTo only from `guideHowTo.ts` when steps are visible
- [ ] No fake `aggregateRating`; no hard-coded site hostname

## 7. Counts and copy hygiene

- [ ] No hard-coded “All N calculators/guides” — use `tools.length` / `guides.length`
- [ ] KEYWORD-MAP row added/updated; GROWTH-STATUS + README Done/Remaining in the **same PR**

## 8. Ship

```bash
npm test && npm run build && npm run audit && npm run check:links
```

- [ ] New URL present in `dist` sitemap (not noindex). IndexNow reads **all** sitemap `<loc>`s after build — new tools/guides and live **redirect targets** are included automatically. Do **not** change the IndexNow key or `public/<key>.txt`.
- [ ] **After every deploy** (owner / deploy hook — agents must not run this before deploy):
  1. `npm run indexnow` (or Workers Builds `deploy:indexnow`) so Bing/Yandex see new and changed URLs
  2. Google Search Console → URL Inspection → **Request indexing** for each new or substantially changed page (and validate redirects when you merged URLs)

Do **not** deploy from an agent unless explicitly asked. Do not touch the Cloudflare dashboard. Do not run IndexNow until the site is actually live with the new build.
---
