---
name: structured-data
description: Add or validate YardCalc JSON-LD (WebSite, Organization, BreadcrumbList, WebApplication, Article) without fake ratings.
---

# Structured data

## Required types
- Home: `WebSite`, `Organization`
- All subpages: `BreadcrumbList`
- Tools: `WebApplication` with `offers.price=0`, `applicationCategory`, `operatingSystem`
- Guides: `Article` with `author`, `datePublished`, `dateModified`

## Forbidden
- Fake `aggregateRating` / reviews
- Relying on FAQ/HowTo for Google rich results

## Verify
`npm run audit:seo` JSON-LD parse checks; Rich Results Test manually before major launches.
