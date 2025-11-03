"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const Repeat_1 = __importDefault(require("icons-components/Repeat"));
const heading_1 = require("toolkit/chakra/heading");
const button_1 = require("../../chakra/button");
const dialog_1 = require("../../chakra/dialog");
const ChartWidgetContent_1 = require("./ChartWidgetContent");
;
const FullscreenChartModal = ({ charts, open, onOpenChange, title, description, resolution, zoomRange, handleZoom, handleZoomReset, }) => {
    return (<dialog_1.DialogRoot open={open} onOpenChange={onOpenChange} 
    // FIXME: with size="full" the chart will not be expanded to the full height of the modal
    size="cover">
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader />
        <dialog_1.DialogBody pt={6} display="flex" flexDir="column">
          <react_1.Grid gridColumnGap={2} mb={4}>
            <heading_1.Heading mb={1} level="2">
              {title}
            </heading_1.Heading>

            {description && (<react_1.Text gridColumn={1} color="text.secondary" textStyle="sm">
                {description}
              </react_1.Text>)}

            {Boolean(zoomRange) && (<button_1.Button gridColumn={2} justifySelf="end" alignSelf="top" gridRow="1/3" size="sm" variant="outline" onClick={handleZoomReset}>
                <react_1.Icon boxSize={4}><Repeat_1.default /></react_1.Icon>
                Reset zoom
              </button_1.Button>)}
          </react_1.Grid>
          <ChartWidgetContent_1.ChartWidgetContent isEnlarged charts={charts} handleZoom={handleZoom} zoomRange={zoomRange} title={title} resolution={resolution}/>
        </dialog_1.DialogBody>
      </dialog_1.DialogContent>
    </dialog_1.DialogRoot>);
};
exports.default = FullscreenChartModal;
