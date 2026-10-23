---
name: write-seo-article
description: Write or expand a YardCalc guide/article with answer-first SEO, citations, and internal links to calculators.
---

# Write SEO article

## When to use
New guide, expanding thin copy, or shipping an item from `docs/SEO-GUIDE.md` content calendar.

## Steps
1. Choose one primary question keyword; register in `docs/KEYWORD-MAP.md`.
2. Add/update `src/data/guides.ts` (+ `guideBodies.ts` / `guideFaqs.ts`) with answerFirst, bodyHtml (~1,000+ words), faq[], dates, topic-matched related links.
3. Cite extension services or manufacturers with `rel` safe outbound links. No invented stats—label rules of thumb; advise checking labels/codes.
4. Link ≥2 calculators with descriptive anchors; update those tools’ `relatedGuideSlugs` (reciprocal). Add guide↔guide links.
5. Keep Article + FAQPage schema via `guides/[slug].astro`.
6. Visible FAQ required; FAQPage JSON-LD is generated from `faq`.
7. Ensure guides appear in sitemap, `/guides/`, hubs, and `llms.txt`.
8. Run `npm test && npm run build && npm run audit && npm run check:links`.

## Quality bar
Non-commodity examples, no doorway duplicates, E-E-A-T via sources + methodology links. Titles 25–65 (aim ~30–60) with `| YardCalc`. Follow `docs/SEO-GUARDRAILS.md`.
