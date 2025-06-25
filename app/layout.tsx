import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Master of Languages - Learn Languages Through Conversation",
  description: "Revolutionary AI-powered language learning through natural conversation. Learn French, Spanish, Portuguese, and German with personalized tutoring.",
  keywords: ["language learning", "AI tutor", "conversation practice", "French", "Spanish", "Portuguese", "German"],
  authors: [{ name: "Master of Languages Team" }],
  openGraph: {
    title: "Master of Languages - Learn Languages Through Conversation",
    description: "Revolutionary AI-powered language learning through natural conversation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}