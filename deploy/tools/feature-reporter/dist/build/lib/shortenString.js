"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shortenString;
function shortenString(string, charNumber = 8) {
    if (!string) {
        return '';
    }
    if (string.length <= charNumber) {
        return string;
    }
    const tailLength = charNumber < 8 ? 2 : 4;
    return string.slice(0, charNumber - tailLength) + '...' + string.slice(-tailLength);
}
