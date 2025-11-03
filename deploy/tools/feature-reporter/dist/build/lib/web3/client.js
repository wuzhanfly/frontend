"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClient = void 0;
const viem_1 = require("viem");
const chains_1 = require("./chains");
exports.publicClient = (() => {
    // TODO @tom2drum public clients for multichain (currently used only in degradation views)
    if (chains_1.currentChain?.rpcUrls.default.http.filter(Boolean).length === 0) {
        return;
    }
    try {
        return (0, viem_1.createPublicClient)({
            chain: chains_1.currentChain,
            transport: (0, viem_1.http)(),
            batch: {
                multicall: true,
            },
        });
    }
    catch (error) { }
})();
