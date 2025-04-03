/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  experimental: {
    externalDir: true,
    missingSuspenseWithCSRBailout: false,
  },
  // Ensure static files are served correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
};

export default nextConfig;
