"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorObjPayload;
const getErrorObj_1 = __importDefault(require("./getErrorObj"));
function getErrorObjPayload(error) {
    const errorObj = (0, getErrorObj_1.default)(error);
    if (!errorObj || !('payload' in errorObj)) {
        return;
    }
    if (typeof errorObj.payload !== 'object') {
        return;
    }
    if (errorObj === null) {
        return;
    }
    if (Array.isArray(errorObj)) {
        return;
    }
    return errorObj.payload;
}
