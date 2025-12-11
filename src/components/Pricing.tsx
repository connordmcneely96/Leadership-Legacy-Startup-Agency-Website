"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Bot, 
  Globe, 
  Layout,
  ArrowRight,
  FileText
} from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    icon: Database,
    name: "RAG Knowledge Bases",
    description: "Private AI chatbot that answers questions from your documents",
    startingAt: "$1,500",
    note: "Typical projects: $1.5k – $4k",
  },
  {
    icon: Bot,
    name: "AI Workflow Agents",
    description: "Autonomous agents for lead qualification, support, and reporting",
    startingAt: "$1,200",
    note: "Typical projects: $1.2k – $3.5k",
  },
  {
    icon: Globe,
    name: "AI-Powered Web Apps",
    description: "Full-stack applications with integrated AI capabilities",
    startingAt: "$2,000",
    note: "Typical projects: $2k – $6k+",
  },
  {
    icon: Layout,
    name: "Landing Pages",
    description: "High-converting landing pages optimized for growth",
    startingAt: "$280",
    note: "Typical projects: $280 – $1.1k",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Investment
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Transparent Pricing, Custom Scope
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every project is unique. These ranges give you a sense of investment levels—
            your proposal will include exact pricing based on your specific requirements.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-navy-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                <tier.icon className="w-6 h-6 text-gold" />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className="text-xs text-muted-foreground">Starting at</span>
                <div className="text-2xl font-semibold text-gold">
                  {tier.startingAt}
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-muted-foreground">
                {tier.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-navy-light to-navy border border-white/5"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-4">
                Ready to scope your project?
              </h3>
              <p className="text-muted-foreground mb-6">
                Every engagement begins with a discovery call. We&apos;ll discuss your 
                goals, assess feasibility, and prepare a detailed proposal with 
                exact pricing—all formalized in a clear Statement of Work.
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <FileText className="w-5 h-5 text-gold" />
                <span>Detailed SOW included with every proposal</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-all"
              >
                Request a Scoped Proposal
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -inset-px rounded-3xl glow-gold opacity-30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

