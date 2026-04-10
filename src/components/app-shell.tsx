"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Library,
  Scale,
  Shield,
  Store,
} from "lucide-react";

const nav = [
  { href: "/", label: "Player dashboard", icon: LayoutDashboard },
  { href: "/appeals", label: "My appeals", icon: Inbox },
  { href: "/developer", label: "Developer", icon: Store },
  { href: "/admin", label: "Moderator", icon: Shield },
  { href: "/about", label: "Methodology", icon: BookOpen },
  { href: "/help", label: "Help", icon: HelpCircle },
] as const;

const footerLinks = [
  { href: "/developer/games", label: "Developer games" },
  { href: "/admin/history", label: "Completed reviews" },
  { href: "/resources", label: "Resources" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col bg-slate-100/80">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white shadow-sm">
              <Scale className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Algorithmic Fairness &amp; Transparency
              </p>
              <p className="text-xs text-slate-500">Gaming ecosystem portal</p>
            </div>
          </Link>
          <nav
            className="flex flex-wrap gap-1"
            aria-label="Primary"
          >
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : href === "/appeals"
                    ? pathname === "/appeals"
                    : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4 opacity-90" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
          <nav
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600"
            aria-label="Footer"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 hover:text-slate-900"
              >
                <Library className="h-3.5 w-3.5 opacity-70" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-xs text-slate-500">
            Prototype — bands and categories only. No raw scores or weights are
            shown.
          </p>
        </div>
      </footer>
    </div>
  );
}
