"use client";

import { useMemo, useState } from "react";
import { algorithmicDecisions, getGameById } from "@/data/mock-data";
import { usePortal } from "@/context/portal-provider";
import type { ApprovedOutcomeCode } from "@/types/portal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

const OUTCOMES: ApprovedOutcomeCode[] = [
  "Tier updated",
  "No change",
  "More info needed",
];

export function AdminReviewQueue() {
  const { appeals, resolveAppeal } = usePortal();
  const pending = useMemo(
    () => appeals.filter((a) => a.reviewStatus === "Pending"),
    [appeals],
  );

  const [selection, setSelection] = useState<Record<string, ApprovedOutcomeCode>>(
    {},
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Moderator review queue
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Resolve appeals using{" "}
          <strong className="font-medium text-slate-800">approved outcome codes</strong>{" "}
          only. Free-text adjudication is not available in this workflow.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Pending appeals"
          description="Player statements are read-only context. Record the resolution via dropdown."
        />
        <CardBody className="space-y-6 p-0">
          {pending.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-600">
              No pending appeals.
            </p>
          ) : (
            pending.map((appeal) => {
              const decision = algorithmicDecisions.find(
                (d) => d.decisionId === appeal.decisionId,
              );
              const game = decision
                ? getGameById(decision.gameId)
                : undefined;
              const selected =
                selection[appeal.appealId] ?? "No change";

              return (
                <div
                  key={appeal.appealId}
                  className="border-b border-slate-100 px-5 py-5 last:border-0"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <div className="max-w-xl space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="amber">Pending</Badge>
                        <span className="text-xs text-slate-500">
                          {appeal.appealId}
                        </span>
                      </div>
                      {decision ? (
                        <>
                          <p className="font-medium text-slate-900">
                            {decision.decisionType} — {decision.assignedBand}
                          </p>
                          {game ? (
                            <p className="text-sm text-slate-600">{game.title}</p>
                          ) : null}
                        </>
                      ) : (
                        <p className="text-sm text-slate-600">
                          Linked decision not found in prototype seed.
                        </p>
                      )}
                      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Player statement (read-only)
                        </p>
                        <p className="mt-1 whitespace-pre-wrap">
                          {appeal.userStatement}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-3 lg:items-end">
                      <label className="w-full text-left text-xs font-semibold uppercase tracking-wide text-slate-600 lg:text-right">
                        Resolution (required)
                      </label>
                      <select
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        value={selected}
                        onChange={(e) =>
                          setSelection((s) => ({
                            ...s,
                            [appeal.appealId]: e.target
                              .value as ApprovedOutcomeCode,
                          }))
                        }
                        aria-label={`Resolution for appeal ${appeal.appealId}`}
                      >
                        {OUTCOMES.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="primary"
                        className="w-full lg:w-auto"
                        onClick={() =>
                          resolveAppeal(appeal.appealId, selected)
                        }
                      >
                        Submit resolution
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Recently completed" description="Audit trail (prototype)" />
        <CardBody className="divide-y divide-slate-100 p-0">
          {appeals
            .filter((a) => a.reviewStatus === "Completed")
            .map((appeal) => (
              <div
                key={appeal.appealId}
                className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm"
              >
                <span className="font-mono text-xs text-slate-500">
                  {appeal.appealId}
                </span>
                <Badge tone="green">{appeal.outcomeCode}</Badge>
              </div>
            ))}
        </CardBody>
      </Card>
    </div>
  );
}
