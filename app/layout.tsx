import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ConditionalFooter from "@/components/footer/ConditionalFooter";
import Header from "@/components/header/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextStep — AI Career & Job Application Intelligence",
  description: "NextStep is an AI-powered career platform that analyzes job descriptions, evaluates resumes, uncovers critical keywords, and helps you apply smarter and get hired faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased bg-[rgb(var(--bg-body))] text-[rgb(var(--text-primary))] scrollbar-custom`}
      >
        {/* ---- Header ---- */}
        <Header />

        {/* ---- Main Content ---- */}
        {children}

        {/* ---- Footer ---- */}
        <ConditionalFooter />

        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}