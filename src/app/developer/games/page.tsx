import type { Metadata } from "next";
import { DeveloperGamesCatalog } from "@/components/developer-games-catalog";

export const metadata: Metadata = {
  title: "Developer games | Fairness & Transparency Portal",
  description: "Games linked to your developer account and storefront band summaries.",
};

export default function DeveloperGamesPage() {
  return <DeveloperGamesCatalog />;
}
