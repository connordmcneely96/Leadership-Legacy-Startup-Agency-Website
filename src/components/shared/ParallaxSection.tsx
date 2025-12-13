"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Clay-inspired Parallax Section
 * Elements move at different speeds on scroll for depth
 */
export default function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to Y position
  // speed of 0.5 means element moves half as fast as scroll
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`parallax-container ${className}`}>
      <motion.div style={{ y }} className="parallax-element">
        {children}
      </motion.div>
    </div>
  );
}
