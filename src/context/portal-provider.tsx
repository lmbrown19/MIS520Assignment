"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialAppeals } from "@/data/mock-data";
import type { AlgorithmicDecision, Appeal, ApprovedOutcomeCode } from "@/types/portal";

type SubmitAppealResult =
  | { ok: true }
  | { ok: false; reason: "active_exists" | "not_eligible" };

type PortalContextValue = {
  appeals: Appeal[];
  submitAppeal: (input: {
    decision: AlgorithmicDecision;
    userStatement: string;
  }) => SubmitAppealResult;
  resolveAppeal: (
    appealId: string,
    outcome: ApprovedOutcomeCode,
  ) => void;
  getActiveAppealForDecision: (decisionId: string) => Appeal | undefined;
};

const PortalContext = createContext<PortalContextValue | null>(null);

function newAppealId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `apl-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `apl-${Date.now()}`;
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [appeals, setAppeals] = useState<Appeal[]>(() => [...initialAppeals]);

  const getActiveAppealForDecision = useCallback(
    (decisionId: string) =>
      appeals.find(
        (a) => a.decisionId === decisionId && a.reviewStatus === "Pending",
      ),
    [appeals],
  );

  const submitAppeal = useCallback(
    (input: {
      decision: AlgorithmicDecision;
      userStatement: string;
    }): SubmitAppealResult => {
      const { decision, userStatement } = input;
      if (!decision.appealEligible) return { ok: false, reason: "not_eligible" };
      if (getActiveAppealForDecision(decision.decisionId)) {
        return { ok: false, reason: "active_exists" };
      }
      const next: Appeal = {
        appealId: newAppealId(),
        decisionId: decision.decisionId,
        userId: decision.userId,
        dateRequested: new Date().toISOString(),
        reviewStatus: "Pending",
        outcomeCode: null,
        userStatement: userStatement.trim(),
      };
      setAppeals((prev) => [next, ...prev]);
      return { ok: true };
    },
    [getActiveAppealForDecision],
  );

  const resolveAppeal = useCallback(
    (appealId: string, outcome: ApprovedOutcomeCode) => {
      setAppeals((prev) =>
        prev.map((a) =>
          a.appealId === appealId
            ? {
                ...a,
                reviewStatus: "Completed" as const,
                outcomeCode: outcome,
              }
            : a,
        ),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      appeals,
      submitAppeal,
      resolveAppeal,
      getActiveAppealForDecision,
    }),
    [
      appeals,
      submitAppeal,
      resolveAppeal,
      getActiveAppealForDecision,
    ],
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) {
    throw new Error("usePortal must be used within PortalProvider");
  }
  return ctx;
}
