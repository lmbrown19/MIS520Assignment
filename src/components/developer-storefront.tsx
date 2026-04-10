import Link from "next/link";
import { Sparkles } from "lucide-react";
import { games, storefrontInsightByGame } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

const featuredGameId = "g-neon-rift";

export function DeveloperStorefront() {
  const game = games.find((g) => g.gameId === featuredGameId)!;
  const insight = storefrontInsightByGame[featuredGameId];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Storefront promotion insights
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Developers see <strong className="font-medium text-slate-800">visibility bands</strong>{" "}
          and qualitative factors only. Numeric weights and ranking formulas are
          withheld to reduce reverse-engineering risk.{" "}
          <Link
            href="/developer/games"
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            Browse all your games
          </Link>
          .
        </p>
      </div>

      <Card>
        <CardHeader
          title={game.title}
          description={`${game.developer} · ${game.publisher} · ${game.genre}`}
          action={
            <Badge tone="blue">
              <Sparkles className="mr-1 inline h-3 w-3" aria-hidden />
              Featured title
            </Badge>
          }
        />
        <CardBody className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Current visibility band
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {insight.visibilityBand}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              High-level influencing factors
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {insight.influencingCategories.map((factor) => (
                <li
                  key={factor}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-800"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-lg border border-sky-100 bg-sky-50/80 p-4 text-sm text-sky-950">
            {insight.narrativeSummary}
          </p>
          <p className="text-xs text-slate-500">
            Last recalculated:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(insight.lastUpdated))}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
