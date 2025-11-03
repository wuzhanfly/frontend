"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripLeadingSlash = exports.stripTrailingSlash = void 0;
exports.makePrettyLink = makePrettyLink;
const stripTrailingSlash = (str) => str[str.length - 1] === '/' ? str.slice(0, -1) : str;
exports.stripTrailingSlash = stripTrailingSlash;
const stripLeadingSlash = (str) => str[0] === '/' ? str.slice(1) : str;
exports.stripLeadingSlash = stripLeadingSlash;
function makePrettyLink(url) {
    try {
        const urlObj = new URL(url ?? '');
        return {
            href: urlObj.href,
            domain: urlObj.hostname,
        };
    }
    catch (error) { }
}
