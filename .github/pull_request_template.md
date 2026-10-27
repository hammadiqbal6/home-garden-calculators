## Summary

<!-- What changed and why (1–3 bullets). -->

## Checklist

- [ ] `npm test` and `npm run build` pass locally
- [ ] For content/SEO pages: `npm run audit` (and `npm run proof` when shipping proof updates)
- [ ] Keyword map / cannibalization checked when adding or retargeting URLs

### UI/UX Pro Max

Required when the PR changes how the site **looks or behaves**.

- [ ] Consulted `.cursor/skills/ui-ux-pro-max/SKILL.md` and ran `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "…" --domain …` (and `--design-system` / `--stack` when relevant)
- [ ] Contrast ≥ 4.5:1 (light and dark)
- [ ] Touch targets ≥ 44px
- [ ] Visible focus styles; keyboard operable
- [ ] Forms: labels + inline errors (`aria-invalid` / live region)
- [ ] Dark mode surfaces readable
- [ ] No horizontal scroll at ~360px; reduced-motion respected
- [ ] Screenshots attached for visual changes (desktop + mobile if layout shifts)

## Screenshots

<!-- Before/after or light/dark as needed. -->
