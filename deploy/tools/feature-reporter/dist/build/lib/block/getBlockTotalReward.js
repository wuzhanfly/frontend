"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getBlockTotalReward;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const consts_1 = require("toolkit/utils/consts");
function getBlockTotalReward(block) {
    const totalReward = block.rewards
        ?.map(({ reward }) => (0, bignumber_js_1.default)(reward))
        .reduce((result, item) => result.plus(item), consts_1.ZERO) || consts_1.ZERO;
    return totalReward.div(consts_1.WEI);
}
