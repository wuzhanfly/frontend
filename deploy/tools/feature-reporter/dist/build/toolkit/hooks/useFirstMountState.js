"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirstMountState = useFirstMountState;
const react_1 = __importDefault(require("react"));
// Returns true if component is just mounted (on first render) and false otherwise.
function useFirstMountState() {
    const isFirst = react_1.default.useRef(true);
    if (isFirst.current) {
        isFirst.current = false;
        return true;
    }
    return isFirst.current;
}
