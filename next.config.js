const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    // Written only to support await connectToDatabase() in models/* files
    config.experiments.topLevelAwait = true;
    return config;
  }
}

module.exports = withBundleAnalyzer(nextConfig);
