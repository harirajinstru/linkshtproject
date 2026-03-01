<!-- Agent instructions index for contributors and LLM-based agents -->
# Agent Instructions — linkshtproject (Index)

This directory contains focused agent guidance files. Each file covers a specific area so automated agents and reviewers can follow narrow, auditable rules.

Files
- [Code style & edits](AGENTS_CODE.md) — coding conventions and edit workflow.
- [Database & migrations](AGENTS_DB.md) — schema, migrations, and Drizzle guidance.
- [Security & secrets](AGENTS_SECURITY.md) — handling secrets, tokens, and dependency updates.
- [Testing & verification](AGENTS_TESTING.md) — local verification steps, linting, and type checks.
- [Commits & PRs](AGENTS_COMMITS.md) — commit message format and PR guidance.
- [Operations & scripts](AGENTS_OPS.md) — npm scripts, running, and basic deployment notes.
- [Authentication (Clerk)](AGENTS_AUTH.md) — rules for Clerk-only auth, protected routes, and redirects.

- [UI & shadcn](AGENTS_UI.md) — shadcn UI usage, patterns, and accessibility (contributors).

How to use
- Pick the file that matches your change scope and follow the rules exactly.
- When in doubt, ask a human maintainer before submitting changes that affect security, infra, or data.

Example preamble
"I'll implement a small, focused change to `app/page.tsx` to fix a UI bug — run lint and local dev to verify."

