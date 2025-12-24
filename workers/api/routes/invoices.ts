// Invoice management and Stripe integration

import type { D1Database } from '@cloudflare/workers-types';
import { requireAuth, requireTeam, type Env } from '../middleware/auth';
import { validateRequired } from '../utils/validation';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Get all invoices
 * GET /api/invoices
 */
export async function handleGetInvoices(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const status = url.searchParams.get('status') || '';
    const clientId = url.searchParams.get('clientId') || '';

    const offset = (page - 1) * limit;

    let query = `
      SELECT i.*, c.name as client_name, c.company as client_company
      FROM invoices i
      LEFT JOIN clients c ON i.client_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    // Clients can only see their own invoices
    if (user.role === 'client' && user.clientId) {
      query += ' AND i.client_id = ?';
      params.push(user.clientId);
    }

    if (status) {
      query += ' AND i.status = ?';
      params.push(status);
    }

    if (clientId) {
      query += ' AND i.client_id = ?';
      params.push(clientId);
    }

    query += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return new Response(
      JSON.stringify({
        success: true,
        invoices: results,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get invoices error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch invoices' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Get single invoice
 * GET /api/invoices/:id
 */
export async function handleGetInvoice(
  request: Request,
  env: Env,
  invoiceId: string
): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);
    if (!authResult.valid) return authResult.response!;

    const user = authResult.user!;

    const invoice = await env.DB.prepare(`
      SELECT i.*, c.name as client_name, c.company as client_company, c.email as client_email
      FROM invoices i
      LEFT JOIN clients c ON i.client_id = c.id
      WHERE i.id = ?
    `)
      .bind(invoiceId)
      .first();

    if (!invoice) {
      return new Response(
        JSON.stringify({ error: 'Invoice not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Clients can only view their own invoices
    if (user.role === 'client' && user.clientId !== invoice.client_id) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Get invoice items
    const { results: items } = await env.DB.prepare(`
      SELECT * FROM invoice_items WHERE invoice_id = ?
    `)
      .bind(invoiceId)
      .all();

    return new Response(
      JSON.stringify({
        success: true,
        invoice: {
          ...invoice,
          items,
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get invoice error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch invoice' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Create new invoice
 * POST /api/invoices
 */
export async function handleCreateInvoice(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as {
      clientId: number;
      projectId?: number;
      items: Array<{
        description: string;
        quantity: number;
        unitPrice: number;
      }>;
      tax?: number;
      discount?: number;
      dueDate?: string;
      notes?: string;
    };

    const validation = validateRequired(data, ['clientId', 'items']);
    if (!validation.valid || !data.items || data.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields or items' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Calculate totals
    const subtotal = data.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);

    const tax = data.tax || 0;
    const discount = data.discount || 0;
    const total = subtotal + tax - discount;

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Insert invoice
    const invoiceResult = await env.DB.prepare(`
      INSERT INTO invoices (
        invoice_number, client_id, project_id, subtotal, tax, discount, total,
        due_date, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')
    `)
      .bind(
        invoiceNumber,
        data.clientId,
        data.projectId || null,
        subtotal,
        tax,
        discount,
        total,
        data.dueDate || null,
        data.notes || null
      )
      .run();

    const invoiceId = invoiceResult.meta.last_row_id;

    // Insert invoice items
    for (const item of data.items) {
      const amount = item.quantity * item.unitPrice;
      await env.DB.prepare(`
        INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, amount)
        VALUES (?, ?, ?, ?, ?)
      `)
        .bind(invoiceId, item.description, item.quantity, item.unitPrice, amount)
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Invoice created successfully',
        invoiceId,
        invoiceNumber,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Create invoice error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create invoice' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Update invoice status
 * PUT /api/invoices/:id
 */
export async function handleUpdateInvoice(
  request: Request,
  env: Env,
  invoiceId: string
): Promise<Response> {
  try {
    const authResult = await requireTeam(request, env);
    if (!authResult.valid) return authResult.response!;

    const data = await request.json() as {
      status?: string;
      sentDate?: string;
      paidDate?: string;
      notes?: string;
    };

    const updates: string[] = [];
    const params: any[] = [];

    if (data.status) {
      updates.push('status = ?');
      params.push(data.status);
    }

    if (data.sentDate) {
      updates.push('sent_date = ?');
      params.push(data.sentDate);
    }

    if (data.paidDate) {
      updates.push('paid_date = ?');
      params.push(data.paidDate);
    }

    if (data.notes !== undefined) {
      updates.push('notes = ?');
      params.push(data.notes);
    }

    if (updates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No fields to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(invoiceId);

    await env.DB.prepare(`UPDATE invoices SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...params)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Invoice updated successfully',
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Update invoice error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update invoice' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Stripe webhook handler
 * POST /api/stripe/webhook
 */
export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing stripe signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Verify Stripe webhook signature
    // const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.type) {
      case 'invoice.paid':
        const invoiceId = event.data.object.metadata?.invoiceId;
        if (invoiceId) {
          await env.DB.prepare(`
            UPDATE invoices
            SET status = 'paid', paid_date = CURRENT_TIMESTAMP
            WHERE id = ?
          `)
            .bind(invoiceId)
            .run();
        }
        break;

      case 'invoice.payment_failed':
        // Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
