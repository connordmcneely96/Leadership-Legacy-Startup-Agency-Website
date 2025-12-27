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
  ASSETS?: R2Bucket; // legacy binding name
  R2_ASSETS?: R2Bucket; // binding from wrangler.toml
  CONFIG: KVNamespace;
  ANTHROPIC_API_KEY?: string;
  RESEND_API_KEY?: string;
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

      // Suite: Documents
      if (url.pathname === '/api/documents' && request.method === 'GET') {
        return await handleDocumentsList(request, env);
      }
      if (url.pathname === '/api/documents' && request.method === 'POST') {
        return await handleDocumentsCreate(request, env);
      }
      if (url.pathname.startsWith('/api/documents/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleDocumentsUpdate(request, env, id);
      }
      if (url.pathname.startsWith('/api/documents/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleDocumentsDelete(env, id);
      }
      if (url.pathname.endsWith('/star') && request.method === 'POST') {
        const id = url.pathname.split('/').slice(-2)[0];
        return await handleDocumentsStar(env, id);
      }

      // Suite: Files
      if (url.pathname === '/api/files' && request.method === 'GET') {
        return await handleFilesList(request, env);
      }
      if (url.pathname === '/api/files/upload' && request.method === 'POST') {
        return await handleFilesUpload(request, env);
      }
      if (url.pathname === '/api/files/folder' && request.method === 'POST') {
        return await handleFilesCreateFolder(request, env);
      }
      if (url.pathname.startsWith('/api/files/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleFilesDelete(env, id);
      }
      if (url.pathname.startsWith('/api/files/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleFilesUpdate(request, env, id);
      }

      // Suite: Albums
      if (url.pathname === '/api/albums' && request.method === 'GET') {
        return await handleAlbumsList(request, env);
      }
      if (url.pathname === '/api/albums' && request.method === 'POST') {
        return await handleAlbumsCreate(request, env);
      }
      if (url.pathname.startsWith('/api/albums/') && url.pathname.endsWith('/photos') && request.method === 'POST') {
        const id = url.pathname.split('/').slice(-2)[0];
        return await handleAlbumAddPhoto(request, env, id);
      }
      if (url.pathname.startsWith('/api/albums/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleAlbumsDelete(env, id);
      }

      // Suite: Tasks
      if (url.pathname === '/api/tasks' && request.method === 'GET') {
        return await handleTasksList(request, env);
      }
      if (url.pathname === '/api/tasks' && request.method === 'POST') {
        return await handleTasksCreate(request, env);
      }
      if (url.pathname.startsWith('/api/tasks/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleTasksUpdate(request, env, id);
      }
      if (url.pathname.startsWith('/api/tasks/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleTasksDelete(env, id);
      }

      // Suite: Storage
      if (url.pathname === '/api/storage/quota' && request.method === 'GET') {
        return await handleStorageQuota(request, env);
      }

      // AI proxy (Claude)
      if (url.pathname === '/api/ai/chat' && request.method === 'POST') {
        return await handleAiProxy(request, env);
      }

      // Mail
      if (url.pathname === '/api/mail' && request.method === 'GET') {
        return await handleMailList(request, env);
      }
      if (url.pathname === '/api/mail/send' && request.method === 'POST') {
        return await handleMailSend(request, env);
      }
      if (url.pathname === '/api/mail/draft' && request.method === 'POST') {
        return await handleMailDraft(request, env);
      }
      if (url.pathname.startsWith('/api/mail/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleMailPatch(env, id);
      }
      if (url.pathname.startsWith('/api/mail/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleMailDelete(env, id);
      }

      // Calendar
      if (url.pathname === '/api/calendar/events' && request.method === 'GET') {
        return await handleCalendarList(request, env);
      }
      if (url.pathname === '/api/calendar/events' && request.method === 'POST') {
        return await handleCalendarCreate(request, env);
      }
      if (url.pathname.startsWith('/api/calendar/events/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleCalendarUpdate(request, env, id);
      }
      if (url.pathname.startsWith('/api/calendar/events/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop()!;
        return await handleCalendarDelete(env, id);
      }

      // Meetings
      if (url.pathname === '/api/meetings' && request.method === 'GET') {
        return await handleMeetingsList(request, env);
      }
      if (url.pathname === '/api/meetings' && request.method === 'POST') {
        return await handleMeetingsCreate(request, env);
      }
      if (url.pathname.startsWith('/api/meetings/join/') && request.method === 'GET') {
        const code = url.pathname.split('/').pop()!;
        return await handleMeetingsJoin(env, code);
      }
      if (url.pathname.startsWith('/api/meetings/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()!;
        return await handleMeetingsUpdate(request, env, id);
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

// ---------- Suite: Documents ----------
async function handleDocumentsList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const type = url.searchParams.get('type');
  const sort = url.searchParams.get('sort') || 'updated';
  const filter = url.searchParams.get('filter');

  const clauses: string[] = [];
  const params: any[] = [];
  if (userId) {
    clauses.push('user_id = ?');
    params.push(userId);
  }
  if (type) {
    clauses.push('type = ?');
    params.push(type);
  }
  if (filter === 'owned') {
    clauses.push('shared_with IS NULL OR shared_with = ""');
  }
  if (filter === 'shared') {
    clauses.push('shared_with IS NOT NULL AND shared_with != ""');
  }
  if (filter === 'recent') {
    clauses.push('updated_at >= unixepoch() - 7 * 86400');
  }
  if (filter === 'starred') {
    clauses.push('starred = 1');
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const sortSql =
    sort === 'name'
      ? 'title COLLATE NOCASE ASC'
      : sort === 'size'
      ? 'size DESC'
      : 'updated_at DESC';

  const sql = `
    SELECT id, user_id, type, title, size, starred, shared_with, created_at, updated_at
    FROM documents
    ${where}
    ORDER BY ${sortSql}
    LIMIT 100
  `;

  const rows = await env.DB.prepare(sql).bind(...params).all();
  return json({ success: true, data: rows.results });
}

async function handleDocumentsCreate(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.type || !body.title) {
    return json({ error: 'userId, type, title required' }, 400);
  }
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO documents (id, user_id, type, title, content, size, starred, shared_with, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, NULL, ?, ?)`
  )
    .bind(id, body.userId, body.type, body.title, body.content || null, body.size || 0, now, now)
    .run();
  return json({ success: true, data: { id } }, 201);
}

async function handleDocumentsUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const body = await safeJson(request);
  const fields: string[] = [];
  const params: any[] = [];
  if (body.title) {
    fields.push('title = ?');
    params.push(body.title);
  }
  if (typeof body.starred === 'number') {
    fields.push('starred = ?');
    params.push(body.starred);
  }
  if (body.content !== undefined) {
    fields.push('content = ?');
    params.push(body.content);
  }
  if (body.size !== undefined) {
    fields.push('size = ?');
    params.push(body.size);
  }
  if (!fields.length) return json({ error: 'No fields to update' }, 400);
  fields.push('updated_at = unixepoch()');
  params.push(id);
  await env.DB.prepare(`UPDATE documents SET ${fields.join(', ')} WHERE id = ?`).bind(...params).run();
  return json({ success: true });
}

async function handleDocumentsDelete(env: Env, id: string): Promise<Response> {
  await env.DB.prepare('DELETE FROM documents WHERE id = ?').bind(id).run();
  return json({ success: true });
}

async function handleDocumentsStar(env: Env, id: string): Promise<Response> {
  await env.DB.prepare('UPDATE documents SET starred = CASE WHEN starred = 1 THEN 0 ELSE 1 END, updated_at = unixepoch() WHERE id = ?')
    .bind(id)
    .run();
  return json({ success: true });
}

// ---------- Suite: Files / Drive ----------
async function handleFilesList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const folder = url.searchParams.get('folder') || '/';
  const params: any[] = [folder];
  let where = 'folder_path = ?';
  if (userId) {
    where = 'user_id = ? AND ' + where;
    params.unshift(userId);
  }

  const rows = await env.DB.prepare(
    `SELECT id, user_id, folder_path, filename, mime_type, size, r2_key, thumbnail_r2_key, created_at
     FROM files
     WHERE ${where}
     ORDER BY created_at DESC
     LIMIT 200`
  ).bind(...params).all();

  return json({ success: true, data: rows.results });
}

async function handleFilesUpload(request: Request, env: Env): Promise<Response> {
  const contentType = request.headers.get('content-type') || '';
  const bucket: R2Bucket | undefined = env.R2_ASSETS || env.ASSETS;
  if (!bucket) return json({ error: 'R2 bucket not configured' }, 500);

  // JSON fallback
  if (!contentType.includes('multipart/form-data')) {
    const body = await safeJson(request);
    const required = ['userId', 'folderPath', 'filename', 'mimeType', 'size', 'r2Key'] as const;
    for (const key of required) {
      if (!body[key]) {
        return json({ error: `Missing ${key}` }, 400);
      }
    }
    const metadata = await persistFileMetadata(env, {
      id: crypto.randomUUID(),
      userId: body.userId,
      folderPath: body.folderPath || '/',
      filename: body.filename,
      mimeType: body.mimeType,
      size: body.size,
      r2Key: body.r2Key,
      thumbnailR2Key: body.thumbnailR2Key || null,
    });
    return json(metadata, 201);
  }

  const form = await request.formData();
  const userId = form.get('userId')?.toString();
  const folderPath = (form.get('folderPath')?.toString() || '/').replace(/^\/+/, '');
  const files: File[] = [];
  form.forEach((value, key) => {
    if (value instanceof File && key === 'file') {
      files.push(value);
    }
  });

  if (!userId || files.length === 0) {
    return json({ error: 'userId and file required' }, 400);
  }

  const stored: any[] = [];
  for (const file of files) {
    const id = crypto.randomUUID();
    const r2Key = `${userId}/drive/${folderPath ? folderPath + '/' : ''}${file.name}`;
    // Upload to R2
    await bucket.put(r2Key, file.stream() as any, {
      httpMetadata: { contentType: file.type },
    });
    stored.push({
      id,
      userId,
      folderPath: folderPath ? `/${folderPath}` : '/',
      filename: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      r2Key,
      thumbnailR2Key: null,
    });
  }

  // Persist metadata and storage_used
  for (const item of stored) {
    await persistFileMetadata(env, item);
  }

  return json({ success: true, data: stored });
}

async function handleFilesCreateFolder(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.folderName) return json({ error: 'userId and folderName required' }, 400);
  const folderPath = (body.parentPath || '/').replace(/\/+$/, '') || '/';
  const id = crypto.randomUUID();
  const record = await persistFileMetadata(env, {
    id,
    userId: body.userId,
    folderPath: folderPath === '/' ? '/' : folderPath,
    filename: body.folderName,
    mimeType: 'inode/directory',
    size: 0,
    r2Key: '',
    thumbnailR2Key: null,
  });
  return json({ success: true, data: record }, 201);
}

async function handleFilesDelete(env: Env, id: string): Promise<Response> {
  const bucket: R2Bucket | undefined = env.R2_ASSETS || env.ASSETS;
  const row = await env.DB.prepare('SELECT size, user_id, r2_key FROM files WHERE id = ?').bind(id).first();
  await env.DB.prepare('DELETE FROM files WHERE id = ?').bind(id).run();
  if (row?.size && row?.user_id) {
    await env.DB.prepare('UPDATE users SET storage_used = storage_used - ? WHERE id = ?')
      .bind(row.size, row.user_id)
      .run();
  }
  if (bucket && row?.r2_key) {
    await bucket.delete(row.r2_key as string);
  }
  return json({ success: true });
}

async function handleFilesUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const body = await safeJson(request);
  const fields: string[] = [];
  const params: any[] = [];
  if (body.filename) {
    fields.push('filename = ?');
    params.push(body.filename);
  }
  if (body.folderPath) {
    fields.push('folder_path = ?');
    params.push(body.folderPath);
  }
  if (!fields.length) return json({ error: 'No fields to update' }, 400);
  params.push(id);
  await env.DB.prepare(`UPDATE files SET ${fields.join(', ')} WHERE id = ?`).bind(...params).run();
  return json({ success: true });
}

// ---------- Suite: Tasks ----------
async function handleTasksList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const status = url.searchParams.get('status');
  const clauses: string[] = [];
  const params: any[] = [];
  if (userId) {
    clauses.push('user_id = ?');
    params.push(userId);
  }
  if (status) {
    clauses.push('status = ?');
    params.push(status);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = await env.DB.prepare(
    `SELECT id, user_id, title, description, assignee_id, status, priority, due_date, created_at, updated_at
     FROM tasks
     ${where}
     ORDER BY updated_at DESC
     LIMIT 200`
  )
    .bind(...params)
    .all();
  return json({ success: true, data: rows.results });
}

async function handleTasksCreate(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.title) return json({ error: 'userId and title required' }, 400);
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO tasks (id, user_id, title, description, assignee_id, status, priority, due_date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.userId,
      body.title,
      body.description || null,
      body.assigneeId || null,
      body.status || 'todo',
      body.priority || 'medium',
      body.dueDate || null,
      now,
      now
    )
    .run();
  return json({ success: true, data: { id } }, 201);
}

async function handleTasksUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const body = await safeJson(request);
  const fields: string[] = [];
  const params: any[] = [];
  if (body.title !== undefined) {
    fields.push('title = ?');
    params.push(body.title);
  }
  if (body.description !== undefined) {
    fields.push('description = ?');
    params.push(body.description);
  }
  if (body.assigneeId !== undefined) {
    fields.push('assignee_id = ?');
    params.push(body.assigneeId);
  }
  if (body.status !== undefined) {
    fields.push('status = ?');
    params.push(body.status);
  }
  if (body.priority !== undefined) {
    fields.push('priority = ?');
    params.push(body.priority);
  }
  if (body.dueDate !== undefined) {
    fields.push('due_date = ?');
    params.push(body.dueDate);
  }
  if (!fields.length) return json({ error: 'No fields to update' }, 400);
  fields.push('updated_at = unixepoch()');
  params.push(id);
  await env.DB.prepare(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`).bind(...params).run();
  return json({ success: true });
}

async function handleTasksDelete(env: Env, id: string): Promise<Response> {
  await env.DB.prepare('DELETE FROM tasks WHERE id = ?').bind(id).run();
  return json({ success: true });
}

// ---------- Suite: Mail ----------
async function handleMailList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const folder = url.searchParams.get('folder') || 'inbox';
  const params: any[] = [folder];
  let where = 'folder = ?';
  if (userId) {
    where = 'user_id = ? AND ' + where;
    params.unshift(userId);
  }
  const rows = await env.DB.prepare(
    `SELECT id, user_id, from_address, to_addresses, cc_addresses, subject, body_html, body_text, folder, thread_id, is_read, has_attachments, created_at
     FROM emails
     WHERE ${where}
     ORDER BY created_at DESC
     LIMIT 200`
  ).bind(...params).all();
  return json({ success: true, data: rows.results });
}

async function handleMailSend(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.to || !body.subject || !body.bodyHtml) {
    return json({ error: 'userId, to, subject, bodyHtml required' }, 400);
  }
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO emails (id, user_id, from_address, to_addresses, cc_addresses, subject, body_html, body_text, folder, thread_id, is_read, has_attachments, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'sent', ?, 0, ?, ?)`
  )
    .bind(
      id,
      body.userId,
      body.from || 'noreply@example.com',
      JSON.stringify(body.to),
      body.cc ? JSON.stringify(body.cc) : null,
      body.subject,
      body.bodyHtml,
      body.bodyText || null,
      body.threadId || null,
      body.hasAttachments ? 1 : 0,
      now
    )
    .run();

  // Optional outbound send via Resend
  if (env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: body.from || 'noreply@example.com',
          to: body.to,
          subject: body.subject,
          html: body.bodyHtml,
          cc: body.cc || [],
        }),
      });
    } catch (e) {
      console.warn('Resend send failed', e);
    }
  }

  return json({ success: true, data: { id } }, 201);
}

async function handleMailDraft(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.subject) return json({ error: 'userId and subject required' }, 400);
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO emails (id, user_id, from_address, to_addresses, subject, body_html, folder, is_read, has_attachments, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'drafts', 0, ?, ?)`
  )
    .bind(
      id,
      body.userId,
      body.from || 'draft@example.com',
      JSON.stringify(body.to || []),
      body.subject,
      body.bodyHtml || '',
      body.hasAttachments ? 1 : 0,
      now
    )
    .run();
  return json({ success: true, data: { id } }, 201);
}

async function handleMailPatch(env: Env, id: string): Promise<Response> {
  await env.DB.prepare(
    `UPDATE emails SET is_read = CASE WHEN is_read = 1 THEN 0 ELSE 1 END WHERE id = ?`
  ).bind(id).run();
  return json({ success: true });
}

async function handleMailDelete(env: Env, id: string): Promise<Response> {
  await env.DB.prepare(`UPDATE emails SET folder = 'trash' WHERE id = ?`).bind(id).run();
  return json({ success: true });
}

// ---------- Suite: Calendar ----------
async function handleCalendarList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');
  const clauses: string[] = [];
  const params: any[] = [];
  if (userId) {
    clauses.push('user_id = ?');
    params.push(userId);
  }
  if (start) {
    clauses.push('start_time >= ?');
    params.push(parseInt(start));
  }
  if (end) {
    clauses.push('end_time <= ?');
    params.push(parseInt(end));
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = await env.DB.prepare(
    `SELECT id, user_id, title, description, start_time, end_time, location, attendees, meeting_id, created_at
     FROM calendar_events
     ${where}
     ORDER BY start_time ASC
     LIMIT 200`
  ).bind(...params).all();
  return json({ success: true, data: rows.results });
}

async function handleCalendarCreate(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.title || !body.startTime || !body.endTime) {
    return json({ error: 'userId, title, startTime, endTime required' }, 400);
  }
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO calendar_events (id, user_id, title, description, start_time, end_time, location, attendees, meeting_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.userId,
      body.title,
      body.description || null,
      body.startTime,
      body.endTime,
      body.location || null,
      body.attendees ? JSON.stringify(body.attendees) : null,
      body.meetingId || null,
      now
    )
    .run();
  return json({ success: true, data: { id } }, 201);
}

async function handleCalendarUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const body = await safeJson(request);
  const fields: string[] = [];
  const params: any[] = [];
  if (body.title !== undefined) {
    fields.push('title = ?');
    params.push(body.title);
  }
  if (body.description !== undefined) {
    fields.push('description = ?');
    params.push(body.description);
  }
  if (body.startTime !== undefined) {
    fields.push('start_time = ?');
    params.push(body.startTime);
  }
  if (body.endTime !== undefined) {
    fields.push('end_time = ?');
    params.push(body.endTime);
  }
  if (body.location !== undefined) {
    fields.push('location = ?');
    params.push(body.location);
  }
  if (body.attendees !== undefined) {
    fields.push('attendees = ?');
    params.push(JSON.stringify(body.attendees));
  }
  if (body.meetingId !== undefined) {
    fields.push('meeting_id = ?');
    params.push(body.meetingId);
  }
  if (!fields.length) return json({ error: 'No fields to update' }, 400);
  params.push(id);
  await env.DB.prepare(`UPDATE calendar_events SET ${fields.join(', ')} WHERE id = ?`).bind(...params).run();
  return json({ success: true });
}

async function handleCalendarDelete(env: Env, id: string): Promise<Response> {
  await env.DB.prepare('DELETE FROM calendar_events WHERE id = ?').bind(id).run();
  return json({ success: true });
}

// ---------- Suite: Meetings ----------
async function handleMeetingsList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const params: any[] = [];
  let where = '';
  if (userId) {
    where = 'WHERE user_id = ?';
    params.push(userId);
  }
  const rows = await env.DB.prepare(
    `SELECT id, user_id, code, title, scheduled_at, duration, status, participants, created_at
     FROM meetings
     ${where}
     ORDER BY scheduled_at DESC
     LIMIT 200`
  ).bind(...params).all();
  return json({ success: true, data: rows.results });
}

async function handleMeetingsCreate(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.title || !body.scheduledAt) return json({ error: 'userId, title, scheduledAt required' }, 400);
  const id = crypto.randomUUID();
  const code = (body.code as string | undefined) || crypto.randomUUID().slice(0, 8);
  await env.DB.prepare(
    `INSERT INTO meetings (id, user_id, code, title, scheduled_at, duration, status, participants, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.userId,
      code,
      body.title,
      body.scheduledAt,
      body.duration || 3600,
      'scheduled',
      body.participants ? JSON.stringify(body.participants) : null,
      Math.floor(Date.now() / 1000)
    )
    .run();
  return json({ success: true, data: { id, code } }, 201);
}

async function handleMeetingsJoin(env: Env, code: string): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT id, user_id, code, title, scheduled_at, duration, status FROM meetings WHERE code = ?`
  ).bind(code).first();
  if (!row) return json({ error: 'Not found' }, 404);
  return json({ success: true, data: row });
}

async function handleMeetingsUpdate(request: Request, env: Env, id: string): Promise<Response> {
  const body = await safeJson(request);
  const fields: string[] = [];
  const params: any[] = [];
  if (body.title !== undefined) {
    fields.push('title = ?');
    params.push(body.title);
  }
  if (body.status !== undefined) {
    fields.push('status = ?');
    params.push(body.status);
  }
  if (body.scheduledAt !== undefined) {
    fields.push('scheduled_at = ?');
    params.push(body.scheduledAt);
  }
  if (body.duration !== undefined) {
    fields.push('duration = ?');
    params.push(body.duration);
  }
  if (body.participants !== undefined) {
    fields.push('participants = ?');
    params.push(JSON.stringify(body.participants));
  }
  if (!fields.length) return json({ error: 'No fields to update' }, 400);
  params.push(id);
  await env.DB.prepare(`UPDATE meetings SET ${fields.join(', ')} WHERE id = ?`).bind(...params).run();
  return json({ success: true });
}

// ---------- Suite: Albums ----------
async function handleAlbumsList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  const params: any[] = [];
  let where = '';
  if (userId) {
    where = 'WHERE user_id = ?';
    params.push(userId);
  }
  const rows = await env.DB.prepare(
    `SELECT id, user_id, name, cover_photo_id, created_at FROM albums ${where} ORDER BY created_at DESC LIMIT 200`
  ).bind(...params).all();
  return json({ success: true, data: rows.results });
}

async function handleAlbumsCreate(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body.userId || !body.name) return json({ error: 'userId and name required' }, 400);
  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO albums (id, user_id, name, created_at) VALUES (?, ?, ?, ?)`
  )
    .bind(id, body.userId, body.name, Math.floor(Date.now() / 1000))
    .run();
  return json({ success: true, data: { id } }, 201);
}

async function handleAlbumAddPhoto(request: Request, env: Env, albumId: string): Promise<Response> {
  const body = await safeJson(request);
  if (!body.fileId) return json({ error: 'fileId required' }, 400);
  await env.DB.prepare(
    `INSERT OR IGNORE INTO album_photos (album_id, file_id, added_at) VALUES (?, ?, ?)`
  )
    .bind(albumId, body.fileId, Math.floor(Date.now() / 1000))
    .run();
  return json({ success: true });
}

async function handleAlbumsDelete(env: Env, id: string): Promise<Response> {
  await env.DB.prepare('DELETE FROM albums WHERE id = ?').bind(id).run();
  return json({ success: true });
}

// ---------- AI Proxy ----------
async function handleAiProxy(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'Missing ANTHROPIC_API_KEY' }, 500);
  if (!body.messages) return json({ error: 'messages required' }, 400);
  const payload = {
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 4000,
    messages: body.messages,
  };
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': env.ANTHROPIC_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  return json({ success: true, data });
}

// ---------- Suite: Storage ----------
async function handleStorageQuota(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');
  if (!userId) return json({ error: 'user_id required' }, 400);
  const row = await env.DB.prepare(
    `SELECT storage_used, storage_quota FROM users WHERE id = ?`
  ).bind(userId).first();
  if (!row) return json({ error: 'Not found' }, 404);
  return json({ success: true, data: row });
}

// ---------- Helpers ----------
async function safeJson(request: Request) {
  const text = await request.text();
  if (!text) return {};
  return JSON.parse(text);
}

function json(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

// persist file metadata and adjust storage_used
async function persistFileMetadata(
  env: Env,
  input: {
    id: string
    userId: string
    folderPath: string
    filename: string
    mimeType: string
    size: number
    r2Key: string
    thumbnailR2Key: string | null
  }
) {
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO files (id, user_id, folder_path, filename, mime_type, size, r2_key, thumbnail_r2_key, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      input.id,
      input.userId,
      input.folderPath || '/',
      input.filename,
      input.mimeType,
      input.size,
      input.r2Key,
      input.thumbnailR2Key,
      now
    )
    .run();
  await env.DB.prepare('UPDATE users SET storage_used = storage_used + ? WHERE id = ?')
    .bind(input.size, input.userId)
    .run();
  return {
    id: input.id,
    folder_path: input.folderPath,
    filename: input.filename,
    mime_type: input.mimeType,
    size: input.size,
    r2_key: input.r2Key,
    thumbnail_r2_key: input.thumbnailR2Key,
    created_at: now,
  };
}
