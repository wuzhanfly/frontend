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
exports.trackPointer = trackPointer;
const d3 = __importStar(require("d3"));
function trackPointer(event, { start, move, out, end }) {
    const tracker = {
        id: event.pointerId,
        point: null,
        prev: null,
    };
    const id = event.pointerId;
    const target = event.target;
    tracker.point = d3.pointer(event, target);
    target.setPointerCapture(id);
    const untrack = (sourceEvent) => {
        tracker.sourceEvent = sourceEvent;
        d3.select(target).on(`.${id}`, null);
        target.releasePointerCapture(id);
        end?.(tracker);
    };
    d3.select(target)
        .on(`touchstart.${id}`, (sourceEvent) => {
        const target = sourceEvent.target;
        const touches = d3.pointers(sourceEvent, target);
        // disable current tracker when entering multi touch mode
        touches.length > 1 && untrack(sourceEvent);
    }, { passive: true })
        .on(`pointerup.${id} pointercancel.${id} lostpointercapture.${id}`, (sourceEvent) => {
        if (sourceEvent.pointerId !== id) {
            return;
        }
        untrack(sourceEvent);
    }, { passive: true })
        .on(`pointermove.${id}`, (sourceEvent) => {
        if (sourceEvent.pointerId !== id) {
            return;
        }
        tracker.sourceEvent = sourceEvent;
        tracker.prev = tracker.point;
        tracker.point = d3.pointer(sourceEvent, target);
        move?.(tracker);
    }, { passive: true })
        .on(`pointerout.${id}`, (e) => {
        if (e.pointerId !== id) {
            return;
        }
        tracker.sourceEvent = e;
        tracker.point = null;
        out?.(tracker);
    }, { passive: true });
    start?.(tracker);
    return id;
}
