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
exports.LinkOverlay = exports.LinkBox = exports.Link = exports.LinkExternalIcon = void 0;
const react_1 = require("@chakra-ui/react");
const link_1 = __importDefault(require("next/link"));
const React = __importStar(require("react"));
const LinkExternal_1 = __importDefault(require("icons-components/LinkExternal"));
const skeleton_1 = require("./skeleton");
const LinkExternalIcon = ({ color }) => (<react_1.Icon boxSize={3} verticalAlign="middle" color={color ?? 'icon.secondary'} _groupHover={{
        color: 'inherit',
    }} flexShrink={0}>
    <LinkExternal_1.default />
  </react_1.Icon>);
exports.LinkExternalIcon = LinkExternalIcon;
const splitProps = (props) => {
    const { scroll = true, shallow = false, prefetch = false, ...rest } = props;
    return {
        chakra: rest,
        next: {
            href: rest.href,
            scroll,
            shallow,
            prefetch,
        },
    };
};
exports.Link = React.forwardRef(function Link(props, ref) {
    const { chakra, next } = splitProps(props);
    const { external, loading, href, children, disabled, noIcon, iconColor, ...rest } = chakra;
    if (external) {
        return (<skeleton_1.Skeleton loading={loading} ref={ref} asChild>
          <react_1.Link href={href} className="group" target="_blank" rel="noopener noreferrer" {...(disabled ? { 'data-disabled': true } : {})} {...rest}>
            {children}
            {!noIcon && <exports.LinkExternalIcon color={iconColor}/>}
          </react_1.Link>
        </skeleton_1.Skeleton>);
    }
    return (<skeleton_1.Skeleton loading={loading} ref={ref} asChild>
        <react_1.Link asChild {...(disabled ? { 'data-disabled': true } : {})} {...rest}>
          {next.href ? (<link_1.default {...next}>
              {children}
            </link_1.default>) :
            <span>{children}</span>}
        </react_1.Link>
      </skeleton_1.Skeleton>);
});
exports.LinkBox = react_1.LinkBox;
exports.LinkOverlay = React.forwardRef(function LinkOverlay(props, ref) {
    const { chakra, next } = splitProps(props);
    const { children, external, ...rest } = chakra;
    if (external) {
        return (<react_1.LinkOverlay ref={ref} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </react_1.LinkOverlay>);
    }
    return (<react_1.LinkOverlay ref={ref} asChild={Boolean(next.href)} {...rest}>
        {next.href ? <link_1.default {...next}>{children}</link_1.default> : children}
      </react_1.LinkOverlay>);
});
