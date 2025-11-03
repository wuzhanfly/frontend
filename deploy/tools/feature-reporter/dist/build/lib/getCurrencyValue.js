"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCurrencyValue;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const consts_1 = require("toolkit/utils/consts");
function getCurrencyValue({ value, accuracy, accuracyUsd, decimals, exchangeRate }) {
    const valueCurr = (0, bignumber_js_1.default)(value).div((0, bignumber_js_1.default)(10 ** Number(decimals || '18')));
    const valueResult = accuracy ? valueCurr.dp(accuracy).toFormat() : valueCurr.toFormat();
    let usdResult;
    let usdBn = consts_1.ZERO;
    if (exchangeRate) {
        const exchangeRateBn = new bignumber_js_1.default(exchangeRate);
        usdBn = valueCurr.times(exchangeRateBn);
        if (accuracyUsd && !usdBn.isEqualTo(0)) {
            const usdBnDp = usdBn.dp(accuracyUsd);
            usdResult = usdBnDp.isEqualTo(0) ? usdBn.precision(accuracyUsd).toFormat() : usdBnDp.toFormat();
        }
        else {
            usdResult = usdBn.toFormat();
        }
    }
    return { valueCurr, valueStr: valueResult, usd: usdResult, usdBn };
}
