"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chain_1 = __importDefault(require("../chain"));
const utils_1 = require("../utils");
const marketplace_1 = __importDefault(require("./marketplace"));
const value = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_GAS_REFUEL_PROVIDER_CONFIG'));
const title = 'Get gas button';
const config = (() => {
    if (value) {
        return Object.freeze({
            title,
            isEnabled: true,
            name: value.name,
            logoUrl: value.logo,
            url: value.url_template.replace('{chainId}', chain_1.default.id || ''),
            dappId: marketplace_1.default.isEnabled ? value.dapp_id : undefined,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
