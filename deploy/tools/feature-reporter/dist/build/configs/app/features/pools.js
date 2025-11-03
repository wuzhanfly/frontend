"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const dexPoolsEnabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_DEX_POOLS_ENABLED') === 'true';
const title = 'DEX Pools';
const config = (() => {
    if (apis_1.default.contractInfo && dexPoolsEnabled) {
        return Object.freeze({
            title,
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
