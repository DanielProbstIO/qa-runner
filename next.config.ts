import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingIncludes: {
    "/api/testcases": ["./vault/**"],
  },
};

export default nextConfig;
