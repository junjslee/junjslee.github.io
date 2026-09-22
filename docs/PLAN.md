<!-- status: live · reviewed_as_of: 2026-09-22 -->
# Plan

## Current Goal
None — the design + content refresh shipped on 2026-09-22 (`0441196`, Actions run `35692523975`).
Back in maintenance mode; the operator will flag the next change.

## Stages
1. **Explore** — understand current state
2. **Plan** — define next feature or fix
3. **Implement** — make changes
4. **Review** — verify build, check on mobile + desktop
5. **Handoff** — update docs

## Active Stage
- Explore (awaiting operator direction)

## Risks And Unknowns
- The explorer's side-by-side layout uses CSS container queries and `:has()`. Both are supported in
  Chrome 105+/Safari 16+/Firefox 110+; older browsers fall back to the stacked layout, which is still
  an improvement on the previous nested-scroll version. Not yet checked in Safari or Firefox.
- `biometrail.com` sits behind Cloudflare Access. The link is labelled "Private beta — access required",
  but a visitor still lands on an auth wall rather than a product page.
- `public/images/gif/4_night_drive.gif` is 8.7MB and unreferenced (commented out of `WALLPAPER_OPTIONS`),
  so it ships in the export for nothing. Deleting or compressing it is an operator call.
- `/writing` pages are still built and in the sitemap but no longer linked from any navigation.
- The "Listen to my mixes" entry is still pending a URL from the operator.

## Verification Plan
1. `npm run build` — confirm static export succeeds
2. `npm run lint` — confirm no ESLint errors
3. `cd out && python -m http.server` — confirm desktop shell, explorer, and SEO pages render
4. Resize below 720px — confirm the mobile shell activates and the wallpaper stays viewport-scaled
