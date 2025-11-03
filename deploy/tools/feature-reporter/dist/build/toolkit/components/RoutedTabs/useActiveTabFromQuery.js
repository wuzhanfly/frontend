"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useActiveTabFromQuery;
const router_1 = require("next/router");
const guards_1 = require("../../utils/guards");
function useActiveTabFromQuery(tabs, defaultTabId) {
    const router = (0, router_1.useRouter)();
    const tabFromQuery = (0, guards_1.castToString)(router.query.tab);
    if (!tabFromQuery) {
        if (defaultTabId) {
            return tabs.find((tab) => tab.id === defaultTabId);
        }
        return;
    }
    return tabs.find((tab) => {
        if (Array.isArray(tab.id)) {
            return tab.id.includes(tabFromQuery);
        }
        return tab.id === tabFromQuery || ('subTabs' in tab && tab.subTabs?.some((id) => id === tabFromQuery));
    });
}
