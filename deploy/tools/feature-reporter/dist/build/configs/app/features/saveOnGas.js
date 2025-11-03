"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const marketplace_1 = __importDefault(require("./marketplace"));
const title = 'Save on gas with GasHawk';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_SAVE_ON_GAS_ENABLED') === 'true' && marketplace_1.default.isEnabled) {
        return Object.freeze({
            title,
            isEnabled: true,
            apiUrlTemplate: 'https://core.gashawk.io/apiv2/stats/address/<address>/savingsPotential/0x1',
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
