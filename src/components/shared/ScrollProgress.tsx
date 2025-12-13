"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Clay-inspired Scroll Progress Indicator
 * Shows reading progress at the top of the page
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
