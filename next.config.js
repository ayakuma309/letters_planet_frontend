/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_YOUTUBE_API_KEY: process.env.NEXT_APP_YOUTUBE_API_KEY,
    NEXT_PUBLIC_API_BASEURL: process.env.NEXT_PUBLIC_API_BASEURL,
  },
}

module.exports = nextConfig
