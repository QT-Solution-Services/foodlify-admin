/** @type {import('next').NextConfig} */

const { baseUrl } = require("./src/constant/env.config.ts");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["foodlify-files.s3.amazonaws.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // distDir: "./build",
};

module.exports = nextConfig;
