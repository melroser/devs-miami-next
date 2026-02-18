import type { NextConfig } from 'next';

const nextConfig: NextConfig =
  process.env.NODE_ENV === 'development'
    ? {
        async rewrites() {
          return [
            {
              source: '/ph/static/:path*',
              destination: 'https://us-assets.i.posthog.com/static/:path*',
            },
            {
              source: '/ph/:path*',
              destination: 'https://us.i.posthog.com/:path*',
            },
          ];
        },
      }
    : {
        output: 'export',
      };

export default nextConfig;
