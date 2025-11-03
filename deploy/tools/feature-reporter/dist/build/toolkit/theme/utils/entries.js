"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEntries = mapEntries;
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/utils/entries.ts#L1
function mapEntries(obj, f) {
    const result = {};
    for (const key in obj) {
        const kv = f(key, obj[key]);
        result[kv[0]] = kv[1];
    }
    return result;
}
