"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNetworkUtilizationParams;
function getNetworkUtilizationParams(value) {
    const load = (() => {
        if (value > 80) {
            return 'high';
        }
        if (value > 50) {
            return 'medium';
        }
        return 'low';
    })();
    const colors = {
        high: 'red.600',
        medium: 'orange.600',
        low: 'green.600',
    };
    const color = colors[load];
    return {
        load,
        color,
    };
}
