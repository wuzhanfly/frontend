#!/usr/bin/env node

/**
 * 简化版国际化文本替换脚本（演示版）
 * 根据提取的国际化内容，将源文件中的文本替换为对应的键，并引入国际化组件
 */

const fs = require('fs');
const path = require('path');

/**
 * 从提取的国际化内容生成文本到键的映射
 */
function generateTextToKeyMap(extractedDir) {
  console.log(`从 ${extractedDir} 生成文本到键的映射...`);
  
  const files = fs.readdirSync(extractedDir);
  const textToKeyMap = new Map();
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(extractedDir, file);
      const module = path.basename(file, '.json');
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        for (const [key, value] of Object.entries(data)) {
          const text = value.defaultMessage;
          if (text && typeof text === 'string') {
            // 使用文本内容作为键，国际化键作为值
            textToKeyMap.set(text, key);
          }
        }
      } catch (error) {
        console.error(`处理文件 ${file} 时出错:`, error.message);
      }
    }
  }
  
  console.log(`生成了 ${textToKeyMap.size} 个文本到键的映射`);
  return textToKeyMap;
}

/**
 * 简单替换函数 - 仅用于演示
 */
function simpleReplaceTextWithKeys(content, textToKeyMap) {
  let modifiedContent = content;
  
  // 按文本长度降序排列，优先替换较长的文本
  const sortedEntries = Array.from(textToKeyMap.entries())
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [text, key] of sortedEntries) {
    // 跳过太短的文本
    if (text.length < 3) continue;
    
    // 简单的字符串替换
    const textWithQuotes = '"' + text + '"';
    const textWithSingleQuotes = "'" + text + "'";
    const textWithBackticks = '`' + text + '`';
    
    modifiedContent = modifiedContent.split(textWithQuotes).join('{t(\'' + key + '\')}');
    modifiedContent = modifiedContent.split(textWithSingleQuotes).join('{t(\'' + key + '\')}');
    modifiedContent = modifiedContent.split(textWithBackticks).join('{t(\'' + key + '\')}');
  }
  
  return modifiedContent;
}

/**
 * 处理单个文件（简化版）
 */
function processFile(filePath, textToKeyMap) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 替换文本为国际化键
    const modifiedContent = simpleReplaceTextWithKeys(content, textToKeyMap);
    
    // 如果内容有变化，写回文件
    if (modifiedContent !== content) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`已更新文件: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  const extractedDir = process.argv[2] || './tools/i18n/extracted';
  const targetFile = process.argv[3];
  
  console.log(`提取目录: ${extractedDir}`);
  console.log(`目标文件: ${targetFile}`);
  
  if (!fs.existsSync(extractedDir)) {
    console.error(`提取目录不存在: ${extractedDir}`);
    process.exit(1);
  }
  
  if (!targetFile) {
    console.error('请提供目标文件路径');
    process.exit(1);
  }
  
  if (!fs.existsSync(targetFile)) {
    console.error(`目标文件不存在: ${targetFile}`);
    process.exit(1);
  }
  
  // 生成文本到键的映射
  const textToKeyMap = generateTextToKeyMap(extractedDir);
  
  if (textToKeyMap.size === 0) {
    console.log('没有找到可替换的国际化内容');
    return;
  }
  
  console.log('开始处理文件...');
  const startTime = Date.now();
  
  // 处理目标文件
  if (processFile(targetFile, textToKeyMap)) {
    console.log('文件处理完成！');
  } else {
    console.log('文件无需更改');
  }
  
  const endTime = Date.now();
  console.log(`耗时: ${endTime - startTime}ms`);
}

// 执行主函数
if (require.main === module) {
  main();
}