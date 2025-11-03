"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBot = isBot;
exports.isHeadlessBrowser = isHeadlessBrowser;
exports.isNextJsChunkError = isNextJsChunkError;
exports.getRequestInfo = getRequestInfo;
exports.getExceptionClass = getExceptionClass;
const compat_1 = require("es-toolkit/compat");
function isBot(userAgent) {
    if (!userAgent)
        return false;
    const botPatterns = [
        'Googlebot', // Google
        'Baiduspider', // Baidu
        'bingbot', // Bing
        'YandexBot', // Yandex
        'DuckDuckBot', // DuckDuckGo
        'Slurp', // Yahoo
        'Applebot', // Apple
        'facebookexternalhit', // Facebook
        'Twitterbot', // Twitter
        'rogerbot', // Moz
        'Alexa', // Alexa
        'AhrefsBot', // Ahrefs
        'SemrushBot', // Semrush
        'spider', // Generic spiders
        'crawler', // Generic crawlers
    ];
    return botPatterns.some(pattern => userAgent.toLowerCase().includes(pattern.toLowerCase()));
}
function isHeadlessBrowser(userAgent) {
    if (!userAgent)
        return false;
    if (userAgent.includes('headless') ||
        userAgent.includes('phantomjs') ||
        userAgent.includes('selenium') ||
        userAgent.includes('puppeteer')) {
        return true;
    }
}
function isNextJsChunkError(url) {
    if (typeof url !== 'string')
        return false;
    return url.includes('/_next/');
}
function getRequestInfo(item) {
    if (!item.request ||
        item.request === null ||
        typeof item.request !== 'object' ||
        !('url' in item.request) ||
        typeof item.request.url !== 'string') {
        return undefined;
    }
    return { url: item.request.url };
}
function getExceptionClass(item) {
    const exceptionClass = (0, compat_1.get)(item, 'body.trace.exception.class');
    return typeof exceptionClass === 'string' ? exceptionClass : undefined;
}
