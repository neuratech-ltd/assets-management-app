import type { NextConfig } from 'next'

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3001'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.68.125', 'localhost'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
