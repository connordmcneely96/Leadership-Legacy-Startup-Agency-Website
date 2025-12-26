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
  AI: any; // Cloudflare Workers AI
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

      if (url.pathname === '/api/assistant/chat' && request.method === 'POST') {
        return await handleAssistantChat(request, env);
      }

      if (url.pathname === '/api/assistant/history' && request.method === 'GET') {
        return await handleAssistantHistory(request, env);
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

// AI Assistant chat handler
async function handleAssistantChat(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      conversationId: string;
      message: string;
      userId?: string;
    };

    if (!data.message || !data.conversationId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const userId = data.userId || 'anonymous';
    const timestamp = Date.now();

    // Check if conversation exists, if not create it
    const existingConv = await env.DB.prepare(
      'SELECT id FROM conversations WHERE id = ?'
    ).bind(data.conversationId).first();

    if (!existingConv) {
      await env.DB.prepare(`
        INSERT INTO conversations (id, user_id, title, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `).bind(
        data.conversationId,
        userId,
        data.message.substring(0, 50) + '...', // First 50 chars as title
        timestamp,
        timestamp
      ).run();
    } else {
      // Update conversation timestamp
      await env.DB.prepare(
        'UPDATE conversations SET updated_at = ? WHERE id = ?'
      ).bind(timestamp, data.conversationId).run();
    }

    // Save user message
    const userMessageId = crypto.randomUUID();
    await env.DB.prepare(`
      INSERT INTO messages (id, conversation_id, role, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      userMessageId,
      data.conversationId,
      'user',
      data.message,
      timestamp
    ).run();

    // Get conversation history for context
    const history = await env.DB.prepare(`
      SELECT role, content FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC
      LIMIT 20
    `).bind(data.conversationId).all();

    // Build messages array for AI
    const messages = history.results.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call Cloudflare Workers AI
    const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for Leadership Legacy, a startup agency that helps entrepreneurs build and scale their businesses. Be professional, concise, and helpful. Provide actionable advice and insights about business strategy, leadership, and startup growth.',
        },
        ...messages,
      ],
    });

    const assistantMessage = aiResponse.response || 'I apologize, but I encountered an error. Please try again.';

    // Save AI response
    const aiMessageId = crypto.randomUUID();
    await env.DB.prepare(`
      INSERT INTO messages (id, conversation_id, role, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      aiMessageId,
      data.conversationId,
      'assistant',
      assistantMessage,
      Date.now()
    ).run();

    return new Response(
      JSON.stringify({
        success: true,
        message: {
          id: aiMessageId,
          role: 'assistant',
          content: assistantMessage,
          timestamp: Date.now(),
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('AI Assistant error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

// AI Assistant history handler
async function handleAssistantHistory(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId');

    if (!conversationId) {
      return new Response(
        JSON.stringify({ error: 'Missing conversationId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get conversation messages
    const messages = await env.DB.prepare(`
      SELECT id, role, content, created_at as timestamp
      FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `).bind(conversationId).all();

    return new Response(
      JSON.stringify({
        success: true,
        conversationId,
        messages: messages.results,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('History retrieval error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve conversation history' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
