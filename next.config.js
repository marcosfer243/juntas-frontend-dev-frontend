/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    publicRuntimeConfig: {
  // Will be available on both server and client
  places: ['places']
  },

}

module.exports = nextConfig
