import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the dev-only Next badge (it overlapped the bot's bottom-left content).
  devIndicators: false,
  images: {
    // Premium delivery: modern formats first (§12).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
