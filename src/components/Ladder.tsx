"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { rungs } from "@/lib/ladder";

export default function Ladder() {
  return (
    <section id="ladder" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Ways to work with us
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Start free. Go as far as you need.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Five steps, smallest first. Use the free tools, try the workspace,
            or hand us the whole build. You choose where to stop.
          </p>
        </motion.div>

        <ol className="grid gap-4 lg:grid-cols-5">
          {rungs.map((rung, index) => (
            <motion.li
              key={rung.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="flex flex-col p-6 rounded-2xl bg-navy-light/50 border border-white/5 hover:border-gold/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-sm text-gold">
                  Step {rung.step}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    rung.status === "live"
                      ? "text-gold border-gold/30 bg-gold/10"
                      : "text-muted-foreground border-white/15"
                  }`}
                >
                  {rung.status === "live" ? "Available" : "In preparation"}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {rung.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {rung.summary}
              </p>
              <Link
                href={rung.href}
                className="group mt-5 inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gold hover:text-gold-light transition-colors"
              >
                {rung.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
