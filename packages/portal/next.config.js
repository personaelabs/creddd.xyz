/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')();

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'none',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
      },
    ],
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;

const withBundleAnalyzerConfig =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

// Injected content via Sentry wizard below

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

module.exports =
  process.env.NODE_ENV === 'development'
    ? withBundleAnalyzerConfig
    : withSentryConfig(
        withBundleAnalyzerConfig,
        {
          // For all available options, see:
          // https://github.com/getsentry/sentry-webpack-plugin#options

          // Suppresses source map uploading logs during build
          silent: true,
          org: 'personae-labs',
          project: 'portal',
        },
        {
          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,

          // Transpiles SDK to be compatible with IE11 (increases bundle size)
          transpileClientSDK: true,

          // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
          // This can increase your server load as well as your hosting bill.
          // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
          // side errors will fail.
          // tunnelRoute: "/monitoring",

          // Hides source maps from generated client bundles
          hideSourceMaps: true,

          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,
        }
      );
