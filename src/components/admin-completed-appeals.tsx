"use client";

import Link from "next/link";
import { History } from "lucide-react";
import {
  algorithmicDecisions,
  gameById,
} from "@/data/mock-data";
import { usePortal } from "@/context/portal-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

function decisionLabel(decisionId: string) {
  const d = algorithmicDecisions.find((x) => x.decisionId === decisionId);
  if (!d) return decisionId;
  const g = gameById(d.gameId);
  return `${d.decisionType} — ${d.assignedBand}${g ? ` (${g.title})` : ""}`;
}

export function AdminCompletedAppeals() {
  const { appeals } = usePortal();

  const completed = appeals
    .filter((a) => a.reviewStatus === "Completed")
    .sort(
      (a, b) =>
        new Date(b.dateRequested).getTime() -
        new Date(a.dateRequested).getTime(),
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Completed reviews
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Historical appeals resolved with an{" "}
          <strong className="font-medium text-slate-800">approved outcome code</strong>.
          Open the{" "}
          <Link
            href="/admin"
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            queue
          </Link>{" "}
          to work pending items.
        </p>
      </div>

      {completed.length === 0 ? (
        <Card>
          <CardBody className="flex items-center gap-3 py-8 text-slate-600">
            <History className="h-8 w-8 text-slate-400" aria-hidden />
            <p>No completed appeals yet. Resolved items will appear here.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4">
          {completed.map((a) => (
            <Card key={a.appealId}>
              <CardHeader
                title={`Appeal ${a.appealId}`}
                description={new Intl.DateTimeFormat(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(a.dateRequested))}
                action={
                  <Badge tone="blue">{a.outcomeCode ?? "Completed"}</Badge>
                }
              />
              <CardBody className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Linked decision
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {decisionLabel(a.decisionId)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Player submission
                  </p>
                  <blockquote className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-800">
                    {a.userStatement}
                  </blockquote>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
