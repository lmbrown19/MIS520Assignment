import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { glossaryEntries } from "@/data/mock-data";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resources | Fairness & Transparency Portal",
  description: "Glossary and reference material for the transparency portal.",
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Resources
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Shared language used across player, developer, and moderator surfaces in
          this demo.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Glossary"
          description="Short definitions for UI labels and policy concepts."
        />
        <CardBody className="divide-y divide-slate-100 px-0 py-0">
          {glossaryEntries.map((entry) => (
            <div key={entry.term} className="px-5 py-4 first:pt-4 last:pb-4">
              <p className="font-semibold text-slate-900">{entry.term}</p>
              <p className="mt-1 text-sm text-slate-600">{entry.definition}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Reference downloads (mock)"
          description="Placeholder for PDF summaries or machine-readable bundles in a production system."
        />
        <CardBody className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <FileText className="h-4 w-4 text-slate-400" aria-hidden />
            Transparency overview (PDF) — not available in prototype
          </span>
          <Link
            href="/about"
            className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            Read methodology on the web instead
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
