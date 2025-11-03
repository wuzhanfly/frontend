"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortStatusHistory = exports.STATUS_LABELS = exports.STATUS_SEQUENCE = void 0;
exports.getTacOperationStatus = getTacOperationStatus;
exports.getTacOperationStage = getTacOperationStage;
const tac = __importStar(require("@blockscout/tac-operation-lifecycle-types"));
const htmlEntities_1 = require("toolkit/utils/htmlEntities");
function getTacOperationStatus(type) {
    switch (type) {
        case tac.OperationType.TON_TAC_TON:
            return `TON ${htmlEntities_1.rightLineArrow} TAC ${htmlEntities_1.rightLineArrow} TON`;
        case tac.OperationType.TAC_TON:
            return `TAC ${htmlEntities_1.rightLineArrow} TON`;
        case tac.OperationType.TON_TAC:
            return `TON ${htmlEntities_1.rightLineArrow} TAC`;
        case tac.OperationType.ERROR:
            return 'Error';
        case tac.OperationType.ROLLBACK:
            return 'Rollback';
        case tac.OperationType.PENDING:
            return 'Pending';
        default:
            return null;
    }
}
function getTacOperationStage(data, txHash) {
    const currentStep = data.status_history.filter((step) => step.transactions.some((tx) => tx.hash.toLowerCase() === txHash.toLowerCase()));
    if (currentStep.length === 0) {
        return;
    }
    return currentStep.map((step) => exports.STATUS_LABELS[step.type]);
}
exports.STATUS_SEQUENCE = [
    tac.OperationStage_StageType.COLLECTED_IN_TAC,
    tac.OperationStage_StageType.INCLUDED_IN_TAC_CONSENSUS,
    tac.OperationStage_StageType.EXECUTED_IN_TAC,
    tac.OperationStage_StageType.COLLECTED_IN_TON,
    tac.OperationStage_StageType.INCLUDED_IN_TON_CONSENSUS,
    tac.OperationStage_StageType.EXECUTED_IN_TON,
];
exports.STATUS_LABELS = {
    [tac.OperationStage_StageType.COLLECTED_IN_TAC]: 'Collected in TAC',
    [tac.OperationStage_StageType.INCLUDED_IN_TAC_CONSENSUS]: 'Included in TAC consensus',
    [tac.OperationStage_StageType.EXECUTED_IN_TAC]: 'Executed in TAC',
    [tac.OperationStage_StageType.COLLECTED_IN_TON]: 'Collected in TON',
    [tac.OperationStage_StageType.INCLUDED_IN_TON_CONSENSUS]: 'Included in TON consensus',
    [tac.OperationStage_StageType.EXECUTED_IN_TON]: 'Executed in TON',
    [tac.OperationStage_StageType.UNRECOGNIZED]: 'Unknown',
};
const sortStatusHistory = (a, b) => {
    const aIndex = exports.STATUS_SEQUENCE.indexOf(a.type);
    const bIndex = exports.STATUS_SEQUENCE.indexOf(b.type);
    return aIndex - bIndex;
};
exports.sortStatusHistory = sortStatusHistory;
