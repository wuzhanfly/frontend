"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDRESS_LENGTH = void 0;
exports.addressValidator = addressValidator;
const regexp_1 = require("toolkit/utils/regexp");
exports.ADDRESS_LENGTH = 42;
function addressValidator(value) {
    if (!value) {
        return true;
    }
    return regexp_1.ADDRESS_REGEXP.test(value) ? true : 'Incorrect address format';
}
