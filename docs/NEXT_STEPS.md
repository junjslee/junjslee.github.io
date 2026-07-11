# Next Steps

## Active Goal
No feature in progress. Session of 2026-07-11 shipped: smooth boot fade (loading → fading → desktop), motion polish pass (window-open animation, start-menu pop, hover/press transitions, mobile section fades, `prefers-reduced-motion` guard), episteme project copy rewritten to current-kernel reality (liveLink → https://www.epistemekernel.com/), and the MGH/Harvard LMIC research-intern experience activated across About, terminal `whoami`, and Person JSON-LD.

## Next Actions
1. Visual smoke test locally (`npx serve out`, or `npm run dev`): confirm the boot screen fades into the desktop with no double-flash, windows animate open, About → Experience shows the LMIC entry, Projects shows the new episteme copy and Live Site button opens epistemekernel.com.
2. Push to deploy. The 2026-04-22 batch is already on `origin/main` (verified 2026-07-11); `main` is ahead by exactly this session's 3 commits (`9c77fbf` boot fade + motion, `1e656d8` content, `d7ae24d` docs). `git push origin main` deploys via GitHub Actions.
3. After deploy, smoke-test live: boot fade on a cold load, mobile section-switch fade, `/projects` SEO page shows updated episteme entry.
4. Optional backlog (carried over): startup chime, Cmd/Ctrl+K palette, per-project case studies, MDX blog. Consider a ResearchSection entry for LMIC work once there is a public artifact (repo/paper) — nothing was fabricated this session.

## Blockers
- None.

## Suggested Commands
```bash
# Visual pass on the exact export
npx serve out

# Deploy this session's 3 commits
git log origin/main..HEAD --oneline
git push origin main
```

## Handoff Notes
- All project data stays single-sourced: `projects[]` (ProjectsSection.tsx) and `researchEntries[]` (ResearchSection.tsx) feed the XP explorer, standalone windows, and SEO pages — edit once, propagates everywhere.
- Boot flow: `BootPhase = 'loading' | 'fading' | 'desktop'`; the fading overlay unmounts via a 650ms timeout while the CSS animation runs 600ms with `forwards` fill — keep those in sync if retuning.
- LMIC dates are stated as "2026 - Present"; MI2RL Asan marked previous per Resume.pdf (Feb 2025 – Feb 2026). Resume.pdf itself predates the LMIC internship — consider replacing `public/documents/Resume.pdf` with an updated version.
- `npm run build` + `npm run lint` clean on 2026-07-11; last CSS hash `2b3854e024a24854`.
