import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leadership Legacy | AI-First Digital Solutions Agency",
  description:
    "We build intelligent systems, AI agents, and AI-powered web applications that turn innovation into measurable business outcomes. RAG systems, workflow automation, and enterprise AI solutions.",
  keywords: [
    "AI agency",
    "AI development",
    "RAG systems",
    "AI agents",
    "LLM fine-tuning",
    "AI web apps",
    "digital solutions",
    "enterprise AI",
    "AWS Bedrock",
    "workflow automation",
  ],
  authors: [{ name: "Leadership Legacy" }],
  openGraph: {
    title: "Leadership Legacy | AI-First Digital Solutions Agency",
    description:
      "Build intelligent systems, AI agents, and AI-powered web applications that turn innovation into business outcomes.",
    url: "https://leadershiplegacy.io",
    siteName: "Leadership Legacy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership Legacy | AI-First Digital Solutions Agency",
    description:
      "Build intelligent systems, AI agents, and AI-powered web applications that turn innovation into business outcomes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
