"use client";

import { motion } from "framer-motion";
import { Rocket, Briefcase, TrendingUp, ShoppingCart, GraduationCap } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "SaaS & Tech Startups",
    description: "Build AI-powered MVPs, automate onboarding flows, and create intelligent product features that differentiate you in the market.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Legal, healthcare, and finance firms use our RAG systems to unlock insights from documents and automate compliance workflows.",
  },
  {
    icon: TrendingUp,
    title: "Sales & Marketing Teams",
    description: "Deploy AI agents for lead qualification, personalized outreach, and intelligent CRM automation that scales your team's impact.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    description: "Implement AI-powered product recommendations, inventory forecasting, and customer support chatbots that drive conversions.",
  },
  {
    icon: GraduationCap,
    title: "Coaches & Consultants",
    description: "Transform your expertise into scalable AI-powered courses, knowledge bases, and client delivery systems.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function WhoWeHelp() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light" />
      
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
            Who We Serve
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold">
            AI Solutions for Every Industry
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We partner with ambitious organizations ready to leverage AI for real competitive advantage.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {audiences.map((audience) => (
            <motion.div
              key={audience.title}
              variants={itemVariants}
              className="group relative p-6 lg:p-8 rounded-2xl bg-navy-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                <audience.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {audience.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {audience.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

