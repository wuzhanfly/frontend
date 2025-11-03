"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-restricted-imports
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
const minMax_1 = __importDefault(require("dayjs/plugin/minMax"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const updateLocale_1 = __importDefault(require("dayjs/plugin/updateLocale"));
const weekOfYear_1 = __importDefault(require("dayjs/plugin/weekOfYear"));
const htmlEntities_1 = require("toolkit/utils/htmlEntities");
const relativeTimeConfig = {
    thresholds: [
        { l: 's', r: 1 },
        { l: 'ss', r: 59, d: 'second' },
        { l: 'm', r: 1 },
        { l: 'mm', r: 59, d: 'minute' },
        { l: 'h', r: 1 },
        { l: 'hh', r: 23, d: 'hour' },
        { l: 'd', r: 1 },
        { l: 'dd', r: 6, d: 'day' },
        { l: 'w', r: 1 },
        { l: 'ww', r: 4, d: 'week' },
        { l: 'M', r: 1 },
        { l: 'MM', r: 11, d: 'month' },
        { l: 'y', r: 17 },
        { l: 'yy', d: 'year' },
    ],
};
dayjs_1.default.extend(relativeTime_1.default, relativeTimeConfig);
dayjs_1.default.extend(updateLocale_1.default);
dayjs_1.default.extend(localizedFormat_1.default);
dayjs_1.default.extend(duration_1.default);
dayjs_1.default.extend(weekOfYear_1.default);
dayjs_1.default.extend(minMax_1.default);
dayjs_1.default.updateLocale('en', {
    formats: {
        llll: `MMM DD YYYY HH:mm:ss A (Z${htmlEntities_1.nbsp}UTC)`,
        lll: 'MMM D, YYYY h:mm A',
    },
    relativeTime: {
        s: '1s',
        ss: '%ds',
        future: 'in %s',
        past: '%s ago',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        w: '1w',
        ww: '%dw',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dy',
    },
});
dayjs_1.default.locale('en');
exports.default = dayjs_1.default;
