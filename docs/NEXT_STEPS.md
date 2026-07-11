# Next Steps

## Active Goal
None — session of 2026-07-11 is fully shipped and deployed. Operator said: "as of now we are good, if new updates happen, will lyk and we can work more on it by then."

## Current State
- Deployed to https://junjslee.github.io via push `d11be56..014d272` (4 commits: `9c77fbf` boot fade + motion polish, `1e656d8` episteme + LMIC content, `14cb30d` docs, `014d272` date corrections). GitHub Actions run `29159260854` concluded success; live site verified serving the new build (CSS hash `2b3854e024a24854`, boot-screen markup present).
- Experience dates are future-proofed by operator instruction: LMIC @ MGH/Harvard Medical School is "(Summer 2026)" — it runs through August 2026 and needs no edit afterward; MONET Lab (ended May 2026) and MI2RL Asan (ended Feb 2026) are listed as previous.
- `main` and `origin/main` are in sync apart from the docs-handoff commit made after deploy (pushed in the same session).

## Next Actions (when the operator flags new updates)
1. Optional quick win: replace `public/documents/Resume.pdf` — it predates the LMIC internship.
2. Add an LMIC entry to the Research window/`/research` page once a public artifact (repo/paper) exists — nothing fabricated so far.
3. Optional backlog: startup chime, Cmd/Ctrl+K palette, per-project case studies, MDX blog, compress wallpaper GIFs (heaviest first-load asset), bump deprecated-Node `actions/*` versions in the Pages workflow.

## Blockers
- None.

## Suggested Commands
```bash
# Verify before any future deploy
npm run build && npm run lint

# Deploy
git push origin main
```

## Handoff Notes
- Project data stays single-sourced: `projects[]` (ProjectsSection.tsx) and `researchEntries[]` (ResearchSection.tsx) feed the XP explorer, standalone windows, and SEO pages.
- Boot flow: `BootPhase = 'loading' | 'fading' | 'desktop'`; fade overlay unmounts via a 650ms timeout while the CSS animation runs 600ms with `forwards` fill — keep in sync if retuning.
- All decorative motion sits behind `prefers-reduced-motion: reduce` guards at the bottom third of `globals.css`.
