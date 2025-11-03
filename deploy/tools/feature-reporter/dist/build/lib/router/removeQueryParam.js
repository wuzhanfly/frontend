"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = removeQueryParam;
function removeQueryParam(router, param) {
    const { pathname, query, asPath } = router;
    const newQuery = { ...query };
    delete newQuery[param];
    const hashIndex = asPath.indexOf('#');
    const hash = hashIndex !== -1 ? asPath.substring(hashIndex) : '';
    router.replace({ pathname, query: newQuery, hash }, undefined, { shallow: true });
}
