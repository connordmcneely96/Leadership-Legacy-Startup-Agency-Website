# CLAUDE.md — Leadership Legacy Startup Agency Website

This file describes the codebase structure, development conventions, and workflows for AI assistants working in this repository.

---

## Project Overview

**Leadership Legacy** is a two-tier web application:

1. **Public agency website** — Landing page showcasing AI-first digital solutions services (Hero, Services, Portfolio, Pricing, About, Contact sections).
2. **Private productivity suite** — 10 integrated web applications (Documents, Sheets, Slides, Drive, Photos, Gallery, Calendar, Mail, Meet, Tasks) accessible under `/suite/*`.

**Live site:** https://leadershiplegacy.io

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16 (App Router, static export) |
| UI library | React 19 |
| Styling | TailwindCSS v4 + shadcn/ui (New York style) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Rich text editor | TipTap 2 |
| Drag & drop | dnd-kit |
| HTTP client | ky + native fetch |
| Server state | TanStack React Query 5 |
| Validation | Zod |
| Backend framework | Hono 4 (Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite via Drizzle ORM) |
| File storage | Cloudflare R2 |
| KV store | Cloudflare KV |
| AI | Cloudflare Workers AI + Anthropic API |
| Email | Resend |
| Deployment | Cloudflare Pages (frontend) + Cloudflare Workers (API) |

---

## Repository Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (metadata, fonts, body)
│   │   ├── page.tsx            # Landing page (/)
│   │   ├── globals.css         # Global styles, Tailwind theme, brand colors
│   │   ├── dashboard/          # Dashboard page (/dashboard)
│   │   └── suite/              # Productivity suite (/suite/*)
│   │       ├── layout.tsx      # Shared suite shell (sidebar, header, FAB, footer)
│   │       ├── documents/
│   │       ├── sheets/
│   │       ├── slides/
│   │       ├── drive/
│   │       ├── photos/
│   │       ├── gallery/
│   │       ├── calendar/
│   │       ├── mail/
│   │       ├── meet/
│   │       └── tasks/
│   ├── components/
│   │   ├── shared/             # Reusable UI primitives (MagneticButton, ScrollProgress, etc.)
│   │   ├── suite/              # Suite shell components (SuiteSidebar, SuiteHeader, UniversalFAB, FooterUserPanel, ErrorBoundary)
│   │   ├── AIAssistant/        # Chat panel (ChatPanel, Message, MessageList, MessageInput, TypingIndicator)
│   │   ├── dashboard/          # Dashboard tab components
│   │   └── [Landing sections]  # Navbar, Hero, Services, Portfolio, About, Contact, Footer, Pricing, RetainerServices, etc.
│   └── lib/
│       ├── api-client.ts       # Type-safe API client (namespace-organized)
│       ├── api.ts              # Low-level API utilities
│       ├── utils.ts            # cn(), formatting helpers
│       ├── animations.ts       # Framer Motion variants
│       └── hooks/              # Custom React hooks
├── workers/
│   └── api/
│       └── index.ts            # Cloudflare Worker — main API router (50+ endpoints)
├── functions/
│   └── api/                    # Cloudflare Pages Functions
├── schema/
│   ├── schema.sql              # Base DB schema (contacts, analytics, newsletter)
│   └── full-schema.sql         # Extended schema (all suite tables)
├── migrations/                 # Numbered D1 migration files
├── public/
│   └── _routes.json            # Cloudflare Pages routing rules
├── next.config.ts              # Next.js config (static export, React Compiler)
├── tsconfig.json               # TypeScript config (strict, path alias @/*)
├── eslint.config.mjs           # ESLint (Next.js core-web-vitals + TypeScript)
├── components.json             # shadcn/ui config
├── wrangler.toml               # Cloudflare Workers config (D1, R2, KV bindings)
├── wrangler-pages.toml         # Cloudflare Pages config
├── .env.example                # Environment variable template
└── deploy*.sh                  # Deployment helper scripts
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run Next.js dev server (frontend)
npm run dev               # http://localhost:3000

# Run Cloudflare Workers dev server (API)
npm run cf:dev            # http://localhost:8787

# Lint
npm run lint
```

Both servers must run simultaneously for full functionality. Set `NEXT_PUBLIC_API_URL=http://localhost:8787` in `.env.local`.

### Build & Deploy

```bash
# Build Next.js static export
npm run build             # outputs to /out

# Deploy API (Cloudflare Workers)
npm run cf:deploy

# Deploy frontend (Cloudflare Pages)
npm run cf:pages:deploy   # builds + deploys /out to Pages
```

### Database Operations

```bash
# Create resources
npm run cf:setup          # creates D1, R2, KV in one command

# Run migrations
npm run cf:db:migrate     # applies schema/schema.sql to D1
```

---

## Environment Variables

Create `.env.local` for local development. Never commit real secrets.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8787    # Points to local Worker or production URL
NODE_ENV=development
```

For the Cloudflare Worker, use `.dev.vars`:

```bash
ENVIRONMENT=development
ANTHROPIC_API_KEY=...
RESEND_API_KEY=...
```

Production secrets are set in the Cloudflare dashboard or via `wrangler secret put`.

The `Env` interface in `workers/api/index.ts` is the canonical list of all Worker bindings:
- `DB` — D1 database
- `ASSETS` / `R2_ASSETS` — R2 bucket
- `CONFIG` — KV namespace
- `AI` — Workers AI
- `ANTHROPIC_API_KEY` — Anthropic API key (secret)
- `RESEND_API_KEY` — Resend email API key (secret)

---

## Code Conventions

### TypeScript

- **Strict mode** is enabled. No `any` unless interfacing with untyped Cloudflare bindings.
- Path alias `@/*` maps to `./src/*`. Always use this alias, never relative `../../` paths.
- All API responses use the `ApiResponse<T>` generic: `{ success: boolean; data?: T; error?: string }`.
- Validate external input with **Zod** schemas.

### React / Next.js

- **App Router** only — no Pages Router patterns.
- Add `"use client"` at the top of any component that uses hooks, event handlers, or browser APIs.
- Server Components are the default; use them for data fetching where possible.
- The Next.js output is `export` (fully static). Do not use `getServerSideProps` or server actions that require a Node.js runtime.
- **React Compiler** is enabled via `babel-plugin-react-compiler`. Do not manually wrap everything in `useMemo`/`useCallback` unless profiling shows a real need.

### Component Patterns

- **PascalCase** for component files and their default exports: `Hero.tsx`, `SuiteSidebar.tsx`.
- Keep components co-located with their feature: suite components in `components/suite/`, landing page sections at the root of `components/`.
- Define prop interfaces inline at the top of the file or just above the component.
- Use **shadcn/ui** primitives from `@/components/ui/` for base UI elements (buttons, dialogs, inputs, etc.).
- Use **Lucide React** for all icons.
- Animations use **Framer Motion** with shared variants from `src/lib/animations.ts`.

### Styling

- **TailwindCSS v4** utility-first. No custom CSS unless defining tokens in `globals.css`.
- Use the `cn()` helper from `@/lib/utils` for conditional class merging: `cn("base-class", condition && "conditional-class")`.
- Brand color tokens (available as Tailwind classes):

  | Token | Hex | Tailwind class |
  |---|---|---|
  | Navy | `#1A1A2E` | `bg-navy`, `text-navy` |
  | Navy Light | `#252542` | `bg-navy-light` |
  | Navy Dark | `#121220` | `bg-navy-dark` |
  | Gold | `#C9A227` | `bg-gold`, `text-gold` |
  | Gold Light | `#D4B44A` | `bg-gold-light` |
  | Gold Dark | `#A8871F` | `bg-gold-dark` |
  | Blue | `#3498DB` | `bg-blue`, `text-blue` |
  | Charcoal | `#2C3E50` | `bg-charcoal` |

- The default theme is **dark** (navy background, light foreground). Respect this when adding new sections.
- Font system: `font-sans` (Geist Sans), `font-serif` (Crimson Pro), `font-mono` (Geist Mono).

### API Client (`src/lib/api-client.ts`)

All frontend-to-backend calls go through the typed API client. Add new endpoints here, not inline in components.

```ts
// Pattern for a new endpoint
export const myFeatureApi = {
  list: (params?: { filter?: string }) =>
    fetchApi<MyItem[]>(`/my-feature?${new URLSearchParams(params as any)}`),
  create: (body: CreateMyItemInput) =>
    fetchApi<MyItem>('/my-feature', { method: 'POST', body: JSON.stringify(body) }),
};
```

For file uploads, omit `Content-Type` (let the browser set the multipart boundary):

```ts
const form = new FormData();
form.append('file', file);
const res = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', body: form });
```

### Cloudflare Worker (`workers/api/index.ts`)

- The router uses plain `if` statements on `url.pathname` + `request.method` — no framework routing. Follow this pattern when adding endpoints.
- Always include CORS headers on every response using the `corsHeaders` object.
- Return JSON with `{ success: true, data: ... }` on success and `{ success: false, error: "..." }` on failure.
- Database queries use raw D1 SQL via `env.DB.prepare(...).bind(...).all()` / `.first()` / `.run()`.

---

## Key Architectural Decisions

1. **Static export** — Next.js generates a static `/out` directory deployed to Cloudflare Pages. There is no Node.js server. All dynamic logic lives in the Cloudflare Worker.
2. **No testing infrastructure** — There are currently no unit, integration, or e2e tests. TypeScript and ESLint are the primary quality gates.
3. **No global state manager** — Component state uses `useState`; server state uses TanStack React Query; no Redux/Zustand/Jotai.
4. **shadcn/ui** components are copied into `src/components/ui/` and can be freely modified (they are not an external dependency at runtime).
5. **React Compiler** is enabled, so manual memoization is generally unnecessary.

---

## Git Workflow

- Feature work is done on branches named `claude/<description>-<id>` (auto-generated by Claude Code).
- PRs target `main`.
- Commit messages are imperative, present-tense, and descriptive: `Add Pillars 5 & 6 to Services section`.
- Do not force-push to `main`.

---

## Files to Know

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Landing page root — imports all landing section components |
| `src/app/suite/layout.tsx` | Shared shell for all 10 suite apps |
| `src/lib/api-client.ts` | All frontend API calls — extend here |
| `workers/api/index.ts` | All backend routes — extend here |
| `schema/full-schema.sql` | Authoritative DB schema |
| `src/app/globals.css` | Theme tokens, brand colors, font imports |
| `components.json` | shadcn/ui configuration |
| `wrangler.toml` | Cloudflare bindings and deployment config |

---

## What NOT to Do

- Do not add a Node.js runtime feature (middleware, server actions requiring runtime) — the output is fully static.
- Do not install a global state management library unless the team explicitly decides to.
- Do not bypass ESLint with `// eslint-disable` without explaining why in a comment.
- Do not commit `.env.local`, `.dev.vars`, or any file containing real secrets.
- Do not create new documentation `.md` files unless explicitly requested — there are already 15+ guides in the repo root.
- Do not add tests using a framework not yet installed. If adding tests, install Vitest first and discuss the setup.
