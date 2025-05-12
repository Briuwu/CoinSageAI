import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

import { CHAT_SYSTEM_PROMPT } from "@/lib/constant";
import { tools } from "@/lib/tools";

function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: mistral("mistral-large-latest"),
    system: CHAT_SYSTEM_PROMPT,
    messages,
    tools: tools,
    toolChoice: "auto",
    maxRetries: 5,
    maxSteps: 10,
  });

  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}
