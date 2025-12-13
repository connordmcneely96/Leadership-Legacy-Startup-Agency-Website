// Main Cloudflare Worker - API Router
// Handles all API requests for Leadership Legacy

import type {
  D1Database,
  R2Bucket,
  KVNamespace,
  ExecutionContext,
} from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  CONFIG: KVNamespace;
  RATE_LIMITER: any;
  ENVIRONMENT: string;
}

// CORS headers for API responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight requests
function handleOptions(): Response {
  return new Response(null, {
    headers: corsHeaders,
  });
}

// Main router
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    try {
      // Route to appropriate handler
      if (url.pathname === '/api/contact' && request.method === 'POST') {
        return await handleContact(request, env);
      }

      if (url.pathname === '/api/analytics' && request.method === 'POST') {
        return await handleAnalytics(request, env);
      }

      if (url.pathname === '/api/newsletter' && request.method === 'POST') {
        return await handleNewsletter(request, env);
      }

      if (url.pathname === '/api/health') {
        return new Response(
          JSON.stringify({ status: 'healthy', environment: env.ENVIRONMENT }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  },
};

// Contact form handler
async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      name: string;
      email: string;
      company?: string;
      phone?: string;
      message: string;
      serviceInterest?: string;
      budgetRange?: string;
      timeline?: string;
      referralSource?: string;
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('CF-Connecting-IP') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';

    // Insert into D1 database
    const result = await env.DB.prepare(`
      INSERT INTO contacts (
        name, email, company, phone, message,
        service_interest, budget_range, timeline, referral_source,
        ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        data.name,
        data.email,
        data.company || null,
        data.phone || null,
        data.message,
        data.serviceInterest || null,
        data.budgetRange || null,
        data.timeline || null,
        data.referralSource || null,
        ipAddress,
        userAgent
      )
      .run();

    // TODO: Send email notification to Leadership Legacy team
    // This would integrate with Cloudflare Email Workers or external service

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        id: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit contact form' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

// Analytics tracker
async function handleAnalytics(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      eventType: string;
      pagePath: string;
      referrer?: string;
      metadata?: any;
      sessionId?: string;
    };

    if (!data.eventType || !data.pagePath) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const ipAddress = request.headers.get('CF-Connecting-IP') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';

    await env.DB.prepare(`
      INSERT INTO analytics (
        event_type, page_path, referrer, user_agent, ip_address, session_id, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        data.eventType,
        data.pagePath,
        data.referrer || null,
        userAgent,
        ipAddress,
        data.sessionId || null,
        JSON.stringify(data.metadata || {})
      )
      .run();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Analytics error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to track analytics' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

// Newsletter subscription handler
async function handleNewsletter(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      email: string;
      source?: string;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    await env.DB.prepare(`
      INSERT OR IGNORE INTO newsletter (email, source) VALUES (?, ?)
    `)
      .bind(data.email, data.source || 'unknown')
      .run();

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed to newsletter' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe to newsletter' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
