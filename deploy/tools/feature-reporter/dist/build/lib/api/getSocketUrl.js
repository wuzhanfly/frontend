"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSocketUrl;
const app_1 = __importDefault(require("configs/app"));
function getSocketUrl(config = app_1.default) {
    return `${config.apis.general.socketEndpoint}${config.apis.general.basePath ?? ''}/socket/v2`;
}
