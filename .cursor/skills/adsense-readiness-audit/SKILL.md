---
name: adsense-readiness-audit
description: Check YardCalc AdSense readiness (trust pages, privacy disclosures, ads.txt, thin pages, slot CLS).
---

# AdSense readiness audit

1. `npm run build && npm run audit:adsense`
2. Confirm About, Contact, Privacy, Terms, Methodology exist.
3. Privacy must mention Google ads cookies, Ads Settings, aboutads.info.
4. `public/ads.txt` present (template OK until approval).
5. No tool page below word-count threshold; tools must work.
6. Ad slots reserved height in CSS; ads disabled until `siteConfig.adsense.enabled`.
7. Remind owner about certified CMP for EEA/UK/CH before personalized ads.
8. See `docs/ADSENSE.md`.
