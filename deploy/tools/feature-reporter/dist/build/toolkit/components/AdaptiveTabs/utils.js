"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTabValue = exports.menuButton = void 0;
const htmlEntities_1 = require("../../utils/htmlEntities");
exports.menuButton = {
    id: 'menu',
    title: `${htmlEntities_1.middot}${htmlEntities_1.middot}${htmlEntities_1.middot}`,
    component: null,
};
const getTabValue = (tab) => {
    if (!tab) {
        return 'undefined';
    }
    if (Array.isArray(tab.id)) {
        return tab.id[0];
    }
    return tab.id;
};
exports.getTabValue = getTabValue;
