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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartWidget = void 0;
const react_1 = require("@chakra-ui/react");
const es_toolkit_1 = require("es-toolkit");
const react_2 = __importStar(require("react"));
const Repeat_1 = __importDefault(require("icons-components/Repeat"));
const icon_button_1 = require("../../chakra/icon-button");
const link_1 = require("../../chakra/link");
const skeleton_1 = require("../../chakra/skeleton");
const tooltip_1 = require("../../chakra/tooltip");
const ChartWidgetContent_1 = require("./ChartWidgetContent");
const ChartLegend_1 = require("./parts/ChartLegend");
const ChartMenu_1 = __importDefault(require("./parts/ChartMenu"));
const useChartZoom_1 = require("./utils/useChartZoom");
;
exports.ChartWidget = react_2.default.memo(({ charts, title, description, isLoading, isError, emptyText, noAnimation, href, chartUrl, axesConfig, menuItemIds, noWatermark, ...rest }) => {
    const ref = (0, react_2.useRef)(null);
    const { zoomRange, handleZoom, handleZoomReset } = (0, useChartZoom_1.useChartZoom)();
    const [selectedCharts, setSelectedCharts] = react_2.default.useState((0, es_toolkit_1.range)(charts.length));
    react_2.default.useEffect(() => {
        if (charts.length > 0) {
            setSelectedCharts((0, es_toolkit_1.range)(charts.length));
        }
    }, [charts.length]);
    const handleLegendItemClick = react_2.default.useCallback((index) => {
        setSelectedCharts((prev) => {
            if (prev.includes(index)) {
                return prev.filter((item) => item !== index);
            }
            return [...prev, index];
        });
    }, []);
    const displayedCharts = react_2.default.useMemo(() => {
        return charts.filter((_, index) => selectedCharts.includes(index));
    }, [charts, selectedCharts]);
    const hasNonEmptyCharts = charts.some(({ items }) => items && items.length > 2);
    const hasMenu = (() => {
        const hasIds = !(menuItemIds && menuItemIds.length === 0);
        if (!hasIds) {
            return false;
        }
        if (isError) {
            return false;
        }
        if (!hasNonEmptyCharts) {
            return false;
        }
        return true;
    })();
    const content = (<ChartWidgetContent_1.ChartWidgetContent charts={displayedCharts} isError={isError} isLoading={isLoading} title={title} empty={!hasNonEmptyCharts} emptyText={emptyText} handleZoom={handleZoom} zoomRange={zoomRange} noAnimation={noAnimation} axesConfig={axesConfig} noWatermark={noWatermark}/>);
    const chartHeader = (<react_1.Flex flexGrow={1} flexDir="column" alignItems="flex-start" cursor={href ? 'pointer' : 'default'} _hover={href ? { color: 'link.primary.hovered' } : {}}>
      <skeleton_1.Skeleton loading={isLoading} fontWeight={600} textStyle="md">
        <span>{title}</span>
      </skeleton_1.Skeleton>

      {description && (<skeleton_1.Skeleton loading={isLoading} color="text.secondary" textStyle="xs" mt={1}>
          <span>{description}</span>
        </skeleton_1.Skeleton>)}
    </react_1.Flex>);
    return (<react_1.Flex height="100%" ref={ref} flexDir="column" padding={{ base: 3, lg: 4 }} borderRadius="lg" borderWidth="1px" borderColor={{ _light: 'gray.200', _dark: 'gray.600' }} {...rest}>
      <react_1.Flex columnGap={6} mb={2} alignItems="flex-start">
        {href ? (<link_1.Link href={href}>
            {chartHeader}
          </link_1.Link>) : chartHeader}
        <react_1.Flex ml="auto" columnGap={2}>
          <tooltip_1.Tooltip content="Reset zoom">
            <icon_button_1.IconButton hidden={!zoomRange} aria-label="Reset zoom" size="md" variant="icon_background" onClick={handleZoomReset}>
              <react_1.Icon><Repeat_1.default /></react_1.Icon>
            </icon_button_1.IconButton>
          </tooltip_1.Tooltip>

          {hasMenu && (<ChartMenu_1.default charts={charts} itemIds={menuItemIds} title={title} description={description} chartUrl={chartUrl} isLoading={isLoading} chartRef={ref} handleZoom={handleZoom} handleZoomReset={handleZoomReset} zoomRange={zoomRange}/>)}
        </react_1.Flex>
      </react_1.Flex>

      {content}

      {charts.length > 1 && (<ChartLegend_1.ChartLegend data={charts} selectedIndexes={selectedCharts} onItemClick={handleLegendItemClick}/>)}
    </react_1.Flex>);
});
