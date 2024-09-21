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
  env: {
    AUTH_TOKEN: "9d0f9613-d7a6-4239-8b05-759dee528b1b",
    API_BASE_URL: "https://api.real-estate-manager.redberryinternship.ge/api",
    APP_ENV: "development",
  },
};

export default nextConfig;
