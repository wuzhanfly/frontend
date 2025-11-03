"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useNotifyOnNavigation;
const navigation_1 = require("next/navigation");
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
function useNotifyOnNavigation() {
    const router = (0, router_1.useRouter)();
    const pathname = (0, navigation_1.usePathname)();
    const tab = (0, getQueryParamString_1.default)(router.query.tab);
    react_1.default.useEffect(() => {
        if (app_1.default.features.metasuites.isEnabled) {
            window.postMessage({ source: 'APP_ROUTER', type: 'PATHNAME_CHANGED' }, window.location.origin);
        }
    }, [pathname]);
    react_1.default.useEffect(() => {
        if (app_1.default.features.metasuites.isEnabled) {
            window.postMessage({ source: 'APP_ROUTER', type: 'TAB_CHANGED' }, window.location.origin);
        }
    }, [tab]);
}
