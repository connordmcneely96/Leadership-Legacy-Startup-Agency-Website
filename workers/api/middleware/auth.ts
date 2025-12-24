// Authentication middleware for protecting routes

import type { D1Database, KVNamespace } from '@cloudflare/workers-types';
import { verifyJWT } from '../utils/crypto';

export interface Env {
  DB: D1Database;
  CONFIG: KVNamespace;
  JWT_SECRET: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    clientId?: number;
  };
}

/**
 * Extract JWT from Authorization header or cookie
 */
function extractToken(request: Request): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookie
  const cookie = request.headers.get('Cookie');
  if (cookie) {
    const match = cookie.match(/auth_token=([^;]+)/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Middleware to verify authentication
 */
export async function requireAuth(
  request: Request,
  env: Env
): Promise<{ valid: boolean; user?: any; response?: Response }> {
  const token = extractToken(request);

  if (!token) {
    return {
      valid: false,
      response: new Response(JSON.stringify({ error: 'No authentication token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  // Verify JWT
  const jwtSecret = env.JWT_SECRET || 'default-secret-change-in-production';
  const payload = await verifyJWT(token, jwtSecret);

  if (!payload) {
    return {
      valid: false,
      response: new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  // Verify session still exists in KV
  const sessionKey = `session:${payload.sessionId}`;
  const sessionData = await env.CONFIG.get(sessionKey);

  if (!sessionData) {
    return {
      valid: false,
      response: new Response(JSON.stringify({ error: 'Session expired' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  // Fetch user from database to ensure they still exist and are active
  const user = await env.DB.prepare(`
    SELECT id, email, role, client_id, is_active
    FROM users
    WHERE id = ?
  `)
    .bind(payload.userId)
    .first();

  if (!user || !user.is_active) {
    return {
      valid: false,
      response: new Response(JSON.stringify({ error: 'User not found or inactive' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  return {
    valid: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      clientId: user.client_id,
    },
  };
}

/**
 * Middleware to require specific roles
 */
export async function requireRole(
  request: Request,
  env: Env,
  allowedRoles: string[]
): Promise<{ valid: boolean; user?: any; response?: Response }> {
  const authResult = await requireAuth(request, env);

  if (!authResult.valid) {
    return authResult;
  }

  if (!allowedRoles.includes(authResult.user!.role)) {
    return {
      valid: false,
      response: new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    };
  }

  return authResult;
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(
  request: Request,
  env: Env
): Promise<{ valid: boolean; user?: any; response?: Response }> {
  return requireRole(request, env, ['admin']);
}

/**
 * Middleware to require admin or team role
 */
export async function requireTeam(
  request: Request,
  env: Env
): Promise<{ valid: boolean; user?: any; response?: Response }> {
  return requireRole(request, env, ['admin', 'team']);
}
