"use client";

import Link from "next/link";
import {
  Calendar,
  Gamepad2,
  Layers,
  MessageSquareWarning,
  Scale,
  Shield,
} from "lucide-react";
import {
  algorithmicDecisions,
  CURRENT_USER_ID,
  gameById,
} from "@/data/mock-data";
import { usePortal } from "@/context/portal-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { DecisionType } from "@/data/mock-data";

const decisionIcon: Record<DecisionType, typeof Scale> = {
  Matchmaking: Layers,
  "Chat Moderation": MessageSquareWarning,
  "Storefront Promotion": Gamepad2,
  "Account Standing": Shield,
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function PlayerDashboard() {
  const { openAppealModal, hasPendingAppealForDecision } = usePortal();

  const rows = algorithmicDecisions.filter(
    (d) => d.userId === CURRENT_USER_ID,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Your transparency overview
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Decisions are summarized as <strong className="font-medium text-slate-800">bands</strong>{" "}
          and <strong className="font-medium text-slate-800">influencing categories</strong>. We do
          not display raw scores or model weights.{" "}
          <Link
            href="/appeals"
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            View your appeals
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4">
        {rows.map((decision) => {
          const Icon = decisionIcon[decision.decisionType];
          const game = gameById(decision.gameId);
          const pending = hasPendingAppealForDecision(decision.decisionId);
          const canRequest =
            decision.humanReviewEligible && !pending;

          return (
            <Card key={decision.decisionId}>
              <CardHeader
                title={decision.decisionType}
                description={
                  game
                    ? `${game.title} · ${game.developer}`
                    : "Platform-wide · not tied to a single title"
                }
                action={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="blue">
                      <Icon className="mr-1 inline h-3 w-3" aria-hidden />
                      {decision.assignedBand}
                    </Badge>
                    {pending ? (
                      <Badge tone="amber">Review in progress</Badge>
                    ) : null}
                  </div>
                }
              />
              <CardBody className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" aria-hidden />
                  <span>Issued {formatDate(decision.dateIssued)}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Influencing categories
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {decision.influencingCategories.map((c) => (
                      <li key={c}>
                        <span className="inline-block rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-sm text-slate-800">
                          {c}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    {decision.humanReviewEligible
                      ? "Eligible for human review when no appeal is already open for this decision."
                      : "Human review is not offered for this category in the prototype."}
                  </p>
                  {decision.humanReviewEligible ? (
                    <Button
                      variant={canRequest ? "primary" : "secondary"}
                      disabled={!canRequest}
                      onClick={() => openAppealModal(decision)}
                      aria-label={
                        pending
                          ? "Review already requested for this decision"
                          : "Request human review"
                      }
                    >
                      {pending ? "Review requested" : "Request human review"}
                    </Button>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
