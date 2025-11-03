"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getErrorProp;
const getErrorObj_1 = __importDefault(require("./getErrorObj"));
function getErrorProp(error, prop) {
    const errorObj = (0, getErrorObj_1.default)(error);
    return errorObj && prop in errorObj ?
        errorObj[prop] :
        undefined;
}
