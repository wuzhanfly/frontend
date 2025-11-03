"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const isEnabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_OP_SUPERCHAIN_ENABLED') === 'true';
const title = 'OP Superchain interop explorer';
const config = (() => {
    if (apis_1.default.multichain && isEnabled) {
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
