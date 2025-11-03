"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const path_1 = require("path");
const vite_1 = require("vite");
const vite_plugin_dts_1 = __importDefault(require("vite-plugin-dts"));
const vite_plugin_svgr_1 = __importDefault(require("vite-plugin-svgr"));
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_tsconfig_paths_1.default)(),
        (0, vite_plugin_svgr_1.default)({
            include: '**/*.svg',
            exclude: '',
            svgrOptions: {
                icon: true,
                svgo: true,
                plugins: ['@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                    removeHiddenElems: false,
                                },
                            },
                        },
                        'removeDimensions',
                    ],
                },
            },
        }),
        (0, vite_plugin_dts_1.default)({
            include: [
                '../chakra/**/*.tsx',
                '../theme/**/*.ts',
                '../components/**/*',
                '../utils/**/*.ts',
                '../hooks/**/*.tsx',
                './src/**/*.ts',
                '../../global.d.ts',
                '../../decs.d.ts',
                '../../reset.d.ts',
            ],
            exclude: [
                '../**/*.pw.tsx',
                '../**/*.pw.ts',
                '../**/*.test.*',
                '../**/*.spec.*',
            ],
            rollupTypes: false,
            outDir: './dist',
            insertTypesEntry: true,
            entryRoot: '..',
        }),
    ],
    resolve: {
        alias: {
            configs: (0, path_1.resolve)(__dirname, '../../configs'),
            lib: (0, path_1.resolve)(__dirname, '../../lib'),
            types: (0, path_1.resolve)(__dirname, '../../types'),
            icons: (0, path_1.resolve)(__dirname, '../../icons'),
            ui: (0, path_1.resolve)(__dirname, '../../ui'),
            'public': (0, path_1.resolve)(__dirname, '../../public'),
            toolkit: (0, path_1.resolve)(__dirname, '../'),
        },
    },
    build: {
        lib: {
            entry: (0, path_1.resolve)(__dirname, './src/index.ts'),
            formats: ['es'],
            fileName: 'index',
        },
        outDir: './dist',
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                '@chakra-ui/react',
                '@emotion/react',
                'next/link',
                'next/router',
                'next-themes',
                'react-hook-form',
                'es-toolkit',
                'dayjs',
                'd3',
                'dom-to-image',
                '@uidotdev/usehooks',
            ],
            output: {
                preserveModules: false,
                preserveModulesRoot: '..',
                exports: 'named',
                interop: 'auto',
            },
        },
    },
});
