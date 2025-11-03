"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const marketplace_1 = __importDefault(require("./marketplace"));
const value = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_MULTICHAIN_BALANCE_PROVIDER_CONFIG'));
const title = 'Multichain balance';
const config = (() => {
    if (value) {
        return Object.freeze({
            title,
            isEnabled: true,
            providers: value.map((provider) => ({
                name: provider.name,
                logoUrl: provider.logo,
                urlTemplate: provider.url_template,
                dappId: marketplace_1.default.isEnabled ? provider.dapp_id : undefined,
            })),
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
