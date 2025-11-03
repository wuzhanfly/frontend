"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMES = void 0;
exports.get = get;
exports.set = set;
exports.remove = remove;
exports.getFromCookieString = getFromCookieString;
const js_cookie_1 = __importDefault(require("js-cookie"));
const isBrowser_1 = require("toolkit/utils/isBrowser");
var NAMES;
(function (NAMES) {
    NAMES["NAV_BAR_COLLAPSED"] = "nav_bar_collapsed";
    NAMES["API_TOKEN"] = "_explorer_key";
    NAMES["REWARDS_API_TOKEN"] = "rewards_api_token";
    NAMES["REWARDS_REFERRAL_CODE"] = "rewards_ref_code";
    NAMES["TXS_SORT"] = "txs_sort";
    NAMES["COLOR_MODE"] = "chakra-ui-color-mode";
    NAMES["COLOR_THEME"] = "chakra-ui-color-theme";
    NAMES["ADDRESS_IDENTICON_TYPE"] = "address_identicon_type";
    NAMES["ADDRESS_FORMAT"] = "address_format";
    NAMES["TIME_FORMAT"] = "time_format";
    NAMES["INDEXING_ALERT"] = "indexing_alert";
    NAMES["ADBLOCK_DETECTED"] = "adblock_detected";
    NAMES["MIXPANEL_DEBUG"] = "_mixpanel_debug";
    NAMES["ADDRESS_NFT_DISPLAY_TYPE"] = "address_nft_display_type";
    NAMES["UUID"] = "uuid";
    NAMES["SHOW_SCAM_TOKENS"] = "show_scam_tokens";
})(NAMES || (exports.NAMES = NAMES = {}));
function get(name, serverCookie) {
    if (!(0, isBrowser_1.isBrowser)()) {
        return serverCookie ? getFromCookieString(serverCookie, name) : undefined;
    }
    if (name) {
        return js_cookie_1.default.get(name);
    }
}
function set(name, value, attributes = {}) {
    attributes.path = '/';
    return js_cookie_1.default.set(name, value, attributes);
}
function remove(name, attributes = {}) {
    return js_cookie_1.default.remove(name, attributes);
}
function getFromCookieString(cookieString, name) {
    return cookieString.split(`${name}=`)[1]?.split(';')[0];
}
