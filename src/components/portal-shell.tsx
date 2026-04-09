"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gavel,
  LayoutDashboard,
  ShieldCheck,
  Store,
} from "lucide-react";

const nav = [
  { href: "/", label: "Player transparency", icon: LayoutDashboard },
  { href: "/developer", label: "Storefront insights", icon: Store },
  { href: "/admin", label: "Review queue", icon: Gavel },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-sky-800">
                Platform transparency
              </p>
              <h1 className="text-lg font-semibold text-slate-900">
                Algorithmic Fairness &amp; Transparency Portal
              </h1>
            </div>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Decisions are summarized in tiers and categories. Raw scores and
            weights are never shown.
          </p>
        </div>
        <nav
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        Prototype — Calculated opacity design. Not legal advice.
      </footer>
    </div>
  );
}
