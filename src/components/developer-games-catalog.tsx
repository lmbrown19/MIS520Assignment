import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { games, storefrontInsightByGame } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export function DeveloperGamesCatalog() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Your games
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Titles linked to your developer account. Select a game to open its{" "}
          <Link
            href="/developer"
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            storefront insight
          </Link>{" "}
          when a band summary is available.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game) => {
          const insight = storefrontInsightByGame[game.gameId];
          return (
            <Card key={game.gameId}>
              <CardHeader
                title={game.title}
                description={`${game.developer} · ${game.publisher}`}
                action={
                  insight ? (
                    <Badge tone="blue">
                      <Sparkles className="mr-1 inline h-3 w-3" aria-hidden />
                      Insight available
                    </Badge>
                  ) : (
                    <Badge tone="amber">No band yet</Badge>
                  )
                }
              />
              <CardBody className="space-y-3">
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Genre:</span>{" "}
                  {game.genre}
                </p>
                {insight ? (
                  <>
                    <p className="text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        Current band:
                      </span>{" "}
                      {insight.visibilityBand}
                    </p>
                    <Link
                      href="/developer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
                    >
                      View full insight
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">
                    Band summaries appear after eligibility and minimum traffic
                    thresholds (prototype).
                  </p>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
