import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight transition-colors hover:text-accent"
            >
              {site.name}
            </Link>
            <div className="flex items-center gap-6 text-sm text-muted">
              <Link href="/#projects" className="transition-colors hover:text-fg">
                Projects
              </Link>
              <Link href="/#about" className="transition-colors hover:text-fg">
                About
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-fg"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <div className="flex gap-5">
              {site.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
