---
name: pre-merge-seo-aeo-checklist
description: Pre-merge SEO/AEO checklist for YardTally PRs (metadata, schema, sitemap, llms, consent/CSP, audits).
---

# Pre-merge SEO / AEO checklist

Run before opening or updating a content/calculator/consent PR. Full page rules: `docs/PAGE-CHECKLIST.md` + `npm run audit:pages`.

## Content
- [ ] Unique primary keyword in `docs/KEYWORD-MAP.md`; no cannibalization (or merge + 301)
- [ ] Title prop ≤48 → branded ≤60; unique H1 + meta; meta 70–160; one H1
- [ ] Answer-first 40–60 words; **1–2 sentence answer under each question H2**; formula + worked example + summary tables
- [ ] Human voice; no banned filler; no hard-coded tool/guide counts
- [ ] Every statistic has a primary source URL; Sources list visible; methodology link where useful
- [ ] Guides ≥800 words; tools ≥~600 words unique value + working calculator
- [ ] FAQ 3–5 real questions when the page has FAQ; visible text matches FAQPage
- [ ] Guides show `Reviewed by Hammad Iqbal · Last updated …`; tools TrustBlock last reviewed
- [ ] New URLs linked from hub prose + home/index + 2–3 siblings
- [ ] `dateModified` bumped only for touched URLs (sitemap lastmod — never “now”)
- [ ] Full page flow: [add-seo-page/SKILL.md](../add-seo-page/SKILL.md)

## Schema / AI surfaces
- [ ] Tools: WebApplication + BreadcrumbList (+ FAQPage); HowTo only from on-page steps
- [ ] Guides: Article + BreadcrumbList (+ FAQPage / HowTo when applicable)
- [ ] No fake `aggregateRating`
- [ ] `llms.txt` Q→URL + `llms-full.txt` figures updated if the PR changes cite-worthy answers
- [ ] `.well-known/llms.txt` remains the alias (do not fork content)

## Consent / CSP (if touched)
- [ ] EEA/UK/CH → Google CMP only; elsewhere → site banner (`gdprRegions.ts` / `BaseLayout.astro`)
- [ ] Consent Mode v2: EEA/UK/CH defaults denied; elsewhere analytics granted by default with Reject / Do not sell or share opt-out (see consent-csp.mdc)
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
