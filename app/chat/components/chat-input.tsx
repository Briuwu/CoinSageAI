"use client";

import type React from "react";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  isPending: boolean;
}

export function ChatInput({
  value,
  onChange,
  isLoading,
  isPending,
}: ChatInputProps) {
  return (
    <div className="bg-white p-3">
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            className="min-h-[60px] w-full resize-none rounded-lg border px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ask me anything about crypto..."
            value={value}
            onChange={onChange}
            rows={1}
            disabled={isLoading || isPending}
            name="message"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || isPending || !value.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 p-0 text-white hover:bg-indigo-600"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Ask about specific coins, market trends, or anything crypto related.
        </div>
      </div>
    </div>
  );
}
