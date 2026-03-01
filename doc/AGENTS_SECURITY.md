# Agent Instructions — Security & secrets

Scope
- Handling secrets, tokens, credentials, and dependency updates.

Key rules
- Never check secrets or credentials into the repo. Use environment variables (`.env.local`) and document required keys in `README.md`.
- Do not add credentials or private keys to any new file under `/public` or source control.
- When updating dependencies, verify changelogs for security fixes and breaking changes.

Edit workflow
- If a change touches security-sensitive code (auth, tokens, session handling), include a security rationale and tests in the preamble.

When to ask a human
- Rolling credentials, root access changes, or infra-level secrets require human approval.
