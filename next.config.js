/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['localhost', 'res.cloudinary.com', 'backend-dentistry.onrender.com'],
    },
  };
  
  module.exports = nextConfig;