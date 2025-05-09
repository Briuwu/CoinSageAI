import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  LineChart,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Gauge,
  Bitcoin,
  Landmark,
} from "lucide-react";
import type { TechnicalInsight } from "@/lib/schemas";

interface TechnicalInsightsProps {
  data: TechnicalInsight[];
}

export function TechnicalInsights({ data }: TechnicalInsightsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "upward":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case "downward":
        return <TrendingDown className="h-5 w-5 text-rose-500" />;
      default:
        return <ArrowRight className="h-5 w-5 text-amber-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "upward":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "downward":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getAssetIcon = (asset: string) => {
    switch (asset.toUpperCase()) {
      case "BTC":
        return <Bitcoin className="h-4 w-4 text-amber-500" />;
      case "ETH":
        return <Landmark className="h-4 w-4 text-indigo-500" />;
      default:
        return <Gauge className="h-4 w-4 text-cyan-500" />;
    }
  };

  const getIndicatorColor = (indicator: string) => {
    if (indicator.includes("Overbought") || indicator.includes("Bearish")) {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    if (indicator.includes("Oversold") || indicator.includes("Bullish")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-violet-500">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-transparent">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-violet-500" />
          <CardTitle>Technical Insights</CardTitle>
        </div>
        <CardDescription>Analysis of technical indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((insight, index) => (
            <div
              key={index}
              className="rounded-lg border border-b border-slate-100 bg-slate-50 p-4 pb-5 last:border-0 last:pb-0"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  {getAssetIcon(insight.asset)}
                  <span>{insight.asset}</span>
                </h3>
                <Badge
                  className={`flex items-center gap-1 capitalize ${getTrendColor(insight.priceTrend)}`}
                >
                  {insight.priceTrend}
                  {getTrendIcon(insight.priceTrend)}
                </Badge>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Indicators
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.indicators.map((indicator, i) => (
                    <Badge
                      key={i}
                      className={`text-xs ${getIndicatorColor(indicator)}`}
                    >
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
