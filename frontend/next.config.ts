import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/beats",
  // /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       // source: "/api/:path*",
  //       // destination: "http://127.0.0.1:3001/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
