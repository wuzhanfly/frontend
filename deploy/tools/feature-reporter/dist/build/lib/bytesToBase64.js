"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bytesToBase64;
function bytesToBase64(bytes) {
    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    const base64String = btoa(binary);
    return base64String;
}
