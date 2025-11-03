"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGbFeatureValue;
const growthbook_react_1 = require("@growthbook/growthbook-react");
function useGbFeatureValue(name, fallback) {
    const value = (0, growthbook_react_1.useFeatureValue)(name, fallback);
    const growthBook = (0, growthbook_react_1.useGrowthBook)();
    return { value, isLoading: !(growthBook?.ready ?? true) };
}
