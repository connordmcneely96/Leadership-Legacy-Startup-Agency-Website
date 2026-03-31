"use client";

import { motion } from "framer-motion";
import { Cpu, Palette } from "lucide-react";

const founders = [
  {
    name: "Connor McNeely",
    role: "Technical Lead — AI Development & Engineering",
    icon: Cpu,
    bio: "5+ years mechanical engineering delivering API 610/682 rotating equipment projects for Tesla, Pfizer, and John Deere. Full-stack AI developer — LangGraph, Claude API, Cloudflare Workers/D1/R2/KV, React/Next.js, RAG, and multi-agent systems. Creator of OpenClaw, a live multi-agent AI outbound system. Competitive natural bodybuilder — the engineer who can also build your AI fitness platform from the inside.",
    tags: [
      "LangGraph",
      "Claude API",
      "Cloudflare Edge",
      "RAG",
      "OpenClaw Creator",
      "API 610/682",
    ],
  },
  {
    name: "Fred Williams",
    role: "Creative Lead — Brand & Design Direction",
    icon: Palette,
    bio: "Brand identity, logo design, UI/UX, motion graphics, and AI video production. Portfolio includes New Iberia Church of Christ, Southern Pets Animal Rescue, and the Leadership Legacy brand system. Fred turns technical capability into visual credibility — the design layer that makes a great AI system trustworthy to the people who need to use it.",
    tags: [
      "Brand Identity",
      "Logo Design",
      "UI/UX",
      "Motion Graphics",
      "AI Video",
    ],
  },
];

const unfairAdvantages = [
  {
    number: "01",
    title: "Fitness + AI",
    headline:
      "The only team combining competitive natural bodybuilding with AI SaaS development.",
    body: "AI Fitness Coaching Platforms command $10K–$80K. We build them from the inside — not as consultants guessing at the domain, but as practitioners who live it. No one else can do this.",
  },
  {
    number: "02",
    title: "CAD + AI Video",
    headline:
      "A 5+-year mechanical engineer who also produces AI video.",
    body: "We take your SolidWorks files and deliver professional narrated product demos in 2 weeks. This combination does not exist anywhere else — not on any platform.",
  },
  {
    number: "03",
    title: "Cloudflare + AI",
    headline:
      "We build AI applications on Cloudflare's edge infrastructure.",
    body: "60–80% lower infrastructure cost than AWS at scale. Enterprise AI performance at startup prices. Your competitors are overpaying. You don't have to.",
  },
];

const liveWork = [
  {
    name: "MechAssist AI",
    category: "RAG System · Mechanical Engineering",
    tag: "AI Dev",
  },
  {
    name: "AI Meal Planner",
    category: "SaaS · Stripe · Cloudflare",
    tag: "AI SaaS",
  },
  {
    name: "Evergrow Landscaping",
    category: "Lead Gen · CRM · Apollo Automation",
    tag: "Automation",
  },
  {
    name: "New Iberia Church of Christ",
    category: "Full Brand · Website",
    tag: "Creative",
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
              Two founders with rare, non-overlapping skill sets — combined
              under one agency roof.
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

        {/* Unfair Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              Why We Win
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold">
              Three Unfair Advantages
            </h2>
            <p className="mt-4 text-muted-foreground">
              Combinations that don&apos;t exist at any other agency — on any platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {unfairAdvantages.map((adv, index) => (
              <motion.div
                key={adv.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative p-8 rounded-3xl bg-navy-light/40 border border-white/5 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="absolute top-0 left-8 w-px h-8 bg-gradient-to-b from-gold to-transparent" />
                <span className="text-4xl font-serif font-semibold text-gold/20 select-none">
                  {adv.number}
                </span>
                <div className="mt-3 mb-3">
                  <span className="text-xs font-medium text-gold uppercase tracking-wider">
                    {adv.title}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground leading-snug mb-3">
                  {adv.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {adv.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission + Live Work */}
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
                Most agencies hand you deliverables. We hand you systems that
                compound. Every engagement is architected to keep earning —
                through automation, better data, and infrastructure that scales
                without proportional cost.
              </p>
              <p>
                <span className="text-foreground font-medium">
                  Leadership Legacy Digital
                </span>{" "}
                exists because the agencies that could build serious AI systems
                couldn&apos;t design, and the design shops couldn&apos;t
                engineer. We closed that gap.
              </p>
              <p>
                Our name is intentional:{" "}
                <span className="text-gold">Leadership</span> in helping you
                adopt AI strategically, and{" "}
                <span className="text-gold">Legacy</span> in building durable
                systems that compound in value over time.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-navy/50 border border-gold/20">
              <p className="text-sm text-gold font-medium mb-2">Our Standard</p>
              <p className="text-foreground">
                Production-grade or it doesn&apos;t ship. Every system is built
                to run in the real world — not to demo well in a slide deck.
              </p>
            </div>
          </motion.div>

          {/* Right - Live Work */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Live Work
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Systems we&apos;ve shipped — not mockups.
            </p>
            <div className="space-y-4">
              {liveWork.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-center justify-between gap-4 p-5 rounded-xl bg-navy-light/30 border border-white/5 hover:border-gold/10 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-foreground group-hover:text-gold transition-colors">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {project.category}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs px-3 py-1 rounded-full bg-gold/5 border border-gold/15 text-gold/80">
                    {project.tag}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://leadershiplegacydigital.my.canva.site/main-leadership-legacy-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold hover:text-gold-light transition-colors underline underline-offset-4"
              >
                View full portfolio →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
