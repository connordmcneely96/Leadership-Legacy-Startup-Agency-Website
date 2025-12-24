// Authentication route handlers

import type { D1Database, KVNamespace } from '@cloudflare/workers-types';
import { hashPassword, verifyPassword, generateToken, generateJWT } from '../utils/crypto';
import { isValidEmail, isValidPassword, validateRequired } from '../utils/validation';
import { requireAuth } from '../middleware/auth';

export interface Env {
  DB: D1Database;
  CONFIG: KVNamespace;
  JWT_SECRET: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      email: string;
      password?: string;
      firstName: string;
      lastName: string;
      role?: string;
    };

    // Validate required fields
    const validation = validateRequired(data, ['email', 'firstName', 'lastName']);
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

    // Validate password if provided
    if (data.password && !isValidPassword(data.password)) {
      return new Response(
        JSON.stringify({
          error: 'Password must be at least 8 characters with uppercase, lowercase, and number',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Check if user already exists
    const existingUser = await env.DB.prepare(`
      SELECT id FROM users WHERE email = ?
    `)
      .bind(data.email)
      .first();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Hash password if provided
    let passwordHash = null;
    if (data.password) {
      passwordHash = await hashPassword(data.password);
    }

    // Insert user
    const result = await env.DB.prepare(`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `)
      .bind(
        data.email,
        passwordHash,
        data.role || 'client',
        data.firstName,
        data.lastName
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User registered successfully',
        userId: result.meta.last_row_id,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to register user' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Login with email and password
 * POST /api/auth/login
 */
export async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as {
      email: string;
      password: string;
    };

    // Validate required fields
    const validation = validateRequired(data, ['email', 'password']);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Missing email or password' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Fetch user
    const user = await env.DB.prepare(`
      SELECT id, email, password_hash, role, first_name, last_name, client_id, is_active
      FROM users
      WHERE email = ?
    `)
      .bind(data.email)
      .first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    if (!user.is_active) {
      return new Response(
        JSON.stringify({ error: 'Account is inactive' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Verify password
    if (!user.password_hash) {
      return new Response(
        JSON.stringify({ error: 'Password authentication not enabled for this account' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const isValidPassword = await verifyPassword(data.password, user.password_hash as string);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Generate session token
    const sessionToken = generateToken(32);
    const sessionId = generateToken(16);

    // Store session in KV (30 days TTL)
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      clientId: user.client_id,
      createdAt: new Date().toISOString(),
    };

    await env.CONFIG.put(`session:${sessionId}`, JSON.stringify(sessionData), {
      expirationTtl: 30 * 24 * 60 * 60, // 30 days
    });

    // Update last login
    await env.DB.prepare(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `)
      .bind(user.id)
      .run();

    // Generate JWT
    const jwtSecret = env.JWT_SECRET || 'default-secret-change-in-production';
    const token = await generateJWT(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId,
      },
      jwtSecret,
      30 * 24 * 60 * 60 // 30 days
    );

    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          clientId: user.client_id,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
          ...CORS_HEADERS,
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to login' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Request a magic link for passwordless login
 * POST /api/auth/magic-link
 */
export async function handleMagicLink(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as { email: string };

    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Fetch user
    const user = await env.DB.prepare(`
      SELECT id, email, is_active FROM users WHERE email = ?
    `)
      .bind(data.email)
      .first();

    if (!user || !user.is_active) {
      // Don't reveal if user exists
      return new Response(
        JSON.stringify({
          success: true,
          message: 'If an account exists, a magic link has been sent',
        }),
        { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Generate magic link token
    const token = generateToken(48);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store token
    await env.DB.prepare(`
      INSERT INTO magic_links (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `)
      .bind(user.id, token, expiresAt.toISOString())
      .run();

    // TODO: Send email with magic link
    // const magicUrl = `https://leadershiplegacy.com/auth/verify?token=${token}`;
    // await sendEmail(user.email, 'Login Link', magicUrl);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Magic link sent to your email',
        // For development only - remove in production
        devToken: token,
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Magic link error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send magic link' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Verify magic link and login
 * POST /api/auth/verify-magic-link
 */
export async function handleVerifyMagicLink(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json() as { token: string };

    if (!data.token) {
      return new Response(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Fetch magic link
    const magicLink = await env.DB.prepare(`
      SELECT ml.id, ml.user_id, ml.expires_at, ml.used,
             u.email, u.role, u.first_name, u.last_name, u.client_id, u.is_active
      FROM magic_links ml
      JOIN users u ON ml.user_id = u.id
      WHERE ml.token = ?
    `)
      .bind(data.token)
      .first();

    if (!magicLink) {
      return new Response(
        JSON.stringify({ error: 'Invalid magic link' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    if (magicLink.used) {
      return new Response(
        JSON.stringify({ error: 'Magic link already used' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    if (new Date(magicLink.expires_at as string) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Magic link expired' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    if (!magicLink.is_active) {
      return new Response(
        JSON.stringify({ error: 'Account is inactive' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Mark magic link as used
    await env.DB.prepare(`
      UPDATE magic_links SET used = 1 WHERE id = ?
    `)
      .bind(magicLink.id)
      .run();

    // Generate session
    const sessionId = generateToken(16);
    const sessionData = {
      userId: magicLink.user_id,
      email: magicLink.email,
      role: magicLink.role,
      clientId: magicLink.client_id,
      createdAt: new Date().toISOString(),
    };

    await env.CONFIG.put(`session:${sessionId}`, JSON.stringify(sessionData), {
      expirationTtl: 30 * 24 * 60 * 60,
    });

    // Update last login
    await env.DB.prepare(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `)
      .bind(magicLink.user_id)
      .run();

    // Generate JWT
    const jwtSecret = env.JWT_SECRET || 'default-secret-change-in-production';
    const token = await generateJWT(
      {
        userId: magicLink.user_id,
        email: magicLink.email,
        role: magicLink.role,
        sessionId,
      },
      jwtSecret,
      30 * 24 * 60 * 60
    );

    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          id: magicLink.user_id,
          email: magicLink.email,
          role: magicLink.role,
          firstName: magicLink.first_name,
          lastName: magicLink.last_name,
          clientId: magicLink.client_id,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
          ...CORS_HEADERS,
        },
      }
    );
  } catch (error) {
    console.error('Magic link verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to verify magic link' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Logout
 * POST /api/auth/logout
 */
export async function handleLogout(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);

    if (authResult.valid && authResult.user) {
      // Remove session from KV
      const token = request.headers.get('Authorization')?.substring(7);
      if (token) {
        const jwtSecret = env.JWT_SECRET || 'default-secret-change-in-production';
        const payload = await import('../utils/crypto').then(m => m.verifyJWT(token, jwtSecret));
        if (payload && payload.sessionId) {
          await env.CONFIG.delete(`session:${payload.sessionId}`);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Logged out successfully' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          ...CORS_HEADERS,
        },
      }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to logout' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Get current user
 * GET /api/auth/me
 */
export async function handleMe(request: Request, env: Env): Promise<Response> {
  try {
    const authResult = await requireAuth(request, env);

    if (!authResult.valid) {
      return authResult.response!;
    }

    // Fetch full user details
    const user = await env.DB.prepare(`
      SELECT id, email, role, first_name, last_name, client_id, avatar_url,
             phone, created_at, last_login
      FROM users
      WHERE id = ?
    `)
      .bind(authResult.user!.id)
      .first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          clientId: user.client_id,
          avatarUrl: user.avatar_url,
          phone: user.phone,
          createdAt: user.created_at,
          lastLogin: user.last_login,
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get user' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
