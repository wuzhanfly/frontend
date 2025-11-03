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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATIONS = exports.noneAnimation = exports.animateFadeIn = exports.animateLeft = void 0;
const d3 = __importStar(require("d3"));
const animateLeft = (path) => {
    const totalLength = path.getTotalLength() || 0;
    d3.select(path)
        .attr('opacity', 1)
        .attr('stroke-dasharray', `${totalLength},${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
};
exports.animateLeft = animateLeft;
const animateFadeIn = (path) => {
    d3.select(path)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr('opacity', 1);
};
exports.animateFadeIn = animateFadeIn;
const noneAnimation = (path) => {
    d3.select(path).attr('opacity', 1);
};
exports.noneAnimation = noneAnimation;
exports.ANIMATIONS = {
    left: exports.animateLeft,
    fadeIn: exports.animateFadeIn,
    none: exports.noneAnimation,
};
