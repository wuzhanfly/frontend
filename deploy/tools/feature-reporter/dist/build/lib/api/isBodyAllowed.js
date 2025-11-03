"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isBodyAllowed;
function isBodyAllowed(method) {
    return method && !['GET', 'HEAD'].includes(method);
}
