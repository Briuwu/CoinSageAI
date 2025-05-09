"use server";

import { generateObject, NoObjectGeneratedError } from "ai";
import { reportSummarySchema } from "@/lib/schemas";
import { mistral } from "@ai-sdk/mistral";

export async function generateReport(context: string) {
  try {
    const { object } = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: reportSummarySchema,
      system: `Generate a report for the following context. if the data is not enough, return null. DO NOT GENERATE ANYTHING ELSE. DON'T make up any information. based on the data, generate a report.`,
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
