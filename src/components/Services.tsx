"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Bot,
  Globe,
  Zap,
  Video,
  Wrench,
  Settings,
  Database,
  Rocket,
  Network,
  ChevronDown,
  Check,
} from "lucide-react";

type ServiceTier = {
  name: "Starter" | "Standard" | "Advanced";
  price: string;
  delivery: string;
  deliverables: string[];
};

type AddOn = {
  name: string;
  price: string;
};

type ScopeRange = {
  name: string;
  range: string;
  delivery: string;
  deliverables: string[];
};

type Service = {
  id: number;
  name: string;
  tagline: string;
  availability: "now" | "first-review" | "three-reviews";
  Icon: React.ComponentType<{ className?: string }>;
  tiers?: ServiceTier[];
  pricingModel?: string;
  scopeRanges?: ScopeRange[];
  addOns: AddOn[];
  proof: string;
  techTags: string[];
  callout?: string;
  noteCallout?: string;
  acceptedFiles?: string;
  credentials?: string[];
  availabilityNote?: string;
  badgeLabel?: string;
};

const SERVICES: Service[] = [
  {
    id: 1,
    name: "AI Chatbot Development",
    tagline:
      "Custom AI chatbots trained on your business content. Not templates — production-grade RAG systems built for real-world use.",
    availability: "now",
    Icon: Bot,
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
      { name: "Fast Delivery (2 days faster)", price: "+$150" },
      { name: "Additional Revision", price: "+$50" },
      { name: "Additional Messaging Platform", price: "+$200" },
      { name: "API Integration (Starter add-on)", price: "+$300" },
    ],
    proof:
      "MechAssist AI — 200+ API 610/682 engineering documents, sub-100ms Cloudflare edge response, LangGraph multi-agent orchestration. Evergrow Landscaping — AI lead qualification chatbot.",
    techTags: [
      "Claude API",
      "LangGraph",
      "Cloudflare Workers",
      "Pinecone",
      "Cloudflare Vectorize",
      "React",
    ],
  },
  {
    id: 2,
    name: "Lead Generation Website",
    tagline:
      "Websites engineered to convert visitors into inquiries. Built on Next.js + Cloudflare Pages — sub-1s load, $0/month hosting after launch.",
    availability: "now",
    Icon: Globe,
    callout:
      "Every site hosted on Cloudflare Pages — loads in under 1 second globally. Zero monthly hosting fees after launch.",
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
      { name: "Additional Page", price: "+$150 per page" },
      { name: "Additional Revision", price: "+$75" },
      { name: "Design Customization", price: "+$200" },
      { name: "Content Upload", price: "+$150" },
      { name: "Source Code (Standard)", price: "+$300" },
      { name: "AI Chatbot", price: "+$500" },
      { name: "Monthly SEO Retainer", price: "$300/month" },
    ],
    proof:
      "Evergrow Landscaping — multi-location OKC lead gen platform, CRM + Stripe, 3-week delivery. Tony\u2019s Toolbox — local service conversion site, 7-day delivery.",
    techTags: [
      "Next.js",
      "Cloudflare Pages",
      "React",
      "Tailwind CSS",
      "Google Analytics 4",
      "Stripe",
    ],
  },
  {
    id: 3,
    name: "Workflow Automation",
    tagline:
      "Automate repetitive business workflows using n8n, Make.com, or Zapier — with optional AI decision-making built in at every step.",
    availability: "now",
    Icon: Zap,
    callout:
      "Every automation includes error handling and failure alerts built in as standard — not optional, not an add-on.",
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
      { name: "Fast Delivery (2 days faster)", price: "+$100" },
      { name: "Additional Workflow", price: "+$150" },
      { name: "AI Decision Node (Claude/GPT-4)", price: "+$200" },
      { name: "Self-Hosted n8n Setup", price: "+$200" },
      { name: "Additional App Connection", price: "+$75" },
      { name: "Monthly Maintenance", price: "$200/month" },
    ],
    proof:
      "Evergrow Landscaping — Apollo + CRM automation pipeline, AI-personalized outreach, reply detection, zero manual work. OpenClaw AI SDR — multi-agent outbound system.",
    techTags: [
      "n8n",
      "Make.com",
      "Zapier",
      "Claude API",
      "GPT-4",
      "Webhooks",
      "Apollo.io",
    ],
  },
  {
    id: 4,
    name: "CAD-to-AI Product Video",
    tagline:
      "Turn your CAD files into professional product demo videos. The only seller who is both a credentialed mechanical engineer AND an AI video developer.",
    availability: "now",
    Icon: Video,
    noteCallout:
      "Message before ordering with your CAD files or screenshots — I\u2019ll confirm compatibility and scope before we begin.",
    acceptedFiles:
      "SolidWorks \u00b7 STEP \u00b7 IGES \u00b7 FreeCAD \u00b7 Fusion 360 \u00b7 CATIA",
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
      { name: "4K Upgrade", price: "+$200" },
      { name: "Trade Show Format Pack", price: "+$150" },
      { name: "Additional Video Segment", price: "+$300" },
      { name: "Additional Format Export", price: "+$75" },
    ],
    proof:
      "15+ years mechanical engineering experience. API 610/682 certified. Industrial clients include Tesla, Pfizer, and John Deere. SolidWorks assemblies: V6 engine, API 610 centrifugal pump with FEA.",
    techTags: [
      "SolidWorks",
      "FreeCAD",
      "InVideo AI",
      "ElevenLabs",
      "Cloudflare",
      "Python",
    ],
  },
  {
    id: 5,
    name: "Engineering Consulting (API 610 / API 682)",
    tagline:
      "Rotating equipment engineering consulting from a credentialed API 610/682 specialist. Industrial-grade technical work — not general mechanical advice.",
    availability: "now",
    badgeLabel: "Available Now \u2014 No Reviews Needed",
    Icon: Wrench,
    pricingModel: "Hourly \u2014 $150/hr (non-negotiable floor)",
    credentials: [
      "API 610",
      "API 682",
      "SolidWorks",
      "FEA",
      "Rotating Equipment",
      "P&ID",
      "NPSH",
    ],
    scopeRanges: [
      {
        name: "Entry Project",
        range: "$500\u2013$2,000",
        delivery: "1\u20135 Days",
        deliverables: [
          "Pump datasheet review vs API 610 compliance",
          "Seal selection per API 682 category",
          "NPSH / hydraulic performance check",
          "Written compliance report with code references",
        ],
      },
      {
        name: "Standard Project",
        range: "$2,000\u2013$8,000",
        delivery: "5\u201315 Days",
        deliverables: [
          "Full rotating equipment specification package",
          "Vendor TBE (Technical Bid Evaluation) review",
          "P&ID markup and review",
          "Engineering calculations package with derivations",
          "Safety factor documentation",
        ],
      },
      {
        name: "Ongoing Retainer",
        range: "$5,000\u2013$15,000/month",
        delivery: "Ongoing",
        deliverables: [
          "Dedicated rotating equipment advisory",
          "Compliance review for active projects",
          "Procurement support",
          "Failure RCA (Root Cause Analysis) as needed",
          "Technical training for your engineering team",
        ],
      },
    ],
    addOns: [
      { name: "FEA Analysis", price: "+$600\u2013$3,000" },
      { name: "CAD Modeling", price: "+$300\u2013$1,500" },
      { name: "Training Documentation", price: "+$500" },
    ],
    proof:
      "15+ years rotating equipment engineering. API 610/682 certified. Industrial clients include Tesla, Pfizer, and John Deere. Fewer than 50 credible API 610/682 specialists on all of Upwork.",
    techTags: [
      "API 610",
      "API 682",
      "SolidWorks",
      "FEA",
      "Rotating Equipment",
      "P&ID",
      "NPSH",
    ],
  },
  {
    id: 6,
    name: "GoHighLevel (GHL) CRM Setup",
    tagline:
      "GoHighLevel configured properly — automated pipelines, AI follow-up sequences, and integrations that eliminate manual data entry.",
    availability: "first-review",
    availabilityNote:
      "Accepting inquiries now — delivery begins upon first platform review.",
    Icon: Settings,
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
      { name: "AI Voice Bot (VAPI)", price: "+$500\u2013$1,000" },
      { name: "Full Funnel Build", price: "+$800" },
      { name: "Monthly Reporting", price: "+$200/month" },
      { name: "Additional Pipeline", price: "+$200" },
    ],
    proof:
      "Evergrow Landscaping — custom CRM pipeline + automated lead follow-up sequences, multi-location OKC.",
    techTags: ["GoHighLevel", "VAPI", "Twilio", "n8n", "Zapier", "Stripe"],
  },
  {
    id: 7,
    name: "RAG Knowledge Base / Document AI",
    tagline:
      "Turn your documents into a searchable AI brain — answers in plain language with source citations. Built for engineering firms, law offices, and enterprise teams.",
    availability: "first-review",
    availabilityNote:
      "Accepting inquiries now — delivery begins upon first platform review.",
    Icon: Database,
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
      { name: "Additional Document Batch (100 docs)", price: "+$200" },
      { name: "Custom Chat UI Design", price: "+$500" },
      { name: "API Endpoint Access", price: "+$300" },
      { name: "Monthly Knowledge Base Maintenance", price: "$300/month" },
    ],
    proof:
      "MechAssist AI — 200+ API 610/682 engineering standards ingested, sub-100ms Cloudflare edge response, multi-agent LangGraph orchestration with supervisor/specialist architecture.",
    techTags: [
      "LangGraph",
      "LangChain",
      "Claude API",
      "Cloudflare Vectorize",
      "Pinecone",
      "React",
      "Python",
    ],
  },
  {
    id: 8,
    name: "AI SaaS MVP / Full-Stack Web App",
    tagline:
      "AI-powered SaaS products and full-stack web applications built on Next.js + Cloudflare edge — delivered 2\u20133x faster than traditional agencies.",
    availability: "three-reviews",
    availabilityNote:
      "Accepting project scoping calls now — delivery begins after review milestone.",
    Icon: Rocket,
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
          "Full MVP with 3\u20135 AI features",
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
      { name: "Mobile App (React Native)", price: "+$2,500" },
      { name: "White-Label Version", price: "+$1,500" },
      { name: "Analytics Dashboard", price: "+$800" },
      { name: "Additional AI Feature", price: "+$500" },
    ],
    proof:
      "AI Meal Planner — consumer SaaS with Claude API, macro tracking, Stripe subscriptions, Cloudflare edge deployment. Evergrow Landscaping Platform — multi-location lead gen + CRM + Stripe + automated follow-up.",
    techTags: [
      "Next.js",
      "Cloudflare Workers",
      "D1",
      "R2",
      "Claude API",
      "OpenAI",
      "Stripe",
      "React",
      "TypeScript",
    ],
  },
  {
    id: 9,
    name: "Multi-Agent AI System",
    tagline:
      "Production-grade multi-agent AI systems on LangGraph — autonomous research, AI SDR outreach, internal knowledge agents, and engineering automation workflows.",
    availability: "three-reviews",
    availabilityNote:
      "Accepting project scoping calls now — delivery begins after review milestone.",
    Icon: Network,
    tiers: [
      {
        name: "Starter",
        price: "$1,500",
        delivery: "14-Day Delivery",
        deliverables: [
          "Single-purpose AI agent",
          "3\u20135 tool integrations",
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
          "Multi-tool agent (5\u201310 tools)",
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
      { name: "LangSmith Monitoring Setup", price: "+$400" },
      { name: "Additional Specialist Agent", price: "+$1,000" },
      { name: "MCP Server Integration", price: "+$800" },
      { name: "Monthly Agent Maintenance", price: "$500/month" },
    ],
    proof:
      "OpenClaw — multi-agent outbound SDR system with Apollo prospecting, AI personalization, multi-channel execution, reply detection, and CRM automation. MechAssist AI — multi-agent RAG with LangGraph supervisor/specialist architecture.",
    techTags: [
      "LangGraph",
      "LangChain",
      "Claude API",
      "MCP",
      "Mem0",
      "Pinecone",
      "LangSmith",
      "Python",
      "Cloudflare",
    ],
  },
];

const TIER_STYLE = {
  Starter: {
    border: "border-white/10",
    bg: "bg-navy-light",
    badge: "bg-white/5 text-muted-foreground",
    price: "text-foreground",
    check: "text-[#00d4ff]",
  },
  Standard: {
    border: "border-blue/30",
    bg: "bg-navy-light",
    badge: "bg-blue/10 text-blue",
    price: "text-blue",
    check: "text-blue",
  },
  Advanced: {
    border: "border-gold/40",
    bg: "bg-gradient-to-br from-navy-light to-gold/5",
    badge: "bg-gold/10 text-gold",
    price: "text-gold",
    check: "text-gold",
  },
} as const;

const SCOPE_STYLE = [
  {
    border: "border-white/10",
    bg: "bg-navy-light",
    badge: "bg-white/5 text-muted-foreground",
    rangeColor: "text-foreground",
    check: "text-[#00d4ff]",
  },
  {
    border: "border-blue/30",
    bg: "bg-navy-light",
    badge: "bg-blue/10 text-blue",
    rangeColor: "text-blue",
    check: "text-blue",
  },
  {
    border: "border-gold/40",
    bg: "bg-gradient-to-br from-navy-light to-gold/5",
    badge: "bg-gold/10 text-gold",
    rangeColor: "text-gold",
    check: "text-gold",
  },
];

function availabilityBadge(svc: Service) {
  const label =
    svc.badgeLabel ??
    (svc.availability === "now"
      ? "Available Now"
      : svc.availability === "first-review"
      ? "Available After First Review"
      : "Available After 3 Reviews");

  const cls =
    svc.availability === "now"
      ? "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]"
      : svc.availability === "first-review"
      ? "bg-gold/10 border-gold/30 text-gold"
      : "bg-[#00d4ff]/10 border-[#00d4ff]/30 text-[#00d4ff]";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls} whitespace-nowrap`}
    >
      {label}
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Services() {
  const [openId, setOpenId] = useState<number>(1);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? -1 : id));

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light/50 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Global Pricing Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-gold/10 border border-gold/30 flex gap-3 items-start">
          <span className="text-gold text-xl mt-0.5">◆</span>
          <div>
            <p className="text-sm font-semibold text-gold mb-1">Phase 1 Introductory Pricing</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              These rates reflect our launch period as we establish platform reviews. Every
              deliverable is full production quality. Lock in your rate now — prices increase as
              our review count grows.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Nine Production-Grade Services
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every deliverable, price, and timeline listed — no ambiguity, no discovery calls
            required to know what you&apos;re getting.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {SERVICES.map((svc) => {
            const isOpen = openId === svc.id;
            const Icon = svc.Icon;
            return (
              <motion.div key={svc.id} variants={itemVariants}>
                {/* Accordion Header */}
                <button
                  onClick={() => toggle(svc.id)}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-navy-light/60 border border-white/10 hover:border-gold/20 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Icon className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-base font-semibold text-foreground group-hover:text-gold transition-colors truncate">
                      {svc.name}
                    </span>
                    <span className="hidden sm:inline-flex shrink-0">
                      {availabilityBadge(svc)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-3 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile badge row */}
                <div className="sm:hidden px-5 pt-1.5 pb-0.5">
                  {availabilityBadge(svc)}
                </div>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-6">
                        {/* Tagline */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {svc.tagline}
                        </p>

                        {/* Availability note for 6-9 */}
                        {svc.availabilityNote && (
                          <p className="text-xs text-muted-foreground italic">
                            {svc.availabilityNote}
                          </p>
                        )}

                        {/* Accepted files (Service 4) */}
                        {svc.acceptedFiles && (
                          <p className="text-xs text-muted-foreground">
                            <span className="text-foreground/70 font-medium">Accepted files: </span>
                            {svc.acceptedFiles}
                          </p>
                        )}

                        {/* Note callout (Service 4) */}
                        {svc.noteCallout && (
                          <div className="p-4 rounded-xl border border-amber-400/30 bg-amber-400/5 flex gap-2 items-start">
                            <span className="text-amber-400 text-base mt-0.5">⚠</span>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {svc.noteCallout}
                            </p>
                          </div>
                        )}

                        {/* Callout box (Services 2, 3) */}
                        {svc.callout && (
                          <div className="p-4 rounded-xl border border-gold/30 bg-gold/5 flex gap-2 items-start">
                            <span className="text-gold text-base mt-0.5">◆</span>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {svc.callout}
                            </p>
                          </div>
                        )}

                        {/* Service 5: Pricing model + credentials */}
                        {svc.pricingModel && (
                          <div className="flex flex-wrap gap-3 items-center">
                            <span className="px-4 py-2 rounded-full text-sm font-bold bg-gold/10 border border-gold/30 text-gold">
                              {svc.pricingModel}
                            </span>
                            {svc.credentials?.map((c) => (
                              <span
                                key={c}
                                className="text-xs px-2.5 py-1 rounded-full bg-[#b388ff]/10 border border-[#b388ff]/20 text-[#b388ff]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Tier cards (standard services) */}
                        {svc.tiers && (
                          <div className="grid md:grid-cols-3 gap-4">
                            {svc.tiers.map((tier) => {
                              const s = TIER_STYLE[tier.name];
                              return (
                                <div
                                  key={tier.name}
                                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.015] ${s.border} ${s.bg}`}
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <span
                                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badge}`}
                                    >
                                      {tier.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {tier.delivery}
                                    </span>
                                  </div>
                                  <div className={`text-3xl font-bold mb-6 ${s.price}`}>
                                    {tier.price}
                                  </div>
                                  <ul className="space-y-2.5">
                                    {tier.deliverables.map((d) => (
                                      <li key={d} className="flex items-start gap-2.5">
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.check}`} />
                                        <span className="text-sm text-foreground/80 leading-relaxed">
                                          {d}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Scope ranges (Service 5) */}
                        {svc.scopeRanges && (
                          <div className="grid md:grid-cols-3 gap-4">
                            {svc.scopeRanges.map((scope, idx) => {
                              const s = SCOPE_STYLE[idx] ?? SCOPE_STYLE[0];
                              return (
                                <div
                                  key={scope.name}
                                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.015] ${s.border} ${s.bg}`}
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <span
                                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badge}`}
                                    >
                                      {scope.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {scope.delivery}
                                    </span>
                                  </div>
                                  <div className={`text-2xl font-bold mb-6 ${s.rangeColor}`}>
                                    {scope.range}
                                  </div>
                                  <ul className="space-y-2.5">
                                    {scope.deliverables.map((d) => (
                                      <li key={d} className="flex items-start gap-2.5">
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.check}`} />
                                        <span className="text-sm text-foreground/80 leading-relaxed">
                                          {d}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Add-ons */}
                        {svc.addOns.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Add-ons
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {svc.addOns.map((ao) => (
                                <span
                                  key={ao.name}
                                  className="text-xs px-3 py-1.5 rounded-full bg-navy-light border border-white/10 text-foreground/70"
                                >
                                  {ao.name}{" "}
                                  <span className="text-gold font-semibold">{ao.price}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Proof */}
                        <div className="border-l-2 border-gold/30 pl-4">
                          <p className="text-xs text-muted-foreground italic leading-relaxed">
                            {svc.proof}
                          </p>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {svc.techTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full bg-navy-light border border-white/10 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
