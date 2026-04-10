import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-400",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-300",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300",
  danger:
    "bg-rose-700 text-white hover:bg-rose-800 focus-visible:ring-rose-400",
} as const;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
