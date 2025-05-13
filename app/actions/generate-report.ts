"use server";

import { generateObject, NoObjectGeneratedError } from "ai";
import { reportSummarySchema } from "@/lib/schemas";
import { mistral } from "@ai-sdk/mistral";

const REPORT_SYSTEM_PROMPT = `
You will receive a context string that contains the full chat history

You must only use the context to infer and generate the structured report. Do not invent any asset names, prices, or user profiles unless directly stated in the context.

Proceed only if there is enough content in the context for:

- At least one asset analysis
- At least one market summary OR trade recommendation

Otherwise, return null. DO NOT GENERATE ANYTHING ELSE. DO NOT MAKE UP ANY INFORMATION.
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
