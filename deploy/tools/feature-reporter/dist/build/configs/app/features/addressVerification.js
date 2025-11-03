"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const account_1 = __importDefault(require("./account"));
const verifiedTokens_1 = __importDefault(require("./verifiedTokens"));
const title = 'Address verification in "My account"';
const config = (() => {
    if (account_1.default.isEnabled && verifiedTokens_1.default.isEnabled && apis_1.default.admin) {
        return Object.freeze({
            title: 'Address verification in "My account"',
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
