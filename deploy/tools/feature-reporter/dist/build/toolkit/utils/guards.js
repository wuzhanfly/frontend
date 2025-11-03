"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castToString = castToString;
exports.castToNumber = castToNumber;
function castToString(payload) {
    return typeof payload === 'string' ? payload : undefined;
}
function castToNumber(payload) {
    return typeof payload === 'number' ? payload : undefined;
}
