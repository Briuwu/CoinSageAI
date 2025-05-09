import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReportStoreProvider } from "@/providers/report-store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinSage AI - Smart Cryptocurrency Analysis Assistant",
  description:
    "Your intelligent cryptocurrency assistant for market analysis, technical indicators, and trade planning using live and historical data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReportStoreProvider>{children}</ReportStoreProvider>
      </body>
    </html>
  );
}
