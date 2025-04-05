/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test-task-api.allfuneral.com",
        pathname: "**", 
      },
    ],
  },
};

module.exports = nextConfig;

