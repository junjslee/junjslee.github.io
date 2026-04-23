# Run Context

Last generated: `2026-03-26`

## Local Machine
- OS: macOS `15.7.3` (`24G419`)
- CPU: `Apple M2`
- Memory: `8 GB` unified memory
- Architecture: `arm64`
- Shell: `/bin/zsh`

## Local Tooling
- Claude Code: `2.1.81 (Claude Code)`
- Cursor: `2.6.21`
- Git: `git version 2.45.2`
- Node: `v20.14.0`
- npm: `10.7.0`

## Python Runtime Policy
- `agent-os` local Python work must run in Conda `base`.
- Expected Conda root: `/Users/junlee/miniconda3`
- Homebrew Python is not the supported runtime for `agent-os`.

## Practical Local Limits
- This machine is well suited for editing, tests, small automation, and light inference.
- Avoid assuming heavy local model inference, long training runs, or large data pipelines are practical.
- Prefer remote GPUs or hosted APIs for heavy workloads.

## External Services And APIs
- Fill in services used by this project.

## Rate Limits And Policies
- Fill in API limits, quotas, budgets, and retry rules here.

## Local Vs Remote Execution
- Run local editing, tests, documentation, and light automation here.
- Push heavy experiments, training, and GPU-heavy loops to remote infrastructure.

## Project-Specific Notes
- Add repo-specific environment constraints here.

## Frontend Dev Server
- Start dev server: `npm run dev` (or `pnpm dev`, `bun dev`).
- Always test the golden path in a browser before marking a UI task complete.
- Check browser console for errors and failed network requests after every UI change.
- Run `npm run build` and verify the build succeeds before any deployment.
