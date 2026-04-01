"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

const retainers = [
  {
    name: "AI Chatbot Maintenance",
    price: "$150–$500",
    unit: "/ month · per bot",
    description:
      "Model updates, prompt tuning, new conversation flows, uptime monitoring.",
  },
  {
    name: "Business Automation Monitoring",
    price: "$150–$400",
    unit: "/ month · per workflow system",
    description: null,
  },
  {
    name: "AI Sales System Management",
    price: "$1,500–$3,000",
    unit: "/ month",
    description: "Sequence optimization, list refresh, reply analysis.",
  },
  {
    name: "CAD Design Support",
    price: "$500–$2,000",
    unit: "/ month",
    description: "Ongoing drawing, modeling, and engineering support.",
  },
  {
    name: "CAD-to-AI Video Content Series",
    price: "$1,500–$5,000",
    unit: "/ month",
    description: "Monthly technical video content, product updates.",
  },
  {
    name: "Monthly Social Media Content",
    price: "$500–$1,200",
    unit: "/ month",
    description: "Branded post packs, stories, reel covers.",
  },
  {
    name: "RAG Pipeline Maintenance",
    price: "$300–$500",
    unit: "/ month",
    description: "Document sync, ingestion updates, accuracy monitoring.",
  },
  {
    name: "SaaS Growth Retainer",
    price: "$2,000–$5,000",
    unit: "/ month",
    description:
      "Post-launch optimization, feature additions, performance improvements.",
  },
];

export default function RetainerServices() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-gold" />
            </div>
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              Ongoing Engagements
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-6">
            Ongoing Support &amp; Retainer Services
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every project we deliver includes a retainer option. Most clients
            find more value in ongoing support than one-time delivery. Ask us
            about retainer pricing at the time of project delivery.
          </p>
        </motion.div>

        {/* Retainer List */}
        <div className="space-y-px">
          {retainers.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6 rounded-2xl hover:bg-navy-light/40 border border-transparent hover:border-gold/10 transition-all duration-300">
                {/* Left — name + description */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right — price */}
                <div className="shrink-0 sm:text-right">
                  <span className="text-xl font-bold text-gold">
                    {item.price}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {item.unit}
                  </span>
                </div>
              </div>

              {/* Divider */}
              {index < retainers.length - 1 && (
                <div className="mx-6 h-px bg-white/5" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 lg:p-8 rounded-3xl bg-navy-light/30 border border-gold/15"
        >
          <div>
            <p className="text-base font-semibold text-foreground">
              Ready to discuss an ongoing engagement?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Retainer terms are custom to each client. We&apos;ll structure
              something that actually makes sense for your workflow.
            </p>
          </div>
          <Link
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-full bg-gold text-navy text-sm font-semibold hover:bg-gold-light transition-colors"
          >
            Book a Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
