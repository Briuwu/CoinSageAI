"use server";

import { generateObject, NoObjectGeneratedError } from "ai";
import { reportSummarySchema } from "@/lib/schemas";
import { mistral } from "@ai-sdk/mistral";

const REPORT_SYSTEM_PROMPT = `
You are a precise report generator that creates structured cryptocurrency analysis reports based on chat history context.

STRICT RULES:
1. ONLY use information explicitly stated in the provided context
2. DO NOT invent or infer any data not directly present in the context

CONTEXT USAGE:
- Extract user profile information (experience level, risk tolerance, preferred assets) base on the context
- Include market sentiment and key movers base on the context
- Add technical insights base on the context
- Generate trade recommendations base on the context
- Create session summary base on the context

SCHEMA REQUIREMENTS:
- userOverview: always include based on the context
- marketSummary: always include based on the context
- technicalInsights: always include based on the context
- tradeRecommendations: always include based on the context
- sessionSummary: always include based on the context
- generatedAt: always include based on the context
`;

export async function generateReport(context: string) {
  try {
    const { object } = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: reportSummarySchema,
      system: REPORT_SYSTEM_PROMPT,
      prompt: `Context: ${context}`,
      maxRetries: 3,
    });

    return object;
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.log("NoObjectGeneratedError");
      console.log("Cause:", error.cause);
      console.log("Text:", error.text);
      console.log("Response:", error.response);
      console.log("Usage:", error.usage);
      return null;
    }
    throw error;
  }
}
