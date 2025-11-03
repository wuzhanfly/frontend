"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToRecentKeywords = saveToRecentKeywords;
exports.getRecentSearchKeywords = getRecentSearchKeywords;
exports.removeRecentSearchKeyword = removeRecentSearchKeyword;
exports.clearRecentSearchKeywords = clearRecentSearchKeywords;
const es_toolkit_1 = require("es-toolkit");
const isBrowser_1 = require("toolkit/utils/isBrowser");
const RECENT_KEYWORDS_LS_KEY = 'recent_search_keywords';
const MAX_KEYWORDS_NUMBER = 10;
const parseKeywordsArray = (keywordsStr) => {
    if (!keywordsStr) {
        return [];
    }
    try {
        const parsedResult = JSON.parse(keywordsStr);
        if (Array.isArray(parsedResult)) {
            return parsedResult;
        }
        return [];
    }
    catch (error) {
        return [];
    }
};
function saveToRecentKeywords(value) {
    if (!value) {
        return;
    }
    const keywordsArr = getRecentSearchKeywords();
    const result = (0, es_toolkit_1.uniq)([value, ...keywordsArr]).slice(0, MAX_KEYWORDS_NUMBER - 1);
    window.localStorage.setItem(RECENT_KEYWORDS_LS_KEY, JSON.stringify(result));
}
function getRecentSearchKeywords(input) {
    if (!(0, isBrowser_1.isBrowser)()) {
        return [];
    }
    const keywordsStr = window.localStorage.getItem(RECENT_KEYWORDS_LS_KEY) || '';
    const keywordsArr = parseKeywordsArray(keywordsStr);
    if (!input) {
        return keywordsArr;
    }
    return keywordsArr.filter(kw => kw.includes(input));
}
function removeRecentSearchKeyword(value) {
    const keywordsArr = getRecentSearchKeywords();
    const result = keywordsArr.filter(kw => kw !== value);
    window.localStorage.setItem(RECENT_KEYWORDS_LS_KEY, JSON.stringify(result));
}
function clearRecentSearchKeywords() {
    window.localStorage.setItem(RECENT_KEYWORDS_LS_KEY, '');
}
