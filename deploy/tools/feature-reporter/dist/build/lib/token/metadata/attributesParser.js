"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = attributesParser;
const es_toolkit_1 = require("es-toolkit");
const dayjs_1 = __importDefault(require("lib/date/dayjs"));
const consts_1 = require("toolkit/utils/consts");
function formatValue(value, display, trait) {
    // https://docs.opensea.io/docs/metadata-standards#attributes
    switch (display) {
        case 'boost_number': {
            return {
                value: `+${value} boost`,
            };
        }
        case 'boost_percentage': {
            return {
                value: `${value}% boost`,
            };
        }
        case 'date': {
            return {
                value: (0, dayjs_1.default)(Number(value) * consts_1.SECOND).format('YYYY-MM-DD'),
            };
        }
        default: {
            try {
                if (trait?.toLowerCase().includes('url') || value.toString().startsWith('http')) {
                    const url = new URL(String(value));
                    return {
                        value: url.toString(),
                        value_type: 'URL',
                    };
                }
                throw new Error();
            }
            catch (error) {
                return {
                    value: String(value),
                };
            }
        }
    }
}
function attributesParser(attributes) {
    return attributes
        .map((item) => {
        if (typeof item !== 'object' || !item) {
            return;
        }
        const value = (() => {
            if (!('value' in item)) {
                return;
            }
            switch (typeof item.value) {
                case 'string':
                case 'number':
                    return item.value;
                case 'boolean':
                    return String(item.value);
                case 'object':
                    return JSON.stringify(item.value);
            }
        })();
        const trait = 'trait_type' in item && typeof item.trait_type === 'string' ? item.trait_type : undefined;
        const display = 'display_type' in item && typeof item.display_type === 'string' ? item.display_type : undefined;
        if (value === undefined) {
            return;
        }
        return {
            ...formatValue(value, display, trait),
            trait_type: (0, es_toolkit_1.upperFirst)(trait || 'property'),
        };
    })
        .filter((item) => item?.value)
        .filter(Boolean);
}
