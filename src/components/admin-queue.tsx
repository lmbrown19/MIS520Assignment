"use client";

import { useState } from "react";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import {
  algorithmicDecisions,
  gameById,
  type ApprovedOutcomeCode,
} from "@/data/mock-data";
import { usePortal } from "@/context/portal-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const OUTCOMES: ApprovedOutcomeCode[] = [
  "Tier updated",
  "No change",
  "More info needed",
];

function decisionLabel(decisionId: string) {
  const d = algorithmicDecisions.find((x) => x.decisionId === decisionId);
  if (!d) return decisionId;
  const g = gameById(d.gameId);
  return `${d.decisionType} — ${d.assignedBand}${g ? ` (${g.title})` : ""}`;
}

export function AdminQueue() {
  const { appeals, resolveAppeal } = usePortal();
  const [selection, setSelection] = useState<Record<string, ApprovedOutcomeCode>>(
    {},
  );

  const pending = appeals.filter((a) => a.reviewStatus === "Pending");

  const handleApply = (appealId: string) => {
    const outcome = selection[appealId];
    if (!outcome) return;
    resolveAppeal(appealId, outcome);
    setSelection((s) => {
      const next = { ...s };
      delete next[appealId];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Moderator review queue
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Resolve appeals using{" "}
            <strong className="font-medium text-slate-800">approved outcome codes</strong>{" "}
            only. Free-text adjudication is disabled in this workflow to reduce
            discoverable liability.
          </p>
        </div>
        <Link
          href="/admin/history"
          className="shrink-0 text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
        >
          Completed reviews →
        </Link>
      </div>

      {pending.length === 0 ? (
        <Card>
          <CardBody className="flex items-center gap-3 py-8 text-slate-600">
            <ListChecks className="h-8 w-8 text-slate-400" aria-hidden />
            <p>No pending appeals. New submissions from players will appear here.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pending.map((a) => (
            <Card key={a.appealId}>
              <CardHeader
                title={`Appeal ${a.appealId}`}
                description={new Intl.DateTimeFormat(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(a.dateRequested))}
                action={<Badge tone="amber">Pending</Badge>}
              />
              <CardBody className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Linked decision (summary)
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

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0 flex-1 space-y-2">
                      <Label htmlFor={`outcome-${a.appealId}`}>
                        Resolution (required)
                      </Label>
                      <select
                        id={`outcome-${a.appealId}`}
                        className="w-full max-w-md rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-3 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        value={selection[a.appealId] ?? ""}
                        onChange={(e) =>
                          setSelection((s) => ({
                            ...s,
                            [a.appealId]: e.target.value as ApprovedOutcomeCode,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select outcome…
                        </option>
                        {OUTCOMES.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500">
                        Do not add notes in a separate field — only the coded outcome is recorded.
                      </p>
                    </div>
                    <Button
                      className="shrink-0"
                      disabled={!selection[a.appealId]}
                      onClick={() => handleApply(a.appealId)}
                    >
                      Mark completed
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
