import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql, desc, and } from "drizzle-orm";
import { Activity, Link2, MousePointerClick, TrendingUp } from "lucide-react";
import db from "@/db";
import { links, link_clicks } from "@/db/schema";

export const dynamic = "force-dynamic";

function EmptyCell() {
  return <span className="italic opacity-50">—</span>;
}

async function getSummaryData(userId: string) {
  const [totalLinksResult, totalClicksResult, activeLinksResult, topLinks, recentClicks] =
    await Promise.all([
      // Total links for this user
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(links)
        .where(eq(links.user_id, userId)),

      // Total clicks across all user links
      db
        .select({ total: sql<number>`coalesce(sum(${links.clicks_count}), 0)::int` })
        .from(links)
        .where(eq(links.user_id, userId)),

      // Active links count
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(links)
        .where(and(eq(links.user_id, userId), eq(links.active, true))),

      // Top 5 links by click count
      db
        .select({
          id: links.id,
          slug: links.slug,
          title: links.title,
          destination_url: links.destination_url,
          clicks_count: links.clicks_count,
          created_at: links.created_at,
        })
        .from(links)
        .where(eq(links.user_id, userId))
        .orderBy(desc(links.clicks_count))
        .limit(5),

      // Recent 10 click events across all user links (IP omitted for privacy)
      db
        .select({
          id: link_clicks.id,
          created_at: link_clicks.created_at,
          country: link_clicks.country,
          referrer: link_clicks.referrer,
          slug: links.slug,
        })
        .from(link_clicks)
        .innerJoin(links, eq(link_clicks.link_id, links.id))
        .where(eq(links.user_id, userId))
        .orderBy(desc(link_clicks.created_at))
        .limit(10),
    ]);

  return {
    totalLinks: totalLinksResult[0]?.count ?? 0,
    totalClicks: totalClicksResult[0]?.total ?? 0,
    activeLinks: activeLinksResult[0]?.count ?? 0,
    topLinks,
    recentClicks,
  };
}

export default async function SummaryPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const { totalLinks, totalClicks, activeLinks, topLinks, recentClicks } =
    await getSummaryData(user.id);

  const stats = [
    {
      label: "Total Links",
      value: totalLinks,
      icon: Link2,
    },
    {
      label: "Total Clicks",
      value: totalClicks,
      icon: MousePointerClick,
    },
    {
      label: "Active Links",
      value: activeLinks,
      icon: Activity,
    },
    {
      label: "Avg. Clicks / Link",
      value: totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0,
      icon: TrendingUp,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Request Summary
      </h1>
      <p className="mb-8 text-muted-foreground">
        An overview of your short-link traffic and click activity.
      </p>

      {/* Stat cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Top links */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Top Links by Clicks
        </h2>
        {topLinks.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
            No links yet. Create your first short link to see stats here.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Slug
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                    Title
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody>
                {topLinks.map((link, i) => (
                  <tr
                    key={link.id}
                    className={
                      i % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }
                  >
                    <td className="px-4 py-3 font-mono font-medium">
                      /{link.slug}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {link.title || <EmptyCell />}
                    </td>
                    <td className="hidden max-w-xs truncate px-4 py-3 text-muted-foreground md:table-cell">
                      {link.destination_url}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {link.clicks_count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent click activity */}
      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Recent Click Activity
        </h2>
        {recentClicks.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
            No click activity recorded yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Slug
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                    Country
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Referrer
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentClicks.map((click, i) => (
                  <tr
                    key={click.id}
                    className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {new Date(click.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono font-medium">
                      /{click.slug}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {click.country || <EmptyCell />}
                    </td>
                    <td className="hidden max-w-xs truncate px-4 py-3 text-muted-foreground md:table-cell">
                      {click.referrer || <EmptyCell />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
