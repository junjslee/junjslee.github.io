<!-- status: live · reviewed_as_of: 2026-09-22 · REPLACE-form handoff, never append -->
# Next Steps

## Status
Design + content refresh is **deployed and verified live** at https://junjslee.github.io.
`main` = `origin/main` = `0441196`. Nothing is in flight.

## Verified this session
- Actions run `35692523975` concluded **success** on `0441196`.
- Live site serves the new bundle `css/e04c3c24b311d9c0.css` (1 match), title
  "Junseong Lee — AI Researcher (Medical AI, Knowledge Graphs)", `og:image` → `/images/og-card.jpg`.
- Home page crawlable body text measured at **674 chars** with an `<h1>` and 3 JSON-LD blocks
  (was 1 char before this session).
- All 11 checked live routes and assets return 200.

## Open items
1. **"Listen to my mixes"** — the operator will supply the URL. Add a `mixes` entry to
   `folderOrder` / `folderCopy` in `JunLeeSection.tsx`; the Writing slot it replaces is already free.
2. **Cross-browser** — the explorer layout uses container queries and `:has()`, verified in Chrome
   only. Check Safari and Firefox: if `.xp-home-main` reports a single grid track above 600px, the
   query failed and needs a fallback.
3. **`public/images/gif/4_night_drive.gif`** — 8.7MB, unreferenced (commented out of
   `WALLPAPER_OPTIONS`), still shipping. Delete or compress.
4. **`biometrail.com` sits behind Cloudflare Access** — visitors hit an auth wall. The badge says
   "Private beta — access required"; a public landing page would serve the portfolio better.
5. **Publication record is understated** — the resume lists two npj Digital Medicine manuscripts and
   four presentations that `/research` does not carry. Deliberately not invented; needs the
   operator's call on what to surface.
6. Backlog: startup chime, Cmd/Ctrl+K palette, MDX blog, bump the deprecated-Node `actions/*`
   versions (CI annotates that five actions are forced onto Node 24).

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
- Writing is archived from the UI only. `/writing` and `/writing/post-1` still build and sit in the
  sitemap; `blogPosts` and the `blogReader` window remain, so restoring it is trivial.
- The episteme gate rejects unknowns without a **failure verb** (`fail`/`error`/`exit`/`reject`) or a
  numeric threshold with units, and a `git`-flavoured op also needs `verification_trace`.
