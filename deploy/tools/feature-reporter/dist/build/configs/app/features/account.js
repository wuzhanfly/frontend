"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
const utils_1 = require("../utils");
const title = 'My account';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_IS_ACCOUNT_SUPPORTED') === 'true' && services_1.default.reCaptchaV2.siteKey) {
        return Object.freeze({
            title,
            isEnabled: true,
            recaptchaSiteKey: services_1.default.reCaptchaV2.siteKey,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
