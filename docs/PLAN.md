# Plan

## Current Goal
Session of 2026-07-11: (1) smooth the boot/loading experience — fade the boot screen out over the painted desktop instead of hard-cutting; (2) refresh `episteme` project copy to match its current state (cognitive-governance kernel, Claude Code plugin + Python kernel, live at epistemekernel.com); (3) add the Research Intern @ LMIC, Massachusetts General Hospital / Harvard Medical School experience (About window, terminal `whoami`, Person JSON-LD); (4) general motion polish — window-open animation, start-menu pop, hover transitions, mobile section fades, `prefers-reduced-motion` guard.

## Stages
1. **Explore** — read XP shell, CSS, data files, Resume.pdf, episteme repo README (done)
2. **Plan** — this update
3. **Implement** — XPDesktop boot sub-state + CSS motion pass + content updates
4. **Review** — `npm run build`, `npm run lint`, browser smoke test of boot fade
5. **Handoff** — update PROGRESS/NEXT_STEPS, conventional commit

## Active Stage
- Handoff (implementation + build/lint verification complete; browser visual pass and push remain)

## Risks And Unknowns
- Boot fade overlay must not leave pointer-events active after finishing, or the desktop is unclickable.
- `epistemekernel.com` verified live (308 → www) on 2026-07-11; liveLink uses the www form.
- Repo `main` is still ahead of `origin/main` from the 2026-04-22 session (squash + push remains outstanding).

## Verification Plan
1. `npm run build` — static export succeeds with zero errors
2. `npm run lint` — no ESLint errors
3. Serve `out/` and confirm: boot fades into desktop, windows animate open, About shows LMIC entry, Projects shows updated episteme copy
4. Mobile width — section switch fades, taskbar unaffected
