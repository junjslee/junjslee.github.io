<!-- status: live · reviewed_as_of: 2026-09-22 · REPLACE-form handoff, never append -->
# Next Steps

## Status
**Deployed and verified live** at https://junjslee.github.io.
`main` = `origin/main` = `cd1a692`. Nothing is in flight.

## Verified live
- Latest deploy run `35758293295` concluded **success** (earlier runs `35692523975`,
  `35692777482`, `35756174292` also success).
- `lang="en"` present; zero `emailjs` references in the served page; `/404.html` titled
  "Page not found — Junseong Lee"; `/writing/` and `/writing/post-1/` return **404**;
  `2_evening.gif` returns 404 while `2_evening.webp` returns 200; sitemap down to 3 URLs.
- `/images/gif/4_night_drive.gif` also returns 404. Export weight across the two passes:
  **12MB → 3.8MB → 2.9MB**.
- Home page crawlable body text **674 chars** with an `<h1>` and 3 JSON-LD blocks (was 1 char).
- Checked routes and assets return 200.

## Open items
1. **"Listen to my mixes"** — the operator will supply the URL. Add a `mixes` entry to
   `folderOrder` / `folderCopy` in `JunLeeSection.tsx`; the Writing slot it replaces is already free.
2. **Cross-browser** — the explorer layout uses container queries and `:has()`, verified in Chrome
   only. Check Safari and Firefox: if `.xp-home-main` reports a single grid track above 600px, the
   query failed and needs a fallback.
3. **Publication record is understated** — the resume lists two npj Digital Medicine manuscripts and
   four presentations that `/research` does not carry. Deliberately not invented; needs the
   operator's call on what to surface.
4. Backlog: startup chime, Cmd/Ctrl+K palette. No analytics is installed, so there is no
   measurement of what visitors actually open.

**Closed by the operator:** BiomeTrail stays behind Cloudflare Access on purpose — the journal
manuscript is unpublished and the wall is deliberate protection. The `ubuntu-latest` CI annotation
is not actionable here: this workflow pins Node through `actions/setup-node` and only runs a static
build, so the runner image migration does not affect it.

## Blockers
None.

## Next commands
```bash
# Always before a deploy
npm run build && npm run lint

# Inspect the real export
cd out && python3 -m http.server 4173

# Deploy (direct-to-main is this repo's convention)
git push origin main && gh run watch "$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```

## Handoff notes
- **Design tokens live at the top of `src/styles/globals.css`.** Add colours and sizes there, not
  inline — removing ~40 one-off hex values was the point of this pass.
- `xp.css` sets `h1{font-size:5rem}` / `h2{font-size:2.5rem}` **globally**. Any new standalone page
  must define its own heading scale or inherit 80px headings. `.xp-content` and `.seo-page` both
  override it.
- Explorer scroll containment is `:has()`-scoped in the "Design pass" block at the bottom of
  `globals.css`. A new explorer-style window must be added to those selector lists or its frame will
  scroll alongside its panes. Container breakpoint is 600px and measures the **window**, not the viewport.
- `projects[]` (`ProjectsSection.tsx`) and `researchEntries[]` (`ResearchSection.tsx`) are the single
  source for the XP explorer, the standalone windows, and the SEO pages. Both carry optional `image`,
  `imageAlt`, `liveLink`, `liveLabel`, `liveNote`; `ResearchEntry` adds `outputs[]` and `authors` for
  one line of work that produced several papers, and its `href` is optional.
- Social cards are JPEG on purpose (`*-card.jpg`); in-page images are WebP. Never point `og:image`
  at a `.webp`.
- Writing is **fully retired**. The routes, `BlogSection`, the `blogReader` window and the blog CSS
  are gone and the sitemap is down to 3 URLs. The post text is preserved verbatim at
  `archive/writing/post-1.md` — restoring it means re-adding a route, not rewriting the prose.
- The contact form has **no send service** and is not supposed to have one: it builds a `mailto:`
  draft. Do not reintroduce EmailJS without also setting the three repository secrets, or it will
  silently fall through again.
- Wallpapers are **lossless** animated WebP. The art is palette-based, so lossless beats both GIF
  and lossy WebP; re-encoding lossy makes them larger and adds artefacts.
- `clampWindowToViewport` clamps **position only, never size**. Clamping size wrote the shrunken
  values back through the persistence effect, so one phone-width visit left desktop windows stuck
  small. Do not reintroduce a size clamp there.
- xp.css styles `.title-bar button` with a sprite and a fixed 16x14 box. Any custom title-bar
  control must out-specify it and set `background-image: none`, or it renders as a blank square.
- The episteme gate rejects unknowns without a **failure verb** (`fail`/`error`/`exit`/`reject`) or a
  numeric threshold with units, and a `git`-flavoured op also needs `verification_trace`.
