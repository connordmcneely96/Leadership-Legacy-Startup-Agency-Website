"use client";

import { motion } from "framer-motion";

export default function Presentation() {
  return (
    <section id="presentation" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Our Vision
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            The Leadership Legacy Story
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Explore our approach, mission, and the systems we build to empower
            organizations for the long term.
          </p>
        </motion.div>

        {/* Embedded Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src="https://www.canva.com/design/DAHCYXKxL9c/zgr-EGyapeIxNiuVle-4Zg/view?embed"
            title="Leadership Legacy Presentation"
            allowFullScreen
            allow="fullscreen"
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        </motion.div>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-center text-xs text-muted-foreground"
        >
          Presentation created with{" "}
          <a
            href="https://www.canva.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Canva
          </a>
        </motion.p>
      </div>
    </section>
  );
}
