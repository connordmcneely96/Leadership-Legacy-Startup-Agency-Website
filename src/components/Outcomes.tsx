"use client";

import { motion } from "framer-motion";
import { 
  TrendingDown, 
  Clock, 
  Zap, 
  Users
} from "lucide-react";

const outcomes = [
  {
    icon: TrendingDown,
    metric: "40%",
    label: "Average Reduction",
    description: "in support ticket volume with RAG-powered knowledge bases",
  },
  {
    icon: Clock,
    metric: "4 weeks",
    label: "Typical Timeline",
    description: "from kickoff to production-ready AI MVP deployment",
  },
  {
    icon: Zap,
    metric: "80%",
    label: "Task Automation",
    description: "of repetitive workflows automated with AI agents",
  },
  {
    icon: Users,
    metric: "24/7",
    label: "Availability",
    description: "AI systems that work around the clock for your business",
  },
];

export default function Outcomes() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-light" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

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
            Results That Matter
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold">
            Real Outcomes, Not Promises
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our clients measure success in business impact—not vanity metrics.
          </p>
        </motion.div>

        {/* Outcomes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-navy/50 border border-white/5 text-center group hover:border-gold/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                <outcome.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Metric */}
              <div className="text-4xl lg:text-5xl font-serif font-bold gradient-text mb-2">
                {outcome.metric}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-foreground mb-2">
                {outcome.label}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by forward-thinking organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            {/* Placeholder for future client logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 h-8 rounded bg-white/10"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

