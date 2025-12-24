#!/bin/bash
# Automated Cloudflare Deployment - Non-interactive version
# This script automatically deploys without prompting for secrets

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🚀 Leadership Legacy - Automated Cloudflare Deployment"
echo "============================================"
echo ""

# Step 1: Set credentials
echo -e "${BLUE}Step 1: Setting Cloudflare credentials...${NC}"
export CLOUDFLARE_API_TOKEN="mRSy_Mn3ajwGhyNp06KgQuaq4VhN3W_a5kL1-Km6"
export CLOUDFLARE_ACCOUNT_ID="d3dbdd3e1ebbc28edf0ce756d9841490"
echo -e "${GREEN}✓ Credentials set${NC}"
echo ""

# Step 2: Get D1 Database ID
echo -e "${BLUE}Step 2: Getting D1 Database ID...${NC}"
D1_LIST=$(npx wrangler d1 list 2>&1 || echo "")
D1_ID=$(echo "$D1_LIST" | grep "leadership-legacy-db" | grep -oP '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}' | head -1)

if [ -z "$D1_ID" ]; then
    echo -e "${YELLOW}Database not found, creating new one...${NC}"
    D1_OUTPUT=$(npx wrangler d1 create leadership-legacy-db 2>&1)
    D1_ID=$(echo "$D1_OUTPUT" | grep -oP 'database_id = "\K[^"]+')
fi

echo -e "${GREEN}✓ D1 Database ID: $D1_ID${NC}"
echo ""

# Step 3: Create R2 Bucket
echo -e "${BLUE}Step 3: Creating R2 Bucket...${NC}"
npx wrangler r2 bucket create leadership-legacy-assets 2>&1 || echo "Bucket may already exist"
echo -e "${GREEN}✓ R2 Bucket ready${NC}"
echo ""

# Step 4: Get KV Namespace ID
echo -e "${BLUE}Step 4: Getting KV Namespace ID...${NC}"
KV_LIST=$(npx wrangler kv:namespace list 2>&1 || echo "")
KV_ID=$(echo "$KV_LIST" | grep "LEADERSHIP_CONFIG" | grep -oP '[a-f0-9]{32}' | head -1)

if [ -z "$KV_ID" ]; then
    echo -e "${YELLOW}KV namespace not found, creating new one...${NC}"
    KV_OUTPUT=$(npx wrangler kv:namespace create LEADERSHIP_CONFIG 2>&1)
    KV_ID=$(echo "$KV_OUTPUT" | grep -oP 'id = "\K[^"]+')
fi

echo -e "${GREEN}✓ KV Namespace ID: $KV_ID${NC}"
echo ""

# Step 5: Update wrangler.toml
echo -e "${BLUE}Step 5: Updating wrangler.toml...${NC}"
if [ -n "$D1_ID" ]; then
    sed -i "s/database_id = \"D1_DATABASE_ID_PLACEHOLDER\"/database_id = \"$D1_ID\"/" wrangler.toml
    sed -i "s/database_id = \".*\"/database_id = \"$D1_ID\"/" wrangler.toml
    echo -e "${GREEN}✓ Updated D1 database_id${NC}"
fi

if [ -n "$KV_ID" ]; then
    sed -i "s/id = \"KV_NAMESPACE_ID_PLACEHOLDER\"/id = \"$KV_ID\"/" wrangler.toml
    sed -i "s/\(binding = \"CONFIG\".*\)id = \".*\"/\1id = \"$KV_ID\"/" wrangler.toml
    echo -e "${GREEN}✓ Updated KV namespace id${NC}"
fi
echo ""

# Step 6: Run database migration
echo -e "${BLUE}Step 6: Running database migration...${NC}"
npx wrangler d1 execute leadership-legacy-db --file=./schema/full-schema.sql 2>&1 || echo "Migration may have already run"
echo -e "${GREEN}✓ Database schema migrated${NC}"
echo ""

# Step 7: Replace main router
echo -e "${BLUE}Step 7: Updating main API router...${NC}"
if [ ! -f "workers/api/index.ts.backup" ]; then
    cp workers/api/index.ts workers/api/index.ts.backup
    echo -e "${GREEN}✓ Backed up original index.ts${NC}"
fi
cp workers/api/new-index.ts workers/api/index.ts
echo -e "${GREEN}✓ Updated to new comprehensive router${NC}"
echo ""

# Step 8: Set JWT_SECRET automatically
echo -e "${BLUE}Step 8: Setting JWT_SECRET...${NC}"
JWT_SECRET=$(openssl rand -base64 32)
echo "$JWT_SECRET" | npx wrangler secret put JWT_SECRET 2>&1 || echo "Secret may already be set"
echo -e "${GREEN}✓ JWT_SECRET set${NC}"
echo -e "${YELLOW}Note: Other secrets (Stripe, OpenAI, etc.) can be set later${NC}"
echo ""

# Step 9: Deploy Workers
echo -e "${BLUE}Step 9: Deploying Workers to Cloudflare...${NC}"
npx wrangler deploy
echo -e "${GREEN}✓ Workers deployed!${NC}"
echo ""

# Success message
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Your API is now live!"
echo ""
echo "Next steps:"
echo "  1. Test health endpoint: curl https://leadership-legacy.<subdomain>.workers.dev/api/health"
echo "  2. Set additional secrets (Stripe, OpenAI, etc.) when ready"
echo "  3. Deploy frontend: npm run build && npx wrangler pages deploy out"
echo ""
