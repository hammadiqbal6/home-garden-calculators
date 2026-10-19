---
name: seo-audit
description: Run and interpret YardCalc SEO audits (metadata, H1, canonical, JSON-LD, orphans, sitemap) on dist/.
---

# SEO audit

1. `npm run build && npm run audit:seo`
2. Fix failures: title length, meta length, single H1, canonical host/path, OG tags, JSON-LD parse, word count on tool pages, broken internals, orphans, sitemap/robots consistency.
3. Cross-check `docs/KEYWORD-MAP.md` for intent clashes.
4. Re-run until exit code 0.
5. For deeper review, use agent `.cursor/agents/seo-auditor.md`.
