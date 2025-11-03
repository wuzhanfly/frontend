"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const services_1 = __importDefault(require("../services"));
const addressMetadata_1 = __importDefault(require("./addressMetadata"));
const title = 'Public tag submission';
const config = (() => {
    if (services_1.default.reCaptchaV2.siteKey && addressMetadata_1.default.isEnabled && apis_1.default.admin) {
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
