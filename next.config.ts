import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    TURSO_URL: process.env.TURSO_URL,
    TURSO_TOKEN: process.env.TURSO_TOKEN,
  },
};


export default nextConfig;
