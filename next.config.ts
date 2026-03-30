import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler for performance */
  reactCompiler: true,

  /* Cloudflare Pages — static export */
  output: 'export',

  /* Image optimization disabled for static export */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
