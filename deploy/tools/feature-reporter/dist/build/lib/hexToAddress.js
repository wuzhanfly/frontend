"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hexToAddress;
function hexToAddress(hex) {
    const shortenHex = hex.slice(0, 66);
    return shortenHex.slice(0, 2) + shortenHex.slice(26);
}
