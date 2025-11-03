"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("types/client/contract");
const address_1 = require("types/views/address");
const utils_1 = require("configs/app/utils");
const identiconType = (() => {
    const value = (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_ADDRESS_IDENTICON_TYPE');
    return address_1.IDENTICON_TYPES.find((type) => value === type) || 'blockie';
})();
const formats = (() => {
    const value = ((0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_ADDRESS_FORMAT')) || [])
        .filter((format) => address_1.ADDRESS_FORMATS.includes(format));
    if (value.length === 0) {
        return ['base16'];
    }
    return value;
})();
const bech32Prefix = (() => {
    const value = (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_ADDRESS_BECH_32_PREFIX');
    if (!value || !formats.includes('bech32')) {
        return undefined;
    }
    // these are the limits of the bech32 prefix - https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
    return value.length >= 1 && value.length <= 83 ? value : undefined;
})();
const hiddenViews = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_ADDRESS_HIDDEN_VIEWS')) || [];
    if (!Array.isArray(parsedValue)) {
        return undefined;
    }
    const result = address_1.ADDRESS_VIEWS_IDS.reduce((result, item) => {
        result[item] = parsedValue.includes(item);
        return result;
    }, {});
    return result;
})();
const extraVerificationMethods = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_CONTRACT_EXTRA_VERIFICATION_METHODS');
    if (envValue === 'none') {
        return [];
    }
    if (!envValue) {
        return contract_1.SMART_CONTRACT_EXTRA_VERIFICATION_METHODS;
    }
    const parsedMethods = (0, utils_1.parseEnvJson)(envValue) || [];
    return parsedMethods.filter((method) => contract_1.SMART_CONTRACT_EXTRA_VERIFICATION_METHODS.includes(method));
})();
const languageFilters = (() => {
    const envValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_CONTRACT_LANGUAGE_FILTERS'));
    if (!envValue) {
        // "Scilla" is chain specific language, so we don't want to show it in default scenario
        const DEFAULT_LANGUAGE_FILTERS = contract_1.SMART_CONTRACT_LANGUAGE_FILTERS.filter((filter) => filter !== 'scilla');
        return DEFAULT_LANGUAGE_FILTERS;
    }
    return envValue.filter((filter) => contract_1.SMART_CONTRACT_LANGUAGE_FILTERS.includes(filter));
})();
const config = Object.freeze({
    identiconType,
    hashFormat: {
        availableFormats: formats,
        bech32Prefix,
    },
    hiddenViews,
    nativeTokenAddress: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_ADDRESS_NATIVE_TOKEN_ADDRESS'),
    solidityscanEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_CONTRACT_SOLIDITYSCAN_ENABLED') === 'true',
    extraVerificationMethods,
    languageFilters,
    decodedBytecodeEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_CONTRACT_DECODED_BYTECODE_ENABLED') === 'true',
});
exports.default = config;
