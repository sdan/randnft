/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    api: {
      responseLimit: false,
    },
}

module.exports = nextConfig
