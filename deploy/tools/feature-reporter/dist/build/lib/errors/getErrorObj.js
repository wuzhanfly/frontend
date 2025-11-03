"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorObj;
function getErrorObj(error) {
    if (typeof error !== 'object') {
        return;
    }
    if (Array.isArray(error)) {
        return;
    }
    if (error === null) {
        return;
    }
    return error;
}
