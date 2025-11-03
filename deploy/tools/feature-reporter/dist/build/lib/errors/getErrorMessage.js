"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorMessage;
const getErrorObj_1 = __importDefault(require("./getErrorObj"));
function getErrorMessage(error) {
    const errorObj = (0, getErrorObj_1.default)(error);
    return errorObj && 'message' in errorObj && typeof errorObj.message === 'string' ? errorObj.message : undefined;
}
