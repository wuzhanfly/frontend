"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icon_button_1 = require("toolkit/chakra/icon-button");
const IconSvg_1 = __importDefault(require("ui/shared/IconSvg"));
const AddButton = (props) => {
    return (<icon_button_1.IconButton aria-label="Add item" variant="icon_secondary" size="md" {...props}>
      <IconSvg_1.default name="plus"/>
    </icon_button_1.IconButton>);
};
exports.default = react_1.default.memo(AddButton);
