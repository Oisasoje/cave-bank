import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // This pulls the value that Vercel supplies at build time
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  /* config options here */
};

export default nextConfig;
