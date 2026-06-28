import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // This pulls the value that Vercel supplies at build time
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://api.housecave.org/:path*"
            : "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
