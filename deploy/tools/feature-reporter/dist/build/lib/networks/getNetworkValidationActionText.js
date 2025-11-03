"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNetworkValidationActionText;
const app_1 = __importDefault(require("configs/app"));
function getNetworkValidationActionText(chainConfig = app_1.default) {
    switch (chainConfig.chain.verificationType) {
        case 'validation': {
            return 'validated';
        }
        case 'mining': {
            return 'mined';
        }
        case 'posting': {
            return 'posted';
        }
        case 'sequencing': {
            return 'sequenced';
        }
        case 'fee reception': {
            return 'validated';
        }
        default: {
            return 'mined';
        }
    }
}
