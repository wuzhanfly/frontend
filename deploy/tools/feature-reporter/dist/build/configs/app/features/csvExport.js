"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
const title = 'Export data to CSV file';
const config = (() => {
    if (services_1.default.reCaptchaV2.siteKey) {
        return Object.freeze({
            title,
            isEnabled: true,
            reCaptcha: {
                siteKey: services_1.default.reCaptchaV2.siteKey,
            },
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
