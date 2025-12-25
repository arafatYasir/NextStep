import type { Metadata } from "next";
import { Delius, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const delius = Delius({
  variable: "--font-logo",
  weight: ["400"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Keyword Insight Engine (KIE) — AI Career & Job Application Intelligence",
  description: "Keyword Insight Engine is an AI-powered career platform that analyzes job descriptions, evaluates resumes, uncovers critical keywords, and helps you apply smarter and get hired faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  }
                  else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${delius.variable} antialiased bg-[rgb(var(--bg-body))] text-[rgb(var(--text-primary))] scrollbar-custom`}
      >
        <Header />

        {/* ---- Main Content ---- */}
        {children}
        
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}