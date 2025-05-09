import { z } from "zod";
import { tool, ToolSet } from "ai";

export const tools: ToolSet = {
  getCustomBars: tool({
    description:
      "Fetch custom-range OHLC and volume data for a cryptocurrency pair using Polygon's historical data endpoint.",
    parameters: z.object({
      ticker: z
        .string()
        .describe("Polygon-compatible ticker, e.g., 'X:ETHUSD'"),
      multiplier: z
        .number()
        .describe("Time unit multiplier (e.g., 5 for 5-minute bars)"),
      timespan: z
        .enum(["minute", "hour", "day"])
        .describe("Time unit for aggregation"),
      from: z.string().describe("Start date in YYYY-MM-DD format"),
      to: z.string().describe("End date in YYYY-MM-DD format"),
    }),
    execute: async ({ ticker, multiplier, timespan, from, to }) => {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`,
      );
      const data = await response.json();
      return data;
    },
  }),
  getDailyTickerSummary: tool({
    description:
      "Get daily open and close for a specific crypto ticker on a specific date.",
    parameters: z.object({
      ticker: z
        .string()
        .describe("Polygon-compatible ticker, e.g., 'X:SOLUSD'"),
      date: z.string().describe("Target date in YYYY-MM-DD format"),
    }),
    execute: async ({ ticker, date }) => {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`,
      );
      const data = await response.json();
      return data;
    },
  }),
  getPreviousDayBar: tool({
    description:
      "Get previous day's OHLC and volume data for a specific crypto asset.",
    parameters: z.object({
      ticker: z
        .string()
        .describe("Polygon-compatible ticker, e.g., 'X:BTCUSD'"),
      date: z.string().describe("Target date in YYYY-MM-DD format"),
    }),
    execute: async ({ ticker, date }) => {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`,
      );
      const data = await response.json();
      return data;
    },
  }),
  getDateTime: tool({
    description: "Get the current date and time.",
    parameters: z.object({}),
    execute: async () => {
      return new Date().toISOString();
    },
  }),
};
