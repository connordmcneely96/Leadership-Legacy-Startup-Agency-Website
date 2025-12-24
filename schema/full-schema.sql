-- Leadership Legacy - Comprehensive D1 Database Schema
-- Full-stack SaaS Platform Schema
-- Created: December 24, 2025

-- ==============================================================================
-- AUTHENTICATION & USERS
-- ==============================================================================

-- Users table (admins, team members, and clients)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT, -- NULL for magic link only auth
  role TEXT NOT NULL DEFAULT 'client', -- admin, team, client
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  client_id INTEGER, -- References clients table for client users
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT 1,
  email_verified BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- Magic link tokens for passwordless auth
CREATE TABLE IF NOT EXISTS magic_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions (metadata stored in KV, this is for tracking)
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- CLIENTS & ORGANIZATIONS
-- ==============================================================================

-- Client companies
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  website TEXT,
  industry TEXT,
  company_size TEXT, -- small, medium, large, enterprise
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'US',
  notes TEXT, -- Internal CRM notes
  satisfaction_score INTEGER, -- 0-100 NPS-style
  lifetime_value REAL DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, inactive, churned
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- PROJECTS & DELIVERABLES
-- ==============================================================================

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  client_id INTEGER NOT NULL,
  status TEXT DEFAULT 'inquiry', -- inquiry, in_progress, review, completed, archived
  tier TEXT DEFAULT 'standard', -- basic, standard, premium
  category TEXT, -- rag_system, ai_agent, website, graphics, etc.
  budget REAL,
  actual_cost REAL DEFAULT 0,
  progress INTEGER DEFAULT 0, -- 0-100
  deadline DATE,
  started_at DATE,
  completed_at DATE,
  description TEXT,
  requirements TEXT, -- JSON or text
  deliverables TEXT, -- JSON array of deliverable items
  assigned_to INTEGER, -- Team member user_id
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Project milestones/phases
CREATE TABLE IF NOT EXISTS project_milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  due_date DATE,
  completed_at DATETIME,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project comments/updates
CREATE TABLE IF NOT EXISTS project_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT 0, -- Internal notes vs client-visible
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- FINANCIAL SYSTEM
-- ==============================================================================

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  client_id INTEGER NOT NULL,
  project_id INTEGER,
  subtotal REAL NOT NULL,
  tax REAL DEFAULT 0,
  discount REAL DEFAULT 0,
  total REAL NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  due_date DATE,
  sent_date DATE,
  paid_date DATE,
  stripe_invoice_id TEXT,
  stripe_payment_intent_id TEXT,
  payment_method TEXT, -- stripe, wire, check
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Invoice line items
CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  quantity REAL DEFAULT 1,
  unit_price REAL NOT NULL,
  amount REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- Proposals (sales documents)
CREATE TABLE IF NOT EXISTS proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proposal_number TEXT UNIQUE NOT NULL,
  client_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
  total_amount REAL,
  valid_until DATE,
  content TEXT, -- JSON or HTML content
  template_used TEXT,
  sent_date DATE,
  accepted_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ==============================================================================
-- TIME TRACKING
-- ==============================================================================

-- Time entries for project billing
CREATE TABLE IF NOT EXISTS time_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  description TEXT,
  hours REAL NOT NULL,
  billable BOOLEAN DEFAULT 1,
  hourly_rate REAL,
  date DATE NOT NULL,
  invoice_id INTEGER, -- Link to invoice if billed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE SET NULL
);

-- ==============================================================================
-- FILE MANAGEMENT
-- ==============================================================================

-- File metadata (actual files in R2)
CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_key TEXT UNIQUE NOT NULL, -- R2 object key
  filename TEXT NOT NULL,
  mime_type TEXT,
  size_bytes INTEGER,
  uploaded_by INTEGER NOT NULL,
  project_id INTEGER, -- Optional project association
  client_id INTEGER, -- Optional client association
  category TEXT, -- deliverable, contract, asset, etc.
  description TEXT,
  is_public BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- ==============================================================================
-- AI SERVICES
-- ==============================================================================

-- AI request tracking (for billing and analytics)
CREATE TABLE IF NOT EXISTS ai_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  project_id INTEGER,
  provider TEXT NOT NULL, -- openai, anthropic, etc.
  model TEXT NOT NULL,
  request_type TEXT, -- chat, completion, embedding, rag_query
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  cost REAL, -- Estimated cost in USD
  latency_ms INTEGER,
  status TEXT DEFAULT 'success', -- success, error
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- RAG knowledge base documents
CREATE TABLE IF NOT EXISTS rag_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  project_id INTEGER,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_url TEXT,
  file_id INTEGER, -- Link to files table if uploaded
  vectorize_id TEXT, -- Cloudflare Vectorize document ID
  metadata TEXT, -- JSON metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE SET NULL
);

-- ==============================================================================
-- TEAM MANAGEMENT
-- ==============================================================================

-- Team member profiles (extends users table)
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL,
  title TEXT, -- Developer, Designer, Project Manager, etc.
  department TEXT,
  hourly_rate REAL,
  bio TEXT,
  skills TEXT, -- JSON array of skills
  is_available BOOLEAN DEFAULT 1,
  start_date DATE,
  end_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- ANALYTICS & TRACKING (existing tables)
-- ==============================================================================

-- Contact form submissions (already exists - keeping for compatibility)
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  budget_range TEXT,
  timeline TEXT,
  referral_source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'new' -- new, contacted, converted, archived
);

-- Analytics events (already exists)
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscriptions (already exists)
CREATE TABLE IF NOT EXISTS newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active',
  source TEXT
);

-- ==============================================================================
-- NOTIFICATIONS & EMAILS
-- ==============================================================================

-- Email queue/log
CREATE TABLE IF NOT EXISTS emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to_email TEXT NOT NULL,
  from_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  template TEXT, -- Template name used
  status TEXT DEFAULT 'pending', -- pending, sent, failed
  provider TEXT, -- resend, mailgun, etc.
  provider_id TEXT, -- External email ID
  sent_at DATETIME,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- In-app notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT, -- info, success, warning, error
  link TEXT, -- Optional link to related resource
  read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- CONFIGURATION & SETTINGS
-- ==============================================================================

-- Service catalog (what services Leadership Legacy offers)
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  base_price REAL,
  tier TEXT, -- basic, standard, premium
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_client_id ON users(client_id);

-- Sessions indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_assigned_to ON projects(assigned_to);
CREATE INDEX IF NOT EXISTS idx_projects_deadline ON projects(deadline);

-- Invoices indexes
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- Time entries indexes
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);

-- Files indexes
CREATE INDEX IF NOT EXISTS idx_files_project_id ON files(project_id);
CREATE INDEX IF NOT EXISTS idx_files_client_id ON files(client_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);

-- AI requests indexes
CREATE INDEX IF NOT EXISTS idx_ai_requests_user_id ON ai_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_project_id ON ai_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_created_at ON ai_requests(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Existing indexes (compatibility)
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);

-- ==============================================================================
-- SEED DATA (Optional - for development)
-- ==============================================================================

-- Insert default admin user (password: 'admin123' - bcrypt hashed)
-- Password should be changed immediately after first login
INSERT OR IGNORE INTO users (id, email, password_hash, role, first_name, last_name, is_active, email_verified)
VALUES (
  1,
  'admin@leadershiplegacy.com',
  '$2a$10$rZJZc6H9YGxDZ6P8h4JdOuLWzCZ8F3K0xGZ9xN4jK5rL6P8h4JdOu', -- 'admin123'
  'admin',
  'Admin',
  'User',
  1,
  1
);

-- Insert sample services
INSERT OR IGNORE INTO services (name, category, description, base_price, tier, is_active) VALUES
('RAG Knowledge Base', 'ai', 'Custom RAG system for document Q&A', 15000, 'premium', 1),
('AI Agent Development', 'ai', 'Custom AI agents for business automation', 25000, 'premium', 1),
('Landing Page Design', 'web', 'Premium landing page with animations', 5000, 'standard', 1),
('Graphics Package', 'design', 'Brand identity and graphics', 3000, 'basic', 1),
('Workflow Automation', 'automation', 'Business process automation', 10000, 'standard', 1);

-- ==============================================================================
-- SCHEMA COMPLETE
-- ==============================================================================

-- Schema version tracking
CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER PRIMARY KEY,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  description TEXT
);

INSERT INTO schema_version (version, description) VALUES
(1, 'Initial full-stack SaaS schema with auth, clients, projects, invoices, AI services');

-- End of schema
