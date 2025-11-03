"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormFieldErrorText = getFormFieldErrorText;
function getFormFieldErrorText(error) {
    if (!error?.message && error?.type === 'pattern') {
        return 'Invalid format';
    }
    return error?.message;
}
