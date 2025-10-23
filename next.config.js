/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
