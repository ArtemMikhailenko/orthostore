/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      loader: 'custom',
      loaderFile: './image-loader.js',
      remotePatterns: [
        { protocol: 'http', hostname: 'localhost' },
        { protocol: 'https', hostname: 'res.cloudinary.com' },
        { protocol: 'https', hostname: 'backend-dentistry.onrender.com' },
        { protocol: 'https', hostname: 'images.unsplash.com' },
        { protocol: 'https', hostname: 'orthostore.com.ua' },
        { protocol: 'https', hostname: 'placehold.co' },
      ],
    },
  };
  
  module.exports = nextConfig;