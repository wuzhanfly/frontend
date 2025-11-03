"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLoadFeatures;
const react_1 = __importDefault(require("react"));
const consts_1 = require("toolkit/utils/consts");
function useLoadFeatures(growthBook) {
    react_1.default.useEffect(() => {
        if (!growthBook) {
            return;
        }
        growthBook.setAttributes({
            ...growthBook.getAttributes(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: window.navigator.language,
        });
        growthBook.loadFeatures({ timeout: consts_1.SECOND });
    }, [growthBook]);
}
