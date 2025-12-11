"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  LayoutDashboard, 
  Laptop,
  Zap,
  Palette,
  Code2
} from "lucide-react";

const offerings = [
  {
    icon: Globe,
    title: "AI-Powered Web Apps & SaaS MVPs",
    description: "Full-stack web applications with AI capabilities baked in from day one. From intelligent dashboards to AI-assisted workflows.",
    features: ["Next.js & React", "AI integrations", "Production-ready code"],
  },
  {
    icon: LayoutDashboard,
    title: "Conversion-Focused Landing Pages",
    description: "High-performance landing pages designed to convert. Clean, fast, and optimized for your growth objectives.",
    features: ["Mobile-first design", "SEO optimized", "Analytics ready"],
  },
  {
    icon: Laptop,
    title: "Internal Tools & Dashboards",
    description: "Custom internal tools and admin dashboards that streamline operations and surface AI-powered insights for your team.",
    features: ["Real-time data", "Role-based access", "Custom workflows"],
  },
];

const capabilities = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: Palette, label: "Modern Design" },
  { icon: Code2, label: "Clean Code" },
];

export default function WebDevelopment() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-sm font-medium text-blue uppercase tracking-wider">
            Web & Product Development
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Ship Products That <span className="text-blue">Think</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We don&apos;t just build websites—we build intelligent digital products 
            where AI and exceptional UX work together to drive results.
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-navy/50 border border-white/5 hover:border-blue/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue/20 to-blue/5 flex items-center justify-center mb-6 group-hover:from-blue/30 group-hover:to-blue/10 transition-colors">
                <offering.icon className="w-7 h-7 text-blue" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {offering.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {offering.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {offering.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs font-medium text-blue/80 bg-blue/10 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Capabilities Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-12 rounded-2xl bg-navy-light/50 border border-white/5"
        >
          <span className="text-muted-foreground text-sm">
            Every project ships with:
          </span>
          <div className="flex items-center gap-8">
            {capabilities.map((cap) => (
              <div key={cap.label} className="flex items-center gap-2">
                <cap.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-foreground">{cap.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

