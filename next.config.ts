import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's GitHub sign-in uses 127.0.0.1 in dev; allow it to reach dev resources.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
