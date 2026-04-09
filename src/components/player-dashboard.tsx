"use client";

import { useState } from "react";
import { Calendar, Gamepad2, Layers } from "lucide-react";
import {
  algorithmicDecisions,
  getGameById,
  MOCK_USER_ID,
} from "@/data/mock-data";
import { usePortal } from "@/context/portal-provider";
import type { AlgorithmicDecision } from "@/types/portal";
import { AppealModal } from "@/components/appeal-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function decisionTone(
  type: AlgorithmicDecision["decisionType"],
): "blue" | "amber" | "slate" | "green" | "red" {
  switch (type) {
    case "Matchmaking":
      return "blue";
    case "Chat Ban":
      return "amber";
    case "Account Standing":
      return "slate";
    case "Storefront Promotion":
      return "green";
    default:
      return "slate";
  }
}

export function PlayerDashboard() {
  const { getActiveAppealForDecision } = usePortal();
  const [modalDecision, setModalDecision] =
    useState<AlgorithmicDecision | null>(null);

  const decisions = algorithmicDecisions.filter(
    (d) => d.userId === MOCK_USER_ID,
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your transparency overview
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Recent algorithm-assisted decisions affecting your account are shown
            below as <strong className="font-medium text-slate-800">bands</strong>{" "}
            and <strong className="font-medium text-slate-800">categories</strong>
            . No raw scores or model weights are displayed.
          </p>
        </div>

        <Card>
          <CardHeader
            title="Recent decisions"
            description="Matchmaking, moderation, and standing — summarized for clarity."
          />
          <CardBody className="space-y-4 divide-y divide-slate-100 p-0">
            {decisions.map((decision) => {
              const game = getGameById(decision.gameId);
              const active = getActiveAppealForDecision(decision.decisionId);
              const canOpen =
                decision.appealEligible && !active;

              return (
                <div key={decision.decisionId} className="px-5 py-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={decisionTone(decision.decisionType)}>
                          {decision.decisionType}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" aria-hidden />
                          {formatDate(decision.dateIssued)}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-slate-900">
                        {decision.assignedBand}
                      </p>
                      {game ? (
                        <p className="flex items-center gap-2 text-sm text-slate-600">
                          <Gamepad2 className="h-4 w-4 text-slate-400" aria-hidden />
                          <span>
                            {game.title}
                            <span className="text-slate-400"> · </span>
                            {game.developer}
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm text-slate-500">
                          Platform-wide scope (not tied to a single title).
                        </p>
                      )}
                      <div>
                        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <Layers className="h-3.5 w-3.5" aria-hidden />
                          Influencing categories
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {decision.influencingCategories.map((c) => (
                            <li key={c}>
                              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-800">
                                {c}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-stretch gap-2 lg:items-end">
                      {decision.appealEligible ? (
                        active ? (
                          <Badge tone="amber">Review in progress</Badge>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => setModalDecision(decision)}
                          >
                            Request human review
                          </Button>
                        )
                      ) : (
                        <span className="text-xs text-slate-500">
                          Human review not offered for this category.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <AppealModal
        decision={modalDecision}
        open={modalDecision !== null}
        onClose={() => setModalDecision(null)}
      />
    </>
  );
}
