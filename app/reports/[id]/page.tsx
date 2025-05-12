"use client";

import { validateReportSummary } from "@/lib/validators";
import { useReportStore } from "@/providers/report-store-provider";
import { AlertTriangle, Bot, User } from "lucide-react";
import { ReportSummary } from "../components/report-summary";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ReportPage() {
  const { id } = useParams();

  console.log(id);

  const { reports } = useReportStore((state) => state);

  // Find the report by ID
  const report = reports.find((report) => report.id === id);

  if (!report) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-500" />
            <h2 className="text-lg font-bold">Report Not Found</h2>
          </div>
          <p>The report with the given ID does not exist.</p>
          <Link href="/reports" className="text-blue-500 hover:underline">
            Back to Reports
          </Link>
        </div>
      </main>
    );
  }

  const validationResult = validateReportSummary(report.data);

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
      <ReportSummary {...validationResult.data!} id={report.id} />
      <div className="mt-6">
        <h2 className="text-lg font-bold">Message History</h2>
        <div className="mt-4 h-[500px] space-y-4 overflow-y-auto">
          {report.history.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex max-w-full gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role !== "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Bot className="h-5 w-5 text-indigo-600" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] space-y-1",
                  message.role === "user" && "order-1",
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.role === "user"
                      ? "bg-indigo-500 text-white"
                      : "border border-slate-200 bg-white",
                  )}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    message.role === "user"
                      ? "justify-end text-slate-500"
                      : "text-slate-500",
                  )}
                >
                  <span>{message.role}</span>
                </div>
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
