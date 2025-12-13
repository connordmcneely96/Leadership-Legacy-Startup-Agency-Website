# Cloudflare Deployment Guide
## Leadership Legacy - Complete Setup Instructions

This guide covers the complete deployment process for migrating Leadership Legacy to Cloudflare infrastructure with Clay-inspired design enhancements.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Cloudflare Setup](#initial-cloudflare-setup)
3. [Database Configuration](#database-configuration)
4. [Storage Configuration](#storage-configuration)
5. [Workers Deployment](#workers-deployment)
6. [Pages Deployment](#pages-deployment)
7. [Local Development](#local-development)
8. [Environment Variables](#environment-variables)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- [x] Node.js 18+ installed
- [x] npm or yarn package manager
- [x] Cloudflare account created
- [x] Cloudflare API Token: `SRt4Hz-Sk78lrbN0LMW49LkK_xGbE5CEeqT41_1e`
- [x] Cloudflare Account ID: `d3dbdd3e1ebbc28edf0ce756d9841490`

---

## Initial Cloudflare Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Wrangler CLI

Wrangler is already installed as a dev dependency. Authenticate with Cloudflare:

```bash
npx wrangler login
```

This will open a browser window for authentication. Alternatively, set the API token manually:

```bash
export CLOUDFLARE_API_TOKEN=SRt4Hz-Sk78lrbN0LMW49LkK_xGbE5CEeqT41_1e
export CLOUDFLARE_ACCOUNT_ID=d3dbdd3e1ebbc28edf0ce756d9841490
```

Or add to your shell profile (~/.bashrc, ~/.zshrc):

```bash
echo 'export CLOUDFLARE_API_TOKEN=SRt4Hz-Sk78lrbN0LMW49LkK_xGbE5CEeqT41_1e' >> ~/.bashrc
echo 'export CLOUDFLARE_ACCOUNT_ID=d3dbdd3e1ebbc28edf0ce756d9841490' >> ~/.bashrc
source ~/.bashrc
```

---

## Database Configuration

### 1. Create D1 Database

```bash
npm run cf:db:create
```

This creates a D1 SQLite database named `leadership-legacy-db`.

**Expected Output:**
```
✅ Successfully created DB 'leadership-legacy-db'
Database ID: [your-database-id]
```

### 2. Update wrangler.toml

Copy the Database ID from the output above and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "leadership-legacy-db"
database_id = "YOUR_DATABASE_ID_HERE"  # ← Replace this
```

### 3. Run Database Migrations

```bash
npm run cf:db:migrate
```

This executes the SQL schema in `schema/schema.sql`, creating tables for:
- Contact form submissions
- Analytics events
- Newsletter subscriptions

**Verify Tables:**

```bash
npx wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## Storage Configuration

### 1. Create R2 Bucket (Object Storage)

```bash
npm run cf:r2:create
```

This creates an R2 bucket named `leadership-legacy-assets` for storing:
- Images
- Videos
- Brand assets
- Portfolio pieces

### 2. Create KV Namespace (Key-Value Store)

```bash
npm run cf:kv:create
```

This creates a KV namespace for:
- Feature flags
- Configuration settings
- Session data

**Expected Output:**
```
🌀 Creating namespace...
✅ Success!
Add the following to your configuration file:
kv_namespaces = [
  { binding = "LEADERSHIP_CONFIG", id = "YOUR_KV_ID" }
]
```

### 3. Update wrangler.toml

Add the KV namespace ID to `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CONFIG"
id = "YOUR_KV_ID_HERE"  # ← Replace this
```

---

## Workers Deployment

### 1. Deploy API Workers

```bash
npm run cf:deploy
```

This deploys the Workers in `workers/api/index.ts` with the following endpoints:

- **POST /api/contact** - Handle contact form submissions
- **POST /api/analytics** - Track analytics events
- **POST /api/newsletter** - Newsletter subscriptions
- **GET /api/health** - Health check endpoint

### 2. Verify Deployment

```bash
curl https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "environment": "production"
}
```

---

## Pages Deployment

### Option 1: Deploy via Wrangler (Recommended)

#### 1. Build the Next.js Site

```bash
npm run cf:pages:build
```

This generates a static export in the `out/` directory.

#### 2. Deploy to Cloudflare Pages

```bash
npm run cf:pages:deploy
```

### Option 2: Deploy via Cloudflare Dashboard

#### 1. Connect GitHub Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** > **Create a project**
3. Connect to GitHub and select `Leadership-Legacy-Startup-Agency-Website`

#### 2. Configure Build Settings

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 18 or higher

#### 3. Set Environment Variables

In the Cloudflare Pages dashboard, add:

```
NEXT_PUBLIC_API_URL=https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev
NODE_ENV=production
```

#### 4. Deploy

Click **Save and Deploy**. Cloudflare will build and deploy your site.

---

## Local Development

### 1. Start Next.js Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 2. Start Workers Development Server

In a separate terminal:

```bash
npm run cf:dev
```

This starts Wrangler's local development server at [http://localhost:8787](http://localhost:8787)

### 3. Configure Environment Variables

Create `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
NODE_ENV=development
```

### 4. Test API Integration

```bash
# Health check
curl http://localhost:8787/api/health

# Test contact form
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing contact form"
  }'
```

---

## Environment Variables

### Development (.env.local)

```env
CLOUDFLARE_ACCOUNT_ID=d3dbdd3e1ebbc28edf0ce756d9841490
CLOUDFLARE_API_TOKEN=SRt4Hz-Sk78lrbN0LMW49LkK_xGbE5CEeqT41_1e
NEXT_PUBLIC_API_URL=http://localhost:8787
NODE_ENV=development
```

### Production (Cloudflare Pages)

Set these in the Cloudflare Pages dashboard under **Settings** > **Environment variables**:

```env
NEXT_PUBLIC_API_URL=https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev
NODE_ENV=production
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Cloudflare Pages (Frontend)         │
│  - Next.js 16 static export                 │
│  - Clay-inspired animations & UI            │
│  - Gold/Navy brand colors                   │
└──────────────┬──────────────────────────────┘
               │
               ├─────────────────────────────────┐
               │                                 │
┌──────────────▼──────────────┐  ┌─────────────▼──────────────┐
│   Cloudflare Workers        │  │      R2 Bucket             │
│  - Contact form API         │  │  - Images & media          │
│  - Analytics tracking       │  │  - Brand assets            │
│  - Newsletter API           │  │  - Portfolio content       │
│  - Rate limiting            │  └────────────────────────────┘
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│         D1 Database         │
│  - Contact submissions      │
│  - Analytics events         │
│  - Newsletter subscribers   │
└─────────────────────────────┘

┌─────────────────────────────┐
│      Workers KV Store       │
│  - Feature flags            │
│  - Configuration            │
│  - Session data             │
└─────────────────────────────┘
```

---

## Troubleshooting

### Database Migration Fails

**Problem:** Schema migration fails with "table already exists"

**Solution:**
```bash
# Drop and recreate database (CAUTION: destroys data)
npx wrangler d1 delete leadership-legacy-db
npm run cf:db:create
npm run cf:db:migrate
```

### Workers Deployment Fails

**Problem:** Deployment fails with authentication error

**Solution:**
```bash
# Re-authenticate
npx wrangler logout
npx wrangler login
```

### API Calls Return 404

**Problem:** Frontend can't reach Workers API

**Solution:**
1. Verify Workers are deployed: `npx wrangler deployments list`
2. Check environment variables in `.env.local`
3. Ensure CORS headers are set correctly in `workers/api/index.ts`

### Build Fails on Cloudflare Pages

**Problem:** Next.js build fails with module errors

**Solution:**
1. Check Node version is 18+
2. Verify all dependencies are in `package.json`
3. Clear cache and retry:
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

---

## Performance Targets

After deployment, verify these metrics using Lighthouse:

- ✅ **Performance:** 95+
- ✅ **Accessibility:** 95+
- ✅ **Best Practices:** 95+
- ✅ **SEO:** 95+

**Key Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

---

## Next Steps

1. **Configure Custom Domain**
   - Add your domain in Cloudflare Pages settings
   - Update DNS records to point to Cloudflare

2. **Set Up Analytics Dashboard**
   - Query D1 database for analytics insights
   - Create visualizations in Cloudflare dashboard

3. **Enable Caching**
   - Configure cache rules in Cloudflare dashboard
   - Set up page rules for optimal performance

4. **Set Up Monitoring**
   - Enable Cloudflare Web Analytics
   - Set up error tracking and alerts

5. **Optimize Assets**
   - Upload images to R2 bucket
   - Configure CDN caching
   - Enable Cloudflare Polish for image optimization

---

## Support

For issues or questions:

- **Cloudflare Docs:** https://developers.cloudflare.com
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler
- **D1 Database:** https://developers.cloudflare.com/d1
- **Pages:** https://developers.cloudflare.com/pages

---

**Last Updated:** December 2025
**Version:** 1.0.0
