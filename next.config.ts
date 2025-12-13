import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler for performance */
  reactCompiler: true,

  /* Cloudflare Pages Configuration */
  output: 'export', // Static export for Cloudflare Pages

  /* Image Optimization - Compatible with Cloudflare */
  images: {
    unoptimized: true, // Cloudflare will handle optimization via Polish
  },

  /* Asset Prefix for R2 (can be configured later) */
  // assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,

  /* Headers for Cloudflare Pages */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
