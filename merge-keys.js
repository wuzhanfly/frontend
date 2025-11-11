#!/usr/bin/env node

/**
 * 合并多个JSON文件的脚本
 */

const fs = require('fs');
const path = require('path');

// 读取并合并两个JSON文件
const pagesData = JSON.parse(fs.readFileSync('pages-keys.json', 'utf8'));
const uiData = JSON.parse(fs.readFileSync('ui-keys.json', 'utf8'));

// 合并键值
const mergedKeys = [...pagesData.keys, ...uiData.keys];

// 去重并按键排序
const uniqueKeys = new Map();
mergedKeys.forEach(keyObj => {
  if (!uniqueKeys.has(keyObj.key)) {
    uniqueKeys.set(keyObj.key, keyObj);
  }
});

// 转换为数组并排序
const result = Array.from(uniqueKeys.values()).sort((a, b) => a.key.localeCompare(b.key));

// 输出结果
const output = {
  extractedAt: new Date().toISOString(),
  totalKeys: result.length,
  keys: result,
};

fs.writeFileSync('i18n-extracted-keys.json', JSON.stringify(output, null, 2));
console.log(`合并了 ${result.length} 个唯一键`);