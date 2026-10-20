import type { NextConfig } from "next";

const PDF_ASSETS = [
  "./node_modules/@sparticuz/chromium/bin/**",
  "./src/helpers/pdf/font/**",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
  ],
  outputFileTracingIncludes: {
    "/api/inngest": PDF_ASSETS,
    "/api/resumes/[resumeId]/download": PDF_ASSETS,
    "/api/cover-letters/[coverLetterId]/download": PDF_ASSETS
  },
};

export default nextConfig;