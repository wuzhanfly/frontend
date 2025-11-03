"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const rollup_1 = __importDefault(require("./rollup"));
const title = 'MUD framework';
const config = (() => {
    if (rollup_1.default.isEnabled && rollup_1.default.type === 'optimistic' && (0, utils_1.getEnvValue)('NEXT_PUBLIC_HAS_MUD_FRAMEWORK') === 'true') {
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
