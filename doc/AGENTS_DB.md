# Agent Instructions — Database & migrations

Scope
- Guidance for changing `db/` files, schema, and migration-related configuration (`drizzle.config.ts`).

Key rules
- Update `db/schema.ts` when adding or changing tables/columns.
- Check `drizzle.config.ts` if adding migrations or changing migration sources.
- Never run destructive migrations (data loss) without explicit human approval and a migration plan.

Edit workflow
- Describe schema changes in the preamble and include verification steps (example queries or dev seed steps).

Testing
- Verify local dev app starts and basic DB operations work after schema changes.

When to ask a human
- Any migration that alters or drops existing columns/tables, or that impacts production data.
