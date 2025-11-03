"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexadecimalChainId = getHexadecimalChainId;
function getHexadecimalChainId(chainId) {
    return '0x' + Number(chainId).toString(16);
}
