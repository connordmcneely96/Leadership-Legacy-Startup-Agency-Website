// Project management route handlers

import type { D1Database } from '@cloudflare/workers-types';
import { requireAuth, requireTeam, type Env } from '../middleware/auth';
import { validateRequired, isValidProjectStatus, isValidTier } from '../utils/validation';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Get all projects (paginated, filtered)
 * GET /api/projects
 */
export async function handleGetProjects(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';
    const clientId = url.searchParams.get('clientId') || '';

    const offset = (page - 1) * limit;

    // Build query
    let query = `
      SELECT p.*, c.name as client_name, c.company as client_company
      FROM projects p
      LEFT JOIN clients c ON p.client_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    // Clients can only see their own projects
    if (user.role === 'client' && user.clientId) {
      query += ' AND p.client_id = ?';
      params.push(user.clientId);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      query += ' AND p.status = ?';
      params.push(status);
    }

    if (clientId) {
      query += ' AND p.client_id = ?';
      params.push(clientId);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM projects p WHERE 1=1';
    const countParams: any[] = [];

    if (user.role === 'client' && user.clientId) {
      countQuery += ' AND p.client_id = ?';
      countParams.push(user.clientId);
    }

    if (search) {
      countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      countQuery += ' AND p.status = ?';
      countParams.push(status);
    }

    if (clientId) {
      countQuery += ' AND p.client_id = ?';
      countParams.push(clientId);
    }

    const countResult = await env.DB.prepare(countQuery).bind(...countParams).first();
    const total = (countResult?.total as number) || 0;

    return new Response(
      JSON.stringify({
        success: true,
        projects: results,
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
    console.error('Get projects error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch projects' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Get single project by ID
 * GET /api/projects/:id
 */
export async function handleGetProject(
  request: Request,
  env: Env,
  projectId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;

    const project = await env.DB.prepare(`
      SELECT p.*, c.name as client_name, c.company as client_company, c.email as client_email,
             u.first_name as assigned_first_name, u.last_name as assigned_last_name
      FROM projects p
      LEFT JOIN clients c ON p.client_id = c.id
      LEFT JOIN users u ON p.assigned_to = u.id
      WHERE p.id = ?
    `)
      .bind(projectId)
      .first();

    if (!project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Clients can only view their own projects
    if (user.role === 'client' && user.clientId !== project.client_id) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Get milestones
    const { results: milestones } = await env.DB.prepare(`
      SELECT * FROM project_milestones
      WHERE project_id = ?
      ORDER BY order_index ASC
    `)
      .bind(projectId)
      .all();

    // Get comments
    const { results: comments } = await env.DB.prepare(`
      SELECT pc.*, u.first_name, u.last_name, u.email
      FROM project_comments pc
      JOIN users u ON pc.user_id = u.id
      WHERE pc.project_id = ? AND (pc.is_internal = 0 OR ? != 'client')
      ORDER BY pc.created_at DESC
    `)
      .bind(projectId, user.role)
      .all();

    // Get time entries
    const { results: timeEntries } = await env.DB.prepare(`
      SELECT te.*, u.first_name, u.last_name
      FROM time_entries te
      JOIN users u ON te.user_id = u.id
      WHERE te.project_id = ?
      ORDER BY te.date DESC
    `)
      .bind(projectId)
      .all();

    const totalHours = timeEntries.reduce((sum: number, entry: any) => sum + (entry.hours || 0), 0);

    return new Response(
      JSON.stringify({
        success: true,
        project: {
          ...project,
          milestones,
          comments,
          timeEntries,
          totalHours,
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get project error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch project' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Create new project
 * POST /api/projects
 */
export async function handleCreateProject(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as {
      name: string;
      clientId: number;
      status?: string;
      tier?: string;
      category?: string;
      budget?: number;
      deadline?: string;
      description?: string;
      requirements?: string;
      assignedTo?: number;
      priority?: string;
    };

    // Validate required fields
    const validation = validateRequired(data, ['name', 'clientId']);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields', missing: validation.missing }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Validate status
    if (data.status && !isValidProjectStatus(data.status)) {
      return new Response(
        JSON.stringify({ error: 'Invalid project status' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Validate tier
    if (data.tier && !isValidTier(data.tier)) {
      return new Response(
        JSON.stringify({ error: 'Invalid tier' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Verify client exists
    const client = await env.DB.prepare(`
      SELECT id FROM clients WHERE id = ?
    `)
      .bind(data.clientId)
      .first();

    if (!client) {
      return new Response(
        JSON.stringify({ error: 'Client not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Insert project
    const result = await env.DB.prepare(`
      INSERT INTO projects (
        name, client_id, status, tier, category, budget, deadline,
        description, requirements, assigned_to, priority
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        data.name,
        data.clientId,
        data.status || 'inquiry',
        data.tier || 'standard',
        data.category || null,
        data.budget || null,
        data.deadline || null,
        data.description || null,
        data.requirements || null,
        data.assignedTo || null,
        data.priority || 'medium'
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Project created successfully',
        projectId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create project' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Update project
 * PUT /api/projects/:id
 */
export async function handleUpdateProject(
  request: Request,
  env: Env,
  projectId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as Record<string, any>;

    // Check if project exists
    const existing = await env.DB.prepare(`
      SELECT id, status FROM projects WHERE id = ?
    `)
      .bind(projectId)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Build update query
    const allowedFields = [
      'name',
      'status',
      'tier',
      'category',
      'budget',
      'actual_cost',
      'progress',
      'deadline',
      'description',
      'requirements',
      'deliverables',
      'assigned_to',
      'priority',
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

    // Track status changes
    if (data.status && data.status !== existing.status) {
      if (data.status === 'in_progress' && !existing.started_at) {
        updates.push('started_at = CURRENT_DATE');
      }
      if (data.status === 'completed') {
        updates.push('completed_at = CURRENT_TIMESTAMP');
        updates.push('progress = 100');
      }
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(projectId);

    const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`;

    await env.DB.prepare(query).bind(...params).run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Project updated successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Update project error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update project' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Delete project
 * DELETE /api/projects/:id
 */
export async function handleDeleteProject(
  request: Request,
  env: Env,
  projectId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    // Soft delete by archiving
    await env.DB.prepare(`
      UPDATE projects SET status = 'archived', updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `)
      .bind(projectId)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Project archived successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Delete project error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete project' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Add comment to project
 * POST /api/projects/:id/comments
 */
export async function handleAddComment(
  request: Request,
  env: Env,
  projectId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const data = await request.json() as {
      comment: string;
      isInternal?: boolean;
    };

    if (!data.comment || data.comment.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Comment cannot be empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Verify project exists and user has access
    const project = await env.DB.prepare(`
      SELECT id, client_id FROM projects WHERE id = ?
    `)
      .bind(projectId)
      .first();

    if (!project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Clients can only comment on their own projects
    if (user.role === 'client' && user.clientId !== project.client_id) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Clients cannot create internal comments
    const isInternal = user.role !== 'client' && data.isInternal ? 1 : 0;

    const result = await env.DB.prepare(`
      INSERT INTO project_comments (project_id, user_id, comment, is_internal)
      VALUES (?, ?, ?, ?)
    `)
      .bind(projectId, user.id, data.comment, isInternal)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment added successfully',
        commentId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Add comment error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add comment' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Add milestone to project
 * POST /api/projects/:id/milestones
 */
export async function handleAddMilestone(
  request: Request,
  env: Env,
  projectId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as {
      name: string;
      description?: string;
      dueDate?: string;
      orderIndex?: number;
    };

    const validation = validateRequired(data, ['name']);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const result = await env.DB.prepare(`
      INSERT INTO project_milestones (project_id, name, description, due_date, order_index)
      VALUES (?, ?, ?, ?, ?)
    `)
      .bind(
        projectId,
        data.name,
        data.description || null,
        data.dueDate || null,
        data.orderIndex || 0
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Milestone added successfully',
        milestoneId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Add milestone error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add milestone' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
