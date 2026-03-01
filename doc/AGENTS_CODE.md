# Agent Instructions — Code style & edits

Scope
- Rules for making code changes in TypeScript, React, Next.js, and related files.

Key rules
- Keep edits minimal and focused: change only files directly required to implement the requested behavior.
- Prefer TypeScript and existing code patterns in `app/`, `lib/`, and `db/`.
- Follow Next.js conventions: server vs client components, routing under `app/`, and data fetching patterns.

Edit workflow
- Write a 1–2 sentence preamble before applying patches explaining intent and verification steps.
- Include all related edits for a single logical change in one patch whenever possible.
- Avoid broad refactors unless the user explicitly requested them.

Testing
- Run `npm run lint` and `tsc` when changing types or adding new modules.

When to ask a human
- Cross-cutting refactors, API surface changes, or changes that affect many files.
