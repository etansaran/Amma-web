/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === "production" ? { distDir: ".next-build" } : {}),
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
