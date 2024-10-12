/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "uxbbwlzlqqxty3mz.public.blob.vercel-storage.com",
    //     port: "",
    //     pathname: "/**",
    //   },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
