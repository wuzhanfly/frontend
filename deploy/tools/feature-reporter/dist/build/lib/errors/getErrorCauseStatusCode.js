"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorCauseStatusCode;
const getErrorCause_1 = __importDefault(require("./getErrorCause"));
function getErrorCauseStatusCode(error) {
    const cause = (0, getErrorCause_1.default)(error);
    return cause && 'status' in cause && typeof cause.status === 'number' ? cause.status : undefined;
}
