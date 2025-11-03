"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEvmAddress_1 = require("lib/address/isEvmAddress");
const detectInputType_1 = require("./detectInputType");
describe('detectInputType', () => {
    it('should detect EVM address format', () => {
        expect((0, detectInputType_1.detectInputType)('0x1234567890123456789012345678901234567890')).toBe('address');
    });
    it('should detect cluster name format', () => {
        expect((0, detectInputType_1.detectInputType)('test-cluster')).toBe('cluster_name');
    });
});
describe('isEvmAddress', () => {
    it('should return true for valid EVM address', () => {
        expect((0, isEvmAddress_1.isEvmAddress)('0x1234567890123456789012345678901234567890')).toBe(true);
        expect((0, isEvmAddress_1.isEvmAddress)('0xabcdef1234567890123456789012345678901234')).toBe(true);
        expect((0, isEvmAddress_1.isEvmAddress)('0xABCDEF1234567890123456789012345678901234')).toBe(true);
    });
    it('should return false for invalid EVM address', () => {
        expect((0, isEvmAddress_1.isEvmAddress)('0x123')).toBe(false);
        expect((0, isEvmAddress_1.isEvmAddress)('123456789012345678901234567890123456789')).toBe(false);
        expect((0, isEvmAddress_1.isEvmAddress)('0xGGGGGG1234567890123456789012345678901234')).toBe(false);
        expect((0, isEvmAddress_1.isEvmAddress)('0x12345678901234567890123456789012345678901')).toBe(false);
    });
    it('should return false for empty or null input', () => {
        expect((0, isEvmAddress_1.isEvmAddress)('')).toBe(false);
        expect((0, isEvmAddress_1.isEvmAddress)(null)).toBe(false);
        expect((0, isEvmAddress_1.isEvmAddress)(undefined)).toBe(false);
    });
    it('should handle addresses with extra whitespace', () => {
        expect((0, isEvmAddress_1.isEvmAddress)('  0x1234567890123456789012345678901234567890  ')).toBe(true);
        expect((0, isEvmAddress_1.isEvmAddress)(' 0x123 ')).toBe(false);
    });
});
