import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  TrendingDown,
  Pause,
  AlertCircle,
  CheckCircle2,
  BarChart4,
  Lightbulb,
} from "lucide-react";
import type { TradeRecommendation } from "@/lib/schemas";

interface TradeRecommendationsProps {
  data: TradeRecommendation[];
}

export function TradeRecommendations({ data }: TradeRecommendationsProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "buy":
        return <ShoppingCart className="h-4 w-4 text-emerald-500" />;
      case "sell":
        return <TrendingDown className="h-4 w-4 text-rose-500" />;
      default:
        return <Pause className="h-4 w-4 text-amber-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "buy":
        return "text-emerald-500 bg-emerald-50 border-emerald-200";
      case "sell":
        return "text-rose-500 bg-rose-50 border-rose-200";
      default:
        return "text-amber-500 bg-amber-50 border-amber-200";
    }
  };

  const getConfidenceIcon = (score: number) => {
    if (score > 0.7)
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (score > 0.4) return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <AlertCircle className="h-4 w-4 text-rose-500" />;
  };

  const getConfidenceColor = (score: number) => {
    if (score > 0.7) return "bg-emerald-500";
    if (score > 0.4) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-emerald-500">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-transparent">
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-emerald-500" />
          <CardTitle>Trade Recommendations</CardTitle>
        </div>
        <CardDescription>
          Suggested trading actions based on analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((recommendation, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {recommendation.asset}
                </h3>
                <span
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 font-bold uppercase ${getActionColor(recommendation.action)}`}
                >
                  {getActionIcon(recommendation.action)}
                  {recommendation.action}
                </span>
              </div>

              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="flex items-center gap-1 text-sm">
                    {getConfidenceIcon(recommendation.confidenceScore)}
                    Confidence
                  </p>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-sm font-medium">
                    {(recommendation.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={recommendation.confidenceScore * 100}
                  className="h-2.5 rounded-full"
                  indicatorClassName={getConfidenceColor(
                    recommendation.confidenceScore,
                  )}
                />
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3">
                <p className="mb-1 flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Rationale
                </p>
                <p className="text-sm text-slate-600">
                  {recommendation.rationale}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
