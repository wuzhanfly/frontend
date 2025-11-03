"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildUrl;
const path_to_regexp_1 = require("path-to-regexp");
const app_1 = __importDefault(require("configs/app"));
const getResourceParams_1 = __importDefault(require("./getResourceParams"));
const isNeedProxy_1 = __importDefault(require("./isNeedProxy"));
function buildUrl(resourceFullName, pathParams, queryParams, noProxy, chain) {
    const { api, resource } = (0, getResourceParams_1.default)(resourceFullName, chain);
    const baseUrl = !noProxy && (0, isNeedProxy_1.default)() ? app_1.default.app.baseUrl : api.endpoint;
    const basePath = api.basePath ?? '';
    const path = !noProxy && (0, isNeedProxy_1.default)() ? '/node-api/proxy' + basePath + resource.path : basePath + resource.path;
    const url = new URL((0, path_to_regexp_1.compile)(path)(pathParams), baseUrl);
    queryParams && Object.entries(queryParams).forEach(([key, value]) => {
        // there are some pagination params that can be null or false for the next page
        value !== undefined && value !== '' && url.searchParams.append(key, String(value));
    });
    return url.toString();
}
