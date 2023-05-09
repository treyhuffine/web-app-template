const { withSentryConfig } = require('@sentry/nextjs');

const date = new Date();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  env: {
    APP_STAGE: process.env.APP_STAGE,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY, // NOTE: This is the public client key
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: +date,
    ROOT_URL: process.env.ROOT_URL,
    APP_URL: process.env.APP_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/meta/robots',
      },
    ];
  },
};

module.exports = nextConfig;
// module.exports = withSentryConfig(nextConfig);
