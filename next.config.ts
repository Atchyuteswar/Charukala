import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  serverExternalPackages: ["pdfkit"],

  images: {

    remotePatterns: [

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "picsum.photos",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

    ]

  }

};

export default nextConfig;