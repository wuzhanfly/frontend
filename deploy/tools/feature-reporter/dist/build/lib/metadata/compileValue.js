"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileValue;
function compileValue(template, params) {
    const PLACEHOLDER_REGEX = /%(\w+)%/g;
    return template.replaceAll(PLACEHOLDER_REGEX, (match, p1) => {
        const value = params[p1];
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (value === undefined) {
            return '';
        }
        return value;
    });
}
