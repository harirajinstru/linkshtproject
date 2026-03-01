# Agent Instructions — Authentication (Clerk)

Scope
- Rules for any changes touching authentication, protected routes, redirects, and Clerk integration.

Hard rules
- All authentication MUST be handled solely by Clerk (`@clerk/nextjs`). Do not add or use any other auth libraries or custom auth schemes.
- The `/dashboard` route is a protected route and must require the user to be logged in.
- If a logged-in user attempts to access the home page (`/`), they must be redirected to `/dashboard`.
- Sign-in and sign-out flows must use Clerk and must open the Clerk modal UI (do not implement custom modal UI for sign-in/out).

Implementation hints
- Use Clerk-provided hooks/components/utilities from `@clerk/nextjs` for protecting routes and performing redirects.
- Prefer Clerk's documented server- and client-side helpers for checks in server components, middleware, or API routes — do not reimplement session verification.
- Put any required environment variables for Clerk (API keys, publishable keys) in `.env.local` and document them in `README.md`.

Testing checklist
- When logged out: visiting `/dashboard` should redirect to the Clerk sign-in flow/modal.
- After successful Clerk sign-in: visiting `/` should redirect to `/dashboard`.
- Sign-in and sign-out must open the Clerk modal and complete the flow successfully.

When to ask a human
- Any request to replace Clerk or mix another auth provider with Clerk.
- Changes that modify auth UX drastically (custom auth flows, removing Clerk modal requirement) require explicit human approval.

Failure response
- If asked to implement non-Clerk authentication, respond: "Sorry, I can't assist with that." and request human instruction.
