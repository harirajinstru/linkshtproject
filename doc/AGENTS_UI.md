<!-- UI / shadcn ui guidance for contributors -->
# Agent Instructions — UI (shadcn ui)

Purpose
- Provide concise, actionable rules for working with the app's UI layer using shadcn UI.
- Audience: Contributors

Guiding principles
- Always use the existing shadcn UI components and tokens; do not create custom component libraries.
- Prefer composition and variants over new visual components. Reuse component primitives provided by shadcn.
- Keep props and public APIs small and documented; follow existing naming patterns.

Styling
- Use Tailwind classes and design tokens from the project. Keep component-level styling minimal.
- Pass `className` for small tweaks; avoid embedding large style blocks inside components.

Accessibility
- Ensure interactive controls have accessible names, keyboard focus, and ARIA where needed.
- Validate contrast and screen-reader behavior on major views before opening a PR.

Tests & verification
- Add focused unit or integration tests for new UI behavior.
- Run linting, type checks, and the app locally to confirm no regressions.

When to request exceptions
- If a pattern cannot be expressed using shadcn primitives, open a short RFC in the PR and request maintainer approval.

Where to change
- Make UI changes inside the app routes or existing component locations. Do not introduce a separate custom component system.

Examples (short)
- Use `Button` variant instead of creating a new `PrimaryButton` component.

Contact
- Ping a maintainer in PR comments for design or accessibility questions.
