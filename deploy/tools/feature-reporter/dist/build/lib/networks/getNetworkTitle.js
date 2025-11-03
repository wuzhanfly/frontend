"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNetworkTitle;
const app_1 = __importDefault(require("configs/app"));
// TODO delete when page descriptions is refactored
function getNetworkTitle() {
    return app_1.default.chain.name + (app_1.default.chain.shortName ? ` (${app_1.default.chain.shortName})` : '') + ' Explorer';
}
