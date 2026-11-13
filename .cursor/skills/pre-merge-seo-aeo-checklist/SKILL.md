---
name: pre-merge-seo-aeo-checklist
description: Pre-merge SEO/AEO checklist for YardTally PRs (metadata, schema, sitemap, llms, consent/CSP, audits).
---

# Pre-merge SEO / AEO checklist

Run before opening or updating a content/calculator/consent PR. Full page rules: `docs/PAGE-CHECKLIST.md` + `npm run audit:pages`.

## Content
- [ ] Unique primary keyword in `docs/KEYWORD-MAP.md`; no cannibalization
- [ ] Title 25–65 (aim ~30–60); meta 70–160 (aim ~120–160); one H1
- [ ] Answer-first 40–60 words; human voice; no banned filler
- [ ] Every statistic has a primary source URL; Sources list visible
- [ ] Guides ≥800 words; tools ≥~600 words unique value + working calculator
- [ ] FAQ 3–5 real questions when the page has FAQ; visible text matches FAQPage
- [ ] Guides show `Reviewed by Hammad Iqbal · Last updated …`
- [ ] `dateModified` bumped only for touched URLs (sitemap lastmod — never “now”)

## Schema / AI surfaces
- [ ] Tools: WebApplication + BreadcrumbList (+ FAQPage); HowTo only from on-page steps
- [ ] Guides: Article + BreadcrumbList (+ FAQPage / HowTo when applicable)
- [ ] No fake `aggregateRating`
- [ ] `llms.txt` Q→URL + `llms-full.txt` figures updated if the PR changes cite-worthy answers
- [ ] `.well-known/llms.txt` remains the alias (do not fork content)

## Consent / CSP (if touched)
- [ ] EEA/UK/CH → Google CMP only; elsewhere → site banner (`gdprRegions.ts` / `BaseLayout.astro`)
- [ ] Consent Mode v2 defaults stay denied for GDPR regions
- [ ] `public/_headers` CSP only gains hosts with a named product reason + comment

## Commands (required)
```bash
npm test && npm run build && npm run audit && npm run check:links
```
PR CI = build + unit tests only. Run full audits locally (or **Actions → Full checks**) before merge.

## After merge / deploy
- [ ] IndexNow: `npm run indexnow` or `deploy:indexnow`
- [ ] Spot-check GSC URL inspection for new/changed URLs when indexing matters

## Workflow
Separate PRs per concern (content ≠ CMP ≠ calculator SEO ≠ docs). Branch `cursor/<name>-c2d2`. Do not merge unless asked.
