import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yjjvllzoefxvbvzylvsr.supabase.co",
        pathname: "/storage/v1/object/public/assets/images/**"
      }
    ],
  },
};

export default nextConfig;
