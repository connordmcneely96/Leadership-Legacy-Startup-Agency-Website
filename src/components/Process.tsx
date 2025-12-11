"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  FileText, 
  Hammer, 
  Rocket,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
  Shield
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Discovery Call",
    description: "We start with a focused conversation to understand your goals, challenges, and vision. No pressure, no commitment—just clarity.",
    details: [
      "Understand your business objectives",
      "Identify AI opportunities",
      "Assess technical requirements",
      "Establish success metrics"
    ],
  },
  {
    number: "02",
    icon: FileText,
    title: "Proposal & SOW",
    description: "You receive a detailed proposal with scope, timeline, deliverables, and pricing. Everything formalized in a clear Statement of Work.",
    details: [
      "Detailed scope document",
      "Fixed timeline & milestones",
      "Transparent pricing",
      "NDA for confidentiality"
    ],
  },
  {
    number: "03",
    icon: Hammer,
    title: "Build & Iteration",
    description: "We build in focused sprints with regular check-ins. You see progress frequently and can provide feedback along the way.",
    details: [
      "Daily async updates",
      "Weekly video check-ins",
      "Iterative development",
      "Quality assurance testing"
    ],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Handover",
    description: "Your system goes live with thorough documentation, training, and a smooth handover process. No black boxes.",
    details: [
      "Production deployment",
      "Documentation & guides",
      "Team training session",
      "Knowledge transfer"
    ],
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "We don't disappear after launch. Optional retainer packages for maintenance, updates, and continued optimization.",
    details: [
      "Bug fixes & maintenance",
      "Performance monitoring",
      "Feature enhancements",
      "Priority support access"
    ],
  },
];

const trustSignals = [
  { icon: MessageSquare, label: "Clear Communication" },
  { icon: CheckCircle2, label: "QA Standards" },
  { icon: Shield, label: "Risk Reversal Guarantee" },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light" />
      
      {/* Decorative Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

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
            How We Work
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            A Clear, Structured Engagement Process
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            No surprises, no scope creep. Every engagement follows a proven process 
            designed for transparency and results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative space-y-8 lg:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              } ${index !== steps.length - 1 ? "pb-8 lg:pb-16" : ""}`}
            >
              {/* Content Side */}
              <div className={index % 2 === 1 ? "lg:order-2 lg:text-right" : ""}>
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="text-4xl font-serif font-bold text-gold/30">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Details Card */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="p-6 rounded-2xl bg-navy-light/50 border border-white/5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    What happens
                  </p>
                  <div className="space-y-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        <span className="text-sm text-foreground/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Dot (Desktop) */}
              <div className="hidden lg:block absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-navy" />
            </motion.div>
          ))}
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-8 rounded-2xl bg-gold/5 border border-gold/20"
        >
          <span className="text-gold font-medium">Every engagement includes:</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-2">
                <signal.icon className="w-5 h-5 text-gold" />
                <span className="text-sm text-foreground">{signal.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

