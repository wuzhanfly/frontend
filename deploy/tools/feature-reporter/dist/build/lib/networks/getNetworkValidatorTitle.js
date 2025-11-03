"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNetworkValidatorTitle;
const app_1 = __importDefault(require("configs/app"));
function getNetworkValidatorTitle() {
    switch (app_1.default.chain.verificationType) {
        case 'validation': {
            return 'validator';
        }
        case 'mining': {
            return 'miner';
        }
        case 'posting': {
            return 'poster';
        }
        case 'sequencing': {
            return 'sequencer';
        }
        case 'fee reception': {
            return 'fee recipient';
        }
        default: {
            return 'miner';
        }
    }
}
