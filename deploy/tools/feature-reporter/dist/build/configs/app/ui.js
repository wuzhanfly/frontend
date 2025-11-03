"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const homepage_1 = require("types/homepage");
const colorTheme_1 = require("lib/settings/colorTheme");
const features = __importStar(require("./features"));
const views = __importStar(require("./ui/views"));
const utils_1 = require("./utils");
const homePageStats = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_HOMEPAGE_STATS'));
    if (!Array.isArray(parsedValue)) {
        const rollupFeature = features.rollup;
        if (rollupFeature.isEnabled && ['zkEvm', 'zkSync', 'arbitrum'].includes(rollupFeature.type)) {
            return ['latest_batch', 'average_block_time', 'total_txs', 'wallet_addresses', 'gas_tracker'];
        }
        return ['total_blocks', 'average_block_time', 'total_txs', 'wallet_addresses', 'gas_tracker'];
    }
    return parsedValue.filter((item) => homepage_1.HOME_STATS_WIDGET_IDS.includes(item));
})();
const highlightedRoutes = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_NAVIGATION_HIGHLIGHTED_ROUTES'));
    return Array.isArray(parsedValue) ? parsedValue : [];
})();
const defaultColorTheme = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_COLOR_THEME_DEFAULT');
    return colorTheme_1.COLOR_THEMES.find((theme) => theme.id === envValue);
})();
const navigationPromoBanner = (() => {
    const envValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_NAVIGATION_PROMO_BANNER_CONFIG'));
    return envValue || undefined;
})();
const UI = Object.freeze({
    navigation: {
        logo: {
            'default': (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_NETWORK_LOGO'),
            dark: (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_NETWORK_LOGO_DARK'),
        },
        icon: {
            'default': (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_NETWORK_ICON'),
            dark: (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_NETWORK_ICON_DARK'),
        },
        highlightedRoutes,
        otherLinks: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_OTHER_LINKS')) || [],
        layout: ((0, utils_1.getEnvValue)('NEXT_PUBLIC_NAVIGATION_LAYOUT') || 'vertical'),
        promoBanner: navigationPromoBanner,
    },
    featuredNetworks: {
        items: (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_FEATURED_NETWORKS'),
        allLink: (0, utils_1.getEnvValue)('NEXT_PUBLIC_FEATURED_NETWORKS_ALL_LINK'),
    },
    footer: {
        links: (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_FOOTER_LINKS'),
        frontendVersion: (0, utils_1.getEnvValue)('NEXT_PUBLIC_GIT_TAG'),
        frontendCommit: (0, utils_1.getEnvValue)('NEXT_PUBLIC_GIT_COMMIT_SHA'),
    },
    homepage: {
        charts: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_HOMEPAGE_CHARTS')) || [],
        stats: homePageStats,
        heroBanner: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_HOMEPAGE_HERO_BANNER_CONFIG')),
    },
    views,
    indexingAlert: {
        blocks: {
            isHidden: (0, utils_1.getEnvValue)('NEXT_PUBLIC_HIDE_INDEXING_ALERT_BLOCKS') === 'true' ? true : false,
        },
        intTxs: {
            isHidden: (0, utils_1.getEnvValue)('NEXT_PUBLIC_HIDE_INDEXING_ALERT_INT_TXS') === 'true' ? true : false,
        },
    },
    maintenanceAlert: {
        message: (0, utils_1.getEnvValue)('NEXT_PUBLIC_MAINTENANCE_ALERT_MESSAGE'),
    },
    explorers: {
        items: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_EXPLORERS')) || [],
    },
    ides: {
        items: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_CONTRACT_CODE_IDES')) || [],
    },
    hasContractAuditReports: (0, utils_1.getEnvValue)('NEXT_PUBLIC_HAS_CONTRACT_AUDIT_REPORTS') === 'true' ? true : false,
    colorTheme: {
        'default': defaultColorTheme,
        overrides: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_COLOR_THEME_OVERRIDES')) || {},
    },
    fonts: {
        heading: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_FONT_FAMILY_HEADING')),
        body: (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_FONT_FAMILY_BODY')),
    },
    maxContentWidth: (0, utils_1.getEnvValue)('NEXT_PUBLIC_MAX_CONTENT_WIDTH_ENABLED') === 'false' ? false : true,
    nativeCoinPrice: {
        isHidden: (0, utils_1.getEnvValue)('NEXT_PUBLIC_HIDE_NATIVE_COIN_PRICE') === 'true' ? true : false,
    },
});
exports.default = UI;
