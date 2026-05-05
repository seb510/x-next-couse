import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    reactStrictMode: true,
    typedRoutes: true,
    logging: {
        serverFunctions: true,
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
