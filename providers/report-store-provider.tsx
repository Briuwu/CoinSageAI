"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type ReportStore, createReportStore } from "@/stores/report-store";

export type ReportStoreApi = ReturnType<typeof createReportStore>;

export const ReportStoreContext = createContext<ReportStoreApi | null>(null);

export interface ReportStoreProviderProps {
  children: ReactNode;
}

export const ReportStoreProvider = ({ children }: ReportStoreProviderProps) => {
  const storeRef = useRef<ReportStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createReportStore();
  }

  return (
    <ReportStoreContext.Provider value={storeRef.current}>
      {children}
    </ReportStoreContext.Provider>
  );
};

export const useReportStore = <T,>(selector: (store: ReportStore) => T): T => {
  const reportStoreContext = useContext(ReportStoreContext);

  if (!reportStoreContext) {
    throw new Error("useReportStore must be used within a ReportStoreProvider");
  }

  return useStore(reportStoreContext, selector);
};
