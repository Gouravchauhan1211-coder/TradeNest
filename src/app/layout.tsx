import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeNest | Premium Trading Courses at 99% Discount",
  description: "Download top-tier Forex, Trading, and Business courses instantly. Save thousands of dollars with TradeNest.",
  keywords: "trading courses, forex courses, SMC, ICT, trading marketplace, discount courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="pt-20 min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
