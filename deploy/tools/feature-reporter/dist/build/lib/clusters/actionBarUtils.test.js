"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionBarUtils_1 = require("./actionBarUtils");
describe('actionBarUtils', () => {
    describe('shouldShowClearButton', () => {
        it('should return true for non-empty search values', () => {
            expect((0, actionBarUtils_1.shouldShowClearButton)('test')).toBe(true);
            expect((0, actionBarUtils_1.shouldShowClearButton)('a')).toBe(true);
            expect((0, actionBarUtils_1.shouldShowClearButton)('cluster-name')).toBe(true);
        });
        it('should return false for empty search values', () => {
            expect((0, actionBarUtils_1.shouldShowClearButton)('')).toBe(false);
        });
        it('should return true for whitespace (button should be visible)', () => {
            expect((0, actionBarUtils_1.shouldShowClearButton)(' ')).toBe(true);
            expect((0, actionBarUtils_1.shouldShowClearButton)('   ')).toBe(true);
        });
    });
    describe('shouldDisableViewToggle', () => {
        it('should return true when loading', () => {
            expect((0, actionBarUtils_1.shouldDisableViewToggle)(true)).toBe(true);
        });
        it('should return false when not loading', () => {
            expect((0, actionBarUtils_1.shouldDisableViewToggle)(false)).toBe(false);
        });
    });
    describe('getSearchPlaceholder', () => {
        it('should return consistent placeholder text', () => {
            const placeholder = (0, actionBarUtils_1.getSearchPlaceholder)();
            expect(placeholder).toBe('Search clusters by name or EVM address');
        });
        it('should return same result on multiple calls', () => {
            const first = (0, actionBarUtils_1.getSearchPlaceholder)();
            const second = (0, actionBarUtils_1.getSearchPlaceholder)();
            expect(first).toBe(second);
        });
    });
    describe('shouldShowActionBar', () => {
        it('should return true on desktop regardless of pagination', () => {
            expect((0, actionBarUtils_1.shouldShowActionBar)(false, true)).toBe(true);
            expect((0, actionBarUtils_1.shouldShowActionBar)(true, true)).toBe(true);
        });
        it('should return true on mobile when pagination is visible', () => {
            expect((0, actionBarUtils_1.shouldShowActionBar)(true, false)).toBe(true);
        });
        it('should return false on mobile when pagination is not visible', () => {
            expect((0, actionBarUtils_1.shouldShowActionBar)(false, false)).toBe(false);
        });
    });
});
