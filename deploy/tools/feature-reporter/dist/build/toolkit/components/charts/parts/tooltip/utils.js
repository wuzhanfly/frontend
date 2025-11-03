"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRowTransformValue = exports.calculateContainerHeight = exports.LABEL_WIDTH = exports.POINT_SIZE = exports.LINE_SPACE = exports.PADDING = exports.TEXT_LINE_HEIGHT = void 0;
exports.TEXT_LINE_HEIGHT = 12;
exports.PADDING = 16;
exports.LINE_SPACE = 10;
exports.POINT_SIZE = 16;
exports.LABEL_WIDTH = 80;
const calculateContainerHeight = (seriesNum, isIncomplete) => {
    const linesNum = isIncomplete ? seriesNum + 2 : seriesNum + 1;
    return 2 * exports.PADDING + linesNum * exports.TEXT_LINE_HEIGHT + (linesNum - 1) * exports.LINE_SPACE;
};
exports.calculateContainerHeight = calculateContainerHeight;
const calculateRowTransformValue = (rowNum) => {
    const top = Math.max(0, exports.PADDING + rowNum * (exports.LINE_SPACE + exports.TEXT_LINE_HEIGHT));
    return `translate(${exports.PADDING},${top})`;
};
exports.calculateRowTransformValue = calculateRowTransformValue;
