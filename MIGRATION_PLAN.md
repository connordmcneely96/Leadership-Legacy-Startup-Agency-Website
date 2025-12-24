# Leadership Legacy - Full-Stack Cloudflare Migration Plan

## Executive Summary

Transform Leadership Legacy from a marketing website into a complete SaaS platform with client portal, project management, invoicing, AI services, and internal operations tools—all powered by Cloudflare's edge infrastructure.

---

## Current State Assessment

### ✅ Already Implemented
- Next.js 16 marketing website with Clay-inspired design
- Basic Cloudflare infrastructure (Workers, D1, R2, KV)
- Basic API endpoints (contact, analytics, newsletter)
- Dashboard UI components (business & developer tabs)
- Brand design system (Navy #1A1A2E, Gold #C9A227)

### 🚧 Missing Features (To Be Built)
1. **Authentication & Authorization**
   - User registration/login
   - Session management
   - Role-based access control (admin, client, team)

2. **Client Portal**
   - Project tracking
   - Invoice viewing
   - File downloads
   - Communication thread

3. **Project Management**
   - CRUD operations
   - Status workflows (inquiry → in progress → review → completed)
   - Time tracking
   - Deliverables management

4. **Financial System**
   - Stripe integration
   - Invoice generation
   - Payment tracking
   - Proposal generation

5. **Team Operations**
   - Team member management
   - Time tracking
   - Internal notes
   - CRM features

6. **AI Services**
   - OpenAI/Anthropic integration
   - AI Gateway configuration
   - Vectorize for RAG
   - MCP protocol support

7. **File Management**
   - R2 upload/download handlers
   - Signed URL generation
   - File organization by project

---

## Architecture Design

### Database Schema (D1)

```sql
-- Core Schema Tables:
- users (authentication, roles, profiles)
- sessions (auth sessions, tokens)
- clients (client organizations)
- team_members (internal team)
- projects (project lifecycle)
- project_milestones (deliverable tracking)
- invoices (billing)
- invoice_items (line items)
- proposals (sales documents)
- time_entries (time tracking)
- files (R2 metadata)
- notes (internal CRM notes)
- ai_requests (AI usage tracking)
```

### API Endpoints (Workers)

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/magic-link
GET    /api/auth/me

Clients:
GET    /api/clients
POST   /api/clients
GET    /api/clients/:id
PUT    /api/clients/:id
DELETE /api/clients/:id

Projects:
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/projects/:id/milestones

Invoices:
GET    /api/invoices
POST   /api/invoices
GET    /api/invoices/:id
POST   /api/invoices/:id/send
POST   /api/stripe/webhook

Proposals:
GET    /api/proposals
POST   /api/proposals
GET    /api/proposals/:id
POST   /api/proposals/:id/generate-pdf

Files:
POST   /api/files/upload
GET    /api/files/:id
GET    /api/files/:id/download
DELETE /api/files/:id

AI Services:
POST   /api/ai/chat
POST   /api/ai/rag-query
POST   /api/ai/embeddings
GET    /api/ai/usage

Time Tracking:
GET    /api/time-entries
POST   /api/time-entries
PUT    /api/time-entries/:id
DELETE /api/time-entries/:id
```

### Cloudflare Services Usage

| Service | Purpose | Examples |
|---------|---------|----------|
| **Pages** | Frontend hosting | Marketing site, client portal |
| **Workers** | API backend | All business logic |
| **D1** | Relational data | Users, projects, invoices |
| **R2** | Object storage | Files, images, PDFs |
| **KV** | Key-value cache | Sessions, config, rate limits |
| **AI Gateway** | LLM proxy | OpenAI/Anthropic requests |
| **Vectorize** | Vector DB | RAG embeddings |
| **Queues** | Background jobs | Email sending, PDF generation |
| **Durable Objects** | Stateful services | Real-time chat (future) |

---

## Implementation Phases

### Phase 1: Foundation (Database & Auth)
**Timeline: Days 1-2**

- [ ] Create comprehensive D1 schema
- [ ] Implement user authentication system
- [ ] Set up session management with KV
- [ ] Create role-based middleware
- [ ] Test auth flows

**Deliverables:**
- `schema/full-schema.sql` with all tables
- `workers/api/auth/` authentication handlers
- `workers/api/middleware/` auth & rate limiting
- Login/register frontend components

### Phase 2: Core Business APIs
**Timeline: Days 3-4**

- [ ] Build clients API (CRUD)
- [ ] Build projects API (CRUD + workflows)
- [ ] Build invoices API (CRUD + Stripe integration)
- [ ] Build proposals API (CRUD + generation)
- [ ] Build time tracking API
- [ ] Build team management API

**Deliverables:**
- Full CRUD endpoints for all entities
- Stripe webhook handler
- Invoice/proposal PDF generation
- Data validation with Zod

### Phase 3: File Management & R2
**Timeline: Day 5**

- [ ] R2 upload handler with multipart support
- [ ] Signed URL generation for downloads
- [ ] File metadata storage in D1
- [ ] File organization by project
- [ ] Image optimization

**Deliverables:**
- File upload API
- Secure download URLs
- Frontend file upload component
- R2 bucket structure

### Phase 4: AI Services Integration
**Timeline: Days 6-7**

- [ ] AI Gateway setup
- [ ] OpenAI API integration
- [ ] Anthropic API integration
- [ ] Vectorize setup for RAG
- [ ] Embedding generation
- [ ] RAG query endpoint
- [ ] AI usage tracking

**Deliverables:**
- AI proxy endpoints
- RAG knowledge base system
- AI usage dashboard
- Cost tracking

### Phase 5: Frontend Integration
**Timeline: Days 8-9**

- [ ] Connect dashboard to APIs
- [ ] Build client portal pages
- [ ] Implement auth UI
- [ ] Build project management UI
- [ ] Build invoice viewing UI
- [ ] Build file upload/download UI

**Deliverables:**
- Functional client portal
- Admin dashboard
- API client library
- React hooks for data fetching

### Phase 6: Advanced Features
**Timeline: Days 10-11**

- [ ] Email notifications (Resend/Mailgun)
- [ ] Background job processing with Queues
- [ ] Advanced analytics
- [ ] Search functionality
- [ ] Export features (CSV, PDF)

**Deliverables:**
- Email service integration
- Queue workers
- Analytics dashboard
- Export utilities

### Phase 7: Testing & Deployment
**Timeline: Days 12-13**

- [ ] API endpoint testing
- [ ] Frontend component testing
- [ ] End-to-end user flows
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

**Deliverables:**
- Test suite
- Performance benchmarks
- Security checklist
- Deployment documentation

---

## Database Schema Preview

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT, -- NULL for magic link only
  role TEXT NOT NULL DEFAULT 'client', -- admin, team, client
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company_id INTEGER, -- References clients table
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  client_id INTEGER NOT NULL,
  status TEXT DEFAULT 'inquiry', -- inquiry, in_progress, review, completed, archived
  tier TEXT DEFAULT 'standard', -- basic, standard, premium
  budget REAL,
  progress INTEGER DEFAULT 0,
  deadline DATE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  client_id INTEGER NOT NULL,
  project_id INTEGER,
  subtotal REAL NOT NULL,
  tax REAL DEFAULT 0,
  total REAL NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  due_date DATE,
  paid_date DATE,
  stripe_invoice_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

---

## Security Considerations

### Authentication
- Magic link authentication (passwordless)
- Optional password auth with bcrypt hashing
- JWT tokens stored in HTTP-only cookies
- Session management via KV (30-day expiry)

### Authorization
- Role-based access control (RBAC)
- Middleware checks on all protected routes
- Clients can only view their own data
- Team members have project-based access
- Admins have full access

### Data Protection
- All API requests over HTTPS
- SQL injection prevention (prepared statements)
- XSS protection (Content Security Policy)
- CSRF tokens for state-changing operations
- Rate limiting on all endpoints

### File Security
- Signed URLs for R2 downloads (1-hour expiry)
- File type validation
- Virus scanning (future: Cloudflare Gateway)
- Access control based on project membership

---

## Performance Targets

- **API Response Time**: < 200ms (p95)
- **Page Load Time**: < 1.5s (FCP)
- **Database Query Time**: < 50ms (p95)
- **File Upload Speed**: 5MB/s minimum
- **Concurrent Users**: 1000+
- **Uptime SLA**: 99.9%

---

## Monitoring & Analytics

### Metrics to Track
- API endpoint latency
- Error rates by endpoint
- Database query performance
- R2 upload/download speeds
- AI API usage and costs
- User activity patterns
- Revenue metrics

### Tools
- Cloudflare Web Analytics
- Workers Analytics Engine
- Custom D1 analytics tables
- Stripe dashboard for payments

---

## Cost Estimation

### Cloudflare Services
- Pages: Free (500 builds/month)
- Workers: $5/month (10M requests)
- D1: Free tier → $5/month
- R2: $0.015/GB storage
- KV: Free tier → $0.50/million reads
- AI Gateway: Free
- Vectorize: $0.04/million queries

### External Services
- Stripe: 2.9% + $0.30 per transaction
- Resend/Mailgun: ~$10/month
- OpenAI: Pay-per-use
- Anthropic: Pay-per-use

**Estimated Monthly Cost**: $30-100 (excluding AI API costs)

---

## Success Criteria

### MVP Launch Checklist
- [ ] User authentication working
- [ ] Clients can log in and view projects
- [ ] Admins can create/edit projects
- [ ] Invoices can be generated and sent
- [ ] Files can be uploaded/downloaded
- [ ] AI chat interface functional
- [ ] Payment processing via Stripe
- [ ] Email notifications sending
- [ ] Mobile responsive design
- [ ] 95+ Lighthouse score
- [ ] Production deployment live

### Post-Launch Features
- Real-time collaboration (Durable Objects)
- Advanced reporting dashboard
- Multi-language support
- White-label client portals
- API for third-party integrations
- Mobile app (React Native)

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| D1 data loss | High | Daily backups, migration scripts |
| API downtime | High | Multiple Workers regions, monitoring |
| Stripe webhook failures | Medium | Retry logic, manual reconciliation |
| R2 upload failures | Medium | Chunked uploads, retry mechanism |
| AI API rate limits | Low | Queue system, caching |
| Cost overrun | Medium | Spending alerts, usage caps |

---

## Next Steps

1. **Review and approve this plan**
2. **Set up Cloudflare API token** (already have)
3. **Run initial infrastructure setup**
4. **Begin Phase 1 implementation**
5. **Weekly progress reviews**

---

**Created**: December 24, 2025
**Status**: Ready for implementation
**Estimated Completion**: 13 days
