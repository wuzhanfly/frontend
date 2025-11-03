"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hexToBase64;
const bytesToBase64_1 = __importDefault(require("./bytesToBase64"));
const hexToBytes_1 = __importDefault(require("./hexToBytes"));
function hexToBase64(hex) {
    const bytes = (0, hexToBytes_1.default)(hex);
    return (0, bytesToBase64_1.default)(bytes);
}
