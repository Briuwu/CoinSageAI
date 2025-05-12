"use client";

import { Button } from "@/components/ui/button";
import { useReportStore } from "@/providers/report-store-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { reports } = useReportStore((state) => state);

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <Button asChild variant="link">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div>
        <h1 className="text-xl font-bold md:text-2xl">Past Chat History</h1>
        <p className="text-muted-foreground mb-4 text-sm">
          All your past chat history is stored here. You can view the details of
          each report by clicking on it.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Link
            key={report.id}
            href={`/reports/${report.id}`}
            className="rounded-lg border p-4 shadow-sm hover:bg-gray-50"
          >
            <h2 className="text-lg font-bold">{report.id}</h2>
            <p className="text-muted-foreground line-clamp-4 text-sm">
              {report.data.sessionSummary}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
