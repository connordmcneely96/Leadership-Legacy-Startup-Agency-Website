// Clay-Inspired Animation Utilities for Leadership Legacy
// Premium animation helpers using Framer Motion

import { Variants, Transition } from "framer-motion";

// ================================
// Premium Easing Functions
// ================================

export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  spring: [0.175, 0.885, 0.32, 1.275],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.68, -0.6, 0.32, 1.6],
} as const;

export const transitions = {
  fast: { duration: 0.2, ease: easings.smooth },
  normal: { duration: 0.4, ease: easings.smooth },
  slow: { duration: 0.6, ease: easings.smooth },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 15,
  },
} as const;

// ================================
// Scroll Reveal Animations
// ================================

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

// ================================
// Stagger Container Animations
// ================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ================================
// Card Hover Animations - Clay Style
// ================================

export const cardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: transitions.spring,
  },
};

export const cardHoverWithGlow: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  },
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25), 0 0 40px rgba(201, 162, 39, 0.15)",
    transition: transitions.spring,
  },
};

// ================================
// Text Animations
// ================================

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

export const letterReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: easings.smooth,
    },
  }),
};

export const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: easings.smooth,
    },
  }),
};

// ================================
// Button Animations - Premium
// ================================

export const buttonTap = {
  scale: 0.95,
  transition: transitions.fast,
};

export const buttonHover = {
  scale: 1.05,
  transition: transitions.spring,
};

export const magneticButton = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

// ================================
// Page Transitions
// ================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
};

// ================================
// Modal/Overlay Animations
// ================================

export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.fast,
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.spring,
  },
};

// ================================
// Parallax Utilities
// ================================

export const createParallaxConfig = (speed: number = 0.5) => ({
  initial: { y: 0 },
  animate: {
    y: 0,
  },
  style: {
    willChange: "transform",
  },
});

// ================================
// Scroll Progress Utilities
// ================================

export const scrollProgressConfig = {
  style: {
    scaleX: 0,
    transformOrigin: "0%",
  },
  animate: {
    scaleX: 1,
  },
  transition: {
    ease: "linear",
  },
};

// ================================
// Custom Animation Helpers
// ================================

/**
 * Create a stagger animation with custom delay and duration
 */
export const createStagger = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Transition => ({
  staggerChildren: staggerDelay,
  delayChildren,
});

/**
 * Create a custom reveal animation from any direction
 */
export const createReveal = (
  direction: "up" | "down" | "left" | "right",
  distance: number = 40,
  duration: number = 0.4
): Variants => {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...offset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: easings.smooth,
      },
    },
  };
};

/**
 * Create a bounce animation
 */
export const createBounce = (height: number = -20): Variants => ({
  animate: {
    y: [0, height, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

/**
 * Create a floating animation - Clay style
 */
export const createFloat = (
  distance: number = -20,
  duration: number = 6
): Variants => ({
  animate: {
    y: [0, distance, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

/**
 * Create a pulse animation for attention
 */
export const createPulse = (scale: number = 1.05): Variants => ({
  animate: {
    scale: [1, scale, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

// ================================
// Intersection Observer Helpers
// ================================

/**
 * Standard viewport config for scroll animations
 */
export const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -100px 0px",
};

export const viewportConfigEager = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -50px 0px",
};

export const viewportConfigLazy = {
  once: true,
  amount: 0.5,
  margin: "0px 0px -150px 0px",
};

// ================================
// Export All
// ================================

export default {
  easings,
  transitions,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  cardHover,
  cardHoverWithGlow,
  textReveal,
  letterReveal,
  wordReveal,
  buttonTap,
  buttonHover,
  magneticButton,
  pageTransition,
  modalBackdrop,
  modalContent,
  viewportConfig,
  createStagger,
  createReveal,
  createBounce,
  createFloat,
  createPulse,
};
