"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getResourceParams;
const app_1 = __importDefault(require("configs/app"));
const resources_1 = require("./resources");
function getResourceParams(resourceFullName, chain) {
    const [apiName, resourceName] = resourceFullName.split(':');
    const apiConfig = (() => {
        if (chain) {
            return chain.config.apis[apiName];
        }
        return app_1.default.apis[apiName];
    })();
    if (!apiConfig) {
        throw new Error(`API config for ${apiName} not found`);
    }
    return {
        api: apiConfig,
        apiName,
        resource: resources_1.RESOURCES[apiName][resourceName],
    };
}
