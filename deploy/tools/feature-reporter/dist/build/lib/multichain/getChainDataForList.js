"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainDataForList = getChainDataForList;
function getChainDataForList(multichainContext) {
    // for now we only show chain icon in the list with chain selector (not in the entire local pages)
    return multichainContext?.chain && multichainContext.level !== 'page' ? multichainContext.chain : undefined;
}
