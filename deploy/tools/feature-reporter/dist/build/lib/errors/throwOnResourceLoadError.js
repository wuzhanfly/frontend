"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOURCE_LOAD_ERROR_MESSAGE = void 0;
exports.default = throwOnResourceLoadError;
exports.RESOURCE_LOAD_ERROR_MESSAGE = 'Resource load error';
function throwOnResourceLoadError({ isError, error, resource }) {
    if (isError) {
        throw Error(exports.RESOURCE_LOAD_ERROR_MESSAGE, { cause: { ...error, resource } });
    }
}
