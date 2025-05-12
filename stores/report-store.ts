import { createStore } from "zustand/vanilla";
import { z } from "zod";
import { reportSummarySchema } from "@/lib/schemas";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReportState = {
  reports: {
    id: string;
    data: z.infer<typeof reportSummarySchema>;
    history: {
      role: string;
      content: string;
    }[];
  }[];
};

export type ReportActions = {
  addReport: (report: {
    id: string;
    data: z.infer<typeof reportSummarySchema>;
    history: {
      role: string;
      content: string;
    }[];
  }) => void;
};

export type ReportStore = ReportState & ReportActions;

export const defaultInitState: ReportState = {
  reports: [],
};

export const createReportStore = (
  initState: ReportState = defaultInitState,
) => {
  return createStore<ReportStore>()(
    persist(
      (set) => ({
        ...initState,
        addReport: (report) =>
          set((state) => ({
            reports: [...state.reports, report],
          })),
      }),
      {
        name: "report-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
