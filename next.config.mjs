/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "platform.theverge.com"
          },
        ],
        domains: ["platform.theverge.com"], // Alternative way to whitelist domains
      },
};

export default nextConfig;
