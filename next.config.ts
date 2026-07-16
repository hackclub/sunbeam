import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/organizers/docs",
        destination: "/organizers/docs/quickstart",
        permanent: true,
      },
      {
        source: "/",
        destination: "/participants",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
