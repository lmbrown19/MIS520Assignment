import type {
  AlgorithmicDecision,
  Appeal,
  Game,
  StorefrontPlacementInsight,
} from "@/types/portal";

export const MOCK_USER_ID = "user-aurora-4821";

export const games: Game[] = [
  {
    gameId: "g-neon-rift",
    title: "Neon Rift: Vectorline",
    developer: "Vectorline Studios",
    publisher: "Helix Play Publishing",
    genre: "Competitive FPS",
  },
  {
    gameId: "g-solstice",
    title: "Solstice Tactics",
    developer: "Northwind Interactive",
    publisher: "Northwind Interactive",
    genre: "Turn-based strategy",
  },
  {
    gameId: "g-kite",
    title: "Kitebound",
    developer: "Driftloft Games",
    publisher: "Open Arcade Collective",
    genre: "Adventure",
  },
];

export const algorithmicDecisions: AlgorithmicDecision[] = [
  {
    decisionId: "dec-mm-9031",
    userId: MOCK_USER_ID,
    gameId: "g-neon-rift",
    decisionType: "Matchmaking",
    assignedBand: "Matchmaking Tier 2",
    influencingCategories: [
      "Recent performance band",
      "Party composition stability",
      "Regional server health",
    ],
    dateIssued: "2026-04-07T14:22:00.000Z",
    appealEligible: true,
  },
  {
    decisionId: "dec-mod-7712",
    userId: MOCK_USER_ID,
    gameId: "g-neon-rift",
    decisionType: "Chat Ban",
    assignedBand: "Account Standing: Restricted (communications)",
    influencingCategories: [
      "Chat engagement signals",
      "Community guideline alignment",
      "Account history",
    ],
    dateIssued: "2026-04-05T09:10:00.000Z",
    appealEligible: true,
  },
  {
    decisionId: "dec-acct-4400",
    userId: MOCK_USER_ID,
    gameId: null,
    decisionType: "Account Standing",
    assignedBand: "Account Standing: Standard",
    influencingCategories: [
      "Account history",
      "Trust and safety posture",
      "Payment integrity",
    ],
    dateIssued: "2026-03-28T11:00:00.000Z",
    appealEligible: false,
  },
  {
    decisionId: "dec-mm-8844",
    userId: MOCK_USER_ID,
    gameId: "g-solstice",
    decisionType: "Matchmaking",
    assignedBand: "Matchmaking Tier 3",
    influencingCategories: [
      "Skill band stability",
      "Session quality indicators",
      "Queue-time balancing",
    ],
    dateIssued: "2026-04-02T18:45:00.000Z",
    appealEligible: true,
  },
];

/** Seed appeals: one pending (in queue), one completed */
export const initialAppeals: Appeal[] = [
  {
    appealId: "apl-1001",
    decisionId: "dec-mod-7712",
    userId: MOCK_USER_ID,
    dateRequested: "2026-04-05T16:30:00.000Z",
    reviewStatus: "Pending",
    outcomeCode: null,
    userStatement:
      "I believe the restriction does not reflect my intent in that session.",
  },
  {
    appealId: "apl-0998",
    decisionId: "dec-mm-8844",
    userId: MOCK_USER_ID,
    dateRequested: "2026-04-03T10:00:00.000Z",
    reviewStatus: "Completed",
    outcomeCode: "No change",
    userStatement: "Requesting review of my matchmaking band placement.",
  },
];

export const storefrontInsightByGame: Record<string, StorefrontPlacementInsight> =
  {
    "g-neon-rift": {
      gameId: "g-neon-rift",
      visibilityBand: "Featured placement — Primary carousel (band A)",
      influencingCategories: [
        "Player retention signals",
        "Recent content updates",
        "Store engagement quality",
        "Regional audience fit",
        "Developer support responsiveness",
      ],
      lastUpdated: "2026-04-08T08:00:00.000Z",
      narrativeSummary:
        "This title is surfaced using aggregated, non-numerical signals that reflect sustained player interest and timely support. Exact ranking weights are not disclosed to protect platform integrity.",
    },
  };

export function getGameById(gameId: string | null): Game | undefined {
  if (!gameId) return undefined;
  return games.find((g) => g.gameId === gameId);
}
