// Time tracking route handlers

import type { D1Database } from '@cloudflare/workers-types';
import { requireAuth, requireTeam, type Env } from '../middleware/auth';
import { validateRequired } from '../utils/validation';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Get time entries
 * GET /api/time-entries
 */
export async function handleGetTimeEntries(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const url = new URL(request.url);

    const projectId = url.searchParams.get('projectId');
    const userId = url.searchParams.get('userId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    let query = `
      SELECT te.*, u.first_name, u.last_name, p.name as project_name
      FROM time_entries te
      LEFT JOIN users u ON te.user_id = u.id
      LEFT JOIN projects p ON te.project_id = p.id
      WHERE 1=1
    `;
    const params: any[] = [];

    // Team members can only see their own time entries
    if (user.role === 'team') {
      query += ' AND te.user_id = ?';
      params.push(user.id);
    }

    if (projectId) {
      query += ' AND te.project_id = ?';
      params.push(projectId);
    }

    if (userId && user.role !== 'team') {
      query += ' AND te.user_id = ?';
      params.push(userId);
    }

    if (startDate) {
      query += ' AND te.date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND te.date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY te.date DESC';

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Calculate total hours
    const totalHours = results.reduce((sum: number, entry: any) => sum + (entry.hours || 0), 0);

    return new Response(
      JSON.stringify({
        success: true,
        timeEntries: results,
        totalHours,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get time entries error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch time entries' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Create time entry
 * POST /api/time-entries
 */
export async function handleCreateTimeEntry(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const data = await request.json() as {
      projectId: number;
      hours: number;
      description?: string;
      date?: string;
      billable?: boolean;
      hourlyRate?: number;
    };

    const validation = validateRequired(data, ['projectId', 'hours']);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields', missing: validation.missing }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Validate hours
    if (data.hours <= 0 || data.hours > 24) {
      return new Response(
        JSON.stringify({ error: 'Hours must be between 0 and 24' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Verify project exists
    const project = await env.DB.prepare(`
      SELECT id FROM projects WHERE id = ?
    `)
      .bind(data.projectId)
      .first();

    if (!project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const result = await env.DB.prepare(`
      INSERT INTO time_entries (
        user_id, project_id, description, hours, billable, hourly_rate, date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        user.id,
        data.projectId,
        data.description || null,
        data.hours,
        data.billable !== false ? 1 : 0,
        data.hourlyRate || null,
        data.date || new Date().toISOString().split('T')[0]
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Time entry created successfully',
        timeEntryId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Create time entry error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create time entry' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Update time entry
 * PUT /api/time-entries/:id
 */
export async function handleUpdateTimeEntry(
  request: Request,
  env: Env,
  timeEntryId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const data = await request.json() as Record<string, any>;

    // Check if time entry exists and user has permission
    const existing = await env.DB.prepare(`
      SELECT user_id FROM time_entries WHERE id = ?
    `)
      .bind(timeEntryId)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ error: 'Time entry not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Team members can only edit their own entries
    if (user.role === 'team' && existing.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const allowedFields = ['hours', 'description', 'billable', 'hourly_rate', 'date'];
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
    params.push(timeEntryId);

    await env.DB.prepare(`UPDATE time_entries SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...params)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Time entry updated successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Update time entry error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update time entry' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Delete time entry
 * DELETE /api/time-entries/:id
 */
export async function handleDeleteTimeEntry(
  request: Request,
  env: Env,
  timeEntryId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;

    // Check if time entry exists and user has permission
    const existing = await env.DB.prepare(`
      SELECT user_id, invoice_id FROM time_entries WHERE id = ?
    `)
      .bind(timeEntryId)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ error: 'Time entry not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Can't delete if already invoiced
    if (existing.invoice_id) {
      return new Response(
        JSON.stringify({ error: 'Cannot delete time entry that has been invoiced' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Team members can only delete their own entries
    if (user.role === 'team' && existing.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    await env.DB.prepare(`DELETE FROM time_entries WHERE id = ?`)
      .bind(timeEntryId)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Time entry deleted successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Delete time entry error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete time entry' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
