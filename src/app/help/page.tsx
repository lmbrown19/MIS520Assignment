import type { Metadata } from "next";
import { faqItems } from "@/data/mock-data";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help & FAQ | Fairness & Transparency Portal",
  description: "Frequently asked questions about bands, appeals, and developer insights.",
};

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Help &amp; FAQ
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Quick answers about how information is presented in this prototype. For
          definitions of terms, see{" "}
          <a
            href="/resources"
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            Resources
          </a>
          .
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => (
          <Card key={item.id}>
            <CardBody className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900">
                {item.question}
              </h3>
              <p className="text-sm text-slate-600">{item.answer}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
