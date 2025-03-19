import type { NextConfig } from "next";
const withFonts = require('next-fonts');

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wweskyvxhhjpucczrjww.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
};

export default nextConfig;
