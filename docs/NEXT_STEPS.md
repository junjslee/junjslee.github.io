# Next Steps

## Active Goal
Design + content refresh is implemented and verified on branch `feat/design-refresh`.
**Nothing has been pushed.** The deploy decision is the operator's.

## Current State
- Branch `feat/design-refresh` off `main` @ `2785bf0`. `main` and `origin/main` untouched.
- `npm run build` clean (6/6 routes, CSS hash `b5c038d9e368cc6e`), `npm run lint` clean.
- Static export served locally; every checked route and asset returns 200; desktop and mobile
  both eyeballed in Chrome.
- Direction, set by the operator this session: keep the XP identity, raise the craft. Scope covered
  the desktop shell, SEO pages, mobile shell, and minimal onboarding.

## Open Items
1. **"Listen to my mixes" link** — the operator will supply the URL later. Nothing has been added
   yet; a Mixes entry belongs in `folderOrder`/`folderCopy` in `JunLeeSection.tsx` once the URL exists.
2. **Deploy** — `git push origin feat/design-refresh` then merge, or merge locally and push `main`.
   GitHub Pages deploys on push to `main`.
3. **Cross-browser** — the explorer layout uses container queries and `:has()`. Verified in Chrome
   only; Safari and Firefox unchecked. Older engines fall back to the stacked layout.
4. **`public/images/gif/4_night_drive.gif`** is 8.7MB and unreferenced; it still ships. Delete or
   compress when convenient.
5. **`biometrail.com` is behind Cloudflare Access** — visitors see an auth wall. The badge says
   "Private beta — access required", but a public landing page would serve the portfolio better.
6. Optional backlog: startup chime, Cmd/Ctrl+K palette, per-project case studies, MDX blog,
   bump deprecated-Node `actions/*` versions in the Pages workflow.

## Blockers
- None.

## Suggested Commands
```bash
# Verify before any deploy
npm run build && npm run lint

# Look at the real export
cd out && python3 -m http.server 4173

# Deploy (operator decision)
git checkout main && git merge feat/design-refresh && git push origin main
```

## Handoff Notes
- **Design tokens live at the top of `src/styles/globals.css`.** Add new colours and sizes there,
  not inline — the whole point of this pass was removing ~40 one-off hex values.
- `xp.css` sets `h1{font-size:5rem}` / `h2{font-size:2.5rem}` **globally**. Any new standalone page
  must define its own heading scale or it will inherit 80px headings. `.xp-content` and `.seo-page`
  both override it; a third surface would need the same.
- Explorer scroll containment is `:has()`-scoped in the "Design pass" block at the bottom of
  `globals.css`. A new explorer-style window must be added to those selector lists or its frame
  will scroll alongside its panes.
- Container query breakpoint is 600px on `.xp-home-main-wrap`, `.xp-projects-section` and
  `.xp-research-section`. It measures the **window**, not the viewport.
- Project and research data stay single-sourced: `projects[]` (`ProjectsSection.tsx`) and
  `researchEntries[]` (`ResearchSection.tsx`) feed the XP explorer, the standalone windows, and the
  SEO pages. Both now carry optional `image`, `imageAlt`, `liveLink`, `liveLabel`.
- Social cards are JPEG on purpose (`*-card.jpg`); the in-page images are WebP. Do not point
  `og:image` at a `.webp`.
- Writing is archived from the UI only. `/writing` and `/writing/post-1` still build and sit in the
  sitemap; `blogPosts` and the `blogReader` window remain in place so restoring it is trivial.
