"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getValueWithUnit;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const consts_1 = require("toolkit/utils/consts");
function getValueWithUnit(value, unit = 'wei') {
    let unitBn;
    switch (unit) {
        case 'wei':
            unitBn = consts_1.WEI;
            break;
        case 'gwei':
            unitBn = consts_1.GWEI;
            break;
        default:
            unitBn = new bignumber_js_1.default(1);
    }
    const valueBn = new bignumber_js_1.default(value);
    const valueCurr = valueBn.dividedBy(unitBn);
    return valueCurr;
}
