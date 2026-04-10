import type { Metadata } from "next";
import { PlayerAppeals } from "@/components/player-appeals";

export const metadata: Metadata = {
  title: "My appeals | Fairness & Transparency Portal",
  description: "Track human review requests and outcomes for your account.",
};

export default function AppealsPage() {
  return <PlayerAppeals />;
}
