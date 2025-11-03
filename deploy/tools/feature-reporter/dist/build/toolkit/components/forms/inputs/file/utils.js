"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFileEntries = getAllFileEntries;
exports.convertFileEntryToFile = convertFileEntryToFile;
const url_1 = require("../../../../utils/url");
// Function to get all files in drop directory
async function getAllFileEntries(dataTransferItemList) {
    const fileEntries = [];
    // Use BFS to traverse entire directory/file structure
    const queue = [];
    // Unfortunately dataTransferItemList is not iterable i.e. no forEach
    for (let i = 0; i < dataTransferItemList.length; i++) {
        // Note webkitGetAsEntry a non-standard feature and may change
        // Usage is necessary for handling directories
        // + typescript types are kinda wrong - https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
        const item = dataTransferItemList[i].webkitGetAsEntry();
        item && queue.push(item);
    }
    while (queue.length > 0) {
        const entry = queue.shift();
        if (entry?.isFile) {
            fileEntries.push(entry);
        }
        else if (entry?.isDirectory && 'createReader' in entry) {
            queue.push(...await readAllDirectoryEntries(entry.createReader()));
        }
    }
    return fileEntries;
}
// Get all the entries (files or sub-directories) in a directory
// by calling readEntries until it returns empty array
async function readAllDirectoryEntries(directoryReader) {
    const entries = [];
    let readEntries = await readEntriesPromise(directoryReader);
    while (readEntries && readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }
    return entries;
}
// Wrap readEntries in a promise to make working with readEntries easier
// readEntries will return only some of the entries in a directory
// e.g. Chrome returns at most 100 entries at a time
async function readEntriesPromise(directoryReader) {
    try {
        return await new Promise((resolve, reject) => {
            directoryReader.readEntries((fileEntry) => {
                resolve(fileEntry);
            }, reject);
        });
    }
    catch (err) { }
}
function convertFileEntryToFile(entry, fullFilePath) {
    return new Promise((resolve) => {
        entry.file(async (file) => {
            const newFile = fullFilePath ?
                new File([file], (0, url_1.stripLeadingSlash)(entry.fullPath), { lastModified: file.lastModified, type: file.type }) :
                file;
            resolve(newFile);
        });
    });
}
