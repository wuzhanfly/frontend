"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getIconUrl;
function getIconUrl(config) {
    if (!config.config?.UI?.navigation?.icon || !config.config.app) {
        return;
    }
    const iconPath = config.config.UI.navigation.icon.default;
    if (iconPath?.startsWith('http')) {
        return iconPath;
    }
    const appUrl = config.config.app.baseUrl;
    return `${appUrl}${iconPath}`;
}
