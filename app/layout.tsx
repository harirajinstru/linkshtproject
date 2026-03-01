import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linksht — Shorten, Share & Track Your Links",
  description:
    "Linksht is a fast, free link shortener. Create short URLs, share them anywhere, and track clicks with built-in analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
              <span className="text-lg font-bold tracking-tight">Linksht</span>
              <div className="flex items-center gap-3">
                <SignedOut>
                  <SignInButton forceRedirectUrl="/dashboard">
                    <button className="inline-flex h-9 items-center justify-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-muted">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton forceRedirectUrl="/dashboard">
                    <button className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
