import type { NextConfig } from "next";
const withFonts = require('next-fonts');

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wweskyvxhhjpucczrjww.supabase.co',
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
