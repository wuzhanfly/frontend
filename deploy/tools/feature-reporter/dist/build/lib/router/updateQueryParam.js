"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateQueryParam;
function updateQueryParam(router, param, newValue) {
    const { pathname, query, asPath } = router;
    const newQuery = { ...query };
    newQuery[param] = newValue;
    const hashIndex = asPath.indexOf('#');
    const hash = hashIndex !== -1 ? asPath.substring(hashIndex) : '';
    router.replace({ pathname, query: newQuery, hash }, undefined, { shallow: true });
}
