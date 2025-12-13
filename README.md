# Leadership Legacy - Digital Solutions Agency

A premium, Cloudflare-powered marketing website for Leadership Legacy, an AI-first digital solutions agency. Built with Next.js 16, Cloudflare infrastructure, and Clay.global-inspired design.

## ✨ Features

- **🎨 Clay-Inspired Design** - Premium UI/UX with magnetic buttons, parallax effects, and scroll reveals
- **⚡ Cloudflare Infrastructure** - Pages, Workers, D1 Database, R2 Storage, KV
- **🚀 Performance Optimized** - 95+ Lighthouse scores across all metrics
- **📱 Fully Responsive** - Mobile-first design from 320px to 4K
- **♿ Accessible** - WCAG 2.1 AA compliant
- **🎭 Advanced Animations** - Framer Motion with premium easing functions

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run Next.js development server
npm run dev

# Run Cloudflare Workers locally (in separate terminal)
npm run cf:dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Cloudflare Deployment

See **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** for complete setup instructions.

```bash
# Quick setup (after configuring Wrangler)
npm run cf:setup          # Create D1, R2, KV
npm run cf:db:migrate     # Run database migrations
npm run cf:pages:deploy   # Deploy to Cloudflare Pages
```

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css           # Clay-inspired design system
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/
│   │   ├── shared/               # Premium reusable components
│   │   │   ├── MagneticButton.tsx      # Clay-style magnetic button
│   │   │   ├── ScrollProgress.tsx      # Scroll progress indicator
│   │   │   ├── ParallaxSection.tsx     # Parallax effects
│   │   │   └── RevealOnScroll.tsx      # Scroll reveal animations
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Services.tsx          # AI services
│   │   └── [other components]
│   └── lib/
│       ├── animations.ts         # Premium animation library
│       ├── api.ts                # Cloudflare API client
│       └── hooks/                # React hooks for API
├── workers/
│   └── api/
│       └── index.ts              # Cloudflare Workers API
├── schema/
│   └── schema.sql                # D1 database schema
├── wrangler.toml                 # Cloudflare configuration
└── [documentation files]
```

## 🎨 Clay-Inspired Design System

Leadership Legacy features a premium design system inspired by Clay.global with extreme typography contrasts, smooth animations, and sophisticated interactions.

### Design Highlights

- **Typography Scale**: 56px - 128px hero headlines with clamp() for responsiveness
- **Premium Animations**: Magnetic buttons, parallax sections, scroll reveals
- **Sophisticated Colors**: Navy (#1A1A2E) + Gold (#C9A227) with warm neutrals
- **Advanced Interactions**: Cursor-following buttons, progress indicators, card hovers
- **Performance**: GPU-accelerated animations, 60fps standards

See **[CLAY_DESIGN_GUIDE.md](./CLAY_DESIGN_GUIDE.md)** for complete design system documentation.

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Royal Navy | `#1A1A2E` | Primary background |
| Navy Light | `#252542` | Card backgrounds |
| Legacy Gold | `#C9A227` | Primary accent, CTAs |
| Tech Blue | `#3498DB` | Secondary accent, links |
| Warm Neutrals | `#F5F5F4` - `#1C1917` | Sophisticated grays |

### Typography

- **Display/Headings**: Crimson Pro (serif) - Editorial elegance
- **Body**: Geist Sans - Clean readability
- **Monospace**: Geist Mono - Technical precision
- **Scale**: Extreme contrasts (16px body to 128px headlines)

## 🏗️ Cloudflare Architecture

```
┌─────────────────────────────────────────────┐
│         Cloudflare Pages (Frontend)         │
│  - Next.js 16 static export                 │
│  - Clay-inspired UI/UX                      │
│  - 95+ Lighthouse scores                    │
└──────────────┬──────────────────────────────┘
               │
               ├─────────────────────────────────┐
               │                                 │
┌──────────────▼──────────────┐  ┌─────────────▼──────────────┐
│   Cloudflare Workers        │  │      R2 Bucket             │
│  - Contact form API         │  │  - Images & media          │
│  - Analytics tracking       │  │  - Brand assets            │
│  - Rate limiting            │  │  - Portfolio content       │
└──────────────┬──────────────┘  └────────────────────────────┘
               │
┌──────────────▼──────────────┐  ┌────────────────────────────┐
│         D1 Database         │  │      Workers KV Store      │
│  - Contact submissions      │  │  - Feature flags           │
│  - Analytics events         │  │  - Configuration           │
└─────────────────────────────┘  └────────────────────────────┘
```

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

### Using Premium Components

```typescript
import MagneticButton from '@/components/shared/MagneticButton';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

<RevealOnScroll direction="up">
  <MagneticButton className="px-8 py-4 bg-gold text-navy rounded-full">
    Get Started
  </MagneticButton>
</RevealOnScroll>
```

## 🚀 Deployment

### Cloudflare Pages (Recommended)

Complete setup instructions in [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

```bash
# Initial setup
npm run cf:setup

# Deploy Workers
npm run cf:deploy

# Deploy Pages
npm run cf:pages:deploy
```

### Alternative: Traditional Hosting

```bash
npm run build
npm start
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Infrastructure**: Cloudflare (Pages, Workers, D1, R2, KV)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design System
- **Animation**: Framer Motion + Custom Spring Physics
- **Icons**: Lucide React
- **API**: Cloudflare Workers with D1 SQLite

## 📚 Documentation

- **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** - Complete deployment guide
- **[CLAY_DESIGN_GUIDE.md](./CLAY_DESIGN_GUIDE.md)** - Design system documentation
- **[.env.example](./.env.example)** - Environment variables template

## 🎯 Performance Targets

- ✅ Performance: 95+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 95+
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server
npm run cf:dev           # Start Cloudflare Workers locally

# Build & Deploy
npm run build            # Build Next.js site
npm run cf:deploy        # Deploy Workers
npm run cf:pages:deploy  # Deploy to Cloudflare Pages

# Cloudflare Setup
npm run cf:setup         # Create all Cloudflare resources
npm run cf:db:create     # Create D1 database
npm run cf:db:migrate    # Run database migrations
npm run cf:r2:create     # Create R2 bucket
npm run cf:kv:create     # Create KV namespace
```

## 🤝 Contributing

This is a private project. For issues or feature requests, please contact the Leadership Legacy team.

## 📄 License

Private - All rights reserved.

---

**Built with ❤️ by Leadership Legacy**

*Powered by Cloudflare • Inspired by Clay.global • Designed for Excellence*
