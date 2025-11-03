"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_REGEXP = void 0;
exports.urlValidator = urlValidator;
exports.domainValidator = domainValidator;
function urlValidator(value) {
    if (!value) {
        return true;
    }
    try {
        new URL(value);
        return true;
    }
    catch (error) {
        return 'Incorrect URL';
    }
}
exports.DOMAIN_REGEXP = /(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z\d][a-z\d-]{0,61}[a-z\d]/gi;
function domainValidator(value) {
    if (!value) {
        return true;
    }
    const domain = (() => {
        try {
            const url = new URL(`https://${value}`);
            return url.hostname;
        }
        catch (error) {
            return;
        }
    })();
    return domain === value.toLowerCase() || 'Incorrect domain';
}
