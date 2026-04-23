# Progress

## Last Updated
- `2026-04-22`

## Completed
- Windows XP desktop shell (windows, taskbar, start menu, drag/resize, sound)
- About, Projects, Research, Blog/Writing, Contact, JunLee sections
- Mobile XP-lite shell (refactored, separate from desktop)
- Crawlable SEO pages: `/projects`, `/research`, `/writing`, `/writing/[slug]`
- Sitemap generation
- Open Graph / Twitter card meta + JSON-LD Person schema
- Randomized wallpapers on boot
- Canonical name standardized to "Junseong Lee" on all profile surfaces
- Boot/login sequence, CRT scanline toggle, cmd.exe terminal, window-state localStorage persistence, IE chrome on Projects folder (commit `0b27459`)
- `episteme` project added with `liveLink` support — live site surfaced in XP explorer IE toolbar, SEO projects page, and standalone ProjectsSection
- GitHub + LinkedIn desktop icons (open in new tab)
- Terminal (cmd.exe) simplified: fewer commands, ASCII banner, `joke` / `coffee` easter eggs, snarkier fallback
- Mobile made scrollable: page-level scroll enabled, sticky taskbar, `xp-home-main` / `xp-explorer-stack` stacked instead of grid-capped, added `:active` press and clock pulse for a less-static feel
- Wallpaper rotation switched from random-per-session to deterministic one-per-day (`chooseDailyWallpaper`, UTC day index modulo wallpaper count); sessionStorage persistence removed
- Polish: mobile workspace `padding-bottom: 80px` so sticky taskbar doesn't overlap trailing content during scroll; desktop shortcuts wrap to 2 columns on short viewports (`max-height: 780px`); IE "Address" label hides under 420px
- Explorer list rows fixed: titles single-line with ellipsis + `title` tooltip; per-category SVG/Unicode glyph badge + color accent; `LIVE` chip on rows with a live site; preview pane gained a 72px gradient hero block using the category accent, plus a `LIVE` chip in the chip row
- Login/welcome screen removed — boot flow is now `loading → desktop` (no click-through). `BootPhase` type simplified to `'loading' | 'desktop'`, welcome CSS deleted, `MIN_BOOT_DURATION_MS` trimmed 1600→900ms
- Working Minesweeper (`MinesweeperSection.tsx`) — beginner (9×9/10) + intermediate (16×16/40), first-click safety, flood-fill reveal, right-click flag + Flag Mode toggle for touch, live mine/time counters with classic LCD styling, face states (smile/worried/dead/cool), win/lose detection, new-window type `minesweeper` in `XPDesktop.tsx` with desktop icon, start-menu entry, and SVG glyph
- Window resize handles — 8-direction (4 edges + 4 corners) grips with proper cursors (`ns`, `ew`, `nesw`, `nwse`); SE corner shows a visible diagonal grip; `RESIZE_MIN_WIDTH: 320`, `RESIZE_MIN_HEIGHT: 240`; writes through to `state.restored` so maximize→restore returns to the user's custom size; localStorage persistence is transparent

## In Progress
- Nothing tracked.

## Decisions
- Static export only: GitHub Pages has no server runtime; all data is inlined at build time.
- Separate mobile shell: full XP desktop is not usable on touch; mobile gets a simpler tab-based layout.
- SEO pages are separate Next.js pages (not part of XP shell) so crawlers can index content.

## Validation
- `npm run build` — passes clean on 2026-04-22 (episteme + desktop icons + terminal simplification + mobile scroll)
- Deployed to https://junjslee.github.io via GitHub Actions

## Blockers
- None known.
