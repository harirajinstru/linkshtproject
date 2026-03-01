# Agent Instructions — Testing & verification

Scope
- Steps to verify changes locally and basic lint/type checks.

Local checks
- Dev server: `npm run dev` to verify UI and runtime behavior.
- Linting: `npm run lint` for ESLint issues.
- Type checks: run `npx tsc --noEmit` when adding or changing TypeScript types.

What to include in PRs
- Brief testing steps that maintainers can run, and which files or views were exercised.

When to ask a human
- If tests fail or a change requires CI access, inform a human reviewer.
