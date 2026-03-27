import Link from "next/link";
import { BarChart2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mb-8 text-muted-foreground">
        Manage your short links and view analytics.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/summary"
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <BarChart2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Request Summary</p>
            <p className="mt-1 text-sm text-muted-foreground">
              View a summary of all link clicks and traffic analytics.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
