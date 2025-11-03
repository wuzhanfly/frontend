"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFilterValue;
const getValuesArrayFromQuery_1 = __importDefault(require("./getValuesArrayFromQuery"));
function getFilterValue(filterValues, val) {
    const valArray = (0, getValuesArrayFromQuery_1.default)(val);
    if (!valArray) {
        return;
    }
    return valArray.filter(el => filterValues.includes(el));
}
