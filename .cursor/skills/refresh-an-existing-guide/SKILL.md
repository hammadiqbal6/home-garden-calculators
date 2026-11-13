---
name: refresh-an-existing-guide
description: Refresh an existing YardTally guide (sources, stats, dates, FAQ/HowTo sync, llms) without inventing numbers.
---

# Refresh an existing guide

## When to use
Manufacturer/extension data changed, thin/AI-sounding copy, GSC query mismatch, missing Sources/byline, or stale `dateModified`.

## Files to touch (as needed)

| File | What |
|---|---|
| `src/data/guideBodies.ts` | Rewrite body: contractor voice, question H2s, worked examples, Sources links |
| `src/data/guideFaqs.ts` | Keep FAQ in sync with visible Q&A (feeds FAQPage) |
| `src/data/guideHowTo.ts` | Update steps **only** to match visible body steps; remove HowTo if steps gone |
| `src/data/guides.ts` | `answerFirst`, title/h1/description, `dateModified`, related tools |
| `src/data/tools.ts` | Reciprocal `relatedGuideSlugs` if links changed |
| `src/pages/llms.txt.ts` / `llms-full.txt.ts` | Update Q→URL or cited figures when numbers change |
| `docs/KEYWORD-MAP.md` | Only if primary/secondary intent changes |

## Process
1. Re-open primary sources (TDS / extension). Replace any unsourced numbers.
2. Keep answer-first 40–60 words; put the sourced verdict first.
3. Strip banned filler (`.cursor/rules/content-quality.mdc`).
4. Set `dateModified` to the real review date (feeds sitemap lastmod via `astro.config.mjs`).
5. Do **not** bump `siteConfig.contentUpdated` unless this is a site-wide stamp refresh.
6. If bag yields / calculator math also change, update `src/lib/calculators/*` + Vitest in the same PR or a paired calculator PR — never leave copy disagreeing with tests.

## Ship
```bash
npm test && npm run build && npm run audit && npm run check:links
```
After deploy: `npm run indexnow`. Related: `.cursor/skills/content-refresh/SKILL.md` (site-wide rates/dates).
