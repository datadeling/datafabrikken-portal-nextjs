/** @type {import('next').NextConfig} */
module.exports = {
  compilerOptions: {
    baseUrl: 'src'
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  i18n: {
    locales: ['nb'],
    defaultLocale: 'nb'
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGES_DRUPAL,
      process.env.NEXT_PUBLIC_IMAGES_STRAPI
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  async rewrites() {
    return {
      // After checking all Next.js pages (including dynamic routes)
      // and static files we proxy any other requests
      fallback: [
        {
          source: '/:path*',
          destination: `${process.env.NEXT_PUBLIC_DATAFABRIKKEN_CLIENT}/:path*`
        }
      ]
    };
  },
  experimental: {
    outputStandalone: true
  }
};
