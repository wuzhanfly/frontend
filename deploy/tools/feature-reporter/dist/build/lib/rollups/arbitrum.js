"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationSteps = exports.VERIFICATION_STEPS_MAP = void 0;
exports.getVerificationStepStatus = getVerificationStepStatus;
const arbitrumL2_1 = require("types/api/arbitrumL2");
const app_1 = __importDefault(require("configs/app"));
const rollupFeature = app_1.default.features.rollup;
const parentChainName = rollupFeature.isEnabled ? rollupFeature.parentChain.name : undefined;
exports.VERIFICATION_STEPS_MAP = {
    'Processed on rollup': 'Processed on rollup',
    'Sent to base': parentChainName ? `Sent to ${parentChainName}` : 'Sent to parent chain',
    'Confirmed on base': parentChainName ?
        `Confirmed on ${parentChainName}` :
        'Confirmed on parent chain',
};
exports.verificationSteps = (() => {
    return arbitrumL2_1.ARBITRUM_L2_TX_BATCH_STATUSES.map((status) => exports.VERIFICATION_STEPS_MAP[status]);
})();
function getVerificationStepStatus({ status, commitment_transaction: commitTx, confirmation_transaction: confirmTx, }) {
    if (status === 'Sent to base') {
        if (commitTx.status === 'unfinalized') {
            return 'pending';
        }
    }
    if (status === 'Confirmed on base') {
        if (confirmTx.status === 'unfinalized') {
            return 'pending';
        }
    }
    return 'finalized';
}
