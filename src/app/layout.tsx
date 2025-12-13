import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
