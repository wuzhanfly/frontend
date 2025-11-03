"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_CONTRACT_RESOURCES = void 0;
exports.GENERAL_API_CONTRACT_RESOURCES = {
    contract: {
        path: '/api/v2/smart-contracts/:hash',
        pathParams: ['hash'],
    },
    contract_verification_config: {
        path: '/api/v2/smart-contracts/verification/config',
    },
    contract_verification_via: {
        path: '/api/v2/smart-contracts/:hash/verification/via/:method',
        pathParams: ['hash', 'method'],
    },
    contract_solidity_scan_report: {
        path: '/api/v2/proxy/3rdparty/solidityscan/smart-contracts/:hash/report',
        pathParams: ['hash'],
    },
    contract_security_audits: {
        path: '/api/v2/smart-contracts/:hash/audit-reports',
        pathParams: ['hash'],
    },
    verified_contracts: {
        path: '/api/v2/smart-contracts',
        filterFields: ['q', 'filter'],
        paginated: true,
    },
    verified_contracts_counters: {
        path: '/api/v2/smart-contracts/counters',
    },
};
/* eslint-enable @stylistic/indent */
