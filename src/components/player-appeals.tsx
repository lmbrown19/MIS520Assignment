"use client";

import Link from "next/link";
import { Inbox } from "lucide-react";
import {
  algorithmicDecisions,
  CURRENT_USER_ID,
  gameById,
} from "@/data/mock-data";
import { usePortal } from "@/context/portal-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

function decisionSummary(decisionId: string) {
  const d = algorithmicDecisions.find((x) => x.decisionId === decisionId);
  if (!d) return decisionId;
  const g = gameById(d.gameId);
  return {
    type: d.decisionType,
    band: d.assignedBand,
    gameLine: g ? `${g.title} · ${g.developer}` : "Platform-wide",
  };
}

export function PlayerAppeals() {
  const { appeals } = usePortal();

  const myDecisionIds = new Set(
    algorithmicDecisions
      .filter((d) => d.userId === CURRENT_USER_ID)
      .map((d) => d.decisionId),
  );

  const mine = appeals
    .filter((a) => myDecisionIds.has(a.decisionId))
    .sort(
      (a, b) =>
        new Date(b.dateRequested).getTime() -
        new Date(a.dateRequested).getTime(),
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          My appeals
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Track human reviews you have requested. Outcomes are recorded as{" "}
          <strong className="font-medium text-slate-800">approved codes</strong>{" "}
          when a review finishes.
        </p>
      </div>

      {mine.length === 0 ? (
        <Card>
          <CardBody className="flex items-center gap-3 py-8 text-slate-600">
            <Inbox className="h-8 w-8 text-slate-400" aria-hidden />
            <p>
              No appeals yet. From your{" "}
              <Link href="/" className="font-medium text-sky-700 underline-offset-2 hover:underline">
                dashboard
              </Link>
              , request human review on an eligible decision.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mine.map((a) => {
            const summary = decisionSummary(a.decisionId);
            const pending = a.reviewStatus === "Pending";
            return (
              <Card key={a.appealId}>
                <CardHeader
                  title={`Appeal ${a.appealId}`}
                  description={new Intl.DateTimeFormat(undefined, {
                    dateStyle: "long",
                    timeStyle: "short",
                  }).format(new Date(a.dateRequested))}
                  action={
                    <Badge tone={pending ? "amber" : "blue"}>
                      {pending ? "Pending" : "Completed"}
                    </Badge>
                  }
                />
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Related decision
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {typeof summary === "string"
                        ? summary
                        : `${summary.type} — ${summary.band}`}
                    </p>
                    {typeof summary !== "string" ? (
                      <p className="mt-0.5 text-sm text-slate-600">
                        {summary.gameLine}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Your statement
                    </p>
                    <blockquote className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-800">
                      {a.userStatement}
                    </blockquote>
                  </div>
                  {!pending && a.outcomeCode ? (
                    <p className="text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        Outcome:
                      </span>{" "}
                      {a.outcomeCode}
                    </p>
                  ) : null}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
