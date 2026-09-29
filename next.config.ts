import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Three.js ships untranspiled ESM helpers that some bundlers need help with.
  transpilePackages: ["three"],
  images: {
    // AVIF first (smallest), WebP as the fallback for older browsers.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
