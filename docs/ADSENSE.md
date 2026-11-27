# Google AdSense setup

## Eligibility checklist (before applying)

- [ ] You are 18+ and will use **one** AdSense account only
- [ ] You own the domain and can edit HTML / deploy ads.txt
- [ ] Site has original content on every tool page (not widget-only)
- [ ] ~20–30 quality pages online (tools + guides + trust pages) and some real traffic
- [ ] About, Contact, Privacy, Terms present; navigation works; no “under construction”
- [ ] Privacy policy discloses Google ads cookies + opt-out links (already drafted in `/privacy/`)
- [ ] No prohibited content or incentivized traffic
- [ ] Tools actually work (verified by unit tests + manual checks)

## When to apply

Apply after launch content is live, Search Console shows impressions, and you have fixed any thin/orphan pages (`npm run audit:adsense`). Do not apply on an empty template.

## Enable ads in this repo

1. Get approved; copy your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
2. Set build env (Workers Builds / `.env`):
   ```bash
   PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
   PUBLIC_ADSENSE_ENABLED=true
   # Numeric ad unit id from AdSense → Ads → By ad unit (not the word "auto")
   PUBLIC_ADSENSE_SLOT_DISPLAY=1234567890
   ```
   Leave `PUBLIC_ADSENSE_SLOT_DISPLAY` empty to skip fixed `<ins>` units so **Auto ads** alone can fill. Optional overrides: `PUBLIC_ADSENSE_SLOT_TOP`, `PUBLIC_ADSENSE_SLOT_MID`, `PUBLIC_ADSENSE_SLOT_BOTTOM` (each falls back to `DISPLAY`).
3. `/ads.txt` is generated from the publisher id at build time (no manual `public/ads.txt` edit needed).
4. Redeploy. When a numeric slot id is set, reserved CSS (`--ad-slot-h`) protects CLS for that fixed unit.

## CMP (EEA / UK / CH)

Personalized ads in the EEA, UK, and Switzerland require a **Google-certified CMP** integrated with IAB TCF v2.2.

**This site uses Google’s Funding Choices / Privacy & messaging consent message** (served with `adsbygoogle.js` from `fundingchoicesmessages.google.com`) when AdSense is enabled and a European regulations message is published in AdSense.

Implementation notes (see `BaseLayout.astro` + `src/worker.ts`):

- Cloudflare `request.cf.country` is injected as `<meta name="yt-geo-country">` on HTML responses.
- Visitors in EEA/UK/CH see **only** Google’s message (the first-party cookie bar is suppressed). `__tcfapi` `gdprApplies` is a secondary check when geo is unknown.
- Consent Mode v2 **region defaults** before `gtag('config')`: EEA/UK/CH denied for `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage`; elsewhere `analytics_storage` granted by default while ad signals stay denied until Accept (owner policy 2026-11-27). **Advanced Consent Mode:** `gtag.js` always loads; EEA/UK/CH CMP updates via TCF; elsewhere Reject / Do not sell or share denies analytics + ads (`/cookies/` preference page).
- GA4 ID: `PUBLIC_GA4_MEASUREMENT_ID` or hardcoded `DEFAULT_GA4_MEASUREMENT_ID` (`G-N4VRDDEVLP`).
- Publish the message in AdSense → Privacy & messaging, enable Consent Mode on the message, then set `PUBLIC_ADSENSE_ENABLED=true`.

## Policy pitfalls for tool sites

- Thin pages that are only a calculator with no prose → rejection risk
- Ads above the tool pushing it below the fold on mobile → poor UX / policy risk
- Misleading functionality or cloaking
- Copied manufacturer text without transformation
- Missing privacy disclosures for cookies / DoubleClick / opt-out

## Verification

```bash
npm run build && npm run audit:adsense
```
