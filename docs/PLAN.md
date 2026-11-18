<!-- status: live · reviewed_as_of: 2026-11-18 -->
# Plan

## Current Goal
Show both SEØNG mixes with clickable thumbnails, switch the display handle to `@seong652`,
alternate the evening and Totoro wallpapers, link the official NeurIPS poster listings,
remove the publication's LIVE badge, and replace the academic resume.

## Stages
1. **Explore** — understand current state
2. **Plan** — define next feature or fix
3. **Implement** — make changes
4. **Review** — verify build, check on mobile + desktop
5. **Handoff** — update docs

## Active Stage
- Local verification complete. The Pages workflow publishes from `main`.

## Risks And Unknowns
- The explorer's side-by-side layout uses CSS container queries and `:has()`. Both are supported in
  Chrome 105+/Safari 16+/Firefox 110+; older browsers fall back to the stacked layout, which is still
  an improvement on the previous nested-scroll version. Not yet checked in Safari or Firefox.
- The contact form deliberately has no sender. If a future change wants real delivery it needs a
  hosted endpoint, not an environment variable.
- No analytics is installed, so there is no measurement of what visitors actually open.

## Verification Plan
1. `npm run build` — confirm static export succeeds
2. `npm run lint` — confirm no ESLint errors
3. `cd out && python3 -m http.server` — confirm desktop shell, explorer, and SEO pages render
4. Resize below 720px — confirm the mobile shell activates, the wallpaper letterboxes, and the
   panel close control reveals it
