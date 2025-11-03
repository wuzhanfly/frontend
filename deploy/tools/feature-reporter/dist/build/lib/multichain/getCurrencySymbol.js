"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCurrencySymbol;
const multichain_1 = __importDefault(require("configs/multichain"));
function getCurrencySymbol() {
    const nativeCurrency = (0, multichain_1.default)()?.chains[0]?.config.chain.currency;
    return nativeCurrency?.symbol;
}
