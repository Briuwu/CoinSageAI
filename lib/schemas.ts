import { z } from "zod";

export const tradeRecommendationSchema = z.object({
  asset: z.string().min(1).describe("Cryptocurrency asset symbol"),

  action: z
    .enum(["buy", "sell", "hold"])
    .describe("Suggested trading action based on analysis"),

  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Confidence score between 0 (low) and 1 (high) for the recommendation",
    ),

  rationale: z
    .string()
    .describe(
      "Short justification for the trading action based on technical/fundamental indicators",
    ),
});

export const userOverviewSchema = z
  .object({
    experienceLevel: z
      .enum(["beginner", "intermediate", "advanced"])
      .describe("User's self-assessed trading experience level"),

    riskTolerance: z
      .enum(["low", "medium", "high"])
      .describe("User's preferred risk profile when trading"),

    preferredAssets: z
      .array(z.string())
      .describe("List of crypto assets the user is most interested in"),
  })
  .describe("Basic profile of the user for contextual recommendations");

export const marketSummarySchema = z
  .object({
    overallSentiment: z
      .enum(["bullish", "bearish", "neutral"])
      .describe("Overall crypto market sentiment during the session"),

    keyMovers: z
      .array(z.string())
      .describe(
        "List of top-performing or high-volatility assets that influenced the market",
      ),

    volatilityIndex: z
      .number()
      .min(0)
      .describe(
        "Numeric representation of market volatility, scaled relative to session context",
      ),
  })
  .describe("Snapshot of the broader market at the time of the session");

export const technicalInsightSchema = z.object({
  asset: z.string().describe("Symbol of the asset analyzed"),

  indicators: z
    .array(z.string())
    .describe("List of technical indicators and their interpretations"),

  priceTrend: z
    .enum(["upward", "downward", "sideways"])
    .describe("Overall short-term price trend observed during the session"),
});

export const reportSummarySchema = z.object({
  userOverview: userOverviewSchema,

  marketSummary: marketSummarySchema,

  technicalInsights: z
    .array(technicalInsightSchema)
    .describe("Per-asset technical analysis generated during the session"),

  tradeRecommendations: z
    .array(tradeRecommendationSchema)
    .describe(
      "Specific buy/sell/hold recommendations based on market analysis and user profile",
    ),

  sessionSummary: z
    .string()
    .describe(
      "Expanded narrative of the session including discussed assets, AI reasoning, user's questions, and suggested strategies. This should provide a readable overview that captures the essence of the assistant's guidance.",
    ),

  generatedAt: z
    .string()
    .datetime()
    .describe("Timestamp when the report was generated"),
});

// Export type definitions derived from schemas
export type TradeRecommendation = z.infer<typeof tradeRecommendationSchema>;
export type UserOverview = z.infer<typeof userOverviewSchema>;
export type MarketSummary = z.infer<typeof marketSummarySchema>;
export type TechnicalInsight = z.infer<typeof technicalInsightSchema>;
export type ReportSummary = z.infer<typeof reportSummarySchema>;
