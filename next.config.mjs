/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    turbo: false, 
  },

  images: {
    domains: ["api.runrisenation.com"],
  },
};

export default nextConfig;
