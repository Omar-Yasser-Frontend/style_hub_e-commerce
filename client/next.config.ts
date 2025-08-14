import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/digmekbtt/image/upload/**"),
      new URL("https://cdn.dummyjson.com/product-images/**"),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
};

export default nextConfig;
