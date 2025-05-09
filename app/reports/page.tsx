import { ReportSummary } from "@/app/reports/components/report-summary";
import { validateReportSummary } from "@/lib/validators";
import { AlertTriangle } from "lucide-react";

export default function Home() {
  // Sample data based on the schema
  const sampleData = {
    userOverview: {
      experienceLevel: "intermediate" as const,
      riskTolerance: "medium" as const,
      preferredAssets: ["BTC", "ETH", "SOL", "ADA"],
    },
    marketSummary: {
      overallSentiment: "bullish" as const,
      keyMovers: ["BTC", "ETH", "DOGE", "SHIB"],
      volatilityIndex: 6.8,
    },
    technicalInsights: [
      {
        asset: "BTC",
        indicators: [
          "RSI: Overbought",
          "MACD: Bullish Crossover",
          "MA: Above 200-day",
        ],
        priceTrend: "upward" as const,
      },
      {
        asset: "ETH",
        indicators: ["RSI: Neutral", "MACD: Bullish", "MA: Support at 50-day"],
        priceTrend: "sideways" as const,
      },
      {
        asset: "SOL",
        indicators: ["RSI: Oversold", "MACD: Bearish", "MA: Below 50-day"],
        priceTrend: "downward" as const,
      },
    ],
    tradeRecommendations: [
      {
        asset: "BTC",
        action: "buy" as const,
        confidenceScore: 0.85,
        rationale:
          "Strong momentum with increasing volume and positive market sentiment. Technical indicators suggest continued upward movement.",
      },
      {
        asset: "ETH",
        action: "hold" as const,
        confidenceScore: 0.65,
        rationale:
          "Consolidating in a range with mixed signals. Wait for clearer direction before taking action.",
      },
      {
        asset: "SOL",
        action: "sell" as const,
        confidenceScore: 0.72,
        rationale:
          "Breaking below key support levels with increasing selling pressure. Consider reducing exposure until trend reverses.",
      },
    ],
    sessionSummary:
      "During this session, we analyzed the current crypto market conditions with a focus on BTC, ETH, and SOL. The overall market shows bullish sentiment, primarily driven by Bitcoin's strong performance above key resistance levels.\n\nBased on your intermediate experience level and medium risk tolerance, we've recommended a balanced approach: increasing Bitcoin exposure, holding Ethereum positions, and reducing Solana exposure temporarily.\n\nKey technical indicators suggest a potential continuation of the current market trend, but we've identified specific entry and exit points to manage risk effectively. The volatility index remains elevated, indicating potential for significant price movements in the coming days.",
    generatedAt: new Date().toISOString(),
  };

  // Validate the data before passing it to the component
  const validationResult = validateReportSummary(sampleData);

  if (!validationResult.success) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-500" />
            <h2 className="text-lg font-bold">Data Validation Error</h2>
          </div>
          <p>{validationResult.error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ReportSummary {...validationResult.data!} />
    </main>
  );
}
