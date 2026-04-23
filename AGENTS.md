# Agent Operating Manual

## Purpose
This file is the vendor-neutral operating manual for agents working in this repository.

## Required Memory Files
- `CLAUDE.md`
- `docs/REQUIREMENTS.md`
- `docs/PLAN.md`
- `docs/PROGRESS.md`
- `docs/RUN_CONTEXT.md`
- `docs/NEXT_STEPS.md`

## Workflow
1. Read project memory before planning or code changes.
2. Clarify the active objective in `docs/REQUIREMENTS.md`.
3. Update `docs/PLAN.md` before substantial implementation.
4. Track completed work, decisions, and validation in `docs/PROGRESS.md`.
5. Keep `docs/NEXT_STEPS.md` current as the handoff for the next session.
6. Use git worktrees for non-trivial parallel work.
7. Use Conventional Commits for final commit messages.

## Runtime Policy
- `agent-os` is the source of truth for the project scaffold.
- Local Python-backed `agent-os` work runs in Conda `base` at `/Users/junlee/miniconda3`.
- Homebrew Python is not the supported runtime for `agent-os`.

## Guardrails
- Prefer the smallest useful verification step first.
- Do not duplicate large prompt blocks in chat when they belong in project memory.
- Record environment limits, APIs, and rate limits in `docs/RUN_CONTEXT.md`.
- Keep `CLAUDE.md` short and use it as an index into the live docs.
