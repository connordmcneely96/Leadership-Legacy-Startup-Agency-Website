# Leadership Legacy - Digital Solutions Agency

A modern, premium marketing website for Leadership Legacy, an AI-first digital solutions agency. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, CSS variables, brand colors
│   ├── layout.tsx       # Root layout with fonts and metadata
│   └── page.tsx         # Main page assembling all sections
├── components/
│   ├── Navbar.tsx       # Sticky navigation with glassmorphism
│   ├── Hero.tsx         # Hero section with floating cards
│   ├── WhoWeHelp.tsx    # Target audience section
│   ├── Services.tsx     # AI services showcase
│   ├── WebDevelopment.tsx # Web dev offerings
│   ├── Creative.tsx     # Creative services
│   ├── Process.tsx      # Engagement process timeline
│   ├── Outcomes.tsx     # Results and social proof
│   ├── Pricing.tsx      # Pricing tiers
│   ├── About.tsx        # Company story and values
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Site footer
└── lib/
    └── utils.ts         # Utility functions (from shadcn/ui)
```

## 🎨 Brand Configuration

### Colors (defined in `globals.css`)

| Color | Hex | Usage |
|-------|-----|-------|
| Royal Navy | `#1A1A2E` | Primary background |
| Navy Light | `#252542` | Card backgrounds |
| Legacy Gold | `#C9A227` | Primary accent, CTAs |
| Tech Blue | `#3498DB` | Secondary accent, links |
| Charcoal | `#2C3E50` | Muted elements |

### Typography

- **Headings**: Crimson Pro (serif) - elegant, editorial feel
- **Body**: Geist Sans (system sans-serif) - clean, readable
- **Monospace**: Geist Mono - for code or technical elements

## ✏️ Editing Content

### Service Cards (Services.tsx)

Edit the `services` array to modify AI service offerings:

```typescript
const services = [
  {
    icon: Database,
    title: "RAG Knowledge Bases",
    tagline: "Chat with your documents",
    description: "...",
    outcomes: ["Outcome 1", "Outcome 2", "Outcome 3"],
    color: "gold" | "blue",
  },
  // ... more services
];
```

### Target Audiences (WhoWeHelp.tsx)

Edit the `audiences` array:

```typescript
const audiences = [
  {
    icon: Rocket,
    title: "SaaS & Tech Startups",
    description: "...",
  },
  // ... more audiences
];
```

### Process Steps (Process.tsx)

Edit the `steps` array:

```typescript
const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Discovery Call",
    description: "...",
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
  },
  // ... more steps
];
```

### Pricing Tiers (Pricing.tsx)

Edit the `pricingTiers` array:

```typescript
const pricingTiers = [
  {
    icon: Database,
    name: "RAG Knowledge Bases",
    description: "...",
    startingAt: "$1,500",
    note: "Typical projects: $1.5k – $4k",
  },
  // ... more tiers
];
```

## 🔌 Adding New Sections

1. Create a new component in `src/components/`:

```typescript
"use client";

import { motion } from "framer-motion";

export default function NewSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section content */}
      </div>
    </section>
  );
}
```

2. Import and add to `src/app/page.tsx`:

```typescript
import NewSection from "@/components/NewSection";

export default function Home() {
  return (
    <main className="relative">
      {/* ... existing sections */}
      <NewSection />
      {/* ... */}
    </main>
  );
}
```

## 📝 Future Enhancements

### Adding Case Studies

Create a `src/components/CaseStudies.tsx` component and populate with real client data:

```typescript
const caseStudies = [
  {
    client: "Client Name",
    industry: "SaaS",
    challenge: "...",
    solution: "...",
    results: ["40% reduction in...", "..."],
    testimonial: {
      quote: "...",
      author: "Name",
      role: "CEO",
    },
  },
];
```

### Adding a Blog

1. Create `src/app/blog/page.tsx` for the blog listing
2. Create `src/app/blog/[slug]/page.tsx` for individual posts
3. Use MDX or a CMS like Contentlayer for content management

### Adding Testimonials

Create a `src/components/Testimonials.tsx` component:

```typescript
const testimonials = [
  {
    quote: "Leadership Legacy transformed our operations...",
    author: "John Smith",
    role: "CTO",
    company: "TechCorp",
    avatar: "/avatars/john.jpg",
  },
];
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

```bash
# Build the production bundle
npm run build

# The output will be in the .next folder
# Deploy to any Node.js hosting platform
npm start
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui primitives
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📄 License

Private - All rights reserved.

---

Built with ❤️ by Leadership Legacy
