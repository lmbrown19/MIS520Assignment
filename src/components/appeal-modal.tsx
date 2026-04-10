"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { usePortal } from "@/context/portal-context";
import { gameById } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

export function AppealModal() {
  const {
    appealModalDecision,
    closeAppealModal,
    submitAppeal,
    hasPendingAppealForDecision,
  } = usePortal();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const open = appealModalDecision !== null;
  const decision = appealModalDecision;
  const game = decision ? gameById(decision.gameId) : undefined;
  const blocked =
    decision !== null && hasPendingAppealForDecision(decision.decisionId);

  useEffect(() => {
    if (decision) {
      setText("");
      setError(null);
    }
  }, [decision?.decisionId]);

  const handleClose = () => {
    setText("");
    setError(null);
    closeAppealModal();
  };

  const handleSubmit = () => {
    if (!decision) return;
    const result = submitAppeal(decision.decisionId, text);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setText("");
    setError(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Request human review"
      description="Describe what you believe may need a second look. We share bands and categories only; raw scores are not disclosed."
    >
      {decision ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-medium text-slate-900">{decision.decisionType}</p>
            <p className="mt-1">
              <span className="text-slate-500">Outcome band: </span>
              {decision.assignedBand}
            </p>
            {game ? (
              <p className="mt-1 text-slate-600">
                Game: {game.title}
              </p>
            ) : null}
          </div>

          {blocked ? (
            <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
              <p>
                An active appeal already exists for this decision. This portal
                allows one open review per decision at a time.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="appeal-text">Your summary</Label>
                <Textarea
                  id="appeal-text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setError(null);
                  }}
                  placeholder="Explain what you would like the review team to consider."
                  maxLength={2000}
                />
                <p className="text-xs text-slate-500">{text.length}/2000</p>
              </div>
              {error ? (
                <p className="text-sm text-rose-700" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit appeal</Button>
              </div>
            </>
          )}

          {blocked ? (
            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
