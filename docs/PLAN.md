# Plan

## Current Goal
No active goal — repo is back in maintenance/iteration mode. Last shipped and deployed (2026-07-11): smooth boot fade (loading → fading → desktop overlay), motion polish pass (window-open animation, start-menu pop, hover/press transitions, mobile section fades, `prefers-reduced-motion` guard), episteme project copy rewritten to current-kernel reality (liveLink → https://www.epistemekernel.com/), and experience dates future-proofed — LMIC @ MGH/Harvard "Summer 2026", MONET Lab and MI2RL Asan marked previous. Operator will flag new updates when they happen.

## Stages
1. **Explore** — understand current state
2. **Plan** — define next feature or fix
3. **Implement** — make changes
4. **Review** — verify build, check on mobile + desktop
5. **Handoff** — update docs

## Active Stage
- Explore (awaiting operator direction)

## Risks And Unknowns
- Live-site boot fade verified only via served HTML/CSS + code inspection, not a manual browser pass; if a cold load of https://junjslee.github.io/ hard-cuts instead of fading, inspect `.xp-boot-screen.is-fading`.
- GitHub Actions annotates that actions target deprecated Node 20 and are forced onto Node 24 — harmless today, but bump `actions/*` versions when convenient.

## Verification Plan
1. `npm run build` — confirm static export succeeds
2. `npm run lint` — confirm no ESLint errors
3. Open `out/index.html` (or `npx serve out`) — confirm desktop shell renders and boot fades
4. Resize to mobile — confirm mobile shell activates
