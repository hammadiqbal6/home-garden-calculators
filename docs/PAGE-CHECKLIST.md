# Per-page SEO / AEO checklist

Use for every new or reworked page: tool, calculator, guide, hub, or reference.
Enforced in CI by `npm run audit:pages` (after `npm run build`).

## 1. Before you write: keyword and intent

- [ ] One primary query (Search Console, Keyword Planner, Ahrefs/Semrush, or autocomplete + PAA).
- [ ] Name the intent: do (tool), know (answer), compare (X vs Y), or navigate. Match page type.
- [ ] Review the top 5 results: format, questions answered, gaps. Plan one differentiator.
- [ ] Check `docs/KEYWORD-MAP.md` for cannibalization; extend instead of duplicating.
- [ ] List 3–6 secondary questions → H2s and FAQ.

## 2. Structure

- [ ] One H1 that matches the query in plain words (include the main modifier: bags, yards, tons…).
- [ ] Answer first: opening 40–60 words with a number or verdict where one exists.
- [ ] Tool above the fold on mobile; ≤60 words between H1 and first input.
- [ ] H2/H3 in order; phrase H2s as questions when people search that way.
- [ ] Worked example with real numbers; at least one table/chart you authored.
- [ ] Page-specific copy; keep sitewide boilerplate short or link to `/methodology/`.
- [ ] Visible Published / Last updated matching schema and sitemap lastmod.

## 3. Metadata

- [ ] Title 30–60 characters (CI allows 25–65), unique, brand at end when needed.
- [ ] Meta description 70–155 (CI allows 70–160), unique, answer or benefit.
- [ ] Absolute self-referencing canonical (https, trailing slash) via `PUBLIC_SITE_URL`.
- [ ] Robots: index,follow for real pages; noindex for embeds.
- [ ] Open Graph / Twitter complete; og:image absolute and not ending with `/`.
- [ ] `<html lang>` and viewport set.

## 4. Schema (JSON-LD)

- [ ] Valid JSON; BreadcrumbList except homepage.
- [ ] Tools: WebApplication (category, offers price 0, OS Any).
- [ ] Guides: Article with dates, author Person, publisher Organization.
- [ ] FAQPage only when Q&A is visible; no fake aggregate ratings.

## 5. Internal links

- [ ] Guide ↔ matching tool(s) high on the page; hub links the new page.
- [ ] Descriptive anchors; trailing-slash URLs; no 404s.

## 6. Trust and sources

- [ ] Numbers/formulas cite primary sources; outbound links return 200.
- [ ] Honest byline → About; no invented credentials.

## 7. Mobile (390×844)

- [ ] No horizontal overflow; tap targets ≥44px (prefer 48); inputs ≥16px.
- [ ] Cookie banner single bottom bar ≤56px; does not cover the tool/CTA.

## 8. Ship

- [ ] In sitemap; `npm test && npm run build && npm run audit` green.
