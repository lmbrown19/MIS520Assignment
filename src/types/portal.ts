export type Game = {
  gameId: string;
  title: string;
  developer: string;
  publisher: string;
  genre: string;
};

export type DecisionType =
  | "Matchmaking"
  | "Chat Ban"
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
  appealEligible: boolean;
};

export type ReviewStatus = "Pending" | "Completed";

/** Legally approved moderator resolution codes only */
export type ApprovedOutcomeCode =
  | "Tier updated"
  | "No change"
  | "More info needed";

export type Appeal = {
  appealId: string;
  decisionId: string;
  userId: string;
  dateRequested: string;
  reviewStatus: ReviewStatus;
  outcomeCode?: ApprovedOutcomeCode | null;
  /** User-provided context for the appeal (player side only) */
  userStatement: string;
};

/** Developer-facing transparency for featured placement */
export type StorefrontPlacementInsight = {
  gameId: string;
  visibilityBand: string;
  influencingCategories: string[];
  lastUpdated: string;
  narrativeSummary: string;
};
