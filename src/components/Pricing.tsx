"use client";

import { motion } from "framer-motion";
import { Bot, Rocket, Dumbbell, Wrench, Palette, ArrowRight, Star, FileText } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Bot,
    name: "AI Development & Automation",
    description: "Chatbots, AI agents, outbound sales systems, workflow automation, and GoHighLevel integrations.",
    startingAt: "$300",
    range: "Projects from $300 – $8,000+",
    color: "gold",
  },
  {
    icon: Rocket,
    name: "AI SaaS & Web Applications",
    description: "Full-stack SaaS MVPs, RAG knowledge bases, AI voice agents, and Cloudflare edge infrastructure.",
    startingAt: "$800",
    range: "Projects from $800 – $20,000+",
    color: "blue",
  },
  {
    icon: Dumbbell,
    name: "AI Fitness & Body Composition",
    description: "End-to-end AI coaching platforms and body composition systems. No direct competition exists.",
    startingAt: "$5,000",
    range: "Projects from $5,000 – $40,000+",
    badge: "Category Exclusive",
    color: "gold",
  },
  {
    icon: Wrench,
    name: "CAD Engineering & AI Video",
    description: "CAD modeling, engineering drawings, FEA simulation, product demo videos, and API 610/682 packages.",
    startingAt: "$100",
    range: "Projects from $100 – $4,000+",
    badge: "Category Exclusive",
    color: "blue",
  },
  {
    icon: Palette,
    name: "Creative & Brand Design",
    description: "AI video production, YouTube automation, brand identity systems, and full website development.",
    startingAt: "$300",
    range: "Projects from $300 – $3,000+",
    color: "gold",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />

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
            Investment
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Transparent Pricing, No Guesswork
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every service has fixed Starter, Professional, and Enterprise tiers with exact pricing. View the full breakdown in our Services section above.
          </p>
        </motion.div>

        {/* Pillar Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative p-6 rounded-2xl bg-navy-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300 group"
              >
                {pillar.badge && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                    <Star className="w-2.5 h-2.5 text-gold fill-gold" />
                    <span className="text-xs font-bold text-gold">{pillar.badge}</span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  pillar.color === "gold"
                    ? "bg-gradient-to-br from-gold/20 to-gold/5 group-hover:from-gold/30 group-hover:to-gold/10"
                    : "bg-gradient-to-br from-blue/20 to-blue/5 group-hover:from-blue/30 group-hover:to-blue/10"
                }`}>
                  <Icon className={`w-6 h-6 ${pillar.color === "gold" ? "text-gold" : "text-blue"}`} />
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 pr-16">
                  {pillar.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mb-1">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                  <div className={`text-2xl font-bold ${pillar.color === "gold" ? "text-gold" : "text-blue"}`}>
                    {pillar.startingAt}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{pillar.range}</p>
              </motion.div>
            );
          })}
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
                Every engagement begins with a discovery call. We&apos;ll discuss your goals,
                confirm the right tier for your scope, and formalize everything in a clear Statement of Work.
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
          <div className="absolute -inset-px rounded-3xl glow-gold opacity-30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
