# Leadership Suite - Complete Deployment Guide

This guide will help you deploy the complete Leadership Suite with all functionality enabled using Cloudflare.

## Architecture Overview

The Leadership Suite uses a modern Cloudflare-native architecture:

- **Frontend**: Next.js static site deployed to Cloudflare Pages
- **Backend API**: Cloudflare Worker with D1 Database
- **Storage**: Cloudflare R2 for file uploads
- **AI**: Cloudflare Workers AI for the assistant

## Prerequisites

1. Cloudflare account (free tier works for development)
2. Node.js 18+ and npm installed
3. Wrangler CLI installed: `npm install -g wrangler`
4. Authenticated with Wrangler: `wrangler login`

## Step 1: Set Up the Database

### Create D1 Database

```bash
# Create the database
wrangler d1 create leadership-legacy-db

# Note the database ID from the output and update wrangler.toml
```

### Run Migrations

```bash
# Run the initial schema
wrangler d1 execute leadership-legacy-db --file=./schema/schema.sql

# Run suite schema
wrangler d1 execute leadership-legacy-db --file=./migrations/0002_create_suite_schema.sql

# Insert demo user and sample data
wrangler d1 execute leadership-legacy-db --file=./migrations/0003_insert_demo_user.sql
```

## Step 2: Set Up R2 Storage

```bash
# Create R2 bucket for file storage
wrangler r2 bucket create leadership-legacy-assets

# Enable public access (optional, for serving uploaded files)
# Configure this in the Cloudflare dashboard under R2
```

## Step 3: Configure Environment Variables

### Update wrangler.toml

Replace placeholders in `wrangler.toml`:
- `database_id`: Your D1 database ID
- `account_id`: Your Cloudflare account ID

### Update .env.local (for local development)

```bash
cp .env.local .env.local.example
# Edit .env.local with your values
```

### Set Secrets (Optional)

For AI assistant with Anthropic (optional, uses Cloudflare AI by default):

```bash
wrangler secret put ANTHROPIC_API_KEY
# Enter your Anthropic API key when prompted
```

For email functionality with Resend (optional):

```bash
wrangler secret put RESEND_API_KEY
# Enter your Resend API key when prompted
```

## Step 4: Deploy the Worker (Backend)

```bash
# Deploy the API worker
wrangler deploy

# Note the worker URL from the output (e.g., leadership-legacy.YOUR_SUBDOMAIN.workers.dev)
```

## Step 5: Configure Pages Functions

Update `wrangler-pages.toml` with your Worker URL:

```toml
[env.production.vars]
WORKER_URL = "https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev"
```

## Step 6: Build and Deploy the Frontend

```bash
# Install dependencies
npm install

# Build the Next.js static site
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=leadership-legacy

# Or use the Cloudflare dashboard to connect your Git repository
```

## Step 7: Configure Pages Project

In the Cloudflare dashboard:

1. Go to Pages → Your Project → Settings
2. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your worker URL (or leave empty to use relative `/api`)
   - `NEXT_PUBLIC_R2_PUBLIC_BASE`: Your R2 public URL (if using public bucket)

3. Set build configuration:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`

## Step 8: Test the Deployment

1. Visit your Pages URL (e.g., `leadership-legacy.pages.dev`)
2. Navigate to `/suite` to access the suite dashboard
3. Test each app:
   - Documents: Create, edit, delete documents
   - Sheets: Create spreadsheets
   - Slides: Create presentations
   - Drive: Upload files (requires R2 configuration)
   - Photos: Upload images
   - Gallery: Create albums
   - Calendar: Create events
   - Mail: Send emails (mock functionality)
   - Meet: Create meetings
   - Tasks: Manage tasks in Kanban board

## Local Development

### Start the Worker locally

```bash
# Terminal 1: Start the Worker
wrangler dev

# This starts the API at http://localhost:8787
```

### Start the Next.js dev server

```bash
# Terminal 2: Start Next.js
npm run dev

# This starts the frontend at http://localhost:3000
```

The Next.js app will proxy `/api/*` requests to the Worker automatically in development.

## Troubleshooting

### API calls fail with CORS errors

- Ensure `_routes.json` is in the `public` folder
- Check that the Worker URL is correct in environment variables
- Verify CORS headers are enabled in the Worker (they are by default)

### Database errors

- Run migrations again: `wrangler d1 execute leadership-legacy-db --file=./migrations/0002_create_suite_schema.sql`
- Check database binding name matches in `wrangler.toml` and code

### File uploads fail

- Verify R2 bucket exists: `wrangler r2 bucket list`
- Check R2 binding in `wrangler.toml`
- Ensure bucket name matches in configuration

### AI Assistant not working

- Check if Cloudflare AI binding is configured
- Verify the AI model name is correct: `@cf/meta/llama-3.1-8b-instruct`
- Check Worker logs: `wrangler tail`

## Production Checklist

- [ ] Database migrations run successfully
- [ ] R2 bucket created and configured
- [ ] Worker deployed and accessible
- [ ] Pages site deployed
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] SSL/TLS enabled (automatic with Cloudflare)
- [ ] All suite apps tested
- [ ] Demo user can access all features

## Architecture Benefits

This architecture provides:

- **Global Performance**: Cloudflare's edge network serves static assets from 300+ locations
- **Scalability**: Workers scale automatically to handle traffic
- **Low Cost**: Free tier includes 100k requests/day
- **Security**: Built-in DDoS protection and Web Application Firewall
- **Simplicity**: No servers to manage, automatic HTTPS

## Next Steps

1. **Customize Branding**: Update colors, logos, and text in the suite
2. **Add Authentication**: Integrate with Cloudflare Access or Auth0
3. **Enable Analytics**: Set up Cloudflare Web Analytics
4. **Custom Domain**: Configure your domain in Cloudflare Pages settings
5. **Rate Limiting**: Enable rate limiting in Worker for production

## Support

For issues or questions:
- Check Cloudflare Workers documentation: https://developers.cloudflare.com/workers/
- Review Next.js documentation: https://nextjs.org/docs
- Check project repository issues

---

Congratulations! Your Leadership Suite is now fully functional and deployed on Cloudflare's edge network.
