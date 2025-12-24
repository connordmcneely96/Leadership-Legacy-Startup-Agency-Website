# 📱 Run This in Your Codespaces Terminal

Since you're on mobile, here's the **single command** to deploy everything:

## ✨ One Command Deploy

```bash
./deploy-auto.sh
```

That's it! This will:
1. ✅ Get your existing D1 database ID
2. ✅ Get your existing KV namespace ID
3. ✅ Create R2 bucket if needed
4. ✅ Update wrangler.toml automatically
5. ✅ Run database migration (20+ tables)
6. ✅ Replace the main router
7. ✅ Generate and set JWT_SECRET
8. ✅ Deploy Workers to Cloudflare
9. ✅ Give you the API URL

## Expected Output

You'll see:
```
🚀 Leadership Legacy - Automated Cloudflare Deployment
============================================

Step 1: Setting Cloudflare credentials...
✓ Credentials set

Step 2: Getting D1 Database ID...
✓ D1 Database ID: abc-123-def...

Step 3: Creating R2 Bucket...
✓ R2 Bucket ready

Step 4: Getting KV Namespace ID...
✓ KV Namespace ID: xyz789...

Step 5: Updating wrangler.toml...
✓ Updated D1 database_id
✓ Updated KV namespace id

Step 6: Running database migration...
✓ Database schema migrated

Step 7: Updating main API router...
✓ Updated to new comprehensive router

Step 8: Setting JWT_SECRET...
✓ JWT_SECRET set

Step 9: Deploying Workers to Cloudflare...
✓ Workers deployed!

============================================
🎉 Deployment Complete!
============================================

Your API is now live!
```

## After Deployment

Test your API:
```bash
curl https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev/api/health
```

You should see:
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "2.0.0",
  "timestamp": "2025-12-24T..."
}
```

## What's Deployed

✅ **30+ API endpoints** for your full SaaS platform
✅ **20+ database tables** with complete schema
✅ **Authentication system** (JWT + magic links)
✅ **Client management** (CRUD operations)
✅ **Project tracking** (milestones, comments, status)
✅ **Invoicing system** (Stripe-ready)
✅ **Time tracking** (billable hours)
✅ **Global edge deployment** (300+ Cloudflare locations)

## Optional: Set More Secrets Later

When you want to add Stripe, OpenAI, etc:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put ANTHROPIC_API_KEY
```

---

**That's it! Just run `./deploy-auto.sh` and you're done! 🚀**
