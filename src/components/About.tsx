"use client";

import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Handshake,
  Shield,
  TrendingUp,
  Cpu,
  Palette,
} from "lucide-react";

const values = [
  {
    icon: Target,
    name: "Excellence",
    description: "Production-grade solutions, not prototypes. We ship work that is ready for real business operations.",
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    description: "Staying at the cutting edge of AI so you don't have to. We bring the latest capabilities to your business.",
  },
  {
    icon: Handshake,
    name: "Partnership",
    description: "Your success is our success metric. We measure our work by the outcomes you achieve.",
  },
  {
    icon: Shield,
    name: "Integrity",
    description: "Honest communication and realistic delivery. We tell you what's possible—and what isn't.",
  },
  {
    icon: TrendingUp,
    name: "Impact",
    description: "Measurable business outcomes over technical novelty. Every solution is tied to real ROI.",
  },
];

const founders = [
  {
    name: "Connor McNeely",
    role: "Co-Founder — AI Development & Engineering",
    icon: Cpu,
    bio: "Mechanical engineer, AI developer, and 15-year elite competitive bodybuilder. Connor leads all technical delivery across AI systems, SaaS platforms, CAD engineering, and the agency's proprietary AI fitness and body composition platforms — service categories where Leadership Legacy has no direct competition.",
    tags: ["AI Development", "CAD Engineering", "SaaS Architecture", "Fitness AI"],
  },
  {
    name: "Fred Williams",
    role: "Co-Founder — Brand & Creative Direction",
    icon: Palette,
    bio: "Brand designer with a sharp eye for identity systems that convert. Fred leads all creative output — brand identities, website design, video production, and the visual language that makes Leadership Legacy's client work impossible to ignore.",
    tags: ["Brand Identity", "Website Design", "Video Production", "Creative Strategy"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              The Team
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold">
              Built by Operators, Not Generalists
            </h2>
            <p className="mt-4 text-muted-foreground">
              Two founders with rare, non-overlapping skill sets — combined under one agency roof.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {founders.map((founder, index) => {
              const Icon = founder.icon;
              return (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="p-8 rounded-3xl bg-navy-light/40 border border-white/5 hover:border-gold/15 transition-all duration-300"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {founder.name}
                      </h3>
                      <p className="text-sm text-gold mt-0.5">{founder.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {founder.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-gold/5 border border-gold/15 text-gold/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission + Values */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              About Leadership Legacy
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold mb-6">
              Building Systems That Outlast Any Single Project
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The AI revolution is transforming how businesses operate. But while
                enterprises have armies of engineers building custom AI solutions,
                most organizations are being left behind — stuck with generic tools
                that don&apos;t fit their unique needs.
              </p>
              <p>
                <span className="text-foreground font-medium">Leadership Legacy Digital</span> was
                founded to change that. We combine deep technical AI development with
                precision brand design to deliver complete, production-ready systems —
                from AI agents and SaaS platforms to CAD engineering, fitness AI, and
                full brand identities.
              </p>
              <p>
                Our name reflects our mission:{" "}
                <span className="text-gold">Leadership</span> in helping you adopt AI
                strategically, and <span className="text-gold">Legacy</span> in building
                durable systems that compound in value over time.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-navy/50 border border-gold/20">
              <p className="text-sm text-gold font-medium mb-2">Our Mission</p>
              <p className="text-foreground">
                Empower businesses to harness AI and modern technology to automate
                workflows, unlock insights from data, and build durable competitive advantages.
              </p>
            </div>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-8">
              What Guides Us
            </h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 p-5 rounded-xl bg-navy-light/30 border border-white/5 hover:border-gold/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shrink-0 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                    <value.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{value.name}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
