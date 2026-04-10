"use client";

import { PortalProvider } from "@/context/portal-context";
import { AppShell } from "@/components/app-shell";
import { AppealModal } from "@/components/appeal-modal";

export function PortalClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <AppShell>{children}</AppShell>
      <AppealModal />
    </PortalProvider>
  );
}
