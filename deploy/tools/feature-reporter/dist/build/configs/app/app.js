"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const appPort = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_PORT');
const appSchema = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_PROTOCOL');
const appHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_HOST');
const baseUrl = [
    appSchema || 'https',
    '://',
    appHost,
    appPort && ':' + appPort,
].filter(Boolean).join('');
const isDev = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_ENV') === 'development';
const isPw = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_INSTANCE') === 'pw';
const spriteHash = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ICON_SPRITE_HASH');
const app = Object.freeze({
    isDev,
    isPw,
    protocol: appSchema,
    host: appHost,
    port: appPort,
    baseUrl,
    useProxy: (0, utils_1.getEnvValue)('NEXT_PUBLIC_USE_NEXT_JS_PROXY') === 'true',
    spriteHash,
});
exports.default = app;
