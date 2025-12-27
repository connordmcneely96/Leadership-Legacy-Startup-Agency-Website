/**
 * Cloudflare Pages Function to proxy /api requests to Worker
 * This allows the static Next.js site to communicate with the backend Worker
 */

interface Env {
  WORKER_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Get Worker URL from environment or use default
  const workerUrl = env.WORKER_URL || 'https://leadership-legacy.YOUR_SUBDOMAIN.workers.dev';
  
  // Forward the request to the Worker
  const workerRequest = new URL(url.pathname + url.search, workerUrl);
  
  // Copy headers
  const headers = new Headers(request.headers);
  
  // Forward the request to the Worker
  const response = await fetch(workerRequest.toString(), {
    method: request.method,
    headers: headers,
    body: request.body,
  });
  
  // Return the Worker's response
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};
