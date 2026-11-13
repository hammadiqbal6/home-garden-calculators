---
name: add-a-new-guide
description: Add a YardTally guide end-to-end (keyword, bodies, FAQs, HowTo, schema, links, llms, audits).
---

# Add a new guide

## When to use
New how-to / explainer with a unique primary keyword (not a calculator). Prefer calendar items in `docs/SEO-GUIDE.md` and gaps in `docs/KEYWORD-MAP.md`.

## Files to touch

| File | What |
|---|---|
| `docs/KEYWORD-MAP.md` | Register primary + secondaries; check cannibalization first |
| `src/data/guides.ts` | Metadata: slug, title, h1, description, answerFirst, relatedToolSlugs, dates |
| `src/data/guideBodies.ts` | HTML body ≥800 words (question H2s, worked example, Sources section) |
| `src/data/guideFaqs.ts` | 3–5 visible FAQ items (same text feeds FAQPage JSON-LD) |
| `src/data/guideHowTo.ts` | **Only if** procedural steps are visible in the body — mirror them exactly |
| `src/data/tools.ts` | Reciprocal `relatedGuideSlugs` on ≥2 related tools |
| `src/pages/llms.txt.ts` | Add a Q→URL line when the guide answers a common question |
| `src/pages/llms-full.txt.ts` | Add key figures / Q→URL if the guide introduces cite-worthy numbers |
| `public/og/` | OG asset for the guide if the build/OG pipeline expects one |

Template already emits Article + FAQPage (+ HowTo when `guideHowTo[slug]` exists): `src/pages/guides/[slug].astro`. Sitemap lastmod uses `guide.dateModified` via `astro.config.mjs`.

## Content rules
1. Research: one primary query; SERP/PAA; intent = know/compare.
2. `answerFirst`: 40–60 words, sourced number/verdict first when one exists.
3. Voice: human/contractor; no banned filler (see `.cursor/rules/content-quality.mdc`).
4. **No invented stats** — every figure has a manufacturer/extension link in Sources.
5. H2s as real search questions; worked example; byline stays `Reviewed by Hammad Iqbal · Last updated …`.
6. Internal links: ≥2 calculators with descriptive anchors; topic-matched only.

## Ship
```bash
npm test && npm run build && npm run audit && npm run check:links
```
After deploy: `npm run indexnow` (or `deploy:indexnow`). Do not set lastmod to “now”.

Also see: `.cursor/skills/write-seo-article/SKILL.md` (shorter alias), `.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md`.
