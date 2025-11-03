"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorObjStatusCode;
const getErrorObj_1 = __importDefault(require("./getErrorObj"));
function getErrorObjStatusCode(error) {
    const errorObj = (0, getErrorObj_1.default)(error);
    if (!errorObj || !('status' in errorObj) || typeof errorObj.status !== 'number') {
        return;
    }
    return errorObj.status;
}
