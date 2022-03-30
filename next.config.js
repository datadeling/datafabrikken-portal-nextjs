/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['nb'],
    defaultLocale: 'nb'
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
          destination: `http://localhost:3000/:path*`
        }
      ]
    };
  }
};
