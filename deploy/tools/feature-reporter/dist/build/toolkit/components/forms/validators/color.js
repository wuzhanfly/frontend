"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorValidator = exports.COLOR_HEX_REGEXP = void 0;
exports.COLOR_HEX_REGEXP = /^#[a-f\d]{3,6}$/i;
const colorValidator = (value) => {
    if (typeof value !== 'string') {
        return true;
    }
    if (!value || value.length === 0) {
        return true;
    }
    if (value.length !== 4 && value.length !== 7) {
        return 'Invalid length';
    }
    if (!exports.COLOR_HEX_REGEXP.test(value)) {
        return 'Invalid hex code';
    }
    return true;
};
exports.colorValidator = colorValidator;
