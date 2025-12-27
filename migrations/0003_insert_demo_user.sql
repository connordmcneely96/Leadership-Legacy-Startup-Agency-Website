-- Insert demo user for testing the Leadership Suite
-- This allows immediate testing without authentication

INSERT OR IGNORE INTO users (
  id,
  email,
  name,
  avatar_url,
  storage_used,
  storage_quota,
  created_at,
  updated_at
) VALUES (
  'demo-user',
  'demo@leadershipsuite.com',
  'John Doe',
  NULL,
  0,
  10737418240,
  unixepoch(),
  unixepoch()
);

-- Insert some sample documents for the demo user
INSERT OR IGNORE INTO documents (id, user_id, type, title, content, size, starred, created_at, updated_at)
VALUES 
  ('doc-1', 'demo-user', 'doc', 'Q4 Marketing Strategy', 'Sample marketing strategy document...', 2400, 0, unixepoch() - 7200, unixepoch() - 7200),
  ('doc-2', 'demo-user', 'doc', 'Team Meeting Notes', 'Weekly team meeting notes...', 1200, 0, unixepoch() - 18000, unixepoch() - 18000),
  ('sheet-1', 'demo-user', 'sheet', 'Sales Pipeline 2024', 'Q1 Revenue: $125K', 50000, 0, unixepoch() - 7200, unixepoch() - 7200),
  ('slide-1', 'demo-user', 'slide', 'Q4 Product Roadmap', '', 150000, 0, unixepoch() - 7200, unixepoch() - 7200);

-- Insert some sample tasks
INSERT OR IGNORE INTO tasks (id, user_id, title, description, status, priority, due_date, created_at, updated_at)
VALUES
  ('task-1', 'demo-user', 'Update marketing website', 'Refresh homepage content and add new case studies', 'todo', 'high', unixepoch() + 86400, unixepoch(), unixepoch()),
  ('task-2', 'demo-user', 'Design new dashboard UI', 'Create mockups for the analytics dashboard redesign', 'in_progress', 'high', unixepoch() + 172800, unixepoch(), unixepoch()),
  ('task-3', 'demo-user', 'Client proposal', 'Final review of enterprise client proposal', 'review', 'high', unixepoch() + 259200, unixepoch(), unixepoch()),
  ('task-4', 'demo-user', 'Launch product beta', 'Beta version is now live!', 'done', 'high', unixepoch() - 86400, unixepoch(), unixepoch());

-- Insert some sample calendar events
INSERT OR IGNORE INTO calendar_events (id, user_id, title, description, start_time, end_time, location, created_at)
VALUES
  ('cal-1', 'demo-user', 'Team Standup', 'Daily standup meeting', unixepoch() + 3600, unixepoch() + 4500, 'Conference Room A', unixepoch()),
  ('cal-2', 'demo-user', 'Client Meeting', 'Quarterly business review with key client', unixepoch() + 21600, unixepoch() + 25200, 'Zoom', unixepoch()),
  ('cal-3', 'demo-user', 'Design Review', 'Review new mockups with design team', unixepoch() + 108000, unixepoch() + 110700, 'Design Studio', unixepoch());

-- Insert sample emails
INSERT OR IGNORE INTO emails (id, user_id, from_address, to_addresses, subject, body_html, body_text, folder, is_read, has_attachments, created_at)
VALUES
  ('mail-1', 'demo-user', 'sarah.chen@example.com', '["demo@leadershipsuite.com"]', 'Q4 Product Roadmap Review', '<p>Hi team, I''ve attached the updated roadmap for Q4. Please review...</p>', 'Hi team, I''ve attached the updated roadmap for Q4. Please review...', 'inbox', 0, 1, unixepoch() - 3600),
  ('mail-2', 'demo-user', 'mike.johnson@example.com', '["demo@leadershipsuite.com"]', 'Client Meeting Follow-up', '<p>Thanks for joining the call today. Here are the key takeaways...</p>', 'Thanks for joining the call today. Here are the key takeaways...', 'inbox', 0, 0, unixepoch() - 7200);

-- Insert sample meetings
INSERT OR IGNORE INTO meetings (id, user_id, code, title, scheduled_at, duration, status, participants, created_at)
VALUES
  ('meet-1', 'demo-user', 'abc-123-def', 'Team Standup', unixepoch() + 3600, 900, 'scheduled', '["sarah.chen@example.com", "mike.johnson@example.com"]', unixepoch()),
  ('meet-2', 'demo-user', 'xyz-789-ghi', 'Client Presentation', unixepoch() + 21600, 3600, 'scheduled', '["client@example.com"]', unixepoch());

-- Insert sample albums
INSERT OR IGNORE INTO albums (id, user_id, name, created_at)
VALUES
  ('album-1', 'demo-user', 'Brand Logos', unixepoch()),
  ('album-2', 'demo-user', 'Campaign A', unixepoch());
