"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEvmAddress = isEvmAddress;
const regexp_1 = require("toolkit/utils/regexp");
function isEvmAddress(address) {
    if (!address)
        return false;
    return regexp_1.ADDRESS_REGEXP.test(address.trim());
}
