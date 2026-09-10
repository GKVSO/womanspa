import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // unoptimized: true removed to enable Next.js native optimization
  },
};

export default nextConfig;