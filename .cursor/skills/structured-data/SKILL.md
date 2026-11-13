---
name: structured-data
description: Add or validate YardTally JSON-LD (WebSite, Organization, BreadcrumbList, WebApplication, Article, FAQ, HowTo) without fake ratings.
---

# Structured data

## Required types
- Home: `WebSite`, `Organization`
- All subpages: `BreadcrumbList`
- Tools: `WebApplication` (`offers.price=0`, `applicationCategory`, `operatingSystem`) via `toolPageGraph` in `src/lib/schema.ts`
- Guides: `Article` with `author`, `datePublished`, `dateModified` in `guides/[slug].astro`
- FAQPage **only** when the same Q&A is visible (`guideFaqs.ts` / `tools[].faq`)
- HowTo **only** from on-page steps (`guideHowTo.ts` / `toolHowTo.ts` → `howToJsonLd`)

## Forbidden
- Fake `aggregateRating` / reviews
- HowTo steps that are not rendered on the page
- Invented FAQ answers or stats inside schema text
- Relying on FAQ/HowTo for Google rich results (still ship for users/AI)

## Verify
`npm run audit:seo` JSON-LD parse checks; Rich Results Test manually before major launches.
