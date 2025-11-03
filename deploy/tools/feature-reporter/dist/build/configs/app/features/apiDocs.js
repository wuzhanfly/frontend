"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiDocs_1 = require("types/views/apiDocs");
const utils_1 = require("../utils");
const graphqlDefaultTxnHash = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GRAPHIQL_TRANSACTION');
const tabs = (() => {
    const value = ((0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_API_DOCS_TABS')) || apiDocs_1.API_DOCS_TABS)
        .filter((tab) => apiDocs_1.API_DOCS_TABS.includes(tab))
        .filter((tab) => !graphqlDefaultTxnHash && tab === 'graphql_api' ? false : true);
    return value.length > 0 ? value : undefined;
})();
const title = 'API documentation';
const config = (() => {
    if (tabs) {
        return Object.freeze({
            title,
            isEnabled: true,
            tabs,
            coreApiSwaggerUrl: (0, utils_1.getEnvValue)('NEXT_PUBLIC_API_SPEC_URL') || `https://raw.githubusercontent.com/blockscout/blockscout-api-v2-swagger/main/swagger.yaml`,
            graphqlDefaultTxnHash,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
