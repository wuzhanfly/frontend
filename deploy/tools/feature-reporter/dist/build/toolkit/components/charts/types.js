"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOLUTION_LABELS = exports.Resolution = void 0;
var stats_types_1 = require("@blockscout/stats-types");
Object.defineProperty(exports, "Resolution", { enumerable: true, get: function () { return stats_types_1.Resolution; } });
const stats_types_2 = require("@blockscout/stats-types");
exports.RESOLUTION_LABELS = [
    {
        id: stats_types_2.Resolution.DAY,
        title: 'Day',
    },
    {
        id: stats_types_2.Resolution.WEEK,
        title: 'Week',
    },
    {
        id: stats_types_2.Resolution.MONTH,
        title: 'Month',
    },
    {
        id: stats_types_2.Resolution.YEAR,
        title: 'Year',
    },
];
