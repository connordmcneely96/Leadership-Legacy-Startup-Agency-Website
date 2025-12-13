"use client";

import { motion, type Variants } from "framer-motion";
import { 
  Database, 
  Bot, 
  Brain, 
  Cloud,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Database,
    title: "RAG Knowledge Bases",
    tagline: "Chat with your documents",
    description: "Build intelligent knowledge bases that let your team and customers query internal documents, policies, and data using natural language.",
    outcomes: [
      "Reduce support ticket volume by 40%",
      "Cut document search time from hours to seconds",
      "Enable 24/7 self-service information access"
    ],
    color: "gold",
  },
  {
    icon: Bot,
    title: "AI Workflow Agents",
    tagline: "Automate business processes",
    description: "Deploy autonomous AI agents that handle lead qualification, support triage, reporting, and other repetitive workflows with human-level intelligence.",
    outcomes: [
      "Automate 80% of repetitive tasks",
      "Qualify leads 24/7 without human intervention",
      "Generate reports and insights on demand"
    ],
    color: "blue",
  },
  {
    icon: Brain,
    title: "LLM Fine-Tuning",
    tagline: "Custom models for your brand",
    description: "Train language models on your unique data to capture brand voice, domain expertise, and institutional knowledge for consistent, on-brand AI outputs.",
    outcomes: [
      "90%+ brand voice consistency",
      "Domain-specific accuracy improvements",
      "Reduced hallucination rates"
    ],
    color: "gold",
  },
  {
    icon: Cloud,
    title: "AWS Bedrock & Enterprise AI",
    tagline: "Scalable, secure infrastructure",
    description: "Implement enterprise-grade AI infrastructure on AWS Bedrock with proper security, compliance, and scalability for production workloads.",
    outcomes: [
      "SOC 2 and HIPAA-compliant deployments",
      "99.9% uptime SLA guarantee",
      "Seamless scaling from MVP to millions of users"
    ],
    color: "blue",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light/50 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Flagship Services
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            AI Systems We Build
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Production-grade AI solutions that deliver measurable business outcomes—not experiments or prototypes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-navy-light to-navy-light/50 border border-white/5 hover:border-gold/20 transition-all duration-500">
                {/* Icon & Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    service.color === "gold" 
                      ? "bg-gradient-to-br from-gold/20 to-gold/5" 
                      : "bg-gradient-to-br from-blue/20 to-blue/5"
                  }`}>
                    <service.icon className={`w-8 h-8 ${service.color === "gold" ? "text-gold" : "text-blue"}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className={`text-sm font-medium ${service.color === "gold" ? "text-gold" : "text-blue"}`}>
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Outcomes */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Expected Outcomes
                  </p>
                  {service.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${service.color === "gold" ? "text-gold" : "text-blue"}`} />
                      <span className="text-sm text-foreground/80">{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className={`w-6 h-6 ${service.color === "gold" ? "text-gold" : "text-blue"}`} />
                </div>

                {/* Subtle Glow on Hover */}
                <div className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                  service.color === "gold" ? "glow-gold" : "glow-blue"
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

