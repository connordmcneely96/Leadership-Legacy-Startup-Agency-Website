#!/bin/bash

# Local Development Script
# Starts both the Worker and Next.js dev servers

echo "🚀 Starting Leadership Suite in Development Mode"
echo "================================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: wrangler CLI is not installed"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Create a function to kill background processes on exit
cleanup() {
    echo ""
    echo "Shutting down..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup INT TERM

echo "Starting Cloudflare Worker (API) on http://localhost:8787"
wrangler dev --port 8787 &
WORKER_PID=$!

# Wait a bit for worker to start
sleep 3

echo "Starting Next.js dev server on http://localhost:3000"
npm run dev &
NEXT_PID=$!

echo ""
echo "✅ Development servers are running!"
echo ""
echo "Frontend: http://localhost:3000"
echo "API:      http://localhost:8787"
echo "Suite:    http://localhost:3000/suite"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait
