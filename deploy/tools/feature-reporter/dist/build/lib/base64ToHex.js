"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = base64ToHex;
const bytesToHex_1 = __importDefault(require("./bytesToHex"));
function base64ToHex(base64) {
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    return (0, bytesToHex_1.default)(bytes, false);
}
