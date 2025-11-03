const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.BUNDLE_ANALYZER === 'true',
});

const withRoutes = require('nextjs-routes/config')({
    outDir: 'nextjs',
});

// next.config.js
// const withSvgr = require('next-plugin-svgr');
// module.exports = withSvgr({
//     // 你还可以传入额外配置
//     svgrOptions: {
//         icon: true,
//         // 其他 SVGR options
//     },
//     // 若你需要其他 Next.js 配置：
//     // nextConfig: { ... }
// });

const headers = require('./nextjs/headers');
const redirects = require('./nextjs/redirects');
const rewrites = require('./nextjs/rewrites');

/** @type {import('next').NextConfig} */
const moduleExports = {
    transpilePackages: [
        'react-syntax-highlighter',
    ],
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        );
        config.resolve.fallback = {fs: false, net: false, tls: false};
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    // NOTE: all config functions should be static and not depend on any environment variables
    // since all variables will be passed to the app only at runtime and there is now way to change Next.js config at this time
    // if you are stuck and strongly believe what you need some sort of flexibility here please fill free to join the discussion
    // https://github.com/blockscout/frontend/discussions/167
    rewrites,
    redirects,
    headers,
    output: 'standalone',
    productionBrowserSourceMaps: true,
    serverExternalPackages: ["@opentelemetry/sdk-node", "@opentelemetry/auto-instrumentations-node"],
    experimental: {
        staleTimes: {
            dynamic: 30,
            'static': 180,
        },
    },
};

module.exports = withBundleAnalyzer(withRoutes(moduleExports));
