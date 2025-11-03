"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decodeJWT;
const base64UrlDecode = (str) => {
    // Replace characters according to Base64Url standard
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding '=' characters for correct decoding
    const pad = str.length % 4;
    if (pad) {
        str += '='.repeat(4 - pad);
    }
    // Decode from Base64 to string
    const decodedStr = atob(str);
    return decodedStr;
};
function decodeJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }
        const [encodedHeader, encodedPayload, signature] = parts;
        const headerJson = base64UrlDecode(encodedHeader);
        const payloadJson = base64UrlDecode(encodedPayload);
        const header = JSON.parse(headerJson);
        const payload = JSON.parse(payloadJson);
        return { header, payload, signature };
    }
    catch (error) {
        return null;
    }
}
