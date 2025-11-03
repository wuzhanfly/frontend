"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BENS_API_RESOURCES = void 0;
exports.BENS_API_RESOURCES = {
    addresses_lookup: {
        path: '/api/v1/:chainId/addresses\\:lookup',
        pathParams: ['chainId'],
        filterFields: ['address', 'resolved_to', 'owned_by', 'only_active', 'protocols'],
        paginated: true,
    },
    address_domain: {
        path: '/api/v1/:chainId/addresses/:address',
        pathParams: ['chainId', 'address'],
    },
    domain_info: {
        path: '/api/v1/:chainId/domains/:name',
        pathParams: ['chainId', 'name'],
    },
    domain_events: {
        path: '/api/v1/:chainId/domains/:name/events',
        pathParams: ['chainId', 'name'],
    },
    domains_lookup: {
        path: '/api/v1/:chainId/domains\\:lookup',
        pathParams: ['chainId'],
        filterFields: ['name', 'only_active', 'protocols'],
        paginated: true,
    },
    domain_protocols: {
        path: '/api/v1/:chainId/protocols',
        pathParams: ['chainId'],
    },
};
/* eslint-enable @stylistic/indent */
