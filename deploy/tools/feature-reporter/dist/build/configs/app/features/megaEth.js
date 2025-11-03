"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'MegaETH chain';
const socketUrlMetrics = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MEGA_ETH_SOCKET_URL_METRICS');
const socketUrlRpc = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MEGA_ETH_SOCKET_URL_RPC');
const config = (() => {
    if (socketUrlMetrics || socketUrlRpc) {
        return Object.freeze({
            title,
            isEnabled: true,
            socketUrl: {
                metrics: socketUrlMetrics,
                rpc: socketUrlRpc,
            },
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
