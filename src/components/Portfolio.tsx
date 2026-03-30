"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            Our Work
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From AI platforms and engineering systems to brand identities and video campaigns — see the full range of what Leadership Legacy builds.
          </p>
          <div className="mt-12">
            <a
              href="https://leadershiplegacydigital.my.canva.site/main-leadership-legacy-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gold text-navy text-xl font-bold hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View Full Portfolio
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
