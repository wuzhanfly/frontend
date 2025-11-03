"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBlob = downloadBlob;
exports.saveAsCsv = saveAsCsv;
const papaparse_1 = require("papaparse");
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
function saveAsCsv(headerRows, dataRows, filename) {
    const csv = (0, papaparse_1.unparse)([
        headerRows,
        ...dataRows,
    ]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
}
