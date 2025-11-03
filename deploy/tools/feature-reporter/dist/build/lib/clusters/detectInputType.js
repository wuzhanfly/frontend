"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectInputType = detectInputType;
const regexp_1 = require("toolkit/utils/regexp");
function detectInputType(input) {
    if (!input || input.trim().length === 0) {
        return 'cluster_name';
    }
    const trimmedInput = input.trim();
    if (regexp_1.ADDRESS_REGEXP.test(trimmedInput)) {
        return 'address';
    }
    return 'cluster_name';
}
