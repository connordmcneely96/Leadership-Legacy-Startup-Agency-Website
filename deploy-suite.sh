#!/bin/bash

# Leadership Suite Deployment Script
# Deploys both the Cloudflare Worker (API) and Pages (Frontend)

set -e  # Exit on error

echo "🚀 Leadership Suite Deployment Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Error: wrangler CLI is not installed${NC}"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  You need to log in to Wrangler${NC}"
    echo "Running: wrangler login"
    wrangler login
fi

echo -e "${GREEN}✓ Wrangler CLI is ready${NC}"
echo ""

# Step 1: Run database migrations
echo "📊 Step 1: Running database migrations..."
echo "----------------------------------------"

if [ -f "./schema/schema.sql" ]; then
    echo "Running initial schema..."
    wrangler d1 execute leadership-legacy-db --file=./schema/schema.sql
    echo -e "${GREEN}✓ Initial schema applied${NC}"
fi

if [ -f "./migrations/0002_create_suite_schema.sql" ]; then
    echo "Running suite schema..."
    wrangler d1 execute leadership-legacy-db --file=./migrations/0002_create_suite_schema.sql
    echo -e "${GREEN}✓ Suite schema applied${NC}"
fi

if [ -f "./migrations/0003_insert_demo_user.sql" ]; then
    echo "Inserting demo data..."
    wrangler d1 execute leadership-legacy-db --file=./migrations/0003_insert_demo_user.sql
    echo -e "${GREEN}✓ Demo data inserted${NC}"
fi

echo ""

# Step 2: Deploy the Worker (API)
echo "🔧 Step 2: Deploying Cloudflare Worker (API)..."
echo "-----------------------------------------------"
wrangler deploy
WORKER_URL=$(wrangler deployments list --json 2>/dev/null | grep -o 'https://[^"]*' | head -1 || echo "")

if [ -z "$WORKER_URL" ]; then
    echo -e "${YELLOW}⚠️  Could not automatically detect Worker URL${NC}"
    echo "Please check the Cloudflare dashboard for your Worker URL"
else
    echo -e "${GREEN}✓ Worker deployed successfully${NC}"
    echo "Worker URL: $WORKER_URL"
fi

echo ""

# Step 3: Build the Next.js frontend
echo "🏗️  Step 3: Building Next.js frontend..."
echo "---------------------------------------"
npm install
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"
echo ""

# Step 4: Deploy to Cloudflare Pages
echo "📦 Step 4: Deploying to Cloudflare Pages..."
echo "-------------------------------------------"

# Check if project name is provided
PROJECT_NAME="${1:-leadership-legacy}"

echo "Deploying to project: $PROJECT_NAME"
npx wrangler pages deploy out --project-name="$PROJECT_NAME"

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "===================="
echo ""
echo "Next steps:"
echo "1. Visit your Pages URL (shown above)"
echo "2. Navigate to /suite to access the Leadership Suite"
echo "3. Test all functionality with the demo user"
echo ""
echo "Configuration:"
echo "- Update WORKER_URL in wrangler-pages.toml if needed"
echo "- Set custom domain in Cloudflare dashboard"
echo "- Configure R2 bucket for file uploads"
echo ""
echo "For detailed instructions, see SUITE_DEPLOYMENT_GUIDE.md"
echo ""
