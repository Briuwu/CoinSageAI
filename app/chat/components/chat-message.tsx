import { cn } from "@/lib/utils";
import { User, Bot, Clock } from "lucide-react";
import { format } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UIMessage } from "ai";

interface ChatMessageProps {
  message: UIMessage & {
    timestamp: Date;
    isLoading?: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { role, timestamp, isLoading } = message;
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex max-w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
          <Bot className="h-5 w-5 text-indigo-600" />
        </div>
      )}

      <div className={cn("max-w-[80%] space-y-1", isUser && "order-1")}>
        <div
          className={cn(
            "rounded-lg p-3",
            isUser
              ? "bg-indigo-500 text-white"
              : "border border-slate-200 bg-white",
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {message.parts.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <Markdown remarkPlugins={[remarkGfm]} key={index}>
                        {part.text}
                      </Markdown>
                    );
                  case "tool-invocation":
                    return (
                      <div key={index}>
                        <pre className="rounded-md bg-slate-100 p-2 text-sm">
                          calling tool: {part.toolInvocation.toolName}
                        </pre>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex items-center gap-1 text-xs",
            isUser ? "justify-end text-slate-500" : "text-slate-500",
          )}
        >
          <Clock className="h-3 w-3" />
          <span>{format(timestamp, "h:mm a")}</span>
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}
