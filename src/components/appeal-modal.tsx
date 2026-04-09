"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePortal } from "@/context/portal-provider";
import type { AlgorithmicDecision } from "@/types/portal";
import { Button } from "@/components/ui/button";

export function AppealModal({
  decision,
  open,
  onClose,
}: {
  decision: AlgorithmicDecision | null;
  open: boolean;
  onClose: () => void;
}) {
  const { submitAppeal } = usePortal();
  const [statement, setStatement] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setStatement("");
      setError(null);
      setSubmitted(false);
    }
  }, [open, decision?.decisionId]);

  if (!open || !decision) return null;

  const handleSubmit = () => {
    setError(null);
    if (statement.trim().length < 20) {
      setError("Please provide a bit more detail (at least 20 characters).");
      return;
    }
    const result = submitAppeal({
      decision,
      userStatement: statement,
    });
    if (!result.ok) {
      if (result.reason === "active_exists") {
        setError(
          "You already have a human review in progress for this decision.",
        );
      } else if (result.reason === "not_eligible") {
        setError("This decision is not eligible for human review.");
      }
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appeal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="appeal-title" className="text-lg font-semibold text-slate-900">
              Request human review
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Reference: {decision.decisionType} — {decision.assignedBand}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-4">
          {submitted ? (
            <p className="text-sm text-slate-700">
              Your request was received. A specialist will review the decision
              using approved outcome categories only. You will be notified when
              the review is complete.
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                Describe your perspective. Moderators resolve appeals using
                fixed outcome codes only; they do not enter free-form rulings in
                this system.
              </p>
              <div>
                <label
                  htmlFor="appeal-statement"
                  className="mb-1 block text-sm font-medium text-slate-800"
                >
                  Your statement
                </label>
                <textarea
                  id="appeal-statement"
                  rows={5}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Explain what you believe should be reconsidered…"
                />
              </div>
              {error ? (
                <p className="text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          {submitted ? (
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit appeal
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
