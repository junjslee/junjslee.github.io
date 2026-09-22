<!-- status: live · reviewed_as_of: 2026-09-22 · append-only history index, one row per handoff -->
# Events

Append-only session ledger. Exactly one row per handoff.

| Event | Date | What | Refs |
|---|---|---|---|
| E1 | 2026-07-11 | Boot fade + motion polish; episteme copy → kernel/epistemekernel.com; MGH/Harvard LMIC experience activated; build+lint clean | docs/PROGRESS.md, docs/NEXT_STEPS.md |
| E2 | 2026-07-11 | Dates future-proofed (LMIC Summer 2026; MONET/Asan previous); pushed d11be56..014d272; Actions 29159260854 success; live site verified | docs/NEXT_STEPS.md, docs/PROGRESS.md |
| E3 | 2026-09-22 | Design + content refresh on `feat/design-refresh`: CSS token layer, explorer 3-column with nested scroll removed, xp.css 80px-heading root cause fixed on SEO pages, fake boot screen replaced with a content-carrying shim (`/` 1→674 crawlable chars), resume/experience/BiomeTrail/architecture figures added, Minesweeper removed, Writing archived from UI; build+lint clean, not deployed | docs/PROGRESS.md, docs/NEXT_STEPS.md |
| E4 | 2026-09-22 | Deployed the design + content refresh: pushed `8e289e2..0441196`, Actions run `35692523975` success, live site serving `css/e04c3c24b311d9c0.css` with 674 crawlable chars on `/`; docs swept and lifecycle markers added to all 6 tracked docs | docs/NEXT_STEPS.md, docs/PROGRESS.md |
| E5 | 2026-09-22 | Removed cmd.exe and the orphaned BSoD, deleted the unreferenced 8.7MB wallpaper (export 12MB→3.8MB), added a mobile title-bar close control that reveals the wallpaper, fitted the mobile wallpaper with `contain`, and fixed the viewport clamp persisting shrunken window sizes; deployed `72f19d9`, run `35756174292` success | docs/NEXT_STEPS.md, docs/PROGRESS.md |
