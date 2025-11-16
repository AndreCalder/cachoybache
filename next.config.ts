import type { NextConfig } from "next";
const withFonts = require("next-fonts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wweskyvxhhjpucczrjww.supabase.co",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
    ],
  },
  // Note: Upload logic moved to Flask API to bypass Vercel's 4.5MB limit
  // Server actions configuration removed as uploads are now handled by Flask
};

export default nextConfig;
