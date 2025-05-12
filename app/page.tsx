import Link from "next/link";
import { Bot, BarChart3, Brain, ArrowRight, History } from "lucide-react";

function VerticalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-10 right-4 origin-top-right rotate-90 text-xs tracking-widest text-gray-400 select-none">
      {children}
    </span>
  );
}

function GridBG() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-10"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <main className="grid w-full max-w-4xl grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2">
        {/* Main Card */}
        <div className="relative col-span-1 row-span-1 flex min-h-[220px] flex-col items-center gap-10 overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl backdrop-blur-md md:col-span-2 md:flex-row md:items-stretch">
          <div className="z-10 flex flex-1 flex-col justify-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              CoinSage AI
            </h1>
            <p className="mb-6 max-w-lg text-gray-600">
              Your intelligent cryptocurrency assistant for market analysis,
              technical insights, and informed trading decisions.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center justify-between gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-400 px-6 py-3 font-medium text-white shadow transition-transform hover:scale-105"
            >
              Start Chatting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <Bot className="mb-2 h-16 w-16 text-blue-500" />
              <span className="text-2xl font-semibold tracking-widest text-gray-800 opacity-80">
                COINSAGE
              </span>
            </div>
          </div>
          <GridBG />
          <VerticalLabel>CRYPTO ASSISTANT</VerticalLabel>
        </div>
        <div className="col-span-full grid grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg backdrop-blur-md">
            <div className="z-10 flex items-center gap-4">
              <BarChart3 className="h-10 w-10 text-blue-400" />
              <div>
                <h2 className="mb-1 text-lg font-semibold text-gray-900">
                  Market Analysis
                </h2>
                <p className="text-sm text-gray-600">
                  Track overall market performance and trends with real-time
                  data.
                </p>
              </div>
            </div>
            <GridBG />
            <VerticalLabel>MARKET</VerticalLabel>
          </div>
          {/* Card 2 */}
          <div className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg backdrop-blur-md">
            <div className="z-10 flex items-center gap-4">
              <Brain className="h-10 w-10 text-purple-400" />
              <div>
                <h2 className="mb-1 text-lg font-semibold text-gray-900">
                  Technical Insights
                </h2>
                <p className="text-sm text-gray-600">
                  Understand technical indicators and OHLC trends for smarter
                  trading.
                </p>
              </div>
            </div>
            <GridBG />
            <VerticalLabel>TECHNICAL</VerticalLabel>
          </div>
          <div className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border-4 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Link
              href="/reports"
              className="z-10 flex h-full flex-col items-center gap-4"
            >
              <div className="rounded-full bg-emerald-100 p-3">
                <History className="h-12 w-12 text-emerald-600" />
              </div>
              <div className="text-center">
                <h2 className="mb-2 text-xl font-bold text-emerald-700">
                  Chat History
                </h2>
                <p className="text-sm text-emerald-600">
                  View your past conversations and analysis reports
                </p>
              </div>
            </Link>
            <GridBG />
            <VerticalLabel>HISTORY</VerticalLabel>
          </div>
        </div>
      </main>
    </div>
  );
}
