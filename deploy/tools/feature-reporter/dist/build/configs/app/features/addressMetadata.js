"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const title = 'Address metadata';
const config = (() => {
    if (apis_1.default.metadata) {
        return Object.freeze({
            title,
            isEnabled: true,
            isAddressTagsUpdateEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_METADATA_ADDRESS_TAGS_UPDATE_ENABLED') !== 'false',
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
