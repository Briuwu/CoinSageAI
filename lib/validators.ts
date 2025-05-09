import { reportSummarySchema, type ReportSummary } from "./schemas";

/**
 * Validates a report summary against the schema
 * @param data The data to validate
 * @returns An object with success status and either validated data or error
 */
export function validateReportSummary(data: unknown): {
  success: boolean;
  data: ReportSummary | undefined;
  error?: string;
} {
  try {
    const result = reportSummarySchema.parse(data);
    return { success: true, data: result as ReportSummary };
  } catch (error) {
    console.error("Validation error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown validation error",
      data: undefined,
    };
  }
}

/**
 * Safely validates a report summary without throwing
 * @param data The data to validate
 * @returns An object with success status and either validated data or error
 */
export function safeValidateReportSummary(data: unknown): {
  success: boolean;
  data?: ReportSummary;
  error?: string;
} {
  const result = reportSummarySchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data as ReportSummary };
  } else {
    return {
      success: false,
      error: result.error.message,
    };
  }
}
