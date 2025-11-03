"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const account_1 = __importDefault(require("./account"));
const blockchainInteraction_1 = __importDefault(require("./blockchainInteraction"));
const title = 'Rewards service integration';
const config = (() => {
    if (apis_1.default.rewards && account_1.default.isEnabled && blockchainInteraction_1.default.isEnabled) {
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
