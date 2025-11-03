"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPoolLinks;
function getPoolLinks(pool) {
    if (!pool) {
        return [];
    }
    return [
        {
            url: pool.coin_gecko_terminal_url,
            image: '/static/gecko_terminal.png',
            title: 'GeckoTerminal',
        },
    ].filter(link => Boolean(link.url));
}
