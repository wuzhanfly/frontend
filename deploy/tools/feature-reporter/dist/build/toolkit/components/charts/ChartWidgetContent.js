"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartWidgetContent = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const link_1 = require("../../chakra/link");
const skeleton_1 = require("../../chakra/skeleton");
const htmlEntities_1 = require("../../utils/htmlEntities");
const Chart_1 = require("./Chart");
const ChartWatermark_1 = require("./parts/ChartWatermark");
;
exports.ChartWidgetContent = react_2.default.memo(({ charts, title, isLoading, isError, empty, emptyText, zoomRange, handleZoom, isEnlarged, noAnimation, resolution, axesConfig, noWatermark, }) => {
    if (isError) {
        return (<react_1.Flex alignItems="center" justifyContent="center" flexGrow={1} py={4}>
        <react_1.Text color="text.secondary" fontSize="sm" textAlign="center">
          {`The data didn${htmlEntities_1.apos}t load. Please, `}
          <link_1.Link href={window.document.location.href}>try to reload the page.</link_1.Link>
        </react_1.Text>
      </react_1.Flex>);
    }
    if (isLoading) {
        return <skeleton_1.Skeleton loading flexGrow={1} w="100%"/>;
    }
    if (empty || charts.length === 0) {
        return (<react_1.Center flexGrow={1}>
        <react_1.Text color="text.secondary" fontSize="sm">{emptyText || 'No data'}</react_1.Text>
      </react_1.Center>);
    }
    return (<react_1.Box flexGrow={1} maxW="100%" position="relative" h="100%">
      <Chart_1.Chart charts={charts} zoomRange={zoomRange} onZoom={handleZoom} title={title} isEnlarged={isEnlarged} noAnimation={noAnimation} resolution={resolution} axesConfig={axesConfig}/>
      {!noWatermark && <ChartWatermark_1.ChartWatermark w="162px" h="15%"/>}
    </react_1.Box>);
});
