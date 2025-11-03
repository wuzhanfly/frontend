"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compareBns;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
function compareBns(value1, value2) {
    const value1Bn = new bignumber_js_1.default(value1);
    const value2Bn = new bignumber_js_1.default(value2);
    if (value1Bn.isGreaterThan(value2Bn)) {
        return 1;
    }
    if (value1Bn.isLessThan(value2Bn)) {
        return -1;
    }
    return 0;
}
