---
name: content-refresh
description: Refresh YardTally dates, bag yields, densities, and citations when manufacturer or extension data changes.
---

# Content refresh

For a **single guide rewrite**, prefer **`.cursor/skills/refresh-an-existing-guide/SKILL.md`**.

Site-wide / math refresh:
1. Re-verify bag yields / coverage against manufacturer TDS; update tables + `src/lib/calculators/*` + Vitest together.
2. Bump `dateModified` on touched tools/guides only (feeds sitemap lastmod).
3. Update `siteConfig.contentUpdated` / `PUBLIC_CONTENT_UPDATED` only for a true site-wide stamp.
4. Refresh source links; remove dead citations; sync `llms-full.txt.ts` figures.
5. After deploy: IndexNow (`npm run indexnow` or `deploy:indexnow`).
6. PR notes: what rate/yield changed + source URL.
