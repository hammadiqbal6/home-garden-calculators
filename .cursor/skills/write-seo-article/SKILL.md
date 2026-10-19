---
name: write-seo-article
description: Write or expand a YardCalc guide/article with answer-first SEO, citations, and internal links to calculators.
---

# Write SEO article

## When to use
New guide, expanding thin copy, or shipping an item from `docs/SEO-GUIDE.md` content calendar.

## Steps
1. Choose one primary question keyword; register in `docs/KEYWORD-MAP.md`.
2. Add/update `src/data/guides.ts` with answerFirst, bodyHtml (tables, steps, mistakes), dates.
3. Cite extension services or manufacturers with `rel` safe outbound links.
4. Link ≥2 calculators with descriptive anchors; update those tools’ `relatedGuideSlugs`.
5. Keep Article schema fields (title, dates, author) accurate via existing page template.
6. Avoid FAQ schema dependence; visible FAQ/Q&A prose is fine.
7. Run build + `npm run audit:seo`.

## Quality bar
Non-commodity examples, no doorway duplicates, E-E-A-T via sources + methodology links.
