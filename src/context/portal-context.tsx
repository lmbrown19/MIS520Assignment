"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AlgorithmicDecision,
  Appeal,
  ApprovedOutcomeCode,
} from "@/data/mock-data";
import { seedAppeals } from "@/data/mock-data";

type PortalContextValue = {
  appeals: Appeal[];
  appealModalDecision: AlgorithmicDecision | null;
  openAppealModal: (decision: AlgorithmicDecision) => void;
  closeAppealModal: () => void;
  submitAppeal: (decisionId: string, userStatement: string) => {
    ok: true;
    appeal: Appeal;
  } | { ok: false; reason: string };
  hasPendingAppealForDecision: (decisionId: string) => boolean;
  resolveAppeal: (
    appealId: string,
    outcome: ApprovedOutcomeCode,
  ) => void;
};

const PortalContext = createContext<PortalContextValue | null>(null);

function newAppealId() {
  return `ap-${crypto.randomUUID().slice(0, 8)}`;
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [appeals, setAppeals] = useState<Appeal[]>(() => [...seedAppeals]);
  const [appealModalDecision, setAppealModalDecision] =
    useState<AlgorithmicDecision | null>(null);

  const hasPendingAppealForDecision = useCallback(
    (decisionId: string) =>
      appeals.some(
        (a) => a.decisionId === decisionId && a.reviewStatus === "Pending",
      ),
    [appeals],
  );

  const openAppealModal = useCallback((decision: AlgorithmicDecision) => {
    setAppealModalDecision(decision);
  }, []);

  const closeAppealModal = useCallback(() => {
    setAppealModalDecision(null);
  }, []);

  const submitAppeal = useCallback(
    (decisionId: string, userStatement: string) => {
      const trimmed = userStatement.trim();
      if (!trimmed) {
        return { ok: false as const, reason: "Please add a short explanation." };
      }
      if (hasPendingAppealForDecision(decisionId)) {
        return {
          ok: false as const,
          reason:
            "You already have an open review for this decision. Wait for it to complete before submitting another.",
        };
      }
      const appeal: Appeal = {
        appealId: newAppealId(),
        decisionId,
        dateRequested: new Date().toISOString(),
        reviewStatus: "Pending",
        outcomeCode: null,
        userStatement: trimmed,
      };
      setAppeals((prev) => [appeal, ...prev]);
      setAppealModalDecision(null);
      return { ok: true as const, appeal };
    },
    [hasPendingAppealForDecision],
  );

  const resolveAppeal = useCallback(
    (appealId: string, outcome: ApprovedOutcomeCode) => {
      setAppeals((prev) =>
        prev.map((a) =>
          a.appealId === appealId
            ? { ...a, reviewStatus: "Completed" as const, outcomeCode: outcome }
            : a,
        ),
      );
    },
    [],
  );

  const value = useMemo<PortalContextValue>(
    () => ({
      appeals,
      appealModalDecision,
      openAppealModal,
      closeAppealModal,
      submitAppeal,
      hasPendingAppealForDecision,
      resolveAppeal,
    }),
    [
      appeals,
      appealModalDecision,
      openAppealModal,
      closeAppealModal,
      submitAppeal,
      hasPendingAppealForDecision,
      resolveAppeal,
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
