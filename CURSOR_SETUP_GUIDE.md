# Cursor AI Setup Guide for Cloudflare Development

This guide ensures that Cursor AI builds features that are fully compatible with your Cloudflare deployment.

---

## 🎯 Essential Context for Cursor

When starting a new feature in Cursor, provide this context at the beginning of your chat:

### Quick Context Prompt (Copy-Paste to Cursor)

```
I'm building features for a Next.js + Cloudflare Workers SaaS platform.

ARCHITECTURE:
- Frontend: Next.js 16 with static export → Cloudflare Pages
- Backend: TypeScript Workers → Cloudflare Workers
- Database: D1 (SQLite) → database binding name: "DB"
- Storage: R2 → binding name: "ASSETS"
- Sessions/Cache: KV → binding name: "CONFIG"
- Authentication: JWT with PBKDF2 password hashing

CRITICAL CONSTRAINTS:
1. NO bcrypt (use PBKDF2 - Workers don't support Node.js crypto bcrypt)
2. NO Node.js-only packages (must be Workers-compatible)
3. Use Web APIs (fetch, crypto.subtle, etc.)
4. Database binding is "DB" not a connection string
5. All API routes in: workers/api/routes/
6. Authentication middleware: workers/api/middleware/auth.ts

EXISTING STRUCTURE:
- API endpoints: workers/api/routes/*.ts
- Utilities: workers/api/utils/*.ts
- Main router: workers/api/index.ts
- Database schema: schema/full-schema.sql

Please ensure all code you write:
- Uses Workers-compatible APIs only
- Follows existing authentication patterns
- Uses prepared statements for DB queries
- Includes proper TypeScript types
- Works with the existing middleware

Current files to reference:
- wrangler.toml (Cloudflare config)
- workers/api/utils/crypto.ts (password hashing, JWT)
- workers/api/middleware/auth.ts (auth middleware)
```

---

## 📁 Essential Files to Share with Cursor

### 1. Configuration Files (Always Share)

**wrangler.toml** - Cloudflare configuration
```toml
name = "leadership-legacy"
main = "workers/api/index.ts"
compatibility_date = "2025-01-01"
account_id = "d3dbdd3e1ebbc28edf0ce756d9841490"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "leadership-legacy-db"
database_id = "c593cef5-5921-4016-93c6-75361de39b2a"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "leadership-legacy-assets"

[[kv_namespaces]]
binding = "CONFIG"
id = "a82cf78ed3eb4422b6ac86c4891d76d5"

[vars]
ENVIRONMENT = "development"
NEXT_PUBLIC_API_URL = "https://leadership-legacy.connorpattern.workers.dev"

[env.production]
name = "leadership-legacy-production"
vars = { ENVIRONMENT = "production" }
```

**package.json** - Dependencies and scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy:api": "npx wrangler deploy",
    "deploy:web": "npm run build && npx wrangler pages deploy out --project-name=leadership-legacy --commit-dirty=true",
    "deploy:all": "npm run deploy:api && npm run deploy:web"
  }
}
```

### 2. TypeScript Types (Share for Type Safety)

Create a file `.cursor/env.d.ts` in your project:

```typescript
// Cloudflare Workers Environment Types
export interface Env {
  DB: D1Database;           // D1 Database binding
  ASSETS: R2Bucket;         // R2 Storage binding
  CONFIG: KVNamespace;      // KV Namespace binding
  ENVIRONMENT: string;      // Environment variable
  JWT_SECRET: string;       // Secret (set via wrangler secret)

  // Optional secrets (add as needed)
  STRIPE_SECRET_KEY?: string;
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
}

// Import Cloudflare types
import type {
  D1Database,
  R2Bucket,
  KVNamespace,
  ExecutionContext,
} from "@cloudflare/workers-types";
```

### 3. Database Schema (Share for DB Operations)

Point Cursor to: `schema/full-schema.sql`

Or provide table list:
```
Available tables:
- users (id, email, password_hash, role, first_name, last_name, is_active, created_at, updated_at)
- sessions (id, user_id, token, expires_at, created_at)
- magic_links (id, email, token, expires_at, used, created_at)
- clients (id, name, industry, contact_email, contact_phone, created_at, updated_at)
- projects (id, client_id, name, description, status, start_date, end_date, budget, created_at, updated_at)
- invoices (id, client_id, invoice_number, amount, status, due_date, created_at, updated_at)
- time_entries (id, user_id, project_id, description, hours, billable, hourly_rate, created_at)
- files (id, filename, file_key, file_size, mime_type, uploaded_by, created_at)
... (and 12+ more)
```

### 4. Authentication Patterns (Share for Auth)

Point Cursor to: `workers/api/middleware/auth.ts`

Or provide this pattern:
```typescript
// How to use authentication in routes
import { requireAuth, requireAdmin } from '../middleware/auth';

export async function handler(request: Request, env: Env) {
  // Check authentication
  const auth = await requireAuth(request, env);
  if (!auth.valid) return auth.response;

  const user = auth.user; // Authenticated user object

  // Your logic here
}
```

---

## 🚫 Common Mistakes to Avoid (Tell Cursor)

### ❌ DON'T Use:
```typescript
// ❌ bcrypt (doesn't work in Workers)
import bcrypt from 'bcrypt';
await bcrypt.hash(password, 10);

// ❌ Node.js crypto (use Web Crypto API)
import crypto from 'crypto';
crypto.randomBytes(32);

// ❌ File system operations
import fs from 'fs';
fs.readFileSync('file.txt');

// ❌ Direct database connections
import pg from 'pg';
const client = new pg.Client('postgresql://...');

// ❌ process.env for secrets in code
const secret = process.env.JWT_SECRET;
```

### ✅ DO Use:
```typescript
// ✅ PBKDF2 for password hashing
import { hashPassword, verifyPassword } from './utils/crypto';
await hashPassword(password);

// ✅ Web Crypto API
const bytes = crypto.getRandomValues(new Uint8Array(32));

// ✅ R2 for file storage
await env.ASSETS.put(key, fileData);

// ✅ D1 binding for database
await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();

// ✅ env parameter for secrets
const secret = env.JWT_SECRET;
```

---

## 📋 Development Workflow with Cursor

### Step 1: Start Feature
1. Open Cursor
2. Paste the "Quick Context Prompt" above
3. Attach relevant files (wrangler.toml, schema, etc.)
4. Describe your feature

### Step 2: Cursor Builds Feature
Cursor will create:
- Route handler in `workers/api/routes/`
- Any utilities needed
- TypeScript types
- Database queries

### Step 3: Test Locally
```bash
# Test the API locally
npx wrangler dev

# In another terminal, test endpoint
curl http://localhost:8787/api/your-new-endpoint
```

### Step 4: Deploy
```bash
# Deploy API to Cloudflare
npx wrangler deploy

# If you updated frontend
npm run build
npx wrangler pages deploy out --project-name=leadership-legacy --commit-dirty=true
```

---

## 🎨 Example Prompts for Cursor

### Adding a New Feature
```
Using the Cloudflare Workers setup described above, please create a new feature for managing team members.

Requirements:
- New route: /api/team-members
- CRUD operations (list, create, get, update, delete)
- Use existing auth middleware (requireAdmin)
- Use the team_members table in D1
- Include pagination for list endpoint
- Add proper TypeScript types

Please:
1. Create workers/api/routes/team-members.ts
2. Add route to workers/api/index.ts
3. Follow the pattern from workers/api/routes/clients.ts
```

### Modifying Database
```
Please help me add a new table for "tasks" to the database.

Requirements:
- task_id, project_id, title, description, status, assigned_to, due_date, created_at, updated_at
- Foreign keys to projects and users tables
- Index on project_id and assigned_to
- Include seed data for testing

Please:
1. Add CREATE TABLE to schema/full-schema.sql
2. Create migration file (schema/migrations/add-tasks-table.sql)
3. Create API endpoints in workers/api/routes/tasks.ts
```

### Frontend Integration
```
Please create React components to connect to the API endpoints.

Using the existing Next.js setup:
- Create login form component
- Create client dashboard
- Use the API at: https://leadership-legacy.connorpattern.workers.dev
- Store JWT token in localStorage
- Include error handling

Files to create:
- components/auth/LoginForm.tsx
- components/clients/ClientDashboard.tsx
- lib/api.ts (API client with auth headers)
```

---

## 🔧 Cursor Settings Recommendations

### 1. Add to `.cursorrules` file:

```
# Cloudflare Workers Rules

## Environment
- Target: Cloudflare Workers (V8 runtime)
- No Node.js-specific modules unless in compatibility list
- Use Web APIs (fetch, crypto.subtle, etc.)

## Database
- Use env.DB for all database operations
- Always use prepared statements with .bind()
- Never use string interpolation in SQL queries

## Authentication
- Use PBKDF2 for password hashing (NOT bcrypt)
- JWT stored in env.JWT_SECRET
- Check auth with requireAuth middleware

## File Structure
- API routes: workers/api/routes/[feature].ts
- Utilities: workers/api/utils/[name].ts
- Middleware: workers/api/middleware/[name].ts
- Types: workers/api/types/[name].ts

## Code Style
- TypeScript strict mode
- Async/await over promises
- Proper error handling with try/catch
- Return JSON responses with proper status codes
```

### 2. Add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@cloudflare/workers-types"],
    "lib": ["ES2021", "WebWorker"],
    "target": "ES2021",
    "module": "ES2022",
    "moduleResolution": "node"
  }
}
```

---

## 📚 Reference Files to Keep Open in Cursor

When working on backend features:
1. `wrangler.toml` - Config reference
2. `workers/api/utils/crypto.ts` - Auth utilities
3. `workers/api/middleware/auth.ts` - Middleware patterns
4. `schema/full-schema.sql` - Database structure

When working on frontend features:
1. `package.json` - Dependencies
2. Existing components for patterns
3. API endpoint documentation

---

## 🧪 Testing Checklist for Cursor-Built Features

After Cursor builds a feature, verify:

- [ ] Uses `env.DB` not database URLs
- [ ] Uses PBKDF2 not bcrypt
- [ ] Has proper TypeScript types
- [ ] Uses prepared statements for SQL
- [ ] Includes auth middleware if needed
- [ ] Returns proper JSON responses
- [ ] Has error handling
- [ ] Works with `npx wrangler dev`
- [ ] Deploys without errors

---

## 🚀 Quick Deploy After Cursor Changes

```bash
# Test locally first
npx wrangler dev

# Deploy to Cloudflare
npx wrangler deploy

# View logs
npx wrangler tail

# Test live endpoint
curl https://leadership-legacy.connorpattern.workers.dev/api/your-endpoint
```

---

## 💡 Pro Tips

1. **Use Cursor Composer for multi-file changes**
   - Perfect for adding a feature across routes, utils, and types

2. **Reference existing patterns**
   - "Follow the pattern in workers/api/routes/clients.ts"

3. **Be specific about Cloudflare**
   - Always mention "Cloudflare Workers compatible"

4. **Test incrementally**
   - Test with `wrangler dev` after each feature

5. **Keep context fresh**
   - Re-paste the Quick Context Prompt for each new chat

6. **Use the schema**
   - Attach schema/full-schema.sql when doing DB work

---

## 📖 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Workers TypeScript](https://developers.cloudflare.com/workers/languages/typescript/)
- Your project docs: `FULL_PROJECT_SUMMARY.md`

---

## Example: Complete Cursor Session

**You:**
```
[Paste Quick Context Prompt]

I need to add a "notes" feature where users can add private notes to client records.

Requirements:
- Add notes field to clients table
- Create API endpoints for managing notes
- Only admins and team members can add notes
- Notes should have timestamps
```

**Cursor will:**
1. Update schema/full-schema.sql
2. Create migration file
3. Add route in workers/api/routes/clients.ts
4. Use requireTeam middleware
5. Follow existing patterns

**You test:**
```bash
npx wrangler dev
curl -X POST http://localhost:8787/api/clients/1/notes \
  -H "Authorization: Bearer TOKEN" \
  -d '{"note": "Test note"}'
```

**You deploy:**
```bash
npx wrangler deploy
```

**Done!** ✅

---

**🎉 With this setup, Cursor will build Cloudflare-compatible features every time!**
