"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noWhitespaceValidator = void 0;
const noWhitespaceValidator = (value) => {
    if (typeof value !== 'string') {
        return true;
    }
    if (value === '') {
        return true;
    }
    const trimmedValue = value.replace(/\s/g, '');
    return trimmedValue !== '' || 'Should contain text';
};
exports.noWhitespaceValidator = noWhitespaceValidator;
