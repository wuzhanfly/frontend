"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reset;
const mixpanel_browser_1 = __importDefault(require("mixpanel-browser"));
const app_1 = __importDefault(require("configs/app"));
function reset() {
    if (!app_1.default.features.mixpanel.isEnabled) {
        return;
    }
    mixpanel_browser_1.default.reset();
}
