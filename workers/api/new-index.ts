// Main Cloudflare Worker - Comprehensive API Router
// Leadership Legacy Full-Stack SaaS Platform

import type {
  D1Database,
  R2Bucket,
  KVNamespace,
  ExecutionContext,
} from "@cloudflare/workers-types";

// Import route handlers
import {
  handleRegister,
  handleLogin,
  handleMagicLink,
  handleVerifyMagicLink,
  handleLogout,
  handleMe,
} from './routes/auth';

import {
  handleGetClients,
  handleGetClient,
  handleCreateClient,
  handleUpdateClient,
  handleDeleteClient,
} from './routes/clients';

import {
  handleGetProjects,
  handleGetProject,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject,
  handleAddComment,
  handleAddMilestone,
} from './routes/projects';

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  CONFIG: KVNamespace;
  RATE_LIMITER: any;
  ENVIRONMENT: string;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  RESEND_API_KEY: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight
function handleOptions(): Response {
  return new Response(null, {
    headers: corsHeaders,
  });
}

// Extract path parameters (e.g., /api/clients/123 → { id: "123" })
function extractPathParams(pathname: string, pattern: string): Record<string, string> | null {
  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

// Main router
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, search } = url;
    const method = request.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return handleOptions();
    }

    try {
      // ==================================================================
      // AUTHENTICATION ROUTES
      // ==================================================================

      if (pathname === '/api/auth/register' && method === 'POST') {
        return await handleRegister(request, env);
      }

      if (pathname === '/api/auth/login' && method === 'POST') {
        return await handleLogin(request, env);
      }

      if (pathname === '/api/auth/magic-link' && method === 'POST') {
        return await handleMagicLink(request, env);
      }

      if (pathname === '/api/auth/verify-magic-link' && method === 'POST') {
        return await handleVerifyMagicLink(request, env);
      }

      if (pathname === '/api/auth/logout' && method === 'POST') {
        return await handleLogout(request, env);
      }

      if (pathname === '/api/auth/me' && method === 'GET') {
        return await handleMe(request, env);
      }

      // ==================================================================
      // CLIENT ROUTES
      // ==================================================================

      if (pathname === '/api/clients' && method === 'GET') {
        return await handleGetClients(request, env);
      }

      if (pathname === '/api/clients' && method === 'POST') {
        return await handleCreateClient(request, env);
      }

      // Match /api/clients/:id
      const clientIdMatch = extractPathParams(pathname, '/api/clients/:id');
      if (clientIdMatch) {
        const { id } = clientIdMatch;

        if (method === 'GET') {
          return await handleGetClient(request, env, id);
        }

        if (method === 'PUT') {
          return await handleUpdateClient(request, env, id);
        }

        if (method === 'DELETE') {
          return await handleDeleteClient(request, env, id);
        }
      }

      // ==================================================================
      // PROJECT ROUTES
      // ==================================================================

      if (pathname === '/api/projects' && method === 'GET') {
        return await handleGetProjects(request, env);
      }

      if (pathname === '/api/projects' && method === 'POST') {
        return await handleCreateProject(request, env);
      }

      // Match /api/projects/:id
      const projectIdMatch = extractPathParams(pathname, '/api/projects/:id');
      if (projectIdMatch) {
        const { id } = projectIdMatch;

        if (method === 'GET') {
          return await handleGetProject(request, env, id);
        }

        if (method === 'PUT') {
          return await handleUpdateProject(request, env, id);
        }

        if (method === 'DELETE') {
          return await handleDeleteProject(request, env, id);
        }
      }

      // Match /api/projects/:id/comments
      const projectCommentsMatch = extractPathParams(pathname, '/api/projects/:id/comments');
      if (projectCommentsMatch && method === 'POST') {
        return await handleAddComment(request, env, projectCommentsMatch.id);
      }

      // Match /api/projects/:id/milestones
      const projectMilestonesMatch = extractPathParams(pathname, '/api/projects/:id/milestones');
      if (projectMilestonesMatch && method === 'POST') {
        return await handleAddMilestone(request, env, projectMilestonesMatch.id);
      }

      // ==================================================================
      // LEGACY ROUTES (from original implementation)
      // ==================================================================

      if (pathname === '/api/contact' && method === 'POST') {
        return await handleContact(request, env);
      }

      if (pathname === '/api/analytics' && method === 'POST') {
        return await handleAnalytics(request, env);
      }

      if (pathname === '/api/newsletter' && method === 'POST') {
        return await handleNewsletter(request, env);
      }

      if (pathname === '/api/health') {
        return new Response(
          JSON.stringify({
            status: 'healthy',
            environment: env.ENVIRONMENT,
            version: '2.0.0',
            timestamp: new Date().toISOString(),
          }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // ==================================================================
      // NOT FOUND
      // ==================================================================

      return new Response(
        JSON.stringify({
          error: 'Not Found',
          path: pathname,
          message: 'The requested endpoint does not exist',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  },
};

// ==================================================================
// LEGACY HANDLERS (kept for backward compatibility)
// ==================================================================

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

    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const ipAddress = request.headers.get('CF-Connecting-IP') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';

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
