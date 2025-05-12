import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Zap,
} from "lucide-react";
import type { MarketSummary as MarketSummaryType } from "@/lib/schemas";

interface MarketSummaryProps {
  data: MarketSummaryType;
}

export function MarketSummary({ data }: MarketSummaryProps) {
  const { overallSentiment, keyMovers, volatilityIndex } = data;

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-rose-500" />;
      default:
        return <Minus className="h-5 w-5 text-amber-500" />;
    }
  };

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "bearish":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getVolatilityColor = (value: number) => {
    if (value > 7) return "bg-rose-500";
    if (value > 4) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-cyan-500">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-transparent">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-500" />
          <CardTitle>Market Summary</CardTitle>
        </div>
        <CardDescription>Current market conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Activity className="h-4 w-4 text-cyan-500" />
            Overall Sentiment
          </p>
          <div className="flex items-center gap-2">
            {getSentimentIcon(overallSentiment)}
            <Badge
              className={`capitalize ${getSentimentBadgeColor(overallSentiment)}`}
            >
              {overallSentiment}
            </Badge>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Zap className="h-4 w-4 text-amber-500" />
            Key Movers
          </p>
          <div className="flex flex-wrap gap-2">
            {keyMovers.map((asset) => (
              <Badge
                key={asset}
                variant="outline"
                className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700"
              >
                {asset}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="mb-2 flex justify-between">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Activity className="h-4 w-4 text-cyan-500" />
              Volatility Index
            </p>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-sm font-medium">
              {volatilityIndex.toFixed(1)}
            </span>
          </div>
          <Progress
            value={Math.min(volatilityIndex * 10, 100)}
            className="h-2.5 rounded-full"
            indicatorClassName={`${getVolatilityColor(volatilityIndex)}`}
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
