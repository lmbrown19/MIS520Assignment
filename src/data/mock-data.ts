/** Mock entities aligned with ERD — no live backend. */

export type Game = {
  gameId: string;
  title: string;
  developer: string;
  publisher: string;
  genre: string;
};

export type DecisionType =
  | "Matchmaking"
  | "Chat Moderation"
  | "Storefront Promotion"
  | "Account Standing";

export type AlgorithmicDecision = {
  decisionId: string;
  userId: string;
  gameId: string | null;
  decisionType: DecisionType;
  assignedBand: string;
  influencingCategories: string[];
  dateIssued: string;
  /** Shown in UI; eligibility also depends on pending appeals in context. */
  humanReviewEligible: boolean;
};

export type ReviewStatus = "Pending" | "Completed";

/** Legally approved resolution codes only — moderators may not enter free text. */
export type ApprovedOutcomeCode =
  | "Tier updated"
  | "No change"
  | "More info needed";

export type Appeal = {
  appealId: string;
  decisionId: string;
  dateRequested: string;
  reviewStatus: ReviewStatus;
  outcomeCode: ApprovedOutcomeCode | null;
  /** User-provided context for the review team (player side only). */
  userStatement: string;
};

export type StorefrontInsight = {
  gameId: string;
  visibilityBand: string;
  influencingCategories: string[];
  narrativeSummary: string;
  lastUpdated: string;
};

export const CURRENT_USER_ID = "u-demo-player-001";

export const games: Game[] = [
  {
    gameId: "g-neon-rift",
    title: "Neon Rift: Siegeline",
    developer: "Northline Studios",
    publisher: "Aurora Play",
    genre: "Tactical FPS",
  },
  {
    gameId: "g-starfall",
    title: "Starfall Tactics",
    developer: "Orbit Forge",
    publisher: "Aurora Play",
    genre: "RTS",
  },
  {
    gameId: "g-drift-9",
    title: "Drift District 9",
    developer: "Velvet Circuit",
    publisher: "Pulse Games",
    genre: "Racing",
  },
];

export const algorithmicDecisions: AlgorithmicDecision[] = [
  {
    decisionId: "d-mmq-1042",
    userId: CURRENT_USER_ID,
    gameId: "g-neon-rift",
    decisionType: "Matchmaking",
    assignedBand: "Matchmaking Tier 2",
    influencingCategories: [
      "Recent performance band",
      "Party size and region",
      "Account standing summary",
    ],
    dateIssued: "2026-04-07T14:22:00.000Z",
    humanReviewEligible: true,
  },
  {
    decisionId: "d-chat-8831",
    userId: CURRENT_USER_ID,
    gameId: "g-neon-rift",
    decisionType: "Chat Moderation",
    assignedBand: "Communication: Restricted (72h)",
    influencingCategories: [
      "Chat engagement patterns",
      "Community safety signals",
      "Report volume band",
    ],
    dateIssued: "2026-04-05T09:10:00.000Z",
    humanReviewEligible: true,
  },
  {
    decisionId: "d-acct-2201",
    userId: CURRENT_USER_ID,
    gameId: null,
    decisionType: "Account Standing",
    assignedBand: "Account Standing: Standard",
    influencingCategories: [
      "Account history",
      "Trust and safety tier",
      "Payment and entitlement health",
    ],
    dateIssued: "2026-03-28T16:00:00.000Z",
    humanReviewEligible: false,
  },
  {
    decisionId: "d-mmq-991",
    userId: CURRENT_USER_ID,
    gameId: "g-starfall",
    decisionType: "Matchmaking",
    assignedBand: "Matchmaking Tier 3",
    influencingCategories: [
      "Skill band stability",
      "Queue time balancing",
      "Cross-title activity (high level)",
    ],
    dateIssued: "2026-04-02T11:45:00.000Z",
    humanReviewEligible: true,
  },
];

/** Mix of history and one open item for the moderator queue demo. */
export const seedAppeals: Appeal[] = [
  {
    appealId: "ap-pending-demo",
    decisionId: "d-chat-8831",
    dateRequested: "2026-04-08T10:15:00.000Z",
    reviewStatus: "Pending",
    outcomeCode: null,
    userStatement:
      "I was away from keyboard during the flagged session and did not send the messages attributed to my account.",
  },
  {
    appealId: "ap-hist-01",
    decisionId: "d-mmq-991",
    dateRequested: "2026-04-03T08:00:00.000Z",
    reviewStatus: "Completed",
    outcomeCode: "No change",
    userStatement: "I believe my tier should be higher based on recent wins.",
  },
];

export const storefrontInsightByGame: Record<string, StorefrontInsight> = {
  "g-neon-rift": {
    gameId: "g-neon-rift",
    visibilityBand: "Featured placement — Tier A visibility",
    influencingCategories: [
      "Player retention (rolling window)",
      "Quality and stability signals",
      "Recent content updates",
      "Regional audience fit",
      "Creator and community momentum",
    ],
    narrativeSummary:
      "Your title is surfaced in featured collections based on sustained engagement quality and update cadence. We share bands and qualitative drivers only so storefront ordering remains resilient to manipulation.",
    lastUpdated: "2026-04-08T06:00:00.000Z",
  },
  "g-starfall": {
    gameId: "g-starfall",
    visibilityBand: "Standard catalog — Tier B visibility",
    influencingCategories: [
      "Genre competition density",
      "Session depth vs. churn (banded)",
      "Patch recency and known issues",
      "Price and promotion alignment",
    ],
    narrativeSummary:
      "This title receives steady organic placement in genre hubs. Visibility moves in bands as competitive titles rotate and as stability signals change — not as a single scalar rank.",
    lastUpdated: "2026-04-06T09:30:00.000Z",
  },
  "g-drift-9": {
    gameId: "g-drift-9",
    visibilityBand: "Emerging spotlight — Tier C+ visibility",
    influencingCategories: [
      "Creator clip velocity (banded)",
      "Multiplayer concurrency health",
      "Controller and accessibility sentiment",
    ],
    narrativeSummary:
      "Spotlight placements emphasize momentum and community pull without exposing thresholds that could be farmed. Bands may shift weekly during active seasons.",
    lastUpdated: "2026-04-01T12:00:00.000Z",
  },
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "bands",
    question: "Why do I only see bands and categories?",
    answer:
      "Raw scores and model weights can be reverse-engineered or gamed. Bands summarize outcomes in a stable way, while categories explain directionally what influenced a decision without exposing a manipulable formula.",
  },
  {
    id: "appeal-window",
    question: "When can I request human review?",
    answer:
      "Human review is offered only where the underlying policy allows it and you do not already have an open appeal for the same decision. Some platform-wide categories may be ineligible in this prototype.",
  },
  {
    id: "developer-difference",
    question: "What do developers see that players do not?",
    answer:
      "Developers receive storefront visibility bands and qualitative drivers for their titles. Players see account and gameplay-related decisions that apply to them. Neither side sees hidden numeric weights.",
  },
  {
    id: "data-retention",
    question: "How long is my transparency history kept?",
    answer:
      "This prototype does not model retention schedules. A production system would align storage with policy, legal requirements, and product notices.",
  },
];

export type GlossaryEntry = {
  term: string;
  definition: string;
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Band",
    definition:
      "A coarse bucket that summarizes an outcome (for example, a matchmaking tier or visibility tier) without revealing an underlying numeric score.",
  },
  {
    term: "Influencing category",
    definition:
      "A qualitative factor that contributed to a decision, described at a high level. Categories are not a complete causal chain and may overlap.",
  },
  {
    term: "Human review eligible",
    definition:
      "The decision type supports escalation to a person in principle. Actual availability still depends on policy and whether an appeal is already open.",
  },
  {
    term: "Approved outcome code",
    definition:
      "A fixed resolution label moderators must choose from. Free-text rulings are avoided to keep records consistent and comparable.",
  },
  {
    term: "Visibility band",
    definition:
      "A developer-facing summary of how prominently a title may appear in storefront surfaces, expressed as a tier rather than a rank position.",
  },
];

export function gameById(gameId: string | null): Game | undefined {
  if (!gameId) return undefined;
  return games.find((g) => g.gameId === gameId);
}
