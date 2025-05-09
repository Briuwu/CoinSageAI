import { createStore } from "zustand/vanilla";
import { z } from "zod";
import { reportSummarySchema } from "@/lib/schemas";

export type ReportState = {
  data: z.infer<typeof reportSummarySchema>;
};

export type ReportActions = {
  setData: (data: z.infer<typeof reportSummarySchema>) => void;
};

export type ReportStore = ReportState & ReportActions;

export const defaultInitState: ReportState = {
  data: {} as z.infer<typeof reportSummarySchema>,
};

export const createReportStore = (
  initState: ReportState = defaultInitState,
) => {
  return createStore<ReportStore>((set) => ({
    ...initState,
    setData: (data) => set({ data }),
  }));
};
