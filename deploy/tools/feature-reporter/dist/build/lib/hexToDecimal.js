"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hetToDecimal;
function hetToDecimal(hex) {
    const strippedHex = hex.startsWith('0x') ? hex.slice(2) : hex;
    return parseInt(strippedHex, 16);
}
