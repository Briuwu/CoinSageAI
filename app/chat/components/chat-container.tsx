"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Bot, RefreshCw } from "lucide-react";
import { GenerateReport } from "./generate-report";
import { generateReport } from "@/app/actions/generate-report";
import { ErrorModal } from "./error-modal";
import { useReportStore } from "@/providers/report-store-provider";
export function ChatContainer() {
  const router = useRouter();
  const { setData } = useReportStore((state) => state);
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format messages for our custom UI
  const formattedMessages = messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      id: message.id,
      role: message.role as "user" | "assistant",
      content: message.content.replace("GENERATE_REPORT", ""), // Remove the trigger phrase
      timestamp: new Date(),
      isLoading: false,
    }));

  const handleReportGeneration = () => {
    startTransition(async () => {
      try {
        const context = messages
          .map((message) => {
            return `${message.role}: ${message.content}`;
          })
          .join("\n");

        console.log(context);
        const report = await generateReport(context);
        if (!report) {
          throw new Error("Failed to generate report");
        }

        setData(report);
        router.push("/reports");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setOpen(true);
      }
    });
  };

  return (
    <div className="flex h-[80vh] flex-col overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-indigo-50 to-transparent p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
            <Bot className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-semibold">CoinSage AI</h2>
            <p className="text-xs text-slate-500">
              Powered by advanced market analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
            <RefreshCw className="h-3 w-3" />
            Live
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
        <div className="space-y-4">
          {/* Welcome message if no messages yet */}
          {formattedMessages.length === 0 && (
            <ChatMessage
              message={{
                id: "welcome",
                role: "assistant",
                content:
                  "Welcome! I am CoinSage AI, your personal crypto advisor. I can help you analyze market trends and provide trading insights, and generate comprehensive reports for you.",
                timestamp: new Date(),
              }}
            />
          )}

          {formattedMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {status !== "ready" &&
            status !== "streaming" &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <ChatMessage
                message={{
                  id: "loading",
                  role: "assistant",
                  content: "",
                  timestamp: new Date(),
                  isLoading: true,
                }}
              />
            )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t">
        <ChatInput
          value={input}
          onChange={handleInputChange}
          isLoading={status !== "ready" && status === "streaming"}
          isPending={isPending}
        />
      </form>
      {/* Report Generation Button */}
      <GenerateReport handleReportGeneration={handleReportGeneration} />
      <ErrorModal error={error} open={open} setOpen={setOpen} />
    </div>
  );
}
