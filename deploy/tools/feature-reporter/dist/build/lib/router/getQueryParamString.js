"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getQueryParamString;
function getQueryParamString(param) {
    if (Array.isArray(param)) {
        return param.join(',');
    }
    return param || '';
}
