import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // add a rule to handle the canvas.node binary module
    config.module.rules.push({ test: /\.node$/, use: "row-loader" });

    // Exclude canvas from being preprocessed by Next.js in the browser
    if (!isServer) config.externals.push("canvas");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
