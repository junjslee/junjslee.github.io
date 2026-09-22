<!-- status: live · reviewed_as_of: 2026-09-22 -->
# Plan

## Current Goal
None. Everything opened on 2026-09-22 shipped: the design + content refresh, the cmd.exe and
wallpaper removals, and the audit fixes (contact form, `lang`, 404, blog retirement, WebP
wallpapers). Head is `cd1a692`; back in maintenance mode until the operator flags the next change.

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
- `biometrail.com` sits behind Cloudflare Access by the operator's decision, protecting an
  unpublished journal manuscript. The link carries a "Private beta — access required" note.
- The "Listen to my mixes" entry is still pending a URL from the operator.
- The contact form deliberately has no sender. If a future change wants real delivery it needs a
  hosted endpoint, not an environment variable.
- No analytics is installed, so there is no measurement of what visitors actually open.

## Verification Plan
1. `npm run build` — confirm static export succeeds
2. `npm run lint` — confirm no ESLint errors
3. `cd out && python3 -m http.server` — confirm desktop shell, explorer, and SEO pages render
4. Resize below 720px — confirm the mobile shell activates, the wallpaper letterboxes, and the
   panel close control reveals it
