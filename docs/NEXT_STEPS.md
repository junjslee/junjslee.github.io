# Next Steps

## Active Goal
No active feature in progress. Main outstanding action: squash the 8 auto-checkpoint commits from the 2026-04-22 session into meaningful Conventional Commits and push to `origin/main`.

## Next Actions
1. Squash the 8 checkpoint commits into a small number of readable commits (suggested split below), then `git push origin main` to deploy via GitHub Actions.
2. Smoke-test the live site after deploy: desktop (resize handles, Minesweeper, cmd.exe, IE toolbar on Projects), mobile (scroll, sticky taskbar, IE label under 420px), SEO pages still indexed.
3. Decide whether to keep the session's optional backlog (startup chime, Cmd/Ctrl+K palette, per-project case studies, MDX for blog) or close them out.

## Blockers
- None.

## Suggested Commands
```bash
# Interactive rebase to squash checkpoints (8 commits ahead of origin)
git rebase -i origin/main

# Suggested commit split:
#   feat(xp): add Minesweeper window with beginner/intermediate, flag mode, classic LCD UI
#   feat(xp): add 8-direction window resize handles with classic cursors
#   feat(content): add episteme project with liveLink surfaced across explorer, IE toolbar, SEO page
#   feat(xp): add GitHub and LinkedIn desktop icons
#   feat(xp): simplify cmd.exe with ASCII banner, joke/coffee easter eggs
#   fix(mobile): make page scrollable with sticky taskbar and stacked explorer panes
#   refactor(xp): remove login/welcome screen, boot loading→desktop directly
#   feat(xp): daily wallpaper rotation (one per UTC day)
#   style(xp): explorer row glyphs, LIVE chips, preview hero tile, ellipsis titles

# Then push
git push origin main

# Verify the build locally before push
npm run build
```

## Handoff Notes
- Session of 2026-04-22 shipped a large batch; `git log origin/main..HEAD` shows **8 auto-checkpoint commits** ahead of origin. Working tree is clean. Changes are safe in git but still unpushed and not squashed into meaningful commits.
- Shipped this session (in rough order):
  1. `episteme` project added with `liveLink` field; surfaced in XP explorer, IE toolbar, SEO `/projects`, standalone `ProjectsSection`
  2. GitHub + LinkedIn desktop icons
  3. `cmd.exe` simplified + fun (ASCII banner, `joke`/`coffee` commands, snarky fallback)
  4. Mobile scrollability: body scroll enabled, sticky taskbar, `xp-home-main`/`xp-explorer-stack` stacked instead of grid-capped; `:active` press scale; clock pulse
  5. Wallpaper rotation: random-per-session → deterministic one-per-UTC-day
  6. Polish: mobile workspace `padding-bottom: 80px`; desktop shortcuts wrap to 2 columns under `max-height: 780px`; IE `Address` label hides under 420px
  7. Explorer list polish: titles single-line + ellipsis + `title` tooltip; per-category glyph badges with color accent; `LIVE` chips; preview pane gained a 72px gradient hero tile
  8. Login/welcome screen removed — boot is now `loading → desktop` directly; `MIN_BOOT_DURATION_MS` trimmed 1600→900ms
  9. Working Minesweeper (`MinesweeperSection.tsx`) — beginner + intermediate, first-click safety, flood-fill reveal, right-click + flag-mode toggle, LCD counters, face states
  10. Window resize handles — 8-direction, classic cursors, visible SE grip, 320×240 min, updates `restored` so maximize→restore returns to user-customised size
- `npm run build` passed clean after every substantive change; last verified build hash `css/451710133516a162.css`.
