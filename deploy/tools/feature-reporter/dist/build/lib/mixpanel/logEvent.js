"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logEvent;
const mixpanel_browser_1 = __importDefault(require("mixpanel-browser"));
const app_1 = __importDefault(require("configs/app"));
function logEvent(type, properties, optionsOrCallback, callback) {
    if (!app_1.default.features.mixpanel.isEnabled) {
        return;
    }
    mixpanel_browser_1.default.track(type, properties, optionsOrCallback, callback);
}
