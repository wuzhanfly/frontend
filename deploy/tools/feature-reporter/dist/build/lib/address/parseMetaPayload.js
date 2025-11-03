"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseMetaPayload;
function parseMetaPayload(meta) {
    try {
        const parsedMeta = JSON.parse(meta || '');
        if (typeof parsedMeta !== 'object' || parsedMeta === null || Array.isArray(parsedMeta)) {
            throw new Error('Invalid JSON');
        }
        const result = {};
        const stringFields = [
            'textColor',
            'bgColor',
            'tagIcon',
            'tagUrl',
            'tooltipIcon',
            'tooltipTitle',
            'tooltipDescription',
            'tooltipUrl',
            'appID',
            'appMarketplaceURL',
            'appLogoURL',
            'appActionButtonText',
            'warpcastHandle',
            'data',
            'alertBgColor',
            'alertTextColor',
            'alertStatus',
            'cexDeposit',
        ];
        for (const stringField of stringFields) {
            if (stringField in parsedMeta && typeof parsedMeta[stringField] === 'string') {
                result[stringField] = parsedMeta[stringField];
            }
        }
        return result;
    }
    catch (error) {
        return null;
    }
}
