"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorCause;
function getErrorCause(error) {
    return (error && 'cause' in error &&
        typeof error.cause === 'object' && error.cause !== null &&
        error.cause) ||
        undefined;
}
