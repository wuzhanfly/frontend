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
exports.CHART_MENU_ITEMS_IDS = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const usehooks_1 = require("@uidotdev/usehooks");
const dom_to_image_1 = __importDefault(require("dom-to-image"));
const dayjs_1 = __importDefault(require("dayjs"));
const Copy_1 = __importDefault(require("icons-components/Copy"));
const Dots_1 = __importDefault(require("icons-components/Dots"));
const Csv_1 = __importDefault(require("icons-components/files/Csv"));
const Image_1 = __importDefault(require("icons-components/files/Image"));
const Scope_1 = __importDefault(require("icons-components/Scope"));
const Share_1 = __importDefault(require("icons-components/Share"));
const color_mode_1 = require("../../../chakra/color-mode");
const icon_button_1 = require("../../../chakra/icon-button");
const menu_1 = require("../../../chakra/menu");
const useDisclosure_1 = require("../../../hooks/useDisclosure");
const file_1 = require("../../../utils/file");
const isBrowser_1 = require("../../../utils/isBrowser");
const ChartFullscreenDialog_1 = __importDefault(require("../ChartFullscreenDialog"));
exports.CHART_MENU_ITEMS_IDS = [
    'share',
    'fullscreen',
    'save_png',
    'save_csv',
];
;
const DOWNLOAD_IMAGE_SCALE = 5;
const ChartMenu = ({ itemIds = exports.CHART_MENU_ITEMS_IDS, charts, title, description, isLoading, chartRef, chartUrl, resolution, zoomRange, handleZoom, handleZoomReset, }) => {
    const pngBackgroundColor = (0, color_mode_1.useColorModeValue)('white', 'black');
    const fullscreenDialog = (0, useDisclosure_1.useDisclosure)();
    const [, copyToClipboard] = (0, usehooks_1.useCopyToClipboard)();
    const isInBrowser = (0, isBrowser_1.isBrowser)();
    const showChartFullscreen = React.useCallback(() => {
        fullscreenDialog.onOpenChange({ open: true });
    }, [fullscreenDialog]);
    const handleFileSaveClick = React.useCallback(() => {
        // wait for context menu to close
        setTimeout(() => {
            if (chartRef.current) {
                dom_to_image_1.default.toPng(chartRef.current, {
                    quality: 100,
                    bgcolor: pngBackgroundColor,
                    width: chartRef.current.offsetWidth * DOWNLOAD_IMAGE_SCALE,
                    height: chartRef.current.offsetHeight * DOWNLOAD_IMAGE_SCALE,
                    filter: (node) => node.nodeName !== 'BUTTON',
                    style: {
                        borderColor: 'transparent',
                        transform: `scale(${DOWNLOAD_IMAGE_SCALE})`,
                        'transform-origin': 'top left',
                    },
                })
                    .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `${title} (Blockscout chart).png`;
                    link.href = dataUrl;
                    link.click();
                    link.remove();
                });
            }
        }, 100);
    }, [pngBackgroundColor, title, chartRef]);
    const handleSVGSavingClick = React.useCallback(() => {
        const headerRows = [
            'Date', ...charts.map((chart) => chart.name),
        ];
        const dataRows = charts[0].items.map((item, index) => [
            item.dateLabel ?? (0, dayjs_1.default)(item.date).format('YYYY-MM-DD'),
            ...charts.map((chart) => String(chart.items[index].value)),
        ]);
        (0, file_1.saveAsCsv)(headerRows, dataRows, `${title} (Blockscout stats)`);
    }, [charts, title]);
    // TS thinks window.navigator.share can't be undefined, but it can
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasShare = isInBrowser && window.navigator.share;
    const handleCopy = React.useCallback(() => {
        copyToClipboard(chartUrl ?? '');
    }, [chartUrl, copyToClipboard]);
    const handleShare = React.useCallback(async () => {
        try {
            await window.navigator.share({
                title: title,
                text: description,
                url: chartUrl,
            });
        }
        catch (error) { }
    }, [title, description, chartUrl]);
    return (<>
      <menu_1.MenuRoot>
        <menu_1.MenuTrigger asChild>
          <icon_button_1.IconButton variant="icon_background" size="md" aria-label="Open chart options menu" loadingSkeleton={isLoading}>
            <react_1.Icon><Dots_1.default /></react_1.Icon>
          </icon_button_1.IconButton>
        </menu_1.MenuTrigger>
        <menu_1.MenuContent>
          {itemIds.includes('share') && chartUrl && (<menu_1.MenuItem value={hasShare ? 'share' : 'copy'} onClick={hasShare ? handleShare : handleCopy} closeOnSelect={hasShare ? false : true}>
              <react_1.Icon boxSize={5}>{hasShare ? <Share_1.default /> : <Copy_1.default />}</react_1.Icon>
              {hasShare ? 'Share' : 'Copy link'}
            </menu_1.MenuItem>)}
          {itemIds.includes('fullscreen') && (<menu_1.MenuItem value="fullscreen" onClick={showChartFullscreen}>
              <react_1.Icon boxSize={5}><Scope_1.default /></react_1.Icon>
              View fullscreen
            </menu_1.MenuItem>)}
          {itemIds.includes('save_png') && (<menu_1.MenuItem value="save-png" onClick={handleFileSaveClick}>
              <react_1.Icon boxSize={5}><Image_1.default /></react_1.Icon>
              Save as PNG
            </menu_1.MenuItem>)}
          {itemIds.includes('save_csv') && (<menu_1.MenuItem value="save-csv" onClick={handleSVGSavingClick}>
              <react_1.Icon boxSize={5}><Csv_1.default /></react_1.Icon>
              Save as CSV
            </menu_1.MenuItem>)}
        </menu_1.MenuContent>
      </menu_1.MenuRoot>
      <ChartFullscreenDialog_1.default open={fullscreenDialog.open} onOpenChange={fullscreenDialog.onOpenChange} charts={charts} title={title} description={description} resolution={resolution} zoomRange={zoomRange} handleZoom={handleZoom} handleZoomReset={handleZoomReset}/>
    </>);
};
exports.default = ChartMenu;
