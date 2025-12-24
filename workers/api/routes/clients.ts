// Client management route handlers

import type { D1Database } from '@cloudflare/workers-types';
import { requireAuth, requireTeam, type Env } from '../middleware/auth';
import { isValidEmail, validateRequired } from '../utils/validation';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Get all clients (paginated)
 * GET /api/clients
 */
export async function handleGetClients(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';

    const offset = (page - 1) * limit;

    // Build query
    let query = 'SELECT * FROM clients WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (name LIKE ? OR company LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM clients WHERE 1=1';
    const countParams: any[] = [];

    if (search) {
      countQuery += ' AND (name LIKE ? OR company LIKE ? OR email LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const countResult = await env.DB.prepare(countQuery).bind(...countParams).first();
    const total = (countResult?.total as number) || 0;

    return new Response(
      JSON.stringify({
        success: true,
        clients: results,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get clients error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch clients' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Get single client by ID
 * GET /api/clients/:id
 */
export async function handleGetClient(
  request: Request,
  env: Env,
  clientId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;

    // Clients can only view their own data
    if (user.role === 'client' && user.clientId !== parseInt(clientId)) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const client = await env.DB.prepare(`
      SELECT * FROM clients WHERE id = ?
    `)
      .bind(clientId)
      .first();

    if (!client) {
      return new Response(
        JSON.stringify({ error: 'Client not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Get project count and total value
    const stats = await env.DB.prepare(`
      SELECT
        COUNT(*) as project_count,
        COALESCE(SUM(budget), 0) as total_value,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as active_projects
      FROM projects
      WHERE client_id = ?
    `)
      .bind(clientId)
      .first();

    return new Response(
      JSON.stringify({
        success: true,
        client: {
          ...client,
          stats: stats || { project_count: 0, total_value: 0, active_projects: 0 },
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get client error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch client' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Create new client
 * POST /api/clients
 */
export async function handleCreateClient(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as {
      name: string;
      company: string;
      email: string;
      phone?: string;
      website?: string;
      industry?: string;
      companySize?: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      notes?: string;
    };

    // Validate required fields
    const validation = validateRequired(data, ['name', 'company', 'email']);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields', missing: validation.missing }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Validate email
    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Check if client with email already exists
    const existing = await env.DB.prepare(`
      SELECT id FROM clients WHERE email = ?
    `)
      .bind(data.email)
      .first();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Client with this email already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Insert client
    const result = await env.DB.prepare(`
      INSERT INTO clients (
        name, company, email, phone, website, industry, company_size,
        address, city, state, zip, country, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `)
      .bind(
        data.name,
        data.company,
        data.email,
        data.phone || null,
        data.website || null,
        data.industry || null,
        data.companySize || null,
        data.address || null,
        data.city || null,
        data.state || null,
        data.zip || null,
        data.country || 'US',
        data.notes || null
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Client created successfully',
        clientId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Create client error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create client' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Update client
 * PUT /api/clients/:id
 */
export async function handleUpdateClient(
  request: Request,
  env: Env,
  clientId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as Record<string, any>;

    // Check if client exists
    const existing = await env.DB.prepare(`
      SELECT id FROM clients WHERE id = ?
    `)
      .bind(clientId)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ error: 'Client not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Build update query dynamically
    const allowedFields = [
      'name',
      'company',
      'email',
      'phone',
      'website',
      'industry',
      'company_size',
      'address',
      'city',
      'state',
      'zip',
      'country',
      'notes',
      'satisfaction_score',
      'status',
    ];

    const updates: string[] = [];
    const params: any[] = [];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(data[field]);
      }
    }

    if (updates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid fields to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(clientId);

    const query = `UPDATE clients SET ${updates.join(', ')} WHERE id = ?`;

    await env.DB.prepare(query).bind(...params).run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Client updated successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Update client error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update client' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Delete client
 * DELETE /api/clients/:id
 */
export async function handleDeleteClient(
  request: Request,
  env: Env,
  clientId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    // Check if client has active projects
    const projectCount = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM projects
      WHERE client_id = ? AND status IN ('in_progress', 'review')
    `)
      .bind(clientId)
      .first();

    if (projectCount && (projectCount.count as number) > 0) {
      return new Response(
        JSON.stringify({
          error: 'Cannot delete client with active projects. Archive them first.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Soft delete by setting status to inactive
    await env.DB.prepare(`
      UPDATE clients SET status = 'inactive', updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `)
      .bind(clientId)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Client deactivated successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Delete client error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete client' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
