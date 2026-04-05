"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Bot,
  Globe,
  Zap,
  Wrench,
  Settings,
  Database,
  LayoutGrid,
  Network,
  ChevronDown,
  Check,
  Star,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AvailabilityType = "available-now" | "after-first-review" | "after-3-reviews" | "no-reviews-needed";

type Tier = {
  name: "Starter" | "Standard" | "Advanced";
  price: string;
  delivery: string;
  deliverables: string[];
};

type HourlyRange = {
  label: string;
  range: string;
  duration: string;
  items: string[];
};

type ServiceCard = {
  id: number;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  availability: AvailabilityType;
  availabilityNote?: string;
  tiers?: Tier[];
  hourlyRate?: string;
  projectRanges?: HourlyRange[];
  addOns: string[];
  proof: string;
  techStack: string[];
  acceptedFiles?: string[];
  credentialTags?: string[];
  callout?: { type: "differentiator" | "note"; text: string };
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    name: "AI Chatbot Development",
    tagline:
      "Custom AI chatbots trained on your business content. Not templates — production-grade RAG systems built for real-world use.",
    icon: Bot,
    availability: "available-now",
    tiers: [
      {
        name: "Starter",
        price: "$500",
        delivery: "5-Day Delivery",
        deliverables: [
          "Custom LLM bot trained on up to 50 pages of your content",
          "Web embed widget ready to paste into any website",
          "10 conversation flows",
          "FAQ handling",
          "Basic analytics dashboard",
          "Error handling built in",
          "Loom video walkthrough",
          "1 revision",
          "14-day post-launch support",
        ],
      },
      {
        name: "Standard",
        price: "$1,000",
        delivery: "10-Day Delivery",
        deliverables: [
          "150-page knowledge base ingestion",
          "Lead capture with CRM webhook",
          "Admin panel to add/update documents without code",
          "Source citations on every answer",
          "API integration",
          "Full analytics dashboard",
          "Loom handover video",
          "2 revisions",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$2,500",
        delivery: "21-Day Delivery",
        deliverables: [
          "500-page RAG knowledge base",
          "Multi-channel (web + WhatsApp or Slack)",
          "Full CRM integration",
          "Human handoff routing",
          "Analytics dashboard with export",
          "Source code delivered",
          "Unlimited revisions",
          "60-day support",
        ],
      },
    ],
    addOns: [
      "Fast Delivery (2 days faster): +$150",
      "Additional Revision: +$50",
      "Additional Messaging Platform: +$200",
      "API Integration (Starter add-on): +$300",
    ],
    proof:
      "MechAssist AI — 200+ API 610/682 engineering documents, sub-100ms Cloudflare edge response, LangGraph multi-agent orchestration. Evergrow Landscaping — AI lead qualification chatbot.",
    techStack: ["Claude API", "LangGraph", "Cloudflare Workers", "Pinecone", "Cloudflare Vectorize", "React"],
  },
  {
    id: 2,
    name: "Lead Generation Website",
    tagline:
      "Websites engineered to convert visitors into inquiries. Built on Next.js + Cloudflare Pages — sub-1s load, $0/month hosting after launch.",
    icon: Globe,
    availability: "available-now",
    tiers: [
      {
        name: "Starter",
        price: "$500",
        delivery: "7-Day Delivery",
        deliverables: [
          "3-page responsive website",
          "Quote / contact funnel with email notification",
          "Mobile-first build",
          "On-page SEO (titles, meta, schema markup, sitemap)",
          "Cloudflare Pages hosting setup — free global CDN",
          "Google Analytics 4",
          "2 revisions",
          "7-day support",
        ],
      },
      {
        name: "Standard",
        price: "$1,200",
        delivery: "14-Day Delivery",
        deliverables: [
          "6-page website",
          "Full lead capture funnel",
          "Google Maps integration",
          "Full SEO package",
          "Domain + DNS configuration",
          "Design customization",
          "Content upload",
          "Unlimited revisions",
          "14-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$2,500",
        delivery: "21-Day Delivery",
        deliverables: [
          "8+ pages",
          "CRM integration",
          "Blog / content section",
          "AI chatbot included",
          "Advanced SEO",
          "Performance optimization",
          "Source code delivered",
          "Unlimited revisions",
          "30-day support",
        ],
      },
    ],
    addOns: [
      "Additional Page: +$150 per page",
      "Additional Revision: +$75",
      "Design Customization: +$200",
      "Content Upload: +$150",
      "Source Code (Standard): +$300",
      "AI Chatbot: +$500",
      "Monthly SEO Retainer: $300/month",
    ],
    proof:
      "Evergrow Landscaping — multi-location OKC lead gen platform, CRM + Stripe, 3-week delivery. Tony's Toolbox — local service conversion site, 7-day delivery.",
    techStack: ["Next.js", "Cloudflare Pages", "React", "Tailwind CSS", "Google Analytics 4", "Stripe"],
    callout: {
      type: "differentiator",
      text: "Every site hosted on Cloudflare Pages — loads in under 1 second globally. Zero monthly hosting fees after launch.",
    },
  },
  {
    id: 3,
    name: "Workflow Automation",
    tagline:
      "Automate repetitive business workflows using n8n, Make.com, or Zapier — with optional AI decision-making built in at every step.",
    icon: Zap,
    availability: "available-now",
    tiers: [
      {
        name: "Starter",
        price: "$250",
        delivery: "5-Day Delivery",
        deliverables: [
          "1 workflow automated end-to-end",
          "3 apps / platforms connected",
          "Error handling at every step",
          "Failure alerts (Slack or email)",
          "Loom video walkthrough",
          "Written SOP for your team",
          "1 revision",
          "14-day support",
        ],
      },
      {
        name: "Standard",
        price: "$750",
        delivery: "10-Day Delivery",
        deliverables: [
          "3 workflows automated",
          "5 apps connected",
          "AI decision node (Claude or GPT-4)",
          "Advanced conditional logic",
          "Multi-channel execution",
          "Error monitoring",
          "Full documentation",
          "Loom handover video",
          "2 revisions",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$2,000",
        delivery: "14-Day Delivery",
        deliverables: [
          "5+ workflows automated",
          "Unlimited apps connected",
          "Full AI layer at every decision point",
          "Self-hosted n8n option (runs free forever)",
          "Error monitoring dashboard",
          "Staff training call",
          "Unlimited revisions",
          "30-day support",
        ],
      },
    ],
    addOns: [
      "Fast Delivery (2 days faster): +$100",
      "Additional Workflow: +$150",
      "AI Decision Node (Claude/GPT-4): +$200",
      "Self-Hosted n8n Setup: +$200",
      "Additional App Connection: +$75",
      "Monthly Maintenance: $200/month",
    ],
    proof:
      "Evergrow Landscaping — Apollo + CRM automation pipeline, AI-personalized outreach, reply detection, zero manual work. OpenClaw AI SDR — multi-agent outbound system.",
    techStack: ["n8n", "Make.com", "Zapier", "Claude API", "GPT-4", "Webhooks", "Apollo.io"],
    callout: {
      type: "differentiator",
      text: "Every automation includes error handling and failure alerts built in as standard — not optional, not an add-on.",
    },
  },
  {
    id: 4,
    name: "CAD-to-AI Product Video",
    tagline:
      "Turn your CAD files into professional product demo videos. The only seller who is both a credentialed mechanical engineer AND an AI video developer.",
    icon: Wrench,
    availability: "available-now",
    tiers: [
      {
        name: "Starter",
        price: "$300",
        delivery: "7-Day Delivery",
        deliverables: [
          "3 photorealistic renders from your CAD file",
          "AI-generated narration script (technically accurate)",
          "Professional AI voiceover",
          "60-second video at 1080p",
          "16:9 format (YouTube / presentation)",
          "1 revision",
        ],
      },
      {
        name: "Standard",
        price: "$800",
        delivery: "14-Day Delivery",
        deliverables: [
          "8 renders + exploded assembly view",
          "2-minute video at 1080p",
          "Branded intro and outro",
          "Technical spec lower thirds",
          "ElevenLabs professional narration",
          "All format exports: 16:9, 9:16, 1:1",
          "3 revisions",
        ],
      },
      {
        name: "Advanced",
        price: "$2,000",
        delivery: "25-Day Delivery",
        deliverables: [
          "Full render suite",
          "Motion animation sequence",
          "3-minute video at 4K",
          "All format exports",
          "Source files delivered",
          "ElevenLabs pro voice",
          "Trade show package",
          "Unlimited revisions",
        ],
      },
    ],
    addOns: [
      "4K Upgrade: +$200",
      "Trade Show Format Pack: +$150",
      "Additional Video Segment: +$300",
      "Additional Format Export: +$75",
    ],
    proof:
      "15+ years mechanical engineering experience. API 610/682 certified. Industrial clients include Tesla, Pfizer, and John Deere. SolidWorks assemblies: V6 engine, API 610 centrifugal pump with FEA.",
    techStack: ["SolidWorks", "FreeCAD", "InVideo AI", "ElevenLabs", "Cloudflare", "Python"],
    acceptedFiles: ["SolidWorks", "STEP", "IGES", "FreeCAD", "Fusion 360", "CATIA"],
    callout: {
      type: "note",
      text: "Message before ordering with your CAD files or screenshots — I'll confirm compatibility and scope before we begin.",
    },
  },
  {
    id: 5,
    name: "Engineering Consulting (API 610 / API 682)",
    tagline:
      "Rotating equipment engineering consulting from a credentialed API 610/682 specialist. Industrial-grade technical work — not general mechanical advice.",
    icon: Settings,
    availability: "no-reviews-needed",
    hourlyRate: "$150/hr",
    projectRanges: [
      {
        label: "Entry Project",
        range: "$500–$2,000",
        duration: "1–5 Days",
        items: [
          "Pump datasheet review vs API 610 compliance",
          "Seal selection per API 682 category",
          "NPSH / hydraulic performance check",
          "Written compliance report with code references",
        ],
      },
      {
        label: "Standard Project",
        range: "$2,000–$8,000",
        duration: "5–15 Days",
        items: [
          "Full rotating equipment specification package",
          "Vendor TBE (Technical Bid Evaluation) review",
          "P&ID markup and review",
          "Engineering calculations package with derivations",
          "Safety factor documentation",
        ],
      },
      {
        label: "Ongoing Retainer",
        range: "$5,000–$15,000/month",
        duration: "Ongoing",
        items: [
          "Dedicated rotating equipment advisory",
          "Compliance review for active projects",
          "Procurement support",
          "Failure RCA (Root Cause Analysis) as needed",
          "Technical training for your engineering team",
        ],
      },
    ],
    addOns: [
      "FEA Analysis: +$600–$3,000",
      "CAD Modeling: +$300–$1,500",
      "Training Documentation: +$500",
    ],
    proof:
      "15+ years rotating equipment engineering. API 610/682 certified. Industrial clients include Tesla, Pfizer, and John Deere. Fewer than 50 credible API 610/682 specialists on all of Upwork.",
    techStack: [],
    credentialTags: ["API 610", "API 682", "SolidWorks", "FEA", "Rotating Equipment", "P&ID", "NPSH"],
  },
  {
    id: 6,
    name: "GoHighLevel (GHL) CRM Setup",
    tagline:
      "GoHighLevel configured properly — automated pipelines, AI follow-up sequences, and integrations that eliminate manual data entry.",
    icon: LayoutGrid,
    availability: "after-first-review",
    availabilityNote: "Accepting inquiries now — delivery begins upon first platform review.",
    tiers: [
      {
        name: "Starter",
        price: "$300",
        delivery: "5-Day Delivery",
        deliverables: [
          "GHL sub-account setup",
          "1 pipeline matching your sales process",
          "Email + SMS sequences (5 steps)",
          "Calendar + appointment booking automation",
          "Contact form integration",
          "14-day support",
        ],
      },
      {
        name: "Standard",
        price: "$800",
        delivery: "10-Day Delivery",
        deliverables: [
          "Full GHL build",
          "Multi-pipeline configuration",
          "AI chatbot inside GHL",
          "Multi-step nurture sequences",
          "Appointment automation",
          "Reporting dashboard",
          "Staff training call",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$2,000",
        delivery: "21-Day Delivery",
        deliverables: [
          "Agency snapshot build",
          "Full AI SDR inside GHL",
          "VAPI voice integration",
          "Complete funnel build",
          "Resaleable agency snapshot",
          "Staff training + SOP video series",
          "30-day support",
        ],
      },
    ],
    addOns: [
      "AI Voice Bot (VAPI): +$500–$1,000",
      "Full Funnel Build: +$800",
      "Monthly Reporting: +$200/month",
      "Additional Pipeline: +$200",
    ],
    proof:
      "Evergrow Landscaping — custom CRM pipeline + automated lead follow-up sequences, multi-location OKC.",
    techStack: ["GoHighLevel", "VAPI", "Twilio", "n8n", "Zapier", "Stripe"],
  },
  {
    id: 7,
    name: "RAG Knowledge Base / Document AI",
    tagline:
      "Turn your documents into a searchable AI brain — answers in plain language with source citations. Built for engineering firms, law offices, and enterprise teams.",
    icon: Database,
    availability: "after-first-review",
    availabilityNote: "Accepting inquiries now — delivery begins upon first platform review.",
    tiers: [
      {
        name: "Starter",
        price: "$800",
        delivery: "7-Day Delivery",
        deliverables: [
          "PDF + DOCX ingestion (up to 50 documents)",
          "Vector search with source citations",
          "Chat embed widget",
          "Cloudflare edge deployment",
          "Admin panel to add documents",
          "14-day support",
        ],
      },
      {
        name: "Standard",
        price: "$2,000",
        delivery: "14-Day Delivery",
        deliverables: [
          "Multi-format ingestion (PDF, web, CSV) — 500 documents",
          "Hybrid search + re-ranking for accuracy",
          "React chat UI",
          "Source citations with page numbers",
          "Admin document panel",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$5,000",
        delivery: "30-Day Delivery",
        deliverables: [
          "Unlimited sources + auto-sync pipeline",
          "Multi-tenant support",
          "Custom React UI with branding",
          "Role-based access control",
          "Analytics dashboard",
          "Cloudflare edge deployment",
          "API endpoints",
          "Source code delivered",
          "60-day support",
        ],
      },
    ],
    addOns: [
      "Additional Document Batch (100 docs): +$200",
      "Custom Chat UI Design: +$500",
      "API Endpoint Access: +$300",
      "Monthly Knowledge Base Maintenance: $300/month",
    ],
    proof:
      "MechAssist AI — 200+ API 610/682 engineering standards ingested, sub-100ms Cloudflare edge response, multi-agent LangGraph orchestration with supervisor/specialist architecture.",
    techStack: ["LangGraph", "LangChain", "Claude API", "Cloudflare Vectorize", "Pinecone", "React", "Python"],
  },
  {
    id: 8,
    name: "AI SaaS MVP / Full-Stack Web App",
    tagline:
      "AI-powered SaaS products and full-stack web applications built on Next.js + Cloudflare edge — delivered 2–3x faster than traditional agencies.",
    icon: Network,
    availability: "after-3-reviews",
    availabilityNote: "Accepting project scoping calls now — delivery begins after review milestone.",
    tiers: [
      {
        name: "Starter",
        price: "$1,500",
        delivery: "14-Day Delivery",
        deliverables: [
          "Single-feature AI web application",
          "Authentication system",
          "Cloudflare D1 database",
          "1 AI feature (Claude or GPT-4)",
          "Cloudflare Pages deployment",
          "Source code delivered",
          "14-day support",
        ],
      },
      {
        name: "Standard",
        price: "$4,000",
        delivery: "35-Day Delivery",
        deliverables: [
          "Full MVP with 3–5 AI features",
          "Next.js + Cloudflare Workers + D1",
          "Multi-LLM integration",
          "Full auth + user management",
          "Stripe billing integration",
          "Admin dashboard",
          "Mobile responsive",
          "CI/CD pipeline",
          "Source code delivered",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$10,000",
        delivery: "60-Day Delivery",
        deliverables: [
          "Production-grade SaaS",
          "Multi-tenant architecture",
          "Full AI suite (agents + RAG + automation)",
          "Analytics dashboards",
          "White-label ready",
          "Load testing",
          "Source code delivered",
          "60-day support",
        ],
      },
    ],
    addOns: [
      "Mobile App (React Native): +$2,500",
      "White-Label Version: +$1,500",
      "Analytics Dashboard: +$800",
      "Additional AI Feature: +$500",
    ],
    proof:
      "AI Meal Planner — consumer SaaS with Claude API, macro tracking, Stripe subscriptions, Cloudflare edge deployment. Evergrow Landscaping Platform — multi-location lead gen + CRM + Stripe + automated follow-up.",
    techStack: ["Next.js", "Cloudflare Workers", "D1", "R2", "Claude API", "OpenAI", "Stripe", "React", "TypeScript"],
  },
  {
    id: 9,
    name: "Multi-Agent AI System",
    tagline:
      "Production-grade multi-agent AI systems on LangGraph — autonomous research, AI SDR outreach, internal knowledge agents, and engineering automation workflows.",
    icon: Network,
    availability: "after-3-reviews",
    availabilityNote: "Accepting project scoping calls now — delivery begins after review milestone.",
    tiers: [
      {
        name: "Starter",
        price: "$1,500",
        delivery: "14-Day Delivery",
        deliverables: [
          "Single-purpose AI agent",
          "3–5 tool integrations",
          "LangChain / LangGraph orchestration",
          "Basic persistent memory",
          "API endpoint",
          "Full documentation",
          "14-day support",
        ],
      },
      {
        name: "Standard",
        price: "$4,000",
        delivery: "21-Day Delivery",
        deliverables: [
          "Multi-tool agent (5–10 tools)",
          "LangGraph supervisor orchestration",
          "Persistent memory (Mem0 / Pinecone)",
          "API + webhook endpoints",
          "Error handling + monitoring",
          "Web dashboard",
          "Architecture documentation",
          "30-day support",
        ],
      },
      {
        name: "Advanced",
        price: "$12,000",
        delivery: "45-Day Delivery",
        deliverables: [
          "Full multi-agent orchestration",
          "Supervisor + specialist agent teams",
          "10+ tools + MCP integration",
          "Mem0 / Pinecone persistent memory",
          "LangSmith monitoring dashboard",
          "Production CI/CD pipeline",
          "Source code delivered",
          "60-day support",
        ],
      },
    ],
    addOns: [
      "LangSmith Monitoring Setup: +$400",
      "Additional Specialist Agent: +$1,000",
      "MCP Server Integration: +$800",
      "Monthly Agent Maintenance: $500/month",
    ],
    proof:
      "OpenClaw — multi-agent outbound SDR system with Apollo prospecting, AI personalization, multi-channel execution, reply detection, and CRM automation. MechAssist AI — multi-agent RAG with LangGraph supervisor/specialist architecture.",
    techStack: ["LangGraph", "LangChain", "Claude API", "MCP", "Mem0", "Pinecone", "LangSmith", "Python", "Cloudflare"],
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const tierStyle = {
  Starter: {
    border: "border-white/10",
    badge: "bg-white/5 text-muted-foreground",
    price: "text-foreground",
    check: "text-blue",
    bg: "bg-navy-light",
  },
  Standard: {
    border: "border-blue/30",
    badge: "bg-blue/10 text-blue",
    price: "text-blue",
    check: "text-blue",
    bg: "bg-navy-light",
  },
  Advanced: {
    border: "border-gold/40",
    badge: "bg-gold/10 text-gold",
    price: "text-gold",
    check: "text-gold",
    bg: "bg-gradient-to-br from-navy-light to-gold/5",
  },
};

const availabilityConfig: Record<
  AvailabilityType,
  { label: string; className: string }
> = {
  "available-now": {
    label: "Available Now",
    className:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  "no-reviews-needed": {
    label: "Available Now — No Reviews Needed",
    className:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  "after-first-review": {
    label: "Available After First Review",
    className: "bg-gold/10 text-gold border border-gold/20",
  },
  "after-3-reviews": {
    label: "Available After 3 Reviews",
    className: "bg-blue/10 text-blue border border-blue/20",
  },
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TierCard({ tier }: { tier: Tier }) {
  const s = tierStyle[tier.name];
  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.015] ${s.border} ${s.bg}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badge}`}>
          {tier.name}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3 shrink-0" />
          {tier.delivery}
        </span>
      </div>
      <div className={`text-3xl font-bold mb-5 ${s.price}`}>{tier.price}</div>
      <ul className="space-y-2.5">
        {tier.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.check}`} />
            <span className="text-sm text-foreground/80 leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HourlyCard({
  range,
  index,
}: {
  range: HourlyRange;
  index: number;
}) {
  const styles = [
    { border: "border-white/10", bg: "bg-navy-light", label: "bg-white/5 text-muted-foreground", check: "text-blue" },
    { border: "border-blue/30", bg: "bg-navy-light", label: "bg-blue/10 text-blue", check: "text-blue" },
    { border: "border-gold/40", bg: "bg-gradient-to-br from-navy-light to-gold/5", label: "bg-gold/10 text-gold", check: "text-gold" },
  ];
  const s = styles[index] ?? styles[0];
  return (
    <div className={`p-6 rounded-2xl border ${s.border} ${s.bg}`}>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.label}`}>
        {range.label}
      </span>
      <div className="mt-4 mb-1">
        <span className="text-2xl font-bold text-foreground">{range.range}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
        <Clock className="w-3 h-3 shrink-0" />
        {range.duration}
      </p>
      <ul className="space-y-2.5">
        {range.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.check}`} />
            <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillBadge({
  text,
  variant = "default",
}: {
  text: string;
  variant?: "default" | "gold";
}) {
  const cls =
    variant === "gold"
      ? "bg-gold/10 text-gold border border-gold/20"
      : "bg-white/5 text-muted-foreground border border-white/10";
  return (
    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>
      {text}
    </span>
  );
}

function ProofBox({ text }: { text: string }) {
  return (
    <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
      <div className="flex items-start gap-2.5">
        <Star className="w-4 h-4 text-gold shrink-0 mt-0.5 fill-gold/30" />
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function CalloutBox({
  type,
  text,
}: {
  type: "differentiator" | "note";
  text: string;
}) {
  return (
    <div className="mt-5 pl-4 border-l-2 border-gold/50 py-3 pr-4 bg-gold/5 rounded-r-xl">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <p className="text-sm text-gold/90 leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Services() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light/50 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Services
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold text-foreground">
            What We Deliver
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Nine production-grade services — every deliverable, price, and timeline listed in full.
            No vague quotes, no scope creep, no surprises.
          </p>
        </motion.div>

        {/* ── Global Pricing Banner ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-5 rounded-2xl bg-gold/10 border border-gold/30"
        >
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-gold shrink-0 mt-0.5 fill-gold/40" />
            <p className="text-sm lg:text-base text-gold/90 leading-relaxed font-medium">
              <span className="font-bold text-gold">Phase 1 Introductory Pricing</span> — Rates
              reflect our launch period as we build platform reviews. Every deliverable is full
              production quality. Lock in your rate now — prices increase as our review count grows.
            </p>
          </div>
        </motion.div>

        {/* ── Accordion ──────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            const isOpen = openId === svc.id;
            const avail = availabilityConfig[svc.availability];

            return (
              <motion.div key={svc.id} variants={itemVariants}>
                {/* ── Card Header ── */}
                <button
                  onClick={() => toggle(svc.id)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 text-left group ${
                    isOpen
                      ? "bg-navy-light border-gold/30"
                      : "bg-navy-light/60 border-white/10 hover:border-gold/20 hover:bg-navy-light/80"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen
                          ? "bg-gold/10 text-gold"
                          : "bg-white/5 text-muted-foreground group-hover:text-gold group-hover:bg-gold/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span
                          className={`text-base font-semibold transition-colors ${
                            isOpen ? "text-gold" : "text-foreground group-hover:text-gold"
                          }`}
                        >
                          {svc.name}
                        </span>
                        <span
                          className={`hidden sm:inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${avail.className}`}
                        >
                          {avail.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug line-clamp-1 hidden sm:block">
                        {svc.tagline}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 ml-4 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ── Expanded Content ── */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pt-3 pb-1">
                        {/* Tagline + badge (mobile) */}
                        <div className="mb-5 px-2">
                          <span
                            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full mb-3 sm:hidden ${avail.className}`}
                          >
                            {avail.label}
                          </span>
                          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                            {svc.tagline}
                          </p>
                          {svc.availabilityNote && (
                            <p className="mt-2 text-xs text-gold/70 italic">
                              {svc.availabilityNote}
                            </p>
                          )}
                        </div>

                        {/* Service 5: Hourly + project ranges */}
                        {svc.hourlyRate && svc.projectRanges ? (
                          <>
                            <div className="mb-5 px-2">
                              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/10 border border-gold/30">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Hourly Rate
                                </span>
                                <span className="text-xl font-bold text-gold">
                                  {svc.hourlyRate}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  (non-negotiable floor)
                                </span>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                              {svc.projectRanges.map((r, i) => (
                                <HourlyCard key={r.label} range={r} index={i} />
                              ))}
                            </div>
                          </>
                        ) : (
                          /* Standard: 3-tier grid */
                          <div className="grid md:grid-cols-3 gap-4">
                            {svc.tiers!.map((tier) => (
                              <TierCard key={tier.name} tier={tier} />
                            ))}
                          </div>
                        )}

                        {/* Callout box */}
                        {svc.callout && (
                          <CalloutBox type={svc.callout.type} text={svc.callout.text} />
                        )}

                        {/* Add-ons */}
                        <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                          <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                            Add-ons
                          </p>
                          <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                            {svc.addOns.map((a) => (
                              <li
                                key={a}
                                className="text-sm text-muted-foreground flex items-start gap-1.5"
                              >
                                <span className="text-gold mt-0.5 text-xs">+</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Accepted file types (Service 4) */}
                        {svc.acceptedFiles && svc.acceptedFiles.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2 px-1">
                              Accepted File Types
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {svc.acceptedFiles.map((f) => (
                                <PillBadge key={f} text={f} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Credential tags (Service 5) */}
                        {svc.credentialTags && svc.credentialTags.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2 px-1">
                              Credential Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {svc.credentialTags.map((c) => (
                                <PillBadge key={c} text={c} variant="gold" />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Proof */}
                        <ProofBox text={svc.proof} />

                        {/* Tech stack */}
                        {svc.techStack.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2 px-1">
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {svc.techStack.map((t) => (
                                <PillBadge key={t} text={t} />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-6 mb-2 px-1">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
                          >
                            Start a Project
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Footer note ─────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          All prices reflect Phase 1 introductory rates. Contact us for retainer, enterprise, and
          volume pricing.
        </motion.p>
      </div>
    </section>
  );
}
