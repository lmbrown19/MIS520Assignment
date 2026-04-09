"use client";

import { PortalProvider } from "@/context/portal-provider";
import { PortalShell } from "@/components/portal-shell";

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <PortalShell>{children}</PortalShell>
    </PortalProvider>
  );
}
