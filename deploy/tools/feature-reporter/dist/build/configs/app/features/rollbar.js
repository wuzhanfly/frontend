"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const utils_1 = require("../utils");
const clientToken = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN');
const instance = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_INSTANCE');
    if (envValue) {
        return envValue;
    }
    return app_1.default.host?.replace('.blockscout.com', '').replace('.k8s-dev', '').replaceAll('-', '_');
})();
const environment = (0, utils_1.getEnvValue)('NEXT_PUBLIC_APP_ENV') || 'production';
const codeVersion = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GIT_TAG') || (0, utils_1.getEnvValue)('NEXT_PUBLIC_GIT_COMMIT_SHA');
const title = 'Rollbar error monitoring';
const config = (() => {
    if (clientToken) {
        return Object.freeze({
            title,
            isEnabled: true,
            clientToken,
            environment,
            instance,
            codeVersion,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
