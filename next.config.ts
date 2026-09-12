import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "blogino-backend-production.up.railway.app",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
