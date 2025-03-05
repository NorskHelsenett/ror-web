import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * On build, Next.js will only export the needed files for deployment.
   * @docs https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files
   */
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@ror/react', '@ror/design'],
  },
}

export default nextConfig
