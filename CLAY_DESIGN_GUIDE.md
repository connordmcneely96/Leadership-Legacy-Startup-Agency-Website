# Clay-Inspired Design System Guide
## Leadership Legacy Premium UI/UX Standards

This guide documents the Clay.global-inspired design patterns, animations, and interactions implemented in Leadership Legacy.

---

## Design Philosophy

Leadership Legacy's design system draws inspiration from premium agencies like Clay.global while maintaining our distinctive brand identity:

- **Brand Colors:** Royal Navy (#1A1A2E) + Legacy Gold (#C9A227)
- **Typography:** Extreme size contrasts with generous spacing
- **Animations:** Smooth, purposeful, GPU-accelerated
- **Whitespace:** Abundant breathing room for sophistication
- **Interactions:** Magnetic buttons, parallax effects, scroll reveals

---

## Typography System

### Size Scale - Extreme Contrasts

```css
/* Clay-inspired hierarchy */
--font-size-hero: clamp(3.5rem, 8vw, 8rem);        /* 56px - 128px */
--font-size-display: clamp(2.5rem, 6vw, 5rem);     /* 40px - 80px */
--font-size-h1: clamp(2rem, 4vw, 3.5rem);          /* 32px - 56px */
--font-size-h2: clamp(1.75rem, 3vw, 2.5rem);       /* 28px - 40px */
--font-size-h3: clamp(1.5rem, 2.5vw, 2rem);        /* 24px - 32px */
--font-size-body-lg: 1.125rem;                      /* 18px */
--font-size-body: 1rem;                             /* 16px */
```

### Usage Examples

```jsx
// Hero Headlines - Massive, attention-grabbing
<h1 className="text-hero font-serif text-gold">
  Leadership Legacy
</h1>

// Display Text - Section headlines
<h2 className="text-display font-serif">
  Transform Your Business
</h2>

// Body Text - Generous line height for readability
<p className="text-lg leading-relaxed">
  We build AI-first digital solutions...
</p>
```

### Font Families

- **Display/Headings:** Crimson Pro (serif) - Editorial elegance
- **Body:** Geist Sans - Clean readability
- **Monospace:** Geist Mono - Technical precision

### Line Heights - Clay Style

```css
--line-height-tight: 1.1;      /* For large headlines */
--line-height-snug: 1.2;       /* For subheadings */
--line-height-normal: 1.5;     /* For body text */
--line-height-relaxed: 1.6;    /* For long-form content */
--line-height-loose: 1.8;      /* For enhanced readability */
```

### Letter Spacing

```css
--letter-spacing-tight: -0.02em;  /* Headlines - tighter */
--letter-spacing-normal: 0;       /* Body - default */
--letter-spacing-wide: 0.02em;    /* Small caps, buttons */
```

---

## Spacing System

### Premium Spacing Scale

```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 4rem;      /* 64px */
--space-xl: 8rem;      /* 128px */
--space-2xl: 12rem;    /* 192px */
--space-3xl: 16rem;    /* 256px */
```

### Section Padding

```css
--section-padding-sm: 4rem;   /* 64px */
--section-padding-md: 6rem;   /* 96px */
--section-padding-lg: 8rem;   /* 128px */
--section-padding-xl: 12rem;  /* 192px */
```

### Usage Guidelines

- **Hero sections:** Minimum 100vh height
- **Content sections:** 8rem (128px) vertical padding
- **Component spacing:** Use consistent spacing scale
- **Containers:** Max-width 1440px with fluid scaling

---

## Animation System

### Easing Functions - Premium Quality

```typescript
// src/lib/animations.ts
export const easings = {
  smooth: [0.4, 0, 0.2, 1],           // Apple-style smooth
  spring: [0.175, 0.885, 0.32, 1.275], // Bouncy spring
  bounce: [0.68, -0.55, 0.265, 1.55],  // Playful bounce
  elastic: [0.68, -0.6, 0.32, 1.6],    // Elastic snap
};
```

### Duration Standards

```css
--duration-instant: 100ms;   /* Immediate feedback */
--duration-fast: 200ms;      /* Quick transitions */
--duration-normal: 400ms;    /* Standard animations */
--duration-slow: 600ms;      /* Deliberate animations */
--duration-slower: 800ms;    /* Emphasis animations */
```

### Scroll Reveal Animations

```jsx
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

<RevealOnScroll direction="up" delay={0.2}>
  <ServiceCard {...props} />
</RevealOnScroll>
```

**Directions available:** `up`, `down`, `left`, `right`

### Stagger Animations

```jsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeInUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

**Delay between items:** 100ms (configurable)

---

## Premium Components

### 1. Magnetic Buttons

Buttons that follow the cursor for enhanced interaction.

```jsx
import MagneticButton from '@/components/shared/MagneticButton';

<MagneticButton
  strength={0.3}  // How much it follows (0-1)
  className="px-8 py-4 bg-gold text-navy rounded-full"
  onClick={() => console.log('clicked')}
>
  Get Started
</MagneticButton>
```

**Best used for:** Primary CTAs, hero buttons

### 2. Scroll Progress Indicator

Thin progress bar at the top showing scroll position.

```jsx
import ScrollProgress from '@/components/shared/ScrollProgress';

// In layout.tsx
<ScrollProgress />
```

**Styling:** 3px height, gold-to-blue gradient

### 3. Parallax Sections

Elements move at different speeds for depth.

```jsx
import ParallaxSection from '@/components/shared/ParallaxSection';

<ParallaxSection speed={0.5}>
  <BackgroundImage />
</ParallaxSection>
```

**Speed values:**
- `0.5` - Half speed (subtle)
- `0.3` - Slower (dramatic)
- `0.7` - Faster (minimal)

### 4. Card Hover Effects - Clay Style

```jsx
<motion.div
  className="card-premium bg-card p-8 rounded-xl"
  whileHover="hover"
  initial="initial"
  variants={cardHoverWithGlow}
>
  <CardContent />
</motion.div>
```

**Effect:** Lifts 8px, adds shadow + gold glow

---

## Color System

### Brand Colors

```css
/* Primary Palette */
--color-navy: #1A1A2E;        /* Primary background */
--color-navy-light: #252542;  /* Card backgrounds */
--color-gold: #C9A227;        /* Primary accent */
--color-gold-light: #D4B44A;  /* Hover states */

/* Accents */
--color-blue: #3498DB;        /* Secondary accent */
--color-charcoal: #2C3E50;    /* Muted elements */
```

### Sophisticated Neutrals - Clay Palette

```css
/* Warm Grays - Premium Feel */
--warm-50: #FAFAF9;
--warm-100: #F5F5F4;
--warm-200: #E7E5E4;
--warm-800: #292524;
--warm-900: #1C1917;
```

### Usage Guidelines

- **Backgrounds:** Navy tones (#1A1A2E, #252542)
- **Text:** Warm whites (#F5F5F7, #FAFAF9)
- **Accents:** Gold for emphasis, blue for links
- **Borders:** rgba(255, 255, 255, 0.1) for subtle dividers

---

## Shadow System - Premium Depth

### Standard Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Glow Effects - Brand Colors

```css
--glow-gold-md: 0 0 40px rgba(201, 162, 39, 0.15);
--glow-blue-md: 0 0 40px rgba(52, 152, 219, 0.15);
```

**Usage:**
- Cards on hover: `shadow-2xl` + `glow-gold-md`
- CTAs: Persistent gold glow
- Interactive elements: Transition from `shadow-md` to `shadow-xl`

---

## Layout Patterns

### Hero Section - Clay Style

```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <ParallaxSection speed={0.5}>
    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-charcoal" />
  </ParallaxSection>

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
    <motion.h1
      className="text-hero font-serif text-gold mb-6"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      Transform Your Business
    </motion.h1>

    <motion.p
      className="text-xl text-warm-200 max-w-2xl mx-auto mb-12"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      AI-first digital solutions that drive real results
    </motion.p>

    <MagneticButton className="px-12 py-5 bg-gold text-navy rounded-full text-lg font-semibold">
      Get Started
    </MagneticButton>
  </div>
</section>
```

### Service Cards - Premium Layout

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {services.map((service, i) => (
    <RevealOnScroll key={i} delay={i * 0.1}>
      <motion.div
        className="card-premium bg-card p-12 rounded-2xl"
        whileHover="hover"
        variants={cardHoverWithGlow}
      >
        <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
        <p className="text-warm-300 leading-relaxed">{service.description}</p>
      </motion.div>
    </RevealOnScroll>
  ))}
</div>
```

### Process Timeline - Horizontal Scroll

```jsx
<div className="overflow-x-auto pb-8">
  <div className="flex gap-8 min-w-max px-8">
    {steps.map((step, i) => (
      <motion.div
        key={i}
        className="w-80 bg-card p-8 rounded-xl"
        variants={fadeInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: i * 0.15 }}
      >
        <div className="text-6xl font-bold text-gold/20 mb-4">{step.number}</div>
        <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
        <p className="text-warm-300">{step.description}</p>
      </motion.div>
    ))}
  </div>
</div>
```

---

## Interactive Elements

### Link Underline Animation

```jsx
<a href="#" className="link-underline text-gold">
  Learn More
</a>
```

**CSS:**
```css
.link-underline {
  position: relative;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width var(--duration-normal) var(--ease-smooth);
}

.link-underline:hover::after {
  width: 100%;
}
```

### Button States

```jsx
<motion.button
  className="px-8 py-4 bg-gold text-navy rounded-full font-semibold"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  Contact Us
</motion.button>
```

---

## Performance Guidelines

### Animation Performance

✅ **DO:**
- Use `transform` and `opacity` only (GPU-accelerated)
- Add `will-change: transform` for elements that will animate
- Use `IntersectionObserver` for scroll animations
- Limit simultaneous animations to 10-12 elements

❌ **DON'T:**
- Animate `width`, `height`, `top`, `left` (causes reflow)
- Use animations on large images without optimization
- Create infinite loops without `prefers-reduced-motion` check

### Code Example - Optimized Animation

```jsx
<motion.div
  className="gpu-accelerate"  // Adds translateZ(0)
  style={{ willChange: 'transform' }}
  whileInView={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 40 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
>
  {content}
</motion.div>
```

---

## Accessibility

### Focus States - Premium

```css
.focus-premium:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Reference

### Import Animation Utilities

```typescript
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  cardHover,
  cardHoverWithGlow,
  viewportConfig,
} from '@/lib/animations';
```

### Import Premium Components

```typescript
import MagneticButton from '@/components/shared/MagneticButton';
import ScrollProgress from '@/components/shared/ScrollProgress';
import ParallaxSection from '@/components/shared/ParallaxSection';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
```

### Common CSS Classes

```css
.text-hero          /* Massive headlines (56-128px) */
.text-display       /* Section headlines (40-80px) */
.card-premium       /* Premium card with hover */
.btn-magnetic       /* Magnetic button base */
.link-underline     /* Animated link underline */
.glass              /* Glassmorphism effect */
.glow-gold          /* Gold glow shadow */
.float              /* Floating animation */
.transition-smooth  /* Smooth transitions */
```

---

**Last Updated:** December 2025
**Design System Version:** 1.0.0
**Inspired by:** Clay.global, Apple, Stripe, Linear
