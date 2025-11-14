#!/usr/bin/env node

/**
 * 国际化文本替换脚本（简化完整版）
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
 * 替换文件中的文本为国际化键
 */
function replaceTextWithKeys(content, textToKeyMap) {
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
 * 处理单个文件
 */
function processFile(filePath, textToKeyMap) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 替换文本为国际化键
    const modifiedContent = replaceTextWithKeys(content, textToKeyMap);
    
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
 * 递归处理目录
 */
function processDirectory(dirPath, textToKeyMap, fileExtensions = ['.tsx', '.ts']) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let updatedFiles = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过 node_modules 和构建输出目录
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist' || entry.name === 'build') {
        continue;
      }
      updatedFiles += processDirectory(fullPath, textToKeyMap, fileExtensions);
    } else if (entry.isFile() && fileExtensions.includes(path.extname(fullPath))) {
      if (processFile(fullPath, textToKeyMap)) {
        updatedFiles++;
      }
    }
  }
  
  return updatedFiles;
}

/**
 * 主函数
 */
function main() {
  const extractedDir = process.argv[2] || './tools/i18n/extracted';
  const sourceDir = process.argv[3] || './';
  const fileExtensions = process.argv[4] ? process.argv[4].split(',') : ['.tsx', '.ts'];
  
  console.log(`提取目录: ${extractedDir}`);
  console.log(`源目录: ${sourceDir}`);
  console.log(`文件扩展名: ${fileExtensions}`);
  
  if (!fs.existsSync(extractedDir)) {
    console.error(`提取目录不存在: ${extractedDir}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`源目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  // 生成文本到键的映射
  const textToKeyMap = generateTextToKeyMap(extractedDir);
  
  if (textToKeyMap.size === 0) {
    console.log('没有找到可替换的国际化内容');
    return;
  }
  
  console.log('开始处理源文件...');
  const startTime = Date.now();
  
  // 处理源目录中的文件
  const updatedFiles = processDirectory(sourceDir, textToKeyMap, fileExtensions);
  
  const endTime = Date.now();
  console.log(`处理完成！`);
  console.log(`更新了 ${updatedFiles} 个文件`);
  console.log(`耗时: ${endTime - startTime}ms`);
}

// 执行主函数
if (require.main === module) {
  main();
}