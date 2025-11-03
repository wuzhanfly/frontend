"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFilterValue;
function getFilterValue(filterValues, val) {
    if (typeof val === 'string' && filterValues.includes(val)) {
        return val;
    }
}
