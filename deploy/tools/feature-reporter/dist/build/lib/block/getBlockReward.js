"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getBlockReward;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
function getBlockReward(block) {
    const txFees = (0, bignumber_js_1.default)(block.transaction_fees || 0);
    const burntFees = (0, bignumber_js_1.default)(block.burnt_fees || 0);
    const minerReward = block.rewards?.find(({ type }) => type === 'Miner Reward' || type === 'Validator Reward')?.reward;
    const totalReward = (0, bignumber_js_1.default)(minerReward || 0);
    const staticReward = totalReward.minus(txFees).plus(burntFees);
    return {
        totalReward,
        staticReward,
        txFees,
        burntFees,
    };
}
