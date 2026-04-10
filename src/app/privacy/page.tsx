import type { Metadata } from "next";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy (prototype) | Fairness & Transparency Portal",
  description: "Placeholder privacy notes for the transparency portal prototype.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Privacy &amp; data (prototype)
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          This site is a front-end demo with in-memory state only. Nothing is sent to
          a server; appeals and resolutions reset when you reload the page.
        </p>
      </div>

      <Card>
        <CardBody className="space-y-3 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">Local prototype:</span>{" "}
            Data lives in your browser session via React state. Do not enter real
            secrets or personal information.
          </p>
          <p>
            <span className="font-medium text-slate-900">Production analog:</span>{" "}
            A real service would publish a full privacy policy, retention windows,
            regional rights, and subprocessors. Those are intentionally out of scope
            here.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
