import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "@sparticuz/chromium-min",
    "puppeteer-core",
  ],
  outputFileTracingIncludes: {
    "/api/inngest": ["./node_modules/@sparticuz/chromium/bin/**"],
    "/api/resumes/[resumeId]/download": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
};

export default nextConfig;