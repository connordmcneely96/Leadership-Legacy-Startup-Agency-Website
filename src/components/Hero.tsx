"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Database, Workflow, MessageSquare } from "lucide-react";
import Link from "next/link";

const floatingCards = [
  {
    icon: Bot,
    title: "AI Agent",
    subtitle: "Lead Qualification",
    position: "top-8 right-8",
    delay: 0.8,
  },
  {
    icon: Database,
    title: "RAG System",
    subtitle: "Knowledge Base",
    position: "top-32 right-48",
    delay: 1.0,
  },
  {
    icon: Workflow,
    title: "Automation",
    subtitle: "Workflow Engine",
    position: "bottom-32 right-16",
    delay: 1.2,
  },
  {
    icon: MessageSquare,
    title: "Chat Interface",
    subtitle: "Document Q&A",
    position: "bottom-8 right-56",
    delay: 1.4,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue/5 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-light border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-muted-foreground">
                AI-First Digital Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold leading-[1.1] tracking-tight"
            >
              AI-First Digital Solutions That Build Your{" "}
              <span className="gradient-text">Competitive Legacy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              We build intelligent systems, AI agents, and AI-powered web applications 
              that turn innovation into measurable business outcomes—not just prototypes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-all hover:gap-3"
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground border border-white/20 rounded-full hover:bg-white/5 transition-colors"
              >
                View Services
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-8 flex items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>Production-Grade AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>Enterprise-Ready</span>
              </div>
              <div className="flex items-center gap-2 hidden sm:flex">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>Outcome-Focused</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual - Floating Cards */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue/10 rounded-full blur-[80px]" />

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: card.delay,
                  ease: "easeOut",
                }}
                className={`absolute ${card.position}`}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  className="glass rounded-2xl p-5 hover:border-gold/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                      <card.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Connection Lines (Decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                d="M 200 100 Q 250 200 180 300"
                stroke="url(#gradient)"
                strokeWidth="1"
                fill="none"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.7 }}
                d="M 300 150 Q 250 250 320 350"
                stroke="url(#gradient)"
                strokeWidth="1"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#3498DB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

