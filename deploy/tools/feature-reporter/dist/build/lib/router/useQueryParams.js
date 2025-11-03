"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryParams = useQueryParams;
const router_1 = require("next/router");
const react_1 = require("react");
function useQueryParams() {
    const router = (0, router_1.useRouter)();
    const updateQuery = (0, react_1.useCallback)((updates, replace = false) => {
        const newQuery = { ...router.query };
        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined) {
                delete newQuery[key];
            }
            else {
                newQuery[key] = value;
            }
        });
        const routerFn = replace ? router.replace : router.push;
        routerFn({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
    }, [router]);
    return { updateQuery };
}
