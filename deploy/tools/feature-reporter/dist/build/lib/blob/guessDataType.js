"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = guessDataType;
const magic_bytes_js_1 = __importDefault(require("magic-bytes.js"));
const hexToBytes_1 = __importDefault(require("lib/hexToBytes"));
const removeNonSignificantZeroBytes_1 = __importDefault(require("./removeNonSignificantZeroBytes"));
function guessDataType(data) {
    const bytes = (0, hexToBytes_1.default)(data);
    const filteredBytes = (0, removeNonSignificantZeroBytes_1.default)(bytes);
    return (0, magic_bytes_js_1.default)(filteredBytes)[0];
}
