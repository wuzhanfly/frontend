"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyUnits = void 0;
const app_1 = __importDefault(require("configs/app"));
const weiName = app_1.default.chain.currency.weiName || 'wei';
exports.currencyUnits = {
    wei: weiName,
    gwei: `G${weiName}`,
    ether: app_1.default.chain.currency.symbol || 'ETH',
};
