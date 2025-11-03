"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorMessage;
function getErrorMessage(error, field) {
    return error?.[field]?.join(', ');
}
