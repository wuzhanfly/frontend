"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = __importDefault(require("./generate"));
const TEST_CASES = [
    {
        title: 'static route',
        route: {
            pathname: '/txs',
        },
    },
    {
        title: 'dynamic route',
        route: {
            pathname: '/tx/[hash]',
            query: { hash: '0x12345' },
        },
    },
    {
        title: 'dynamic route with API data',
        route: {
            pathname: '/token/[hash]',
            query: { hash: '0x12345' },
        },
        apiData: { symbol_or_name: 'USDT' },
    },
];
describe('generates correct metadata for:', () => {
    TEST_CASES.forEach((testCase) => {
        it(`${testCase.title}`, () => {
            const result = (0, generate_1.default)(testCase.route, testCase.apiData);
            expect(result).toMatchSnapshot();
        });
    });
});
