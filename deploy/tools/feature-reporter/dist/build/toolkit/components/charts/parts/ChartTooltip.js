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
exports.ChartTooltip = void 0;
const d3 = __importStar(require("d3"));
const react_1 = __importDefault(require("react"));
const types_1 = require("../types");
const ChartTooltipBackdrop_1 = __importStar(require("./tooltip/ChartTooltipBackdrop"));
const ChartTooltipContent_1 = __importStar(require("./tooltip/ChartTooltipContent"));
const ChartTooltipLine_1 = __importStar(require("./tooltip/ChartTooltipLine"));
const ChartTooltipPoint_1 = __importStar(require("./tooltip/ChartTooltipPoint"));
const ChartTooltipRow_1 = __importStar(require("./tooltip/ChartTooltipRow"));
const ChartTooltipTitle_1 = __importStar(require("./tooltip/ChartTooltipTitle"));
const pointerTracker_1 = require("./tooltip/pointerTracker");
exports.ChartTooltip = react_1.default.memo(({ xScale, yScale, width, tooltipWidth = 200, height, data, anchorEl, noAnimation, resolution, ...props }) => {
    const ref = react_1.default.useRef(null);
    const trackerId = react_1.default.useRef(undefined);
    const isVisible = react_1.default.useRef(false);
    const transitionDuration = !noAnimation ? 100 : null;
    const renderLine = (0, ChartTooltipLine_1.useRenderLine)(ref, height);
    const renderContent = (0, ChartTooltipContent_1.useRenderContent)(ref, { chart: { width, height }, transitionDuration });
    const renderPoints = (0, ChartTooltipPoint_1.useRenderPoints)(ref, { data, xScale, yScale });
    const renderTitle = (0, ChartTooltipTitle_1.useRenderTitle)(ref);
    const renderRows = (0, ChartTooltipRow_1.useRenderRows)(ref, { data, xScale, minWidth: tooltipWidth });
    const renderBackdrop = (0, ChartTooltipBackdrop_1.useRenderBackdrop)(ref, { seriesNum: data.length, transitionDuration });
    const draw = react_1.default.useCallback((pointer) => {
        if (pointer.point) {
            const { x, y, currentPoints } = renderPoints(pointer.point[0]);
            const isIncompleteData = currentPoints.some(({ item }) => item.isApproximate);
            renderLine(x);
            renderContent(x, y);
            renderTitle(isIncompleteData);
            const { width } = renderRows(x, currentPoints);
            renderBackdrop(width, isIncompleteData);
        }
    }, [renderPoints, renderLine, renderContent, renderTitle, renderRows, renderBackdrop]);
    const showContent = react_1.default.useCallback(() => {
        if (!isVisible.current) {
            if (transitionDuration) {
                d3.select(ref.current)
                    .transition()
                    .delay(transitionDuration)
                    .attr('opacity', 1);
            }
            else {
                d3.select(ref.current)
                    .attr('opacity', 1);
            }
            isVisible.current = true;
        }
    }, [transitionDuration]);
    const hideContent = react_1.default.useCallback(() => {
        if (transitionDuration) {
            d3.select(ref.current)
                .transition()
                .delay(transitionDuration)
                .attr('opacity', 0);
        }
        else {
            d3.select(ref.current)
                .attr('opacity', 0);
        }
        isVisible.current = false;
    }, [transitionDuration]);
    const createPointerTracker = react_1.default.useCallback((event, isSubsequentCall) => {
        let isPressed = event.pointerType === 'mouse' && event.type === 'pointerdown' && !isSubsequentCall;
        if (isPressed) {
            hideContent();
        }
        return (0, pointerTracker_1.trackPointer)(event, {
            move: (pointer) => {
                if (!pointer.point || isPressed) {
                    return;
                }
                draw(pointer);
                showContent();
            },
            out: () => {
                hideContent();
                trackerId.current = undefined;
            },
            end: () => {
                hideContent();
                trackerId.current = undefined;
                isPressed = false;
            },
        });
    }, [draw, hideContent, showContent]);
    react_1.default.useEffect(() => {
        const anchorD3 = d3.select(anchorEl);
        let isMultiTouch = false; // disabling creation of new tracker in multi touch mode
        anchorD3
            .on('touchmove.tooltip', (event) => event.preventDefault()) // prevent scrolling
            .on(`touchstart.tooltip`, (event) => {
            isMultiTouch = event.touches.length > 1;
        }, { passive: true })
            .on(`touchend.tooltip`, (event) => {
            if (isMultiTouch && event.touches.length === 0) {
                isMultiTouch = false;
            }
        }, { passive: true })
            .on('pointerenter.tooltip pointerdown.tooltip', (event) => {
            if (!isMultiTouch) {
                trackerId.current = createPointerTracker(event);
            }
        }, { passive: true })
            .on('pointermove.tooltip', (event) => {
            if (event.pointerType === 'mouse' && !isMultiTouch && trackerId.current === undefined) {
                trackerId.current = createPointerTracker(event);
            }
        }, { passive: true });
        return () => {
            anchorD3.on('touchmove.tooltip pointerenter.tooltip pointerdown.tooltip', null);
            trackerId.current && anchorD3.on(['pointerup', 'pointercancel', 'lostpointercapture', 'pointermove', 'pointerout'].map((event) => `${event}.${trackerId.current}`).join(' '), null);
        };
    }, [anchorEl, createPointerTracker, draw, hideContent, showContent]);
    return (<g ref={ref} opacity={0} style={{
            fontWeight: '500',
            fontSize: '12px',
        }} {...props}>
      <ChartTooltipLine_1.default />
      {data.map(({ name }) => <ChartTooltipPoint_1.default key={name}/>)}
      <ChartTooltipContent_1.default>
        <ChartTooltipBackdrop_1.default />
        <ChartTooltipTitle_1.default resolution={resolution}/>
        <ChartTooltipRow_1.default label={getDateLabel(resolution)} lineNum={1}/>
        {data.map(({ name }, index) => <ChartTooltipRow_1.default key={name} label={name} lineNum={index + 1}/>)}
      </ChartTooltipContent_1.default>
    </g>);
});
function getDateLabel(resolution) {
    switch (resolution) {
        case types_1.Resolution.WEEK:
            return 'Dates';
        case types_1.Resolution.MONTH:
            return 'Month';
        case types_1.Resolution.YEAR:
            return 'Year';
        default:
            return 'Date';
    }
}
