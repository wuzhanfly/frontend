"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
const compat_1 = require("es-toolkit/compat");
const react_1 = __importDefault(require("react"));
const types_1 = require("./types");
const useIsMobile_1 = __importDefault(require("lib/hooks/useIsMobile"));
const ChartArea_1 = require("./parts/ChartArea");
const ChartAxis_1 = require("./parts/ChartAxis");
const ChartGridLine_1 = require("./parts/ChartGridLine");
const ChartLine_1 = require("./parts/ChartLine");
const ChartOverlay_1 = require("./parts/ChartOverlay");
const ChartSelectionX_1 = require("./parts/ChartSelectionX");
const ChartTooltip_1 = require("./parts/ChartTooltip");
const getDateLabel_1 = require("./utils/getDateLabel");
const useTimeChartController_1 = require("./utils/useTimeChartController");
const DEFAULT_CHART_MARGIN = { bottom: 20, left: 10, right: 20, top: 10 };
exports.Chart = react_1.default.memo(({ isEnlarged, charts, onZoom, margin: marginProps, noAnimation, resolution, zoomRange, axesConfig: axesConfigProps, }) => {
    const isMobile = (0, useIsMobile_1.default)();
    const overlayRef = react_1.default.useRef(null);
    const range = react_1.default.useMemo(() => zoomRange || [
        charts[0].items[0].date,
        charts[0].items[charts[0].items.length - 1].date,
    ], [zoomRange, charts]);
    const displayedCharts = react_1.default.useMemo(() => {
        return charts.map((chart) => ({
            ...chart,
            items: chart.items
                .filter((item) => item.date >= range[0] && item.date <= range[1])
                .map((item) => (item.dateLabel ? item : {
                ...item,
                dateLabel: (0, getDateLabel_1.getDateLabel)(item.date, item.date_to, resolution),
            })),
        }));
    }, [charts, range, resolution]);
    const margin = react_1.default.useMemo(() => ({ ...DEFAULT_CHART_MARGIN, ...marginProps }), [marginProps]);
    const axesConfig = react_1.default.useMemo(() => {
        return (0, compat_1.defaultsDeep)(axesConfigProps?.({ isEnlarged, isMobile }), {
            x: {
                ticks: isEnlarged && !isMobile ? 8 : 4,
            },
            y: {
                ticks: isEnlarged ? 6 : 3,
                nice: true,
            },
        });
    }, [axesConfigProps, isEnlarged, isMobile]);
    const { ref, rect, innerWidth, innerHeight, chartMargin, axes, } = (0, useTimeChartController_1.useTimeChartController)({
        data: displayedCharts,
        margin,
        axesConfig,
    });
    return (<svg width="100%" height="100%" ref={ref} cursor="pointer" opacity={rect ? 1 : 0}>

      <g transform={`translate(${chartMargin?.left || 0},${chartMargin?.top || 0})`}>
        <ChartGridLine_1.ChartGridLine type="horizontal" scale={axes.y.scale} ticks={axesConfig.y.ticks} size={innerWidth} noAnimation/>

        {displayedCharts.map((chart) => {
            const id = `${chart.id}-${isEnlarged ? 'fullscreen' : 'small'}`;
            return (<react_1.default.Fragment key={id}>
              {chart.charts.map((chartConfig) => {
                    if (chartConfig.type === 'area') {
                        return (<ChartArea_1.ChartArea key={chartConfig.type} id={id} data={chart.items} gradient={chartConfig.gradient} xScale={axes.x.scale} yScale={axes.y.scale} noAnimation={noAnimation}/>);
                    }
                    return (<ChartLine_1.ChartLine key={chartConfig.type} data={chart.items} xScale={axes.x.scale} yScale={axes.y.scale} stroke={chartConfig.color} strokeWidth={chartConfig.strokeWidth || 2} strokeDasharray={chartConfig.strokeDasharray} animation="none"/>);
                })}
            </react_1.default.Fragment>);
        })}

        <ChartAxis_1.ChartAxis type="left" scale={axes.y.scale} ticks={axesConfig.y.ticks} tickFormatGenerator={axes.y.tickFormatter} noAnimation/>

        <ChartAxis_1.ChartAxis type="bottom" scale={axes.x.scale} transform={`translate(0, ${innerHeight})`} ticks={axesConfig.x.ticks} anchorEl={overlayRef.current} tickFormatGenerator={axes.x.tickFormatter} noAnimation/>

        <ChartOverlay_1.ChartOverlay ref={overlayRef} width={innerWidth} height={innerHeight}>
          <ChartTooltip_1.ChartTooltip anchorEl={overlayRef.current} width={innerWidth} tooltipWidth={(resolution === types_1.Resolution.WEEK) ? 280 : 200} height={innerHeight} xScale={axes.x.scale} yScale={axes.y.scale} data={displayedCharts} noAnimation={noAnimation} resolution={resolution}/>

          <ChartSelectionX_1.ChartSelectionX anchorEl={overlayRef.current} height={innerHeight} scale={axes.x.scale} data={displayedCharts} onSelect={onZoom}/>
        </ChartOverlay_1.ChartOverlay>
      </g>
    </svg>);
});
