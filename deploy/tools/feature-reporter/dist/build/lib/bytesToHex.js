"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bytesToBase64;
function bytesToBase64(bytes, addPrefix = true) {
    let result = '';
    for (const byte of bytes) {
        result += Number(byte).toString(16).padStart(2, '0');
    }
    return addPrefix ? `0x${result}` : result;
}
