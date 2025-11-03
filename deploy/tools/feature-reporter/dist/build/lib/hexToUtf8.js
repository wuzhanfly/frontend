"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hexToUtf8;
const hexToBytes_1 = __importDefault(require("lib/hexToBytes"));
function hexToUtf8(hex) {
    const utf8decoder = new TextDecoder();
    const bytes = (0, hexToBytes_1.default)(hex);
    return utf8decoder.decode(bytes);
}
