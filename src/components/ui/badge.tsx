import type { ReactNode } from "react";

const tones: Record<string, string> = {
  slate: "bg-slate-100 text-slate-800 ring-slate-500/10",
  blue: "bg-sky-50 text-sky-900 ring-sky-600/10",
  amber: "bg-amber-50 text-amber-900 ring-amber-600/10",
  green: "bg-emerald-50 text-emerald-900 ring-emerald-600/10",
  red: "bg-red-50 text-red-900 ring-red-600/10",
};

export function Badge({
  children,
  tone = "slate",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
