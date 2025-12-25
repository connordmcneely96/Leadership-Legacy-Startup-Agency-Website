# Turnkey SaaS Platform Deployment Guide

This guide shows you how to replicate this entire full-stack SaaS deployment process for future projects.

---

## 🎯 What This Process Does

Transforms any static website into a full-stack SaaS platform with:
- Authentication (email/password + magic links)
- Database (SQLite at edge)
- File storage (Object storage)
- API backend (30+ endpoints)
- Client portal
- Project management
- Invoicing
- Time tracking
- AI services infrastructure

**Time**: 15-30 minutes
**Cost**: $0 (Cloudflare free tier)

---

## 📋 Prerequisites

1. GitHub account
2. Cloudflare account (free)
3. Node.js installed (v18+)
4. Git installed
5. PowerShell or Terminal access

---

## 🚀 Step-by-Step Process

### Step 1: Initial Prompt for Claude

Use this prompt to start any new SaaS migration project:

```
I want to transform my [PROJECT_NAME] website into a full-stack SaaS platform using Cloudflare infrastructure.

Current state: [static website / Next.js app / WordPress site / etc.]
GitHub repo: [REPO_URL]

Required features:
- User authentication (email/password + passwordless magic links)
- Role-based access control (admin, team, client)
- Client management portal
- Project management with milestones
- Time tracking (billable/non-billable)
- Invoicing system with Stripe integration
- File upload and storage
- AI services integration (ChatGPT/Claude)

Target infrastructure:
- Frontend: Cloudflare Pages (Next.js static export)
- Backend: Cloudflare Workers (TypeScript API)
- Database: Cloudflare D1 (SQLite)
- Storage: Cloudflare R2 (files/documents)
- Sessions: Cloudflare KV (key-value store)

Please:
1. Create complete database schema with all necessary tables
2. Build RESTful API with authentication middleware
3. Implement JWT authentication with PBKDF2 password hashing
4. Create CRUD endpoints for all features
5. Set up deployment scripts for Cloudflare
6. Provide testing documentation

Branch name: claude/saas-migration-[RANDOM_ID]
```

### Step 2: Cloudflare Account Setup

1. Sign up at https://dash.cloudflare.com
2. Get your Account ID:
   - Click on "Workers & Pages"
   - Copy Account ID from sidebar
3. Create API token:
   - Go to "My Profile" → "API Tokens"
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Save the token securely

### Step 3: Local Environment Setup

```powershell
# Clone your repository
git clone [YOUR_REPO_URL]
cd [PROJECT_NAME]

# Install dependencies
npm install

# Install Wrangler CLI globally (optional)
npm install -g wrangler

# Login to Cloudflare
npx wrangler login

# Verify login
npx wrangler whoami
```

### Step 4: Run Automated Deployment Script

Use the deployment script created by Claude, or use this template:

```bash
#!/bin/bash

# Turnkey SaaS Deployment Script
# Auto-creates all Cloudflare resources and deploys

set -e

PROJECT_NAME="your-project-name"
BRANCH_NAME="main"

echo "🚀 Starting SaaS Platform Deployment..."

# Step 1: Create D1 Database
echo "📊 Creating D1 Database..."
DB_OUTPUT=$(npx wrangler d1 create ${PROJECT_NAME}-db --json 2>/dev/null || echo "{}")
DB_ID=$(echo $DB_OUTPUT | grep -o '"database_id":"[^"]*' | cut -d'"' -f4)

if [ -z "$DB_ID" ]; then
    echo "Database might already exist, fetching ID..."
    DB_ID=$(npx wrangler d1 list --json | grep -o '"database_id":"[^"]*"' | head -1 | cut -d'"' -f4)
fi

echo "✅ Database ID: $DB_ID"

# Step 2: Create R2 Bucket
echo "📦 Creating R2 Bucket..."
npx wrangler r2 bucket create ${PROJECT_NAME}-assets 2>/dev/null || echo "Bucket may already exist"

# Step 3: Create KV Namespace
echo "🔑 Creating KV Namespace..."
KV_OUTPUT=$(npx wrangler kv namespace create CONFIG --json 2>/dev/null || echo "{}")
KV_ID=$(echo $KV_OUTPUT | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$KV_ID" ]; then
    echo "KV namespace might already exist, fetching ID..."
    KV_ID=$(npx wrangler kv namespace list --json | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
fi

echo "✅ KV Namespace ID: $KV_ID"

# Step 4: Update wrangler.toml
echo "📝 Updating wrangler.toml..."
cat > wrangler.toml << EOF
name = "${PROJECT_NAME}"
main = "workers/api/index.ts"
compatibility_date = "$(date +%Y-%m-%d)"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "${PROJECT_NAME}-db"
database_id = "${DB_ID}"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "${PROJECT_NAME}-assets"

[[kv_namespaces]]
binding = "CONFIG"
id = "${KV_ID}"

[vars]
ENVIRONMENT = "production"

[env.production]
name = "${PROJECT_NAME}-production"
vars = { ENVIRONMENT = "production" }
EOF

# Step 5: Run Database Migration
echo "🗄️  Running database migration..."
npx wrangler d1 execute ${PROJECT_NAME}-db --file=./schema/full-schema.sql

# Step 6: Activate Comprehensive API Router
echo "🔄 Activating API router..."
cp workers/api/new-index.ts workers/api/index.ts

# Step 7: Set JWT Secret
echo "🔐 Setting JWT secret..."
JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "$(date +%s | sha256sum | base64 | head -c 32)")
echo "$JWT_SECRET" | npx wrangler secret put JWT_SECRET

# Step 8: Deploy Workers API
echo "⚙️  Deploying Workers API..."
npx wrangler deploy

# Step 9: Build Frontend
echo "🏗️  Building frontend..."
npm run build

# Step 10: Deploy to Pages
echo "🌐 Deploying to Cloudflare Pages..."
npx wrangler pages deploy out --project-name=${PROJECT_NAME} --commit-dirty=true

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📍 Your URLs:"
echo "   Website: https://${PROJECT_NAME}.pages.dev"
echo "   API: https://${PROJECT_NAME}.[your-subdomain].workers.dev"
echo "   Health Check: https://${PROJECT_NAME}.[your-subdomain].workers.dev/api/health"
echo ""
echo "✅ Next steps:"
echo "   1. Test API: curl https://[your-api-url]/api/health"
echo "   2. Create admin user via /api/auth/register"
echo "   3. Configure Stripe keys (optional)"
echo "   4. Configure AI API keys (optional)"
echo ""
```

Save as `deploy-turnkey.sh`

### Step 5: PowerShell Version (Windows)

```powershell
# Turnkey SaaS Deployment - PowerShell Version
# Save as deploy-turnkey.ps1

$PROJECT_NAME = "your-project-name"

Write-Host "🚀 Starting SaaS Platform Deployment..." -ForegroundColor Green

# Create D1 Database
Write-Host "📊 Creating D1 Database..." -ForegroundColor Cyan
npx wrangler d1 create "$PROJECT_NAME-db"

# Create R2 Bucket
Write-Host "📦 Creating R2 Bucket..." -ForegroundColor Cyan
npx wrangler r2 bucket create "$PROJECT_NAME-assets"

# Create KV Namespace
Write-Host "🔑 Creating KV Namespace..." -ForegroundColor Cyan
npx wrangler kv namespace create CONFIG

# Get resource IDs manually
Write-Host "`n⚠️  Please update wrangler.toml with the IDs shown above" -ForegroundColor Yellow
Write-Host "Press Enter when ready to continue..."
Read-Host

# Run Database Migration
Write-Host "🗄️  Running database migration..." -ForegroundColor Cyan
npx wrangler d1 execute "$PROJECT_NAME-db" --file=./schema/full-schema.sql

# Activate API Router
Write-Host "🔄 Activating API router..." -ForegroundColor Cyan
Copy-Item workers/api/new-index.ts workers/api/index.ts -Force

# Set JWT Secret
Write-Host "🔐 Setting JWT secret..." -ForegroundColor Cyan
Write-Host "Enter a secure random string for JWT_SECRET:"
npx wrangler secret put JWT_SECRET

# Deploy Workers
Write-Host "⚙️  Deploying Workers API..." -ForegroundColor Cyan
npx wrangler deploy

# Build Frontend
Write-Host "🏗️  Building frontend..." -ForegroundColor Cyan
npm run build

# Deploy to Pages
Write-Host "🌐 Deploying to Cloudflare Pages..." -ForegroundColor Cyan
npx wrangler pages deploy out --project-name=$PROJECT_NAME --commit-dirty=$true

Write-Host "`n🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "`n📍 Check Cloudflare Dashboard for your URLs" -ForegroundColor Cyan
```

---

## 🔧 Configuration Files Required

### 1. wrangler.toml Template

```toml
name = "PROJECT_NAME"
main = "workers/api/index.ts"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "PROJECT_NAME-db"
database_id = "REPLACE_WITH_YOUR_DB_ID"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "PROJECT_NAME-assets"

[[kv_namespaces]]
binding = "CONFIG"
id = "REPLACE_WITH_YOUR_KV_ID"

[vars]
ENVIRONMENT = "production"

[env.production]
name = "PROJECT_NAME-production"
vars = { ENVIRONMENT = "production" }
```

### 2. package.json Scripts

Add these to your package.json:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy:api": "npx wrangler deploy",
    "deploy:web": "npm run build && npx wrangler pages deploy out --project-name=PROJECT_NAME --commit-dirty=true",
    "deploy:all": "npm run deploy:api && npm run deploy:web",
    "db:migrate": "npx wrangler d1 execute PROJECT_NAME-db --file=./schema/full-schema.sql",
    "db:studio": "npx wrangler d1 execute PROJECT_NAME-db --command 'SELECT * FROM users'",
    "logs": "npx wrangler tail"
  }
}
```

---

## 📊 Database Schema Template

Create `schema/full-schema.sql`:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add more tables as needed...
-- clients, projects, invoices, time_entries, etc.
```

---

## 🧪 Testing Your Deployment

### 1. API Health Check

```bash
curl https://your-project.your-subdomain.workers.dev/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-12-25T12:00:00Z"
}
```

### 2. Create Test User

```bash
curl -X POST https://your-api-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin"
  }'
```

### 3. Login Test

```bash
curl -X POST https://your-api-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

### 4. Authenticated Request

```bash
# Get token from login response, then:
curl https://your-api-url/api/clients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎨 Customization Checklist

For each new project, customize:

- [ ] Project name in wrangler.toml
- [ ] Database schema (add project-specific tables)
- [ ] API endpoints (add project-specific routes)
- [ ] Frontend design
- [ ] Email templates
- [ ] Branding (logo, colors, fonts)
- [ ] Environment variables
- [ ] Stripe keys (if using payments)
- [ ] AI API keys (if using AI features)
- [ ] Domain name (optional)

---

## 💰 Cost Calculator

| Resource | Free Tier | Paid Pricing |
|----------|-----------|--------------|
| Workers | 100K req/day | $5/mo + $0.50/1M req |
| D1 | 5GB + 5M reads/day | $5/mo per 5GB |
| R2 | 10GB storage | $0.015/GB |
| KV | 100K reads/day | $0.50/1M reads |
| Pages | Unlimited | Free |

**Most projects stay under $10/month**

---

## 🐛 Common Issues & Solutions

### Issue 1: "wrangler: command not found"
**Solution**: Use `npx wrangler` instead of `wrangler`

### Issue 2: "Database not found"
**Solution**: Check database ID in wrangler.toml matches `npx wrangler d1 list`

### Issue 3: "Pages shows 'Nothing is here yet'"
**Solution**: Add `--commit-dirty=true` to deploy command

### Issue 4: "Rate limiter error"
**Solution**: Remove `[[unsafe.bindings]]` section from wrangler.toml

### Issue 5: "JWT verification failed"
**Solution**: Ensure JWT_SECRET is set: `npx wrangler secret put JWT_SECRET`

---

## 📚 Additional Resources

### Cloudflare Docs
- [Workers](https://developers.cloudflare.com/workers/)
- [D1 Database](https://developers.cloudflare.com/d1/)
- [R2 Storage](https://developers.cloudflare.com/r2/)
- [KV Storage](https://developers.cloudflare.com/kv/)
- [Pages](https://developers.cloudflare.com/pages/)

### Example Projects
- [This project](https://github.com/connordmcneely96/Leadership-Legacy-Startup-Agency-Website)
- [Cloudflare Workers Examples](https://github.com/cloudflare/workers-sdk)

---

## 🚀 Quick Start Commands (Copy-Paste)

```powershell
# Complete deployment in one go (Windows PowerShell):

git clone YOUR_REPO_URL
cd YOUR_PROJECT
npm install
npx wrangler login
npx wrangler d1 create PROJECT-db
npx wrangler r2 bucket create PROJECT-assets
npx wrangler kv namespace create CONFIG
# Update wrangler.toml with IDs from above
npx wrangler d1 execute PROJECT-db --file=./schema/full-schema.sql
Copy-Item workers/api/new-index.ts workers/api/index.ts -Force
npx wrangler secret put JWT_SECRET
npx wrangler deploy
npm run build
npx wrangler pages deploy out --project-name=PROJECT --commit-dirty=$true
```

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Website loads at `https://PROJECT.pages.dev`
- [ ] API responds at `/api/health`
- [ ] Can create user via `/api/auth/register`
- [ ] Can login via `/api/auth/login`
- [ ] Database has all tables
- [ ] File upload works
- [ ] All environment variables set

---

**🎉 You now have a repeatable process to deploy full-stack SaaS platforms in under 30 minutes!**
