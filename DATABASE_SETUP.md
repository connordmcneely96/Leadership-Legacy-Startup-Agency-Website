# D1 Database Setup for AI Assistant

This guide will help you set up the D1 database for the AI Assistant feature.

## Prerequisites

- Cloudflare account with Workers/Pages enabled
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged into Wrangler (`wrangler login`)

## Setup Steps

### 1. Apply Database Migrations

The database schema is already defined in `migrations/0001_create_ai_assistant_tables.sql`. To apply it to your existing D1 database:

```powershell
# Apply migrations to your existing database
npx wrangler d1 execute leadership-legacy-db --file=migrations/0001_create_ai_assistant_tables.sql --local

# For production:
npx wrangler d1 execute leadership-legacy-db --file=migrations/0001_create_ai_assistant_tables.sql
```

### 2. Verify Tables Were Created

```powershell
# Check tables in local database
npx wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table'" --local

# For production:
npx wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

You should see:
- `conversations`
- `messages`

## Database Schema

### Conversations Table
- `id` (TEXT) - Unique conversation identifier
- `user_id` (TEXT) - User who owns the conversation
- `title` (TEXT) - Auto-generated title from first message
- `created_at` (INTEGER) - Unix timestamp
- `updated_at` (INTEGER) - Unix timestamp

### Messages Table
- `id` (TEXT) - Unique message identifier
- `conversation_id` (TEXT) - Foreign key to conversations
- `role` (TEXT) - Either 'user' or 'assistant'
- `content` (TEXT) - Message content
- `created_at` (INTEGER) - Unix timestamp

## Testing

You can test the database by inserting a sample conversation:

```powershell
npx wrangler d1 execute leadership-legacy-db --command="INSERT INTO conversations (id, user_id, title, created_at, updated_at) VALUES ('test-123', 'anonymous', 'Test Conversation', 1234567890, 1234567890)" --local
```

## Troubleshooting

If you encounter issues:

1. **Database doesn't exist**: The database should already exist (ID: c593cef5-5921-4016-93c6-75361de39b2a). If not, contact Cloudflare support.

2. **Migration fails**: Make sure you're logged in with `wrangler login` first.

3. **Tables already exist**: That's fine! The migration uses `IF NOT EXISTS` so it won't duplicate tables.
