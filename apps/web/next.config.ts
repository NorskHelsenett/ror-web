import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * On build, Next.js will only export the needed files for deployment.
   * @docs https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files
   */
  output: 'standalone',
  experimental: {
    /**
     * Optimizes package imports to load only the modules actually used.
     * This improves performance for packages with many exports by allowing
     * convenient import statements while avoiding loading unused modules.
     * @docs https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports
     */
    optimizePackageImports: ['@ror/react'],
  },
}

export default nextConfig
