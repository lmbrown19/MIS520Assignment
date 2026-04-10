import type { Metadata } from "next";
import { BookOpen, Eye, Lock, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Methodology | Fairness & Transparency Portal",
  description:
    "How this portal summarizes algorithmic decisions using bands and qualitative factors.",
};

const pillars = [
  {
    title: "Human-readable summaries",
    body: "Decisions are grouped into bands (tiers, restriction levels, visibility tiers) so outcomes stay understandable without exposing fine-grained scores.",
    icon: Eye,
  },
  {
    title: "Shared vocabulary",
    body: "Influencing categories describe what kinds of signals were considered, not a full causal model. The same vocabulary is reused across player and developer views where policies align.",
    icon: BookOpen,
  },
  {
    title: "Gaming-resistant disclosure",
    body: "Withholding raw weights and exact formulas reduces incentives to farm metrics and stabilizes experiences for the broader player base.",
    icon: Lock,
  },
  {
    title: "Governed human review",
    body: "Where appeals exist, moderators pick from approved outcome codes so records stay comparable and auditable.",
    icon: Users,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Methodology
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          This prototype illustrates how a platform might communicate algorithmic
          decisions without publishing internal scoring details. Everything here is
          static mock data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map(({ title, body, icon: Icon }) => (
          <Card key={title}>
            <CardBody className="space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600">{body}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
        <h3 className="text-base font-semibold text-slate-900">
          What this prototype does not show
        </h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
          <li>Live telemetry, per-session logs, or model versions</li>
          <li>Exact thresholds between bands or ranking positions</li>
          <li>Legal notices, regional exceptions, or data-export flows</li>
        </ul>
      </div>
    </div>
  );
}
