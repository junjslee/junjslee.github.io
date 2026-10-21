<!-- status: live · reviewed_as_of: 2026-10-11 · REPLACE-form handoff, never append -->
# Next Steps

## Status
**Deployed and verified live** at https://junjslee.github.io.
`main` = `origin/main` (deploy commit `6177df9`). Nothing is in flight.

## Verified live (2026-10-11)
- Deploy run `38182550752` concluded **success** on `6177df9`.
- Wallpaper rotation is evening → Bliss → totoro: `4_bliss.webp` returns 200,
  `3_night_cityview.webp` returns 404. The Bliss source JPEG lives unexported in `archive/wallpapers/`.
- Mobile **More** launcher has a `✕` close control (closes More only; checked in a 400px frame).
- NeurIPS 2026 workshop papers shown as **accepted posters** on `/research`, the explorer, About and
  the home shim.
- Visibility: `/research` serves 3 `ScholarlyArticle` blocks (one per paper plus the Medical Physics
  publication); descriptions name the posters.
- Name search: every page title leads with the full name **Junseong Lee** (home adds "(Jun Lee)");
  `Person.alternateName` lists `Jun Lee`, `Jun Seong Lee`, `Jun-Seong Lee`, `JunSeong Lee`, `junjslee`.

## Open items
1. **"Listen to my mixes"** — the operator will supply the URL. Add a `mixes` entry to
   `folderOrder` / `folderCopy` in `JunLeeSection.tsx`; the Writing slot it replaces is already free.
2. **Cross-browser** — the explorer layout uses container queries and `:has()`, verified in Chrome
   only. Check Safari and Firefox: if `.xp-home-main` reports a single grid track above 600px, the
   query failed and needs a fallback.
3. **Publication record is understated** — the resume lists two npj Digital Medicine manuscripts and
   four presentations that `/research` does not carry. Deliberately not invented; needs the
   operator's call on what to surface.
4. **Search Console** — the single biggest visibility lever left is operator-only: verify the site in
   Google Search Console (HTML-file or meta-tag method), submit `sitemap.xml`, and request indexing
   of `/` and `/research/`. Also add the site URL to the GitHub profile, LinkedIn and Google Scholar /
   ORCID if they exist — inbound links from those profiles are what raises ranking for the name. If
   the operator shares Scholar/ORCID URLs, add them to `SITE_SAME_AS` in `src/lib/site.ts`.
5. Backlog: startup chime, Cmd/Ctrl+K palette. No analytics is installed, so there is no
   measurement of what visitors actually open.

**Closed by the operator:** BiomeTrail is public as of 2026-10-21 (the Cloudflare Access wall and
the "Private beta" note are gone). The neonatal pneumoperitoneum paper is published in npj Digital
Medicine (`10.1038/s41746-026-03399-3`); its "Open Sandbox" button became "Open Publication", since the
sandbox is reachable from the paper and the repository. The `ubuntu-latest` CI annotation
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
- Explorer row text sizes from the **list pane's** width (`cqi`, 12→15px; the browser panes are
  inline-size containers). Row names are not line-clamped: paper titles run ~150 characters.
- `ResearchEntry.doi` (bare DOI) makes `/research` emit that item as a `ScholarlyArticle` with a DOI
  `identifier` and a doi.org `url`.
- `public/documents/Resume.pdf` is a copy of `~/Documents/personal/resumes/resume_acad.pdf`; replace
  the file in place to update it, never rename it (desktop icon, About and the shim link that path).
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
- Animated wallpapers are **lossless** WebP (palette art: lossless beats GIF and lossy WebP). The
  exception is `4_bliss.webp`, a still that arrived as JPEG — it is lossy q90, because lossless
  re-encoding of JPEG artefacts only preserves them at 2.6× the size.
- A local `chore(chkpt)` hook can auto-commit untracked files to `main` mid-session. Check
  `git log origin/main..` before pushing; on 2026-10-11 it had committed a 460KB source JPEG.
- `clampWindowToViewport` clamps **position only, never size**. Clamping size wrote the shrunken
  values back through the persistence effect, so one phone-width visit left desktop windows stuck
  small. Do not reintroduce a size clamp there.
- xp.css styles `.title-bar button` with a sprite and a fixed 16x14 box. Any custom title-bar
  control must out-specify it and set `background-image: none`, or it renders as a blank square.
- The episteme gate rejects unknowns without a **failure verb** (`fail`/`error`/`exit`/`reject`) or a
  numeric threshold with units, and a `git`-flavoured op also needs `verification_trace`.
