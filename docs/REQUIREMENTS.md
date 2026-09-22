<!-- status: live · reviewed_as_of: 2026-09-22 · tech-stack pins verified against package.json -->
# Requirements

## Objective
Personal portfolio site for Junseong Lee — a Windows XP-themed interactive desktop experience deployed as a static site on GitHub Pages.

## Users Or Stakeholders
- Visitors browsing Jun's work (recruiters, collaborators, researchers)
- Jun Lee himself, maintaining content and adding new work

## Constraints
- Static export only (GitHub Pages, no server-side runtime)
- Next.js 15 static output via `next export`
- Must remain crawlable for SEO (separate `/projects`, `/research`, `/writing` pages)
- Mobile must work via a separate XP-lite shell (not the full desktop UI)

## Non-Goals
- Backend API or database
- User accounts or auth
- CMS integration

## Acceptance Criteria
- Desktop XP shell loads with working windows, taskbar, start menu, sound toggle
- Mobile shell provides equivalent content access without drag-based windows
- `/projects` and `/research` are crawlable, indexed, and linked from site navigation
- `/writing` and `/writing/[slug]` stay crawlable and in the sitemap, but are archived out of the navigation as of 2026-09-22
- The home page carries readable content and structured data without JavaScript
- Sitemap is present and accurate
- Build and static export succeed with zero errors

## Tech Stack
- Next.js 15 (static export)
- React 19
- TypeScript
- xp.css (Windows XP stylesheet)
- EmailJS (contact form)
- GitHub Actions → GitHub Pages deployment
