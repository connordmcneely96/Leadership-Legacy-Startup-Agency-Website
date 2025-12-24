#!/bin/bash
# Leadership Legacy - Cloudflare Deployment Script
# Run this script to deploy the full-stack SaaS platform to Cloudflare

set -e  # Exit on error

echo "🚀 Leadership Legacy - Cloudflare Deployment"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Set Cloudflare credentials
echo -e "${BLUE}Step 1: Setting Cloudflare credentials...${NC}"
export CLOUDFLARE_API_TOKEN="mRSy_Mn3ajwGhyNp06KgQuaq4VhN3W_a5kL1-Km6"
export CLOUDFLARE_ACCOUNT_ID="d3dbdd3e1ebbc28edf0ce756d9841490"
echo -e "${GREEN}✓ Credentials set${NC}"
echo ""

# Step 2: Create D1 Database
echo -e "${BLUE}Step 2: Creating D1 Database...${NC}"
echo "Running: wrangler d1 create leadership-legacy-db"
D1_OUTPUT=$(wrangler d1 create leadership-legacy-db 2>&1 || echo "ALREADY_EXISTS")

if [[ $D1_OUTPUT == *"ALREADY_EXISTS"* ]] || [[ $D1_OUTPUT == *"already exists"* ]]; then
    echo -e "${YELLOW}⚠ Database already exists, fetching existing ID...${NC}"
    D1_ID=$(wrangler d1 list | grep "leadership-legacy-db" | awk '{print $2}')
else
    D1_ID=$(echo "$D1_OUTPUT" | grep -oP 'database_id = "\K[^"]+' || echo "")
fi

echo -e "${GREEN}✓ D1 Database ID: $D1_ID${NC}"
echo ""

# Step 3: Create R2 Bucket
echo -e "${BLUE}Step 3: Creating R2 Bucket...${NC}"
echo "Running: wrangler r2 bucket create leadership-legacy-assets"
wrangler r2 bucket create leadership-legacy-assets 2>&1 || echo "Bucket may already exist"
echo -e "${GREEN}✓ R2 Bucket created${NC}"
echo ""

# Step 4: Create KV Namespace
echo -e "${BLUE}Step 4: Creating KV Namespace...${NC}"
echo "Running: wrangler kv:namespace create LEADERSHIP_CONFIG"
KV_OUTPUT=$(wrangler kv:namespace create LEADERSHIP_CONFIG 2>&1 || echo "ALREADY_EXISTS")

if [[ $KV_OUTPUT == *"ALREADY_EXISTS"* ]] || [[ $KV_OUTPUT == *"already exists"* ]]; then
    echo -e "${YELLOW}⚠ KV Namespace already exists, fetching existing ID...${NC}"
    KV_ID=$(wrangler kv:namespace list | grep "LEADERSHIP_CONFIG" | grep -oP 'id = "\K[^"]+' || echo "")
else
    KV_ID=$(echo "$KV_OUTPUT" | grep -oP 'id = "\K[^"]+' || echo "")
fi

echo -e "${GREEN}✓ KV Namespace ID: $KV_ID${NC}"
echo ""

# Step 5: Update wrangler.toml with actual IDs
echo -e "${BLUE}Step 5: Updating wrangler.toml with resource IDs...${NC}"

if [ -n "$D1_ID" ]; then
    sed -i "s/database_id = \"D1_DATABASE_ID_PLACEHOLDER\"/database_id = \"$D1_ID\"/" wrangler.toml
    echo -e "${GREEN}✓ Updated D1 database_id${NC}"
fi

if [ -n "$KV_ID" ]; then
    sed -i "s/id = \"KV_NAMESPACE_ID_PLACEHOLDER\"/id = \"$KV_ID\"/" wrangler.toml
    echo -e "${GREEN}✓ Updated KV namespace id${NC}"
fi
echo ""

# Step 6: Run database migration
echo -e "${BLUE}Step 6: Running database migration...${NC}"
echo "Running: wrangler d1 execute leadership-legacy-db --file=./schema/full-schema.sql"
wrangler d1 execute leadership-legacy-db --file=./schema/full-schema.sql
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

# Step 8: Set secrets (interactive)
echo -e "${BLUE}Step 8: Setting secrets...${NC}"
echo -e "${YELLOW}You'll need to set the following secrets manually:${NC}"
echo ""
echo "wrangler secret put JWT_SECRET"
echo "  Suggested value: $(openssl rand -base64 32)"
echo ""
echo "wrangler secret put STRIPE_SECRET_KEY"
echo "  Get from: https://dashboard.stripe.com/apikeys"
echo ""
echo "wrangler secret put STRIPE_WEBHOOK_SECRET"
echo "  Get from: https://dashboard.stripe.com/webhooks"
echo ""
echo "wrangler secret put OPENAI_API_KEY"
echo "  Get from: https://platform.openai.com/api-keys"
echo ""
echo "wrangler secret put ANTHROPIC_API_KEY"
echo "  Get from: https://console.anthropic.com/settings/keys"
echo ""
echo "wrangler secret put RESEND_API_KEY"
echo "  Get from: https://resend.com/api-keys"
echo ""
echo -e "${YELLOW}Press Enter to continue after setting secrets...${NC}"
read

# Step 9: Deploy Workers
echo -e "${BLUE}Step 9: Deploying Workers to Cloudflare...${NC}"
echo "Running: wrangler deploy"
wrangler deploy
echo -e "${GREEN}✓ Workers deployed${NC}"
echo ""

# Step 10: Deploy Pages (optional)
echo -e "${BLUE}Step 10: Deploy Pages (optional)...${NC}"
echo "To deploy the frontend to Cloudflare Pages, run:"
echo "  npm run build"
echo "  wrangler pages deploy out"
echo ""

# Success message
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Your Worker is now deployed at:"
echo "  https://leadership-legacy.<YOUR_SUBDOMAIN>.workers.dev"
echo ""
echo "Test the health endpoint:"
echo "  curl https://leadership-legacy.<YOUR_SUBDOMAIN>.workers.dev/api/health"
echo ""
echo "Next steps:"
echo "  1. Set up custom domain in Cloudflare dashboard"
echo "  2. Configure Stripe webhooks"
echo "  3. Test authentication endpoints"
echo "  4. Deploy frontend to Pages"
echo ""
echo "Documentation:"
echo "  - IMPLEMENTATION_SUMMARY.md - Complete API guide"
echo "  - MIGRATION_PLAN.md - Architecture details"
echo ""
