import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "yjjvllzoefxvbvzylvsr.supabase.co",
      }
    ],
  },
};

export default nextConfig;
