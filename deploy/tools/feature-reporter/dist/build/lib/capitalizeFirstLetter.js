"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = capitalizeFirstLetter;
function capitalizeFirstLetter(text) {
    if (!text || !text.length) {
        return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}
