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
        source: "/organisers",
        destination: "/organizers",
        permanent: true,
      },
      {
        source: "/organisers/:path*",
        destination: "/organizers/:path*",
        permanent: true,
      },
      {
        source: "/nyc",
        destination: "/new-york-city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
