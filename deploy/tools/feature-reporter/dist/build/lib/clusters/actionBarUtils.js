"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldShowClearButton = shouldShowClearButton;
exports.shouldDisableViewToggle = shouldDisableViewToggle;
exports.getSearchPlaceholder = getSearchPlaceholder;
exports.shouldShowActionBar = shouldShowActionBar;
function shouldShowClearButton(searchValue) {
    return searchValue.length > 0;
}
function shouldDisableViewToggle(isLoading) {
    return isLoading;
}
function getSearchPlaceholder() {
    return 'Search clusters by name or EVM address';
}
function shouldShowActionBar(paginationVisible, isDesktop) {
    return isDesktop || paginationVisible;
}
