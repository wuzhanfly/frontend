"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = set;
exports.setOnce = setOnce;
exports.increment = increment;
const mixpanel_browser_1 = __importDefault(require("mixpanel-browser"));
function set(props) {
    mixpanel_browser_1.default.people.set(props);
}
function setOnce(props) {
    mixpanel_browser_1.default.people.set_once(props);
}
function increment(props) {
    mixpanel_browser_1.default.people.increment(props);
}
