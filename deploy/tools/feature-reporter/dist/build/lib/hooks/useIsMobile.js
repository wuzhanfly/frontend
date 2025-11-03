"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsMobile;
const react_1 = require("@chakra-ui/react");
function useIsMobile(ssr = true) {
    return (0, react_1.useBreakpointValue)({ base: true, lg: false }, { ssr });
}
