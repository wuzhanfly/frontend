"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gasTracker_1 = require("types/client/gasTracker");
const chain_1 = __importDefault(require("../chain"));
const utils_1 = require("../utils");
const isDisabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GAS_TRACKER_ENABLED') === 'false';
const units = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GAS_TRACKER_UNITS');
    if (!envValue) {
        if (chain_1.default.isTestnet) {
            return ['gwei'];
        }
        return ['usd', 'gwei'];
    }
    const units = (0, utils_1.parseEnvJson)(envValue)?.filter((type) => gasTracker_1.GAS_UNITS.includes(type)) || [];
    return units;
})();
const title = 'Gas tracker';
const config = (() => {
    if (!isDisabled && units.length > 0) {
        return Object.freeze({
            title,
            isEnabled: true,
            units,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
