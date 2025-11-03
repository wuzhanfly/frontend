"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getResourceErrorPayload;
const getErrorCause_1 = __importDefault(require("./getErrorCause"));
function getResourceErrorPayload(error) {
    const cause = (0, getErrorCause_1.default)(error);
    return cause && 'payload' in cause ? cause.payload : undefined;
}
