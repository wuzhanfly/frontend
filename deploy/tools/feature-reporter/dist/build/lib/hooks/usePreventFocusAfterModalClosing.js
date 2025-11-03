"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usePreventFocusAfterModalClosing;
const react_1 = __importDefault(require("react"));
// prevent set focus on button when closing modal
function usePreventFocusAfterModalClosing() {
    return react_1.default.useCallback((e) => e.stopPropagation(), []);
}
