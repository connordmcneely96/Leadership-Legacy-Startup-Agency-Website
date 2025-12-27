# Leadership Suite - Quick Start Guide

Get the Leadership Suite running in minutes with Cloudflare.

## 🚀 Fastest Way to Deploy

### Prerequisites
- Cloudflare account (free tier works)
- Node.js 18+ installed
- Git installed

### 1-Minute Setup

```bash
# Clone and install
git clone <your-repo-url>
cd leadership-legacy
npm install

# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### Database Setup (2 minutes)

```bash
# Create D1 database
wrangler d1 create leadership-legacy-db

# Update wrangler.toml with the database ID from output

# Run migrations
wrangler d1 execute leadership-legacy-db --file=./schema/schema.sql
wrangler d1 execute leadership-legacy-db --file=./migrations/0002_create_suite_schema.sql
wrangler d1 execute leadership-legacy-db --file=./migrations/0003_insert_demo_user.sql
```

### R2 Storage Setup (1 minute)

```bash
# Create R2 bucket
wrangler r2 bucket create leadership-legacy-assets
```

### Deploy Everything (2 minutes)

```bash
# Deploy with one command
./deploy-suite.sh

# Or manually:
wrangler deploy                    # Deploy Worker (API)
npm run build                      # Build Next.js
npx wrangler pages deploy out --project-name=leadership-legacy
```

### Access Your Suite

1. Visit the Pages URL shown in the deploy output
2. Navigate to `/suite`
3. Login with demo user credentials (auto-configured)

## 🏠 Local Development

```bash
# Start both servers
./scripts/dev-local.sh

# Or manually in separate terminals:
Terminal 1: wrangler dev --port 8787
Terminal 2: npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:8787
- Suite: http://localhost:3000/suite

## 📱 Test All Features

### Documents
- ✅ Create new documents
- ✅ Edit and save
- ✅ Star favorites
- ✅ Sort and filter

### Sheets
- ✅ Create spreadsheets
- ✅ Import CSV
- ✅ Grid/list views

### Slides
- ✅ Create presentations
- ✅ Templates
- ✅ Preview slides

### Drive
- ✅ Upload files
- ✅ Create folders
- ✅ Move/rename files
- ✅ Storage quota tracking

### Photos
- ✅ Upload images
- ✅ Gallery grid
- ✅ Albums

### Calendar
- ✅ Create events
- ✅ Month/week/day views
- ✅ Event details

### Mail
- ✅ Compose emails
- ✅ Save drafts
- ✅ Inbox management
- ✅ Read/unread status

### Meet
- ✅ Create meetings
- ✅ Join by code
- ✅ Schedule meetings

### Tasks
- ✅ Kanban board
- ✅ Drag & drop
- ✅ Status tracking
- ✅ Priority levels

## 🎨 Customization

### Branding
Edit `src/app/globals.css` for colors and themes.

### Add Authentication
See `SUITE_DEPLOYMENT_GUIDE.md` for auth integration.

### Custom Domain
Configure in Cloudflare Pages dashboard.

## 🐛 Troubleshooting

### API calls return 404
- Check `_routes.json` is in `public` folder
- Verify Worker URL in environment variables
- Check Worker is deployed: `wrangler deployments list`

### Database errors
- Ensure migrations ran successfully
- Check database ID in `wrangler.toml`
- Test query: `wrangler d1 execute leadership-legacy-db --command="SELECT * FROM users"`

### File uploads fail
- Verify R2 bucket exists: `wrangler r2 bucket list`
- Check R2 binding in `wrangler.toml`

## 📚 Next Steps

1. **Security**: Add authentication (Cloudflare Access, Auth0)
2. **Analytics**: Enable Cloudflare Web Analytics
3. **Monitoring**: Set up Workers Analytics
4. **Custom Domain**: Configure in Pages settings
5. **Rate Limiting**: Add Worker rate limiting

## 🎉 You're Done!

Your Leadership Suite is now live on Cloudflare's global network with:
- ✅ 300+ edge locations
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Auto-scaling
- ✅ Zero servers to manage

## 💡 Tips

- Use `wrangler tail` to view Worker logs in real-time
- Use `wrangler dev --local` for faster local development
- Check `wrangler deployments list` to see deployment history
- Use D1 console in dashboard for database management

## 🆘 Need Help?

- Check `SUITE_DEPLOYMENT_GUIDE.md` for detailed instructions
- Visit Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Review Next.js docs: https://nextjs.org/docs

---

Built with ❤️ using Cloudflare Workers, Pages, D1, and R2
