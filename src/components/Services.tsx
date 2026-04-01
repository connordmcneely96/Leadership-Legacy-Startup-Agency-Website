"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Bot, Rocket, Dumbbell, Wrench, Palette, Brain, ChevronDown, Check, Star } from "lucide-react";

type Tier = {
  name: "Starter" | "Professional" | "Enterprise";
  price: string;
  delivery: string;
  deliverables: string[];
};

type ServiceDef = {
  id: string;
  name: string;
  intro?: string;
  customQuote?: { copy: string; cta: string };
  tiers?: Tier[];
};

type PillarDef = {
  id: number;
  shortName: string;
  fullName: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  intro?: string;
  services: ServiceDef[];
};

const PILLARS: PillarDef[] = [
  {
    id: 1,
    shortName: "AI Dev & Automation",
    fullName: "AI Development & Automation",
    Icon: Bot,
    services: [
      {
        id: "1A",
        name: "AI Chatbots & Conversational Agents",
        intro:
          "Stop losing leads to slow response times. A trained AI agent handles inquiries, qualifies prospects, and books calls — 24/7, across every channel.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "3–5 days",
            deliverables: [
              "Rule-based / GPT bot with 10 conversation flows",
              "Single-channel deployment",
              "FAQ integration",
              "Embed code for your website",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "7–10 days",
            deliverables: [
              "GPT-4/Claude bot with 30 conversation flows",
              "2-channel deployment",
              "CRM integration & lead capture",
              "Admin dashboard",
              "30-day post-launch support",
            ],
          },
          {
            name: "Enterprise",
            price: "$4,000",
            delivery: "14–21 days",
            deliverables: [
              "Multi-channel deployment",
              "RAG knowledge base + AI memory",
              "Full CRM + calendar + ticketing sync",
              "Human handoff + real-time analytics",
              "Voice option available",
              "60-day support",
            ],
          },
        ],
      },
      {
        id: "1B",
        name: "Business Automation & AI Workflows",
        intro:
          "Every hour your team spends on manual handoffs is money left on the table. We automate the decisions your software can already make — and add AI where it can't.",
        tiers: [
          {
            name: "Starter",
            price: "$300",
            delivery: "2–5 days",
            deliverables: [
              "1 workflow, 5-step process",
              "1 app integration (n8n / Make / Zapier)",
              "Workflow export + documentation",
            ],
          },
          {
            name: "Professional",
            price: "$800",
            delivery: "5–10 days",
            deliverables: [
              "3 AI-powered workflows",
              "GPT/Claude decision nodes",
              "3 integrations with error handling",
              "Loom walkthrough video",
              "14-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "14–21 days",
            deliverables: [
              "5+ full AI workflows",
              "AI at every decision point",
              "Custom code nodes + unlimited integrations",
              "Error monitoring dashboard",
              "Self-hosted n8n option",
              "Staff training + 30-day support",
            ],
          },
        ],
      },
      {
        id: "1C",
        name: "Custom AI Agent Development",
        intro:
          "Off-the-shelf AI tools hit a ceiling. Custom agents work your specific data, tools, and workflows — and keep compounding in value as your business grows.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "5–10 days",
            deliverables: [
              "Single-purpose agent with 1–3 tools",
              "Python + LangChain implementation",
              "Basic memory",
              "API endpoint + documentation",
            ],
          },
          {
            name: "Professional",
            price: "$2,500",
            delivery: "14–21 days",
            deliverables: [
              "Multi-tool agent (5–10 tools)",
              "LangGraph/CrewAI orchestration",
              "Persistent memory + API & webhook",
              "Custom UI + architecture documentation",
              "30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$8,000",
            delivery: "28–45 days",
            deliverables: [
              "Full multi-agent system — supervisor + specialist teams",
              "10+ tools + MCP integration",
              "Long-term memory (Mem0/Pinecone)",
              "LangSmith monitoring + web dashboard",
              "CI/CD pipeline",
              "60-day support",
            ],
          },
        ],
      },
      {
        id: "1D",
        name: "AI Sales Infrastructure",
        intro:
          "Your best SDR works 9–5. Ours works 24/7, personalizes outreach at scale, and logs every touch to your CRM automatically.",
        tiers: [
          {
            name: "Starter",
            price: "$600",
            delivery: "5–10 days",
            deliverables: [
              "Apollo sequence setup",
              "3 AI-written email templates",
              "Lead enrichment",
              "CRM integration + reporting dashboard",
            ],
          },
          {
            name: "Professional",
            price: "$2,500",
            delivery: "14–21 days",
            deliverables: [
              "AI SDR agent + Apollo ICP lead scoring",
              "Multi-channel outreach (email + LinkedIn + SMS)",
              "5-touch AI follow-up sequence",
              "CRM automation + Telegram monitoring",
              "Reply detection",
            ],
          },
          {
            name: "Enterprise",
            price: "$6,000",
            delivery: "28–45 days",
            deliverables: [
              "Full AI outbound system (OpenClaw orchestration)",
              "AI personalization at 100+ leads/day",
              "Lead scoring model + full CRM automation",
              "KPI dashboard",
              "Staff training + 60-day support",
            ],
          },
        ],
      },
      {
        id: "1E",
        name: "GoHighLevel + AI Integration",
        intro:
          "GHL is powerful. GHL with AI follow-up, booking automation, and a voice agent is a sales machine that runs without your team touching it.",
        tiers: [
          {
            name: "Starter",
            price: "$300",
            delivery: "3–7 days",
            deliverables: [
              "GHL workflow setup",
              "AI follow-up sequences",
              "Basic chatbot integration",
              "CRM pipeline configuration",
            ],
          },
          {
            name: "Professional",
            price: "$1,200",
            delivery: "7–14 days",
            deliverables: [
              "Full GHL + AI chatbot build",
              "Multi-step AI nurture workflows",
              "Appointment booking automation",
              "SMS + email + voicemail drops",
              "Full pipeline lifecycle management",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "14–28 days",
            deliverables: [
              "Agency sub-account architecture",
              "AI SDR inside GHL",
              "Complete sales funnel + VAPI voice integration",
              "Full automation suite + snapshot for resale",
              "Staff training + SOP documentation",
            ],
          },
        ],
      },
      {
        id: "1F",
        name: "Voice AI & Phone Agent Systems",
        intro:
          "Missed calls cost you revenue. An AI phone agent answers every call, books appointments, and routes complex issues — in a natural voice indistinguishable from your brand.",
        tiers: [
          {
            name: "Starter",
            price: "$800",
            delivery: "5–10 days",
            deliverables: [
              "VAPI/Twilio inbound voice agent",
              "FAQ handling",
              "1 phone number",
              "Call transcript logging",
              "ElevenLabs natural voice",
            ],
          },
          {
            name: "Professional",
            price: "$2,000",
            delivery: "10–21 days",
            deliverables: [
              "Full AI receptionist",
              "Calendly/GHL booking integration",
              "CRM capture on every call",
              "Custom ElevenLabs voice",
              "Recording + transcription + human escalation",
              "Analytics + 30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$5,000",
            delivery: "21–35 days",
            deliverables: [
              "Inbound + outbound system",
              "Multi-scenario call flows",
              "Full CRM + deal creation",
              "AI call analysis (sentiment + intent scoring)",
              "Custom voice clone + outbound campaign module",
              "Real-time dashboard + staff training + 60-day support",
            ],
          },
        ],
      },
      {
        id: "1G",
        name: "AI Integration & API Services",
        intro:
          "Your existing software stack has AI-shaped holes. We fill them with production-grade LLM integrations built to handle real traffic, real data, and real costs.",
        tiers: [
          {
            name: "Starter",
            price: "$400",
            delivery: "3–7 days",
            deliverables: [
              "1 LLM API integration (OpenAI/Claude)",
              "Basic prompt-to-response flow",
              "REST API wrapper + error handling",
              "Documentation",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "7–14 days",
            deliverables: [
              "3 AI integrations",
              "Streaming responses",
              "Token cost optimization + rate limiting + caching",
              "Basic UI + database logging",
              "30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$4,000",
            delivery: "14–28 days",
            deliverables: [
              "Full AI layer across entire application",
              "Multi-model fallback",
              "Cloudflare AI Gateway + semantic caching",
              "Usage analytics + token budgeting per user",
              "60-day support",
            ],
          },
        ],
      },
      {
        id: "1H",
        name: "Cloudflare Edge AI Infrastructure",
        intro:
          "AWS at scale costs a fortune. We build your AI stack on Cloudflare's global edge — 60–80% lower infrastructure cost, zero cold starts, enterprise-grade reliability.",
        tiers: [
          {
            name: "Starter",
            price: "$800",
            delivery: "5–10 days",
            deliverables: [
              "Cloudflare Workers AI deployment",
              "1 AI model at edge",
              "D1 database + R2 storage + KV caching",
              "REST API endpoint",
            ],
          },
          {
            name: "Professional",
            price: "$3,000",
            delivery: "14–28 days",
            deliverables: [
              "CF AI Gateway + multi-model routing",
              "Semantic caching + rate limiting",
              "Full D1 + R2 + KV stack",
              "Analytics dashboard + Cloudflare Pages frontend",
              "30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$8,000",
            delivery: "30–60 days",
            deliverables: [
              "Full production edge AI system",
              "100+ global PoP distribution",
              "Multi-tenant Cloudflare architecture",
              "Durable Objects for stateful agents",
              "AI Gateway observability + zero cold-start design",
              "CI/CD + cost optimization audit + 60-day support",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    shortName: "AI SaaS & Web Apps",
    fullName: "AI SaaS & Web Applications",
    Icon: Rocket,
    services: [
      {
        id: "2A",
        name: "Full-Stack AI SaaS MVP Development",
        intro:
          "Turn your AI product idea into a live, revenue-ready SaaS. We handle the full stack — frontend, backend, AI integrations, billing, and deployment.",
        tiers: [
          {
            name: "Starter",
            price: "$2,500",
            delivery: "14–21 days",
            deliverables: [
              "MVP with 1 core AI feature",
              "React + Node/Python backend",
              "1 LLM integration + basic auth",
              "Cloudflare Pages deployment",
              "GitHub repo",
            ],
          },
          {
            name: "Professional",
            price: "$8,000",
            delivery: "28–42 days",
            deliverables: [
              "Full MVP with 3–5 AI features",
              "Next.js + D1 database + REST API",
              "Multi-LLM + full auth + Stripe billing",
              "Admin dashboard + mobile responsive",
              "CI/CD pipeline + 30-day warranty",
            ],
          },
          {
            name: "Enterprise",
            price: "$20,000",
            delivery: "60–90 days",
            deliverables: [
              "Production-grade SaaS platform",
              "Multi-tenant architecture",
              "Full AI suite (agents + RAG + automation)",
              "Analytics dashboards + white-label ready",
              "Load testing + 60-day support",
            ],
          },
        ],
      },
      {
        id: "2B",
        name: "RAG Knowledge Base Systems",
        intro:
          "Your documents, policies, and institutional knowledge — turned into an AI that answers questions instantly, cites its sources, and never loses context.",
        tiers: [
          {
            name: "Starter",
            price: "$800",
            delivery: "7–14 days",
            deliverables: [
              "Vector DB setup (Chroma/FAISS)",
              "1 document type, up to 500 pages ingested",
              "Basic chunking",
              "Simple query API",
              "Accuracy testing report",
            ],
          },
          {
            name: "Professional",
            price: "$2,500",
            delivery: "21–30 days",
            deliverables: [
              "Pinecone/Qdrant vector DB",
              "3 document types + web scraping",
              "Advanced chunking + hybrid search",
              "React/Streamlit chat UI with source citation",
              "Re-ranking pipeline + 30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$6,000",
            delivery: "45–60 days",
            deliverables: [
              "Full production RAG application",
              "Unlimited sources + document types",
              "Auto-sync ingestion pipeline",
              "Multi-tenant access with RBAC",
              "Full chat UI + analytics",
              "Cloudflare edge deployment + 60-day support",
            ],
          },
        ],
      },
      {
        id: "2C",
        name: "AI-Powered Lead Gen Websites",
        intro:
          "A website that captures leads and routes them into your CRM automatically. Built fast, optimized to convert, and ready to scale.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "5–7 days",
            deliverables: [
              "3-page site (Home / About / Contact)",
              "Contact form + mobile responsive",
              "Basic SEO",
              "Cloudflare hosting setup",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "10–14 days",
            deliverables: [
              "6-page website",
              "Lead capture funnel",
              "Google Maps + full SEO setup",
              "GA4 analytics + domain/DNS configuration",
              "Unlimited revisions",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "18–25 days",
            deliverables: [
              "8+ pages",
              "CRM integration + blog setup",
              "AI chatbot integration",
              "Advanced SEO + performance optimization",
              "30-day support",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    shortName: "AI Fitness Platforms",
    fullName: "AI Fitness & Body Composition Platforms",
    Icon: Dumbbell,
    badge: "Category Exclusive",
    intro:
      "The only AI development team on any platform that combines 15 years of elite competitive natural bodybuilding with full-stack AI engineering. No fitness app agency knows this science from the inside. No fitness coach knows this tech stack. We do both.",
    services: [
      {
        id: "3A",
        name: "AI Fitness Coaching Platform",
        tiers: [
          {
            name: "Starter",
            price: "$10,000",
            delivery: "4–5 weeks",
            deliverables: [
              "Branded AI coaching platform",
              "Workout plan generator",
              "Progress tracking + client portal",
              "AI check-in system",
              "Mobile responsive + Stripe billing",
            ],
          },
          {
            name: "Professional",
            price: "$20,000",
            delivery: "6–8 weeks",
            deliverables: [
              "Full AI coaching platform",
              "Multi-client management",
              "Adaptive program logic + nutrition tracking",
              "AI chat coach (Claude/GPT-4) + progress photo analysis",
              "Coach admin dashboard",
              "Calendly + Stripe + email integrations + 60-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$40,000",
            delivery: "10–14 weeks",
            deliverables: [
              "Enterprise fitness SaaS, white-label ready",
              "Multi-gym / franchise support",
              "AI periodization engine + body composition analysis",
              "Supplement AI advisor + community features",
              "React Native mobile app",
              "Full analytics + maintenance retainer",
            ],
          },
        ],
      },
      {
        id: "3B",
        name: "Body Composition AI System",
        tiers: [
          {
            name: "Starter",
            price: "$5,000",
            delivery: "3–4 weeks",
            deliverables: [
              "AI body composition calculator",
              "Photo-based analysis interface",
              "Macro targets output",
              "Progress tracking",
              "Basic client dashboard",
            ],
          },
          {
            name: "Professional",
            price: "$10,000",
            delivery: "5–7 weeks",
            deliverables: [
              "Advanced body comp AI engine",
              "Scan data integration (DEXA/InBody)",
              "Predictive modeling",
              "Periodized nutrition and training AI outputs",
              "Multi-client coach dashboard",
              "Stripe billing + 45-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$20,000",
            delivery: "8–12 weeks",
            deliverables: [
              "Full production body comp SaaS",
              "White-label ready + multi-practitioner support",
              "Custom AI model trained on client data",
              "Wearable + lab data integrations",
              "Full analytics suite",
              "60-day support",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    shortName: "CAD Engineering & AI Video",
    fullName: "CAD Engineering & AI Video",
    Icon: Wrench,
    badge: "Category Exclusive",
    intro:
      "Fewer than 50 credible engineering specialists exist on all platforms for this work. API 610/682 credentials, 15+ years on industrial equipment for Tesla, Pfizer, and John Deere — combined with AI video production capability that no other engineer on any platform offers.",
    services: [
      {
        id: "4A",
        name: "CAD-to-AI Product Demo Video",
        intro:
          "Turn your SolidWorks or STEP files into a professional narrated product demo. No other engineering team on any platform can deliver this combination.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "5–10 days",
            deliverables: [
              "30–60 sec AI-narrated video from client CAD/STEP files",
              "Script written from technical content",
              "AI voiceover + visuals",
              "1080p MP4",
              "1 revision",
            ],
          },
          {
            name: "Professional",
            price: "$800",
            delivery: "10–14 days",
            deliverables: [
              "2–5 min technical explainer",
              "Script from engineering specs/CAD",
              "AI video + engineering visual overlays",
              "Subtitle/caption track",
              "Branded intro/outro",
              "2 revision rounds",
              "LinkedIn/YouTube optimized",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "3–6 weeks",
            deliverables: [
              "5–15 video series from P&IDs/CAD/technical specs",
              "Custom AI avatar/narrator",
              "Equipment training modules",
              "Sales enablement package",
              "All format exports",
              "Monthly retainer option",
            ],
          },
        ],
      },
      {
        id: "4B",
        name: "3D CAD Modeling (FreeCAD / SolidWorks)",
        tiers: [
          {
            name: "Starter",
            price: "$150",
            delivery: "2–3 days",
            deliverables: [
              "Single part or simple assembly",
              "Parametric 3D model",
              "STEP + IGES + native files",
              "2 revision rounds",
            ],
          },
          {
            name: "Professional",
            price: "$300",
            delivery: "3–7 days",
            deliverables: [
              "Multi-part assembly (up to 30 components)",
              "Interference/clearance checks",
              "Motion simulation",
              "Exploded view + BOM with part numbers",
              "Assembly instructions document",
            ],
          },
          {
            name: "Enterprise",
            price: "$1,500",
            delivery: "7–14 days",
            deliverables: [
              "Full industrial machine or equipment skid",
              "Vendor-spec integration",
              "Nozzle/flange orientation",
              "Structural design overlay",
              "Complete file package per client drawing standard",
            ],
          },
        ],
      },
      {
        id: "4C",
        name: "2D Engineering Drawings & GD&T",
        tiers: [
          {
            name: "Starter",
            price: "$100",
            delivery: "1–3 days",
            deliverables: [
              "Single part drawing",
              "3 standard views + isometric",
              "Basic dims + tolerances per ASME Y14.5",
              "PDF + DXF delivery",
            ],
          },
          {
            name: "Professional",
            price: "$250",
            delivery: "2–5 days",
            deliverables: [
              "Multi-part drawing package",
              "Full GD&T per ASME Y14.5",
              "Surface finish callouts",
              "Assembly drawing + BOM",
              "Revision block",
            ],
          },
          {
            name: "Enterprise",
            price: "$800",
            delivery: "5–10 days",
            deliverables: [
              "Complete drawing package (10–50 sheets)",
              "Manufacturing-stamp ready",
              "ASME Y14.5-2018 compliant",
              "Weld symbols",
              "Client drawing standard compliance",
            ],
          },
        ],
      },
      {
        id: "4D",
        name: "FEA & Structural Simulation",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "3–5 days",
            deliverables: [
              "Single load case",
              "Von Mises stress contour",
              "Displacement plot",
              "Safety factor calculation",
              "1-page summary report",
            ],
          },
          {
            name: "Professional",
            price: "$800",
            delivery: "7–14 days",
            deliverables: [
              "Multiple load cases",
              "Assembly-level analysis",
              "Fatigue life estimation",
              "Mesh convergence study",
              "Full engineering report (10–20 pages)",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "14–30 days",
            deliverables: [
              "Thermal + structural coupled analysis",
              "Non-linear / large deformation",
              "ASME code-compliant reporting",
              "PE-stamp-ready documentation",
              "Design optimization recommendations",
            ],
          },
        ],
      },
      {
        id: "4E",
        name: "Engineering Code Calculations",
        intro:
          "Code-compliant calculations delivered fast — with referenced standards, documented inputs, and safety factors your reviewers won't question.",
        tiers: [
          {
            name: "Starter",
            price: "$200",
            delivery: "24–48 hrs",
            deliverables: [
              "1 focused calculation (bolt sizing, beam, bearing, or pump hydraulic)",
              "Excel/PDF deliverable",
              "Input variables documented",
              "Result with safety factor + code reference",
            ],
          },
          {
            name: "Professional",
            price: "$500",
            delivery: "3–7 days",
            deliverables: [
              "3–8 interdependent calculations",
              "Formatted engineering report",
              "Code references cited (ASME/AISC/API)",
              "Sensitivity analysis",
              "Design recommendations",
            ],
          },
          {
            name: "Enterprise",
            price: "$2,500",
            delivery: "7–21 days",
            deliverables: [
              "Complete basis of design",
              "10–50 calculation sheets",
              "PE stamp coordination support",
              "Code compliance checklist",
              "Client-editable Excel package",
            ],
          },
        ],
      },
      {
        id: "4F",
        name: "API 610/682 Rotating Equipment Engineering",
        customQuote: {
          copy: "Full pump specification packages, hydraulic sizing and curve analysis, mechanical seal system design (API 682), seal flush plans (Plan 11/21/32/53A), vendor TBE and API 610 compliance documentation. Entry reviews from $500. Project engineering from $2,500. Retainer and program engagements available for EPCs and owner-operators.",
          cta: "Request Scope",
        },
      },
      {
        id: "4G",
        name: "Pressure Vessel & Piping Engineering",
        intro:
          "ASME VIII and B31.3 calculations built for fabrication, review, and stamp — not just for show.",
        tiers: [
          {
            name: "Starter",
            price: "$400",
            delivery: "3–7 days",
            deliverables: [
              "Shell wall thickness (ASME VIII Div.1)",
              "Head selection",
              "Nozzle reinforcement check",
              "MAWP determination",
              "1-page calculation summary",
            ],
          },
          {
            name: "Professional",
            price: "$2,000",
            delivery: "2–4 weeks",
            deliverables: [
              "Full ASME VIII Div.1 design calcs",
              "All nozzle loads + reinforcement",
              "Support / saddle / skirt design",
              "Wind + seismic loading",
              "Stamped datasheet prep",
            ],
          },
          {
            name: "Enterprise",
            price: "$5,000",
            delivery: "4–8 weeks",
            deliverables: [
              "B31.3 piping stress analysis",
              "Flexibility / expansion loop design",
              "Support span calcs",
              "Vessel + piping system integration",
              "Isometric drawing package",
            ],
          },
        ],
      },
      {
        id: "4H",
        name: "P&ID Design & Process Engineering",
        intro:
          "ISA 5.1-compliant P&IDs built for HAZOP, handoff, and construction — from single loops to complete FEED packages.",
        tiers: [
          {
            name: "Starter",
            price: "$300",
            delivery: "3–5 days",
            deliverables: [
              "Single loop or unit operation",
              "ISA 5.1 symbology",
              "Editable PDF + source file",
              "Instrument tag list",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "5–14 days",
            deliverables: [
              "Multi-unit P&ID package",
              "Equipment numbering + tagging",
              "Line list generation",
              "HAZOP-ready format",
              "Control philosophy notes",
            ],
          },
          {
            name: "Enterprise",
            price: "$5,000",
            delivery: "2–6 weeks",
            deliverables: [
              "Complete FEED package",
              "Process flow diagrams + equipment specs",
              "HAZOP facilitation support",
              "Instrument index + line list",
              "Cause & effect matrix",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    shortName: "ML & Industrial AI",
    fullName: "ML, Data Science & Industrial AI",
    Icon: Brain,
    badge: "Category Exclusive",
    intro:
      "Predictive maintenance, quality control inspection, and industrial ML are niches no pure data scientist can credibly claim. API 610/682 credentials + 15 years of industrial equipment experience means we understand failure modes — not just the pixels.",
    services: [
      {
        id: "5A",
        name: "Machine Learning & Predictive Analytics",
        intro:
          "From raw data to a deployed model with a monitored API. Notable vertical: predictive maintenance for rotating equipment (pumps, compressors, motors) — $3,000–$12,000 per engagement, near-zero competition.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "5–10 days",
            deliverables: [
              "EDA + 1 ML model (classification or regression)",
              "Python / scikit-learn",
              "Performance report",
              "Jupyter notebook",
            ],
          },
          {
            name: "Professional",
            price: "$2,000",
            delivery: "14–21 days",
            deliverables: [
              "Full ML pipeline — data to model to API",
              "Model selection + tuning",
              "FastAPI endpoint",
              "Model monitoring",
              "Streamlit/React dashboard",
              "30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$6,000",
            delivery: "30–60 days",
            deliverables: [
              "Production ML system",
              "Deep learning (PyTorch / TensorFlow)",
              "Automated retraining pipeline",
              "A/B model testing",
              "MLflow / W&B tracking",
              "Full analytics dashboard",
              "60-day support",
            ],
          },
        ],
      },
      {
        id: "5B",
        name: "LLM Fine-Tuning & Prompt Engineering",
        intro:
          "A well-engineered prompt outperforms a poorly fine-tuned model every time. We do both — starting with what actually moves the needle for your use case.",
        tiers: [
          {
            name: "Starter",
            price: "$300",
            delivery: "3–7 days",
            deliverables: [
              "Custom system prompt engineering",
              "10 prompt variations for 1 use case",
              "Prompt testing + evaluation",
              "Prompt library PDF",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "10–21 days",
            deliverables: [
              "OpenAI fine-tune job",
              "Training dataset — 500 examples",
              "Fine-tuned model deployment",
              "Accuracy benchmark before/after",
              "API integration guide",
              "3 iterations + 30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$4,000",
            delivery: "21–45 days",
            deliverables: [
              "LoRA/QLoRA fine-tune (Llama 3 / Mistral)",
              "Custom training dataset — 1,000+ examples",
              "RLHF/DPO alignment",
              "Model evaluation suite",
              "Quantized deployment + inference API",
              "Full training report",
              "60-day support",
            ],
          },
        ],
      },
      {
        id: "5C",
        name: "Computer Vision & Industrial QC",
        intro:
          "Defect detection, object classification, and real-time inspection pipelines — built by someone who understands what a failure mode looks like in the real world.",
        tiers: [
          {
            name: "Starter",
            price: "$600",
            delivery: "7–14 days",
            deliverables: [
              "Pre-trained model (YOLO / ResNet)",
              "1 detection or classification use case",
              "Python OpenCV pipeline",
              "Accuracy report",
              "Jupyter + API endpoint",
            ],
          },
          {
            name: "Professional",
            price: "$2,500",
            delivery: "21–35 days",
            deliverables: [
              "Custom dataset training (YOLOv8)",
              "Data labeling guidance",
              "Full inference pipeline with real-time processing",
              "REST API endpoint",
              "Streamlit/React dashboard",
              "30-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$6,000",
            delivery: "45–75 days",
            deliverables: [
              "Full production CV system",
              "Custom model architecture",
              "Edge deployment (Jetson / Raspberry Pi)",
              "Real-time monitoring + model retraining pipeline",
              "Production line integration",
              "Full documentation + 60-day support",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    shortName: "Creative & Brand Design",
    fullName: "Creative & Brand Design",
    Icon: Palette,
    services: [
      {
        id: "6A",
        name: "Logo Design",
        intro:
          "A logo that works at 16px and on a billboard. Vector-native, brand-system ready.",
        tiers: [
          {
            name: "Starter",
            price: "$120",
            delivery: "2–3 days",
            deliverables: [
              "1 logo concept",
              "PNG + SVG",
              "Transparent background + B&W version",
              "2 revisions",
            ],
          },
          {
            name: "Professional",
            price: "$300",
            delivery: "3–4 days",
            deliverables: [
              "3 logo concepts",
              "All vector files (AI / EPS / SVG)",
              "Social media kit",
              "3D mockup",
              "Unlimited revisions",
            ],
          },
          {
            name: "Enterprise",
            price: "$800",
            delivery: "4–6 days",
            deliverables: [
              "5 concepts",
              "Full file package",
              "Color palette + typography system",
              "Brand guidelines PDF",
              "Business card + social templates",
            ],
          },
        ],
      },
      {
        id: "6B",
        name: "Full Brand Identity System",
        intro:
          "Everything a brand needs to look credible from day one — system-built, not cobbled together.",
        tiers: [
          {
            name: "Starter",
            price: "$800",
            delivery: "5–7 days",
            deliverables: [
              "Logo (primary + variations)",
              "Color palette + typography",
              "Brand style guide PDF (10–15 pages)",
              "Business card",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "7–10 days",
            deliverables: [
              "All Starter deliverables",
              "Email signature + letterhead",
              "Social media templates (5 formats)",
              "Secondary brand elements",
              "Brand voice guide",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "10–14 days",
            deliverables: [
              "Complete brand system",
              "Pattern/texture library + photography style guide",
              "Custom icon set",
              "Brand application mockups (10+)",
              "Full source files",
            ],
          },
        ],
      },
      {
        id: "6C",
        name: "Social Media Content Packs",
        intro:
          "On-brand, ready-to-post content built in bulk. Monthly retainer option available ($500–$1,200/month).",
        tiers: [
          {
            name: "Starter",
            price: "$100",
            delivery: "2–3 days",
            deliverables: [
              "5 custom branded posts",
              "3 story templates",
              "PNG delivery",
              "2 revisions",
            ],
          },
          {
            name: "Professional",
            price: "$350",
            delivery: "3–4 days",
            deliverables: [
              "12 posts + 8 stories + 2 reel covers",
              "Editable Canva files",
              "All platforms",
              "Content calendar",
              "Unlimited revisions",
            ],
          },
          {
            name: "Enterprise",
            price: "$750",
            delivery: "4–6 days",
            deliverables: [
              "20 posts + 12 stories + 4 reel covers",
              "12 highlight icons",
              "Source files + caption copy",
              "Full content calendar",
            ],
          },
        ],
      },
      {
        id: "6D",
        name: "AI Video Production",
        intro:
          "Scroll-stopping video content built with InVideo AI and ElevenLabs — scripted, voiced, branded, and delivered fast.",
        tiers: [
          {
            name: "Starter",
            price: "$300",
            delivery: "2–3 days",
            deliverables: [
              "1 × 30-second AI video",
              "Stock/AI visuals + AI voiceover",
              "Text overlays + branding",
              "1080p MP4 + 2 revisions",
            ],
          },
          {
            name: "Professional",
            price: "$800",
            delivery: "5–7 days",
            deliverables: [
              "3 × 30–60 sec videos",
              "AI scriptwriting + AI voiceover + music",
              "Captions/SRT + 3 custom thumbnails",
              "All platform cuts (16:9 / 9:16 / 1:1)",
              "3 revisions + 14-day support",
            ],
          },
          {
            name: "Enterprise",
            price: "$2,000",
            delivery: "14 days",
            deliverables: [
              "12-video campaign pack",
              "Full AI script suite",
              "ElevenLabs professional voiceover",
              "Full branding overlay across all videos",
              "Captions + SRT all formats + 12 thumbnails",
              "Content calendar + unlimited revisions",
            ],
          },
        ],
      },
      {
        id: "6E",
        name: "Faceless YouTube Channel Setup & Automation",
        intro:
          "A complete, monetization-ready YouTube channel — built, loaded with content, and wired to auto-post.",
        tiers: [
          {
            name: "Starter",
            price: "$500",
            delivery: "5–7 days",
            deliverables: [
              "Full channel setup",
              "3 faceless AI videos",
              "Thumbnail templates",
              "Basic SEO setup",
              "Content calendar",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "10–14 days",
            deliverables: [
              "Complete channel build",
              "8 SEO-optimized AI videos",
              "Title/description/tag system",
              "Custom thumbnail system",
              "Shorts strategy + 30-day posting schedule",
            ],
          },
          {
            name: "Enterprise",
            price: "$2,500",
            delivery: "14–21 days",
            deliverables: [
              "Full YouTube automation channel (scripted + voiced + edited + scheduled)",
              "12 videos",
              "Monetization path guide",
              "n8n auto-posting pipeline",
              "Analytics dashboard + 30-day support",
            ],
          },
        ],
      },
      {
        id: "6F",
        name: "UI/UX Design (Figma)",
        intro:
          "Dev-ready Figma files — not wireframe sketches. When Connor builds it, Fred designs it.",
        tiers: [
          {
            name: "Starter",
            price: "$600",
            delivery: "4–6 days",
            deliverables: [
              "Desktop + mobile frames",
              "3 core pages",
              "Figma editable file",
              "Interactive prototype",
              "Component library basics",
            ],
          },
          {
            name: "Professional",
            price: "$1,500",
            delivery: "7–10 days",
            deliverables: [
              "5–8 pages all devices",
              "Full design system (tokens + components)",
              "Figma with variants",
              "Dev-ready handoff + asset export",
              "3 revisions",
            ],
          },
          {
            name: "Enterprise",
            price: "$3,000",
            delivery: "10–14 days",
            deliverables: [
              "Full product design — unlimited pages",
              "Design system with all states",
              "User flow diagrams",
              "Prototype + usability notes",
              "Dev handoff to Connor's build",
            ],
          },
        ],
      },
      {
        id: "6G",
        name: "Motion Logo & Brand Animation",
        intro:
          "The static logo, animated. Broadcast-ready motion assets for every format your brand needs.",
        tiers: [
          {
            name: "Starter",
            price: "$200",
            delivery: "2–3 days",
            deliverables: [
              "Animated logo reveal (5 sec)",
              "MP4 + WEBM",
              "Transparent background version",
            ],
          },
          {
            name: "Professional",
            price: "$500",
            delivery: "3–5 days",
            deliverables: [
              "Animated logo + lower thirds + intro/outro bumper",
              "All formats",
              "2 style variations",
            ],
          },
          {
            name: "Enterprise",
            price: "$1,000",
            delivery: "5–8 days",
            deliverables: [
              "Full brand motion kit",
              "Animated logo + lower thirds + transitions + social animations + intro/outro",
              "All MP4/WEBM formats",
              "Complete brand motion package",
            ],
          },
        ],
      },
    ],
  },
];

const tierStyle = {
  Starter: {
    border: "border-white/10",
    badge: "bg-white/5 text-muted-foreground",
    price: "text-foreground",
    check: "text-blue",
  },
  Professional: {
    border: "border-blue/30",
    badge: "bg-blue/10 text-blue",
    price: "text-blue",
    check: "text-blue",
  },
  Enterprise: {
    border: "border-gold/40",
    badge: "bg-gold/10 text-gold",
    price: "text-gold",
    check: "text-gold",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Services() {
  const [activePillar, setActivePillar] = useState(0);
  const [openServices, setOpenServices] = useState<Set<string>>(
    new Set([PILLARS[0].services[0].id])
  );

  const toggleService = (id: string) => {
    setOpenServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectPillar = (index: number) => {
    setActivePillar(index);
    setOpenServices(new Set([PILLARS[index].services[0].id]));
  };

  const pillar = PILLARS[activePillar];

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light/50 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Full Service Menu
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            What We Build
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Five pillars. Every deliverable, price, and timeline — no ambiguity, no surprises.
          </p>
        </motion.div>

        {/* Pillar Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {PILLARS.map((p, i) => {
            const Icon = p.Icon;
            const active = activePillar === i;
            return (
              <button
                key={p.id}
                onClick={() => selectPillar(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-gold text-navy shadow-lg"
                    : "bg-navy-light/60 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-navy-light"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{p.shortName}</span>
                {p.badge && (
                  <span
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                      active ? "bg-navy/20 text-navy" : "bg-gold/10 text-gold"
                    }`}
                  >
                    ★
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Pillar Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${pillar.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-8"
          >
            <div className={`flex items-center gap-3 ${pillar.intro ? "mb-4" : ""}`}>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                {pillar.fullName}
              </h3>
              {pillar.badge && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold/10 text-gold border border-gold/20">
                  <Star className="w-3 h-3 fill-gold" />
                  {pillar.badge}
                </span>
              )}
            </div>
            {pillar.intro && (
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-3xl border-l-2 border-gold/30 pl-4">
                {pillar.intro}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Services */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`services-${pillar.id}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {pillar.services.map((svc) => {
              const isOpen = openServices.has(svc.id);
              return (
                <motion.div key={svc.id} variants={itemVariants}>
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleService(svc.id)}
                    className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-navy-light/60 border border-white/10 hover:border-gold/20 transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gold/50 w-7 shrink-0">
                        {svc.id}
                      </span>
                      <span className="text-base font-semibold text-foreground group-hover:text-gold transition-colors">
                        {svc.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Tier Cards */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3">
                          {svc.intro && (
                            <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                              {svc.intro}
                            </p>
                          )}
                          {svc.customQuote ? (
                            <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-navy-light to-navy-light/50 border border-gold/20">
                              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                                {svc.customQuote.copy}
                              </p>
                              <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
                              >
                                {svc.customQuote.cta}
                              </a>
                            </div>
                          ) : (
                            <div className="grid md:grid-cols-3 gap-4">
                              {svc.tiers!.map((tier) => {
                                const s = tierStyle[tier.name];
                                const isEnterprise = tier.name === "Enterprise";
                                return (
                                  <div
                                    key={tier.name}
                                    className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.015] ${s.border} ${
                                      isEnterprise
                                        ? "bg-gradient-to-br from-navy-light to-gold/5"
                                        : "bg-navy-light"
                                    }`}
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
                                          <Check
                                            className={`w-4 h-4 mt-0.5 shrink-0 ${s.check}`}
                                          />
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          All prices reflect current project availability. Contact us for retainer, enterprise, and volume pricing.
        </p>
      </div>
    </section>
  );
}
