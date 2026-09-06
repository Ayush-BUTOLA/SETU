import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "visible-bedroom-safely-lounge.trycloudflare.com",
    "localhost:3000",
    "127.0.0.1:3000",
    "*.ngrok-free.app",
    "*.loca.lt",
  ],
};

export default nextConfig;
