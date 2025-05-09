"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserOverview } from "./user-overview";
import { MarketSummary } from "./market-summary";
import { TechnicalInsights } from "./technical-insights";
import { TradeRecommendations } from "./trade-recommendations";
import { format } from "date-fns";
import type { ReportSummary as ReportSummaryType } from "@/lib/schemas";
import { reportSummarySchema } from "@/lib/schemas";
import {
  FileText,
  Calendar,
  AlertTriangle,
  Clock,
  Fingerprint,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export function ReportSummary(props: ReportSummaryType) {
  const [showSummary, setShowSummary] = useState(true);

  // Validate the data against the schema
  const validationResult = reportSummarySchema.safeParse(props);

  if (!validationResult.success) {
    console.error("Invalid report data:", validationResult.error);
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-500" />
          <h2 className="text-lg font-bold">Data Validation Error</h2>
        </div>
        <p>The report data does not match the expected schema.</p>
      </div>
    );
  }

  const {
    userOverview,
    marketSummary,
    technicalInsights,
    tradeRecommendations,
    sessionSummary,
    generatedAt,
  } = props;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-100 bg-gradient-to-r from-slate-50 to-transparent p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <FileText className="h-6 w-6 text-indigo-500" />
              Crypto Trading Report
            </h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <Fingerprint className="h-4 w-4 text-slate-400" />
              Session ID: <span className="font-mono">fake session id</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-slate-50 px-3 py-1 text-xs"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              {format(new Date(generatedAt), "PPP")}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-slate-50 px-3 py-1 text-xs"
            >
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              {format(new Date(generatedAt), "p")}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UserOverview data={userOverview} />
        <MarketSummary data={marketSummary} />
      </div>

      <TechnicalInsights data={technicalInsights} />
      <TradeRecommendations data={tradeRecommendations} />

      <Card className="overflow-hidden border-t-4 border-t-slate-500">
        <CardHeader
          className="cursor-pointer bg-gradient-to-r from-slate-50 to-transparent"
          onClick={() => setShowSummary(!showSummary)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />
              <CardTitle>Session Summary</CardTitle>
            </div>
            {showSummary ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </div>
          <CardDescription>
            Overview of the session including discussed assets and strategies
          </CardDescription>
        </CardHeader>
        {showSummary && (
          <CardContent>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm whitespace-pre-line">
              {sessionSummary}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
