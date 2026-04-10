import type { Metadata } from "next";
import { AdminCompletedAppeals } from "@/components/admin-completed-appeals";

export const metadata: Metadata = {
  title: "Completed reviews | Fairness & Transparency Portal",
  description: "Historical moderator resolutions for appeals.",
};

export default function AdminHistoryPage() {
  return <AdminCompletedAppeals />;
}
