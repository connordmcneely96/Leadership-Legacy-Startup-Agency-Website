# Claude Prompt Template for SaaS Platform Migration

Copy and paste this prompt to Claude Code to replicate this entire SaaS platform deployment for any project.

---

## 🎯 Master Prompt (Copy This)

```
I want to transform my website into a complete full-stack SaaS platform using Cloudflare infrastructure.

PROJECT DETAILS:
- Project Name: [YOUR_PROJECT_NAME]
- GitHub Repository: [YOUR_GITHUB_URL]
- Current State: [static website / Next.js app / WordPress / etc.]
- Target Branch: claude/saas-migration-[RANDOM_ID]

REQUIRED FEATURES:

1. Authentication System:
   - Email/password login with PBKDF2 hashing (100,000 iterations)
   - Passwordless magic link authentication
   - JWT token-based sessions
   - Role-based access control (admin, team, client)
   - Session management via Cloudflare KV

2. Database (Cloudflare D1 - SQLite):
   - Users table with roles
   - Sessions table
   - Magic links table
   - Clients table (company management)
   - Projects table with status tracking
   - Project milestones
   - Project comments
   - Invoices table
   - Invoice items (line items)
   - Time entries (billable/non-billable)
   - Files metadata
   - Services catalog
   - Notifications
   - Email tracking
   - Analytics
   - AI request tracking (for future AI features)
   - RAG documents table (for AI knowledge base)

3. RESTful API Endpoints (30+):

   Authentication:
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/auth/magic-link
   - POST /api/auth/verify-magic-link
   - POST /api/auth/logout
   - GET /api/auth/me

   Client Management:
   - GET /api/clients (list with pagination)
   - POST /api/clients (create)
   - GET /api/clients/:id (get details)
   - PUT /api/clients/:id (update)
   - DELETE /api/clients/:id (soft delete)

   Project Management:
   - GET /api/projects (list with filters)
   - POST /api/projects (create)
   - GET /api/projects/:id (get details)
   - PUT /api/projects/:id (update)
   - DELETE /api/projects/:id (delete)
   - POST /api/projects/:id/milestones (add milestone)
   - PUT /api/projects/:id/milestones/:milestoneId (update milestone)
   - POST /api/projects/:id/comments (add comment)

   Invoicing:
   - GET /api/invoices (list with status filter)
   - POST /api/invoices (create with line items)
   - GET /api/invoices/:id (get details)
   - PUT /api/invoices/:id (update)
   - DELETE /api/invoices/:id (cancel)
   - POST /api/invoices/:id/send (send to client)
   - POST /api/webhooks/stripe (Stripe payment webhook)

   Time Tracking:
   - GET /api/time-entries (list with filters)
   - POST /api/time-entries (create)
   - GET /api/time-entries/:id (get details)
   - PUT /api/time-entries/:id (update)
   - DELETE /api/time-entries/:id (delete if not invoiced)

   File Management:
   - POST /api/files/upload (upload to R2)
   - GET /api/files/:id (download from R2)
   - DELETE /api/files/:id (delete from R2)

   AI Services (infrastructure only, for future integration):
   - POST /api/ai/chat
   - POST /api/ai/analyze
   - POST /api/ai/generate

   System:
   - GET /api/health (health check with DB connection test)

4. Security & Middleware:
   - Authentication middleware (requireAuth)
   - Role-based authorization (requireRole, requireAdmin, requireTeam)
   - Input validation for all endpoints
   - SQL injection prevention (prepared statements)
   - CORS configuration
   - Rate limiting ready (via KV)

5. Infrastructure Setup:

   Cloudflare Workers:
   - TypeScript-based API
   - Edge computing (global deployment)
   - Serverless architecture

   Cloudflare D1:
   - SQLite database at edge
   - Complete schema with indexes
   - Seed data (default admin user)

   Cloudflare R2:
   - Object storage for files/documents
   - Image uploads
   - Document storage

   Cloudflare KV:
   - Session storage
   - Cache layer
   - Rate limiting data

   Cloudflare Pages:
   - Frontend hosting
   - Next.js static export
   - Global CDN

6. Deployment Automation:
   - Bash script for Linux/Mac (deploy-turnkey.sh)
   - PowerShell script for Windows (deploy-turnkey.ps1)
   - Auto-generate wrangler.toml with resource IDs
   - Auto-generate JWT secret
   - One-command deployment

7. Documentation:
   - Complete API documentation with curl examples
   - Database schema documentation
   - Deployment guide (step-by-step)
   - Testing guide
   - Troubleshooting guide
   - Turnkey deployment guide for future projects

TECHNICAL REQUIREMENTS:

Backend:
- Language: TypeScript
- Runtime: Cloudflare Workers
- Framework: Hono or vanilla Workers API
- Authentication: JWT with HMAC-SHA256
- Password Hashing: PBKDF2 (Workers-compatible, NOT bcrypt)
- Database: Cloudflare D1 with proper indexes
- File Storage: Cloudflare R2
- Sessions: Cloudflare KV

Frontend:
- Framework: Next.js 16+ with App Router
- Build: Static export (export: true)
- Styling: Tailwind CSS
- Deployment: Cloudflare Pages

Security:
- All passwords hashed with PBKDF2
- JWT secrets stored in Cloudflare Secrets
- Role-based access control on all endpoints
- Input validation on all user inputs
- SQL injection prevention
- XSS protection
- CSRF protection for state-changing operations

Database Design:
- Proper foreign keys
- Indexes on frequently queried columns
- Timestamps (created_at, updated_at) on all tables
- Soft deletes where appropriate
- Default values for status fields

DELIVERABLES:

1. Complete database schema (schema/full-schema.sql)
2. All API route handlers (workers/api/routes/*.ts)
3. Authentication utilities (workers/api/utils/crypto.ts)
4. Middleware (workers/api/middleware/auth.ts)
5. Main API router (workers/api/new-index.ts)
6. Deployment scripts (deploy-turnkey.sh, deploy-turnkey.ps1)
7. Configuration (wrangler.toml template)
8. Comprehensive documentation:
   - FULL_PROJECT_SUMMARY.md
   - TURNKEY_DEPLOYMENT_GUIDE.md
   - IMPLEMENTATION_SUMMARY.md
   - API_TESTING_GUIDE.md

WORKFLOW:

1. Create feature branch: claude/saas-migration-[RANDOM_ID]
2. Analyze existing codebase
3. Create complete database schema with all tables
4. Build all API endpoints with proper authentication
5. Create middleware and utilities
6. Write deployment automation scripts
7. Create comprehensive documentation
8. Commit all changes to feature branch
9. Provide deployment instructions

IMPORTANT NOTES:

- Use PBKDF2 for password hashing (NOT bcrypt - Workers doesn't support it)
- JWT secret should be stored in Cloudflare Secrets (not in code)
- All endpoints should have proper error handling
- Use prepared statements for all SQL queries
- Include proper TypeScript types
- Follow REST conventions
- Include pagination for list endpoints
- Add proper indexes to database schema
- Test all critical paths

Please start by:
1. Creating the feature branch
2. Analyzing the current codebase structure
3. Creating the complete database schema
4. Building the authentication system
5. Creating all API endpoints
6. Writing deployment automation
7. Creating documentation

When complete, provide:
- Summary of all files created/modified
- Deployment instructions
- Testing examples with curl
- Next steps for production
```

---

## 📝 Customization Options

### For E-commerce Projects:
Add to the prompt:
```
Additional Features:
- Products catalog
- Shopping cart
- Orders management
- Payment processing (Stripe)
- Inventory tracking
- Shipping integration
```

### For Membership Sites:
Add to the prompt:
```
Additional Features:
- Subscription management
- Content access control
- Member tiers/levels
- Recurring billing
- Content library
```

### For Agency/Freelancer Platforms:
Add to the prompt:
```
Additional Features:
- Portfolio management
- Client onboarding
- Proposal generator
- Contract management
- Payment milestones
```

### For SaaS Products:
Add to the prompt:
```
Additional Features:
- Multi-tenancy
- Team workspaces
- Usage analytics
- Billing/subscriptions
- API keys management
- Webhooks system
```

---

## 🎨 Follow-up Prompts

### After Initial Build:

**To add Stripe integration:**
```
Please integrate Stripe for payment processing:
1. Add Stripe webhook handler for invoice payments
2. Create subscription management endpoints
3. Add customer portal integration
4. Handle payment success/failure
5. Update invoice status automatically
```

**To add email functionality:**
```
Please add email functionality using Resend/SendGrid:
1. Email service wrapper
2. Invoice email templates
3. Magic link email templates
4. Notification emails
5. Email tracking in database
```

**To connect frontend:**
```
Please create React components to connect the frontend to the API:
1. Authentication forms (login, register)
2. Client dashboard
3. Project management interface
4. Invoice viewer
5. Time tracking UI
6. File upload components
```

**To add AI features:**
```
Please implement AI features using OpenAI/Anthropic:
1. Connect to OpenAI/Anthropic API
2. Chat interface with context
3. Document analysis
4. Content generation
5. RAG implementation for knowledge base
```

---

## 🔍 Verification Prompts

**To test the deployment:**
```
Please create a comprehensive testing guide with:
1. Curl commands for all API endpoints
2. Example request/response payloads
3. Authentication flow testing
4. Error case testing
5. Database query examples
```

**To review security:**
```
Please review the security of this implementation:
1. Check authentication implementation
2. Verify authorization on all endpoints
3. Review SQL injection prevention
4. Check for XSS vulnerabilities
5. Verify JWT implementation
6. Review password hashing
```

---

## 📦 Export This Setup

**To make it reusable:**
```
Please create a GitHub template repository from this project:
1. Remove project-specific content
2. Add placeholders for customization
3. Create setup wizard script
4. Add example .env.example file
5. Create detailed README for template usage
```

---

## 🚀 Quick Start Example

Here's a complete example for a real project:

```
I want to transform my photography portfolio website into a complete client portal SaaS platform using Cloudflare infrastructure.

PROJECT DETAILS:
- Project Name: photography-hub
- GitHub Repository: https://github.com/myusername/photography-site
- Current State: Static Next.js website with portfolio galleries
- Target Branch: claude/saas-migration-ph8x2

REQUIRED FEATURES:
[... copy the full master prompt above ...]

ADDITIONAL CUSTOM FEATURES:
- Photo galleries with client-specific access
- Photo approval workflow (client can approve/request changes)
- High-resolution download tracking
- Watermark management
- Album creation and organization
- Photo comments/feedback system

Please start implementation following the workflow above.
```

---

## ✅ Success Checklist

After Claude completes the work, verify:

- [ ] Database schema created with 20+ tables
- [ ] 30+ API endpoints implemented
- [ ] Authentication system working (JWT + magic links)
- [ ] Middleware for authorization
- [ ] Deployment scripts created (both bash and PowerShell)
- [ ] wrangler.toml configured
- [ ] All files committed to feature branch
- [ ] Documentation complete (4+ markdown files)
- [ ] Curl examples provided for testing
- [ ] Deployment instructions clear and tested

---

## 📊 Expected Timeline

With Claude Code:
- Initial setup and planning: 5 minutes
- Database schema creation: 3 minutes
- API endpoint implementation: 10 minutes
- Authentication system: 5 minutes
- Deployment scripts: 3 minutes
- Documentation: 4 minutes

**Total: ~30 minutes** from prompt to fully deployed SaaS platform

---

## 💡 Tips for Best Results

1. **Be Specific**: Include exact feature requirements
2. **Mention Technology**: Specify Cloudflare, D1, R2, KV, Workers
3. **List Tables**: Mention specific database tables you need
4. **Include Examples**: Reference this project as an example
5. **Request Docs**: Always ask for comprehensive documentation
6. **Ask for Scripts**: Request automated deployment scripts
7. **Specify Security**: Mention PBKDF2, JWT, role-based auth
8. **Request Testing**: Ask for curl examples and testing guide

---

## 🔄 Iterative Improvement Prompts

After deployment, use these to enhance:

**Performance optimization:**
```
Please optimize this deployment for performance:
1. Add caching layer using KV
2. Optimize database queries with proper indexes
3. Add CDN caching headers
4. Implement request batching
5. Add database connection pooling
```

**Add monitoring:**
```
Please add monitoring and observability:
1. Error tracking integration
2. Performance metrics
3. API usage analytics
4. Database query logging
5. User activity tracking
```

**Scale for production:**
```
Please prepare this for production scaling:
1. Add rate limiting per user
2. Implement request queuing
3. Add database backups
4. Set up staging environment
5. Add health check endpoints
6. Configure alerting
```

---

**🎉 You now have a complete template to create full-stack SaaS platforms in under 30 minutes!**
