/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://api.real-estate-manager.redberryinternship.ge"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
