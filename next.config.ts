import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the dev-only Next badge (it overlapped the bot's bottom-left content).
  devIndicators: false,
  images: {
    // Premium delivery: modern formats first (§12).
    formats: ["image/avif", "image/webp"],
    // Cap the generated variants — fewer breakpoints = fewer huge decodes on the
    // backdrops/gallery, and a long cache TTL avoids re-encoding on every visit.
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920],
    imageSizes: [256, 384, 640],
    minimumCacheTTL: 2_592_000, // 30 days
  },
};

export default nextConfig;
