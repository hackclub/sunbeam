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
    ];
  },
};

export default nextConfig;
