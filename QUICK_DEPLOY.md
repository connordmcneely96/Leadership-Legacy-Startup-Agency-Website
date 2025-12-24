# Quick Deploy Guide - Leadership Legacy to Cloudflare

## Current Status

✅ **Code is ready** - All backend code has been written and committed to git
❌ **Not yet deployed to Cloudflare** - Network issues prevented automatic deployment

The code is in your GitHub repository on branch `claude/cloudflare-migration-xN6lF` but needs to be deployed to Cloudflare infrastructure.

---

## Option 1: Automated Deploy (Recommended)

Run the provided deployment script:

```bash
cd ~/Leadership-Legacy-Startup-Agency-Website
./deploy.sh
```

This will:
1. Create D1 database
2. Create R2 bucket
3. Create KV namespace
4. Update wrangler.toml with IDs
5. Migrate database schema
6. Deploy Workers to Cloudflare

---

## Option 2: Manual Step-by-Step Deploy

If the script fails, run these commands manually:

### 1. Authenticate with Cloudflare

```bash
export CLOUDFLARE_API_TOKEN="mRSy_Mn3ajwGhyNp06KgQuaq4VhN3W_a5kL1-Km6"
export CLOUDFLARE_ACCOUNT_ID="d3dbdd3e1ebbc28edf0ce756d9841490"
```

### 2. Create D1 Database

```bash
wrangler d1 create leadership-legacy-db
```

**Output will show:**
```
database_id = "abc123def456..."
```

Copy this ID and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "leadership-legacy-db"
database_id = "PASTE_YOUR_ID_HERE"  # ← Replace this
```

### 3. Create R2 Bucket

```bash
wrangler r2 bucket create leadership-legacy-assets
```

### 4. Create KV Namespace

```bash
wrangler kv:namespace create LEADERSHIP_CONFIG
```

**Output will show:**
```
id = "xyz789abc123..."
```

Update `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "CONFIG"
id = "PASTE_YOUR_ID_HERE"  # ← Replace this
```

### 5. Migrate Database Schema

```bash
wrangler d1 execute leadership-legacy-db --file=./schema/full-schema.sql
```

This creates all 20+ tables for your SaaS platform.

### 6. Update Main Router

```bash
cp workers/api/index.ts workers/api/index.ts.backup
cp workers/api/new-index.ts workers/api/index.ts
```

### 7. Set Secrets

Generate a JWT secret:
```bash
# Generate random secret
openssl rand -base64 32

# Set it
wrangler secret put JWT_SECRET
# Paste the generated secret when prompted
```

Optional secrets (can be added later):
```bash
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put RESEND_API_KEY
```

### 8. Deploy to Cloudflare

```bash
wrangler deploy
```

**Success!** Your Workers are now live on Cloudflare's edge network.

---

## Option 3: Deploy via Cloudflare Dashboard

If CLI doesn't work, you can deploy via the web dashboard:

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages**
3. Click **Create Application** → **Create Worker**
4. Name it `leadership-legacy`
5. Click **Deploy**
6. Click **Quick Edit**
7. Copy the contents of `workers/api/index.ts` (after running step 6 above)
8. Paste into the editor and click **Save and Deploy**

Then manually create:
- **D1 Database**: Workers → D1 → Create Database
- **R2 Bucket**: R2 → Create Bucket
- **KV Namespace**: Workers → KV → Create Namespace

---

## Testing Your Deployment

Once deployed, test the health endpoint:

```bash
curl https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "2.0.0",
  "timestamp": "2025-12-24T22:20:00.000Z"
}
```

### Test Authentication

```bash
# Register a user
curl -X POST https://YOUR_WORKER_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@leadershiplegacy.com",
    "password": "SecurePass123!",
    "firstName": "Admin",
    "lastName": "User"
  }'

# Login
curl -X POST https://YOUR_WORKER_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@leadershiplegacy.com",
    "password": "SecurePass123!"
  }'
```

---

## What's Deployed

Once deployed, you'll have:

✅ **30+ API endpoints** for authentication, clients, projects, invoices, time tracking
✅ **20+ database tables** with full SaaS schema
✅ **Role-based access control** (admin, team, client)
✅ **JWT authentication** with magic links
✅ **Stripe integration** ready for payments
✅ **Global edge deployment** across 300+ Cloudflare locations

---

## Files Reference

- `deploy.sh` - Automated deployment script
- `IMPLEMENTATION_SUMMARY.md` - Complete API documentation
- `MIGRATION_PLAN.md` - Architecture and roadmap
- `schema/full-schema.sql` - Database schema (20+ tables)
- `workers/api/new-index.ts` - Main API router
- `workers/api/routes/` - All endpoint handlers
- `workers/api/middleware/auth.ts` - Authentication middleware
- `workers/api/utils/` - Crypto and validation utilities

---

## Troubleshooting

### "fetch failed" error
- **Cause**: Network/proxy issue
- **Solution**: Use Cloudflare dashboard (Option 3) or run from local machine

### "database not found" error
- **Cause**: D1 database not created or ID not updated in wrangler.toml
- **Solution**: Re-run step 2 and verify ID in wrangler.toml

### "Invalid JWT" error
- **Cause**: JWT_SECRET not set
- **Solution**: Run `wrangler secret put JWT_SECRET`

### "Unauthorized" error
- **Cause**: API token expired or invalid
- **Solution**: Get new token from Cloudflare dashboard → My Profile → API Tokens

---

## Next Steps After Deployment

1. **Set up custom domain** in Cloudflare dashboard
2. **Configure Stripe webhooks** pointing to `/api/stripe/webhook`
3. **Add team members** via the API
4. **Deploy frontend** to Cloudflare Pages
5. **Set up monitoring** and alerts
6. **Configure email service** (Resend/Mailgun)

---

## Support

- **API Documentation**: See `IMPLEMENTATION_SUMMARY.md`
- **Architecture Details**: See `MIGRATION_PLAN.md`
- **Cloudflare Docs**: https://developers.cloudflare.com
- **GitHub Branch**: `claude/cloudflare-migration-xN6lF`

---

**Status**: Ready to deploy ✨
**Estimated Deploy Time**: 10-15 minutes
**Complexity**: Moderate (step-by-step instructions provided)
