# Leadership Suite

A complete productivity suite built with Next.js and Cloudflare, featuring documents, spreadsheets, presentations, file storage, photo management, calendar, email, video meetings, and task management.

## 🌟 Features

### Core Applications
- **Documents** - Word processor with templates
- **Sheets** - Spreadsheet with formulas and charts
- **Slides** - Presentation maker with themes
- **Drive** - File storage with folders
- **Photos** - Image gallery with albums
- **Gallery** - Brand asset management
- **Calendar** - Event scheduling
- **Mail** - Email client with folders
- **Meet** - Video conferencing
- **Tasks** - Kanban board with drag & drop

### Platform Features
- **AI Assistant** - Powered by Cloudflare Workers AI
- **Real-time Sync** - Instant updates across devices
- **File Upload** - R2 storage for unlimited files
- **Global CDN** - 300+ edge locations
- **Auto-scaling** - Handles any traffic level
- **Zero Maintenance** - Fully serverless

## 🚀 Quick Start

### 5-Minute Setup

```bash
# 1. Clone and install
git clone <your-repo-url>
cd leadership-legacy
npm install

# 2. Install and login to Wrangler
npm install -g wrangler
wrangler login

# 3. Create database
wrangler d1 create leadership-legacy-db
# Update wrangler.toml with database ID

# 4. Run migrations
wrangler d1 execute leadership-legacy-db --file=./schema/schema.sql
wrangler d1 execute leadership-legacy-db --file=./migrations/0002_create_suite_schema.sql
wrangler d1 execute leadership-legacy-db --file=./migrations/0003_insert_demo_user.sql

# 5. Create R2 bucket
wrangler r2 bucket create leadership-legacy-assets

# 6. Deploy
./deploy-suite.sh
```

Your suite is now live! 🎉

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- **[Deployment Guide](SUITE_DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Functionality Checklist](FUNCTIONALITY_CHECKLIST.md)** - All features documented
- **[Architecture Guide](CLOUDFLARE_DEPLOYMENT.md)** - Technical architecture

## 🏗️ Architecture

```
┌─────────────────┐
│  Next.js (Pages)│  ← Static frontend on Cloudflare Pages
└────────┬────────┘
         │ /api/*
         ↓
┌─────────────────┐
│ Cloudflare Worker│  ← API backend with business logic
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ↓         ↓          ↓          ↓
┌──────┐ ┌──────┐  ┌──────┐  ┌──────┐
│  D1  │ │  R2  │  │  KV  │  │  AI  │
│  DB  │ │ Files│  │Config│  │ Chat │
└──────┘ └──────┘  └──────┘  └──────┘
```

### Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (S3-compatible)
- **AI**: Cloudflare Workers AI
- **Animations**: Framer Motion

## 🛠️ Local Development

### Start Development Servers

```bash
# Option 1: Use the helper script
./scripts/dev-local.sh

# Option 2: Manual start (2 terminals)
Terminal 1: wrangler dev --port 8787
Terminal 2: npm run dev
```

Visit:
- Frontend: http://localhost:3000
- API: http://localhost:8787
- Suite: http://localhost:3000/suite

### Development Tools

```bash
# View Worker logs
wrangler tail

# Query D1 database
wrangler d1 execute leadership-legacy-db --command="SELECT * FROM users"

# List R2 files
wrangler r2 object list leadership-legacy-assets

# Check deployments
wrangler deployments list
```

## 📦 Project Structure

```
.
├── src/
│   ├── app/              # Next.js pages
│   │   ├── suite/        # Suite applications
│   │   │   ├── documents/
│   │   │   ├── sheets/
│   │   │   ├── slides/
│   │   │   ├── drive/
│   │   │   ├── photos/
│   │   │   ├── gallery/
│   │   │   ├── calendar/
│   │   │   ├── mail/
│   │   │   ├── meet/
│   │   │   └── tasks/
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── suite/        # Suite-specific components
│   │   └── shared/       # Shared components
│   └── lib/              # Utilities and API client
├── workers/
│   └── api/              # Cloudflare Worker
│       └── index.ts      # API routes
├── functions/            # Cloudflare Pages Functions
│   └── api/              # API proxy
├── migrations/           # Database migrations
├── public/               # Static assets
│   └── _routes.json      # Pages routing config
└── schema/               # Database schemas
```

## 🔧 Configuration

### Environment Variables

**Local Development** (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_R2_PUBLIC_BASE=https://pub-YOUR_ID.r2.dev/
```

**Production** (Cloudflare dashboard):
```bash
NEXT_PUBLIC_API_URL=https://your-worker.workers.dev
NEXT_PUBLIC_R2_PUBLIC_BASE=https://your-domain.com/r2/
```

### Secrets (Optional)

```bash
# Anthropic AI (optional, uses Cloudflare AI by default)
wrangler secret put ANTHROPIC_API_KEY

# Resend email (optional)
wrangler secret put RESEND_API_KEY
```

## 🧪 Testing

### Test Suite Functionality

Visit each app and test:
1. Create new items (documents, tasks, events, etc.)
2. Edit and update items
3. Delete items
4. File upload (Drive, Photos)
5. Drag & drop (Tasks board)
6. Search and filter
7. Sort options
8. View toggles (grid/list)

All features should work with the demo user (`demo-user`).

## 🚀 Deployment

### Automated Deployment

```bash
./deploy-suite.sh [project-name]
```

### Manual Deployment

```bash
# 1. Deploy Worker
wrangler deploy

# 2. Build Next.js
npm run build

# 3. Deploy Pages
npx wrangler pages deploy out --project-name=leadership-legacy
```

### Custom Domain

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to Custom domains
4. Add your domain
5. Cloudflare will automatically configure DNS

## 🔐 Security

### Authentication (Recommended for Production)

Add authentication using:
- **Cloudflare Access** - Zero Trust security
- **Auth0** - OAuth provider
- **Clerk** - Modern authentication
- **NextAuth.js** - Email/social auth

See `SUITE_DEPLOYMENT_GUIDE.md` for integration guides.

### Rate Limiting

Enable rate limiting in the Worker:

```typescript
// Add to workers/api/index.ts
const RATE_LIMIT = 100; // requests per minute
// Implement using Cloudflare Workers KV
```

## 📊 Monitoring

### Analytics
- Enable Cloudflare Web Analytics in dashboard
- Workers Analytics shows API usage
- D1 Analytics tracks database queries

### Logging
```bash
# Real-time logs
wrangler tail

# Worker metrics
wrangler metrics
```

## 🆘 Troubleshooting

### Common Issues

**API calls fail**
- Check `_routes.json` exists in `public/`
- Verify Worker URL in environment variables
- Ensure Worker is deployed: `wrangler deployments list`

**Database errors**
- Re-run migrations
- Check database ID in `wrangler.toml`
- Test connection: `wrangler d1 execute leadership-legacy-db --command="SELECT 1"`

**File uploads fail**
- Verify R2 bucket: `wrangler r2 bucket list`
- Check R2 binding in `wrangler.toml`
- Ensure CORS is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 🌐 Links

- **Demo**: [leadership-suite.pages.dev](https://leadership-suite.pages.dev)
- **Docs**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 💡 Features Roadmap

- [ ] Real-time collaboration
- [ ] Mobile apps (React Native)
- [ ] Advanced permissions
- [ ] Workflow automation
- [ ] Third-party integrations
- [ ] API webhooks
- [ ] Team workspaces
- [ ] Advanced analytics

## 🎉 Acknowledgments

Built with amazing open-source tools:
- Next.js
- React
- Cloudflare Workers
- TailwindCSS
- Framer Motion
- Lucide Icons

---

**Made with ❤️ by Leadership Legacy**

Deploy globally in minutes. Scale infinitely. Pay only for what you use.

🚀 **[Get Started Now](QUICK_START.md)** | 📚 **[Full Docs](SUITE_DEPLOYMENT_GUIDE.md)** | 🐛 **[Report Issues](https://github.com/your-repo/issues)**
