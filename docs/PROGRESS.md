<!-- status: live · reviewed_as_of: 2026-09-22 · mandated by AGENTS.md -->
# Progress

## Last Updated
- `2026-09-22`

## Completed
- Windows XP desktop shell (windows, taskbar, start menu, drag/resize, sound)
- About, Projects, Research, Blog/Writing, Contact, JunLee sections
- Mobile XP-lite shell (refactored, separate from desktop)
- Crawlable SEO pages: `/projects`, `/research`, `/writing`, `/writing/[slug]`
- Sitemap generation; Open Graph / Twitter card meta + JSON-LD
- Deterministic one-per-day wallpaper, CRT toggle, cmd.exe terminal, window-state persistence,
  8-direction window resize handles, IE chrome on the Projects folder

### 2026-09-22 — design + content refresh (branch `feat/design-refresh`)

**Design system**
- Added a `:root` token layer to `globals.css` (type scale, ink, line, surface, spacing, measure,
  shadow) — the file previously had **zero** custom properties across 2172 lines. Converted 27
  scattered hex values to tokens.
- UI chrome moved to Tahoma (hinted for small sizes); Trebuchet is now display-only.
- Capped prose at `--measure: 68ch`. A maximised window previously produced ~150-character lines.
- `.xp-lead` was `font-weight: 700` — bold body copy was the worst legibility offender in About.
- Icon and type sizes brought down one step at the operator's request.

**Root cause found: SEO page headings**
- `xp.css` ships `h1{font-size:5rem}` and `h2{font-size:2.5rem}` globally. `.xp-content` overrode
  them for the XP shell, but `.seo-page` never did — so `/projects` rendered its h1 at a measured
  **80px** and each project title at **40px**. Both now have an explicit scale.

**Explorer layout**
- List and preview were stacked with the list capped at 260px and its own scrollbar *inside* a
  window frame that also scrolled — two nested scroll regions. The frame now holds still
  (`:has()`-scoped `overflow: hidden`) and each pane scrolls on its own.
- Container queries lay the sidebar, list and preview side by side once the **window** (not the
  viewport) passes 600px. `home` widened 860→1060, `about` 560→620.
- Dropped the redundant "Info" column; row titles now stack over their kind and wrap to two lines
  instead of truncating mid-word.
- Restored window geometry is clamped to the current viewport on mount. Saved coordinates from a
  wider monitor previously opened windows off-screen with no way to drag them back.

**Boot screen removed**
- The fake "Windows XP" boot existed to buffer wallpaper load, but the heaviest active wallpaper is
  519KB, so the ~1.5s wait bought nothing. Replaced with a pre-hydration shim that carries the
  page's real `<h1>`, summary and links, and fades in only after 250ms so a normal visitor never
  sees it.

**SEO**
- `/` had **1 character** of crawlable body text (the shell is entirely client-rendered). It now has
  **674**, with a real `<h1>` and three JSON-LD blocks (`Person`, `WebSite`, `ProfilePage`).
- Added `BreadcrumbList` to `/projects` and `/research`, `ImageObject` and `author` to each item,
  per-page `og:image` with dimensions and alt text, and descriptive page titles.
- og:image switched from a 1.4MB portrait to a purpose-built 1200×630 card; social cards are JPEG
  because several platforms do not render WebP previews.
- `hero.jpg` 1375KB → 11KB (it renders at ~130px).
- Sitemap refreshed with current `lastmod`, `changefreq`, `priority` and image extensions.

**Content**
- `Resume.pdf` replaced with `resume_acad.pdf`.
- About → Experience rebuilt from a flat 4-string array into a structured CV: education, four roles
  with PI / location / dates / bullets, recognitions, and key skills — all sourced from the resume.
- BiomeTrail added under **Research** (operator correction — it is research, not a project) with a
  live capture of the running app, a short summary, and the two NeurIPS 2026 workshop papers that
  came out of it listed with their venues and full author line. The neonatal study gained the
  RAD-DINO + LoRA architecture figure and its sandbox link; the Medical Physics paper gained the
  two-stage RetinaNet → U-Net cascade figure. Preview images open full size on click.
- Gaze-VQA (MONET Lab) added to projects from the resume.
- Minesweeper removed entirely (component, window type, icon, start-menu entry, glyph, 165 lines of CSS).
- Writing archived out of the UI; `/writing` pages stay live and indexed.
- DJing added to hobbies. LMIC bounded to May–Aug 2026 per operator correction.
- Mobile wallpaper moved to a fixed layer so it scales to the viewport instead of stretching over
  the full scroll height.

## In Progress
- Nothing tracked.

## Decisions
- Static export only: GitHub Pages has no server runtime; all data is inlined at build time.
- Separate mobile shell: full XP desktop is not usable on touch.
- SEO pages are separate Next.js pages so crawlers can index content.
- The pre-hydration shim carries real content rather than a splash screen — it is the honest
  no-JavaScript state, not hidden text.
- BiomeTrail links to `biometrail.com` with a "Private beta — access required" badge; the GitHub
  repo is private so it is not linked at all.
- One line of work can produce several papers, so `ResearchEntry` gained an optional `outputs[]`
  and `authors`. These render through the existing `xp-project-meta` / `xp-list` classes rather
  than new components, per the operator's instruction to integrate into the current design.
- The BiomeTrail preview is a fresh capture of the live app, not the under-review NeurIPS figure.

### 2026-09-22 — deployed
- Merged `feat/design-refresh` into `main` as a fast-forward and pushed `8e289e2..0441196`.
- GitHub Actions run `35692523975` ("Deploy Next.js site to Pages") concluded **success**.
- Live verification: `https://junjslee.github.io/` serves `css/e04c3c24b311d9c0.css`, the new title
  and `og:image`, 674 characters of crawlable body text, an `<h1>`, and 3 JSON-LD blocks. All 11
  checked routes and assets return 200.
- CI annotates that five `actions/*` target the deprecated Node 20 and are forced onto Node 24, and
  that `ubuntu-latest` migrates to Ubuntu 26 from 2026-10-19. Harmless today; worth a bump.
- Docs sweep: all 6 tracked `docs/*.md` had **no lifecycle marker** and were given one. `RUN_CONTEXT.md`
  pins re-measured — macOS `15.7.3`→`15.7.7`, Claude Code `2.1.81`→`2.1.278`, Cursor `2.6.21`→`3.18.9`;
  node, npm and git re-measured and unchanged. `REQUIREMENTS.md` acceptance criteria corrected to say
  Writing is archived out of navigation while staying crawlable. Nothing archived or discarded —
  every doc is live and in use.

## Validation
- `npm run build` — clean, 6/6 routes exported, CSS hash `b5c038d9e368cc6e` (2026-09-22)
- `npm run lint` — no warnings or errors (2026-09-22)
- Static export served locally; all 12 checked routes and assets return 200
- Desktop and mobile both verified in a browser (explorer 3-column, figures, mobile wallpaper)
- `/` crawlable body text measured at 674 chars with `<h1>` present and 3 JSON-LD blocks

## Blockers
- None. Not yet deployed — the deploy decision is the operator's.
