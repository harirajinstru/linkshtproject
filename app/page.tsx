import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import {
  Link2,
  BarChart2,
  Zap,
  Globe,
  ShieldCheck,
  Copy,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant Link Shortening",
    description:
      "Paste any long URL and get a short, shareable link in seconds. No sign-up required to try.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description:
      "Track how many times your links are clicked. Understand your audience with real-time stats.",
  },
  {
    icon: Zap,
    title: "Blazing Fast Redirects",
    description:
      "Every short link resolves instantly so your audience never waits. Built on the edge for global speed.",
  },
  {
    icon: Globe,
    title: "Share Anywhere",
    description:
      "Your short links work everywhere — social media, email, SMS, QR codes, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "All links are scanned for malicious content. We keep your short URLs live and your data private.",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description:
      "Copy your new short link to the clipboard instantly and share it without extra steps.",
  },
];

export default async function Home() {
  const user = await currentUser();
  if (user) redirect("/dashboard");
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Free &amp; Open Source Link Shortener
        </span>

        <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Short links that work{" "}
          <span className="text-primary">harder for you</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Linksht turns long, unwieldy URLs into clean short links you can
          share anywhere — with click tracking included.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started — It&apos;s Free
          </Link>
          <Link
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-base font-semibold transition-colors hover:bg-muted"
          >
            See Features
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-border bg-muted/40 px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
            Everything you need to manage your links
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Powerful features without the complexity.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to shorten your first link?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Create an account in seconds and start sharing smarter links today.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Linksht. All rights reserved.
      </footer>
    </div>
  );
}

