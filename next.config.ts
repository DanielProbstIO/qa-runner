import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // sorgt dafür, dass der vault-Ordner mit in die Serverless-Funktion für /api/testcases kommt
  outputFileTracingIncludes: {
    "/api/testcases": ["./vault/**"],
  },
};

export default nextConfig;
