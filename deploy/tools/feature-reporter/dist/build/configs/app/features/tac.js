"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const title = 'Ton Application Chain (TAC)';
const tonExplorerUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_TAC_TON_EXPLORER_URL');
const config = (() => {
    if (apis_1.default.tac && tonExplorerUrl) {
        return Object.freeze({
            title,
            isEnabled: true,
            tonExplorerUrl,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
