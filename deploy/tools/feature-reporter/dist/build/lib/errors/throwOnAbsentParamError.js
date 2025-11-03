"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABSENT_PARAM_ERROR_MESSAGE = void 0;
exports.default = throwOnAbsentParamError;
exports.ABSENT_PARAM_ERROR_MESSAGE = 'Required param not provided';
function throwOnAbsentParamError(param) {
    if (!param) {
        throw new Error(exports.ABSENT_PARAM_ERROR_MESSAGE, { cause: { status: 404 } });
    }
}
