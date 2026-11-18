<!-- status: live · reviewed_as_of: 2026-11-17 -->
# Plan

## Current Goal
Add a YouTube shortcut to the XP desktop and mobile launcher, and feature SEØNG under
“Listen to my mixes” in the existing portfolio explorer.

## Stages
1. **Explore** — understand current state
2. **Plan** — define next feature or fix
3. **Implement** — make changes
4. **Review** — verify build, check on mobile + desktop
5. **Handoff** — update docs

## Active Stage
- Local verification complete. Publish via GitHub Pages and check the public homepage.

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
