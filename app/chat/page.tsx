import { ChatContainer } from "@/app/chat/components/chat-container";

export default function ChatPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          CoinSage AI Assistant
        </h1>
        <ChatContainer />
      </div>
    </main>
  );
}
