#!/usr/bin/env node

/**
 * 国际化文本替换脚本
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
 * 检查文件是否包含国际化相关的导入
 */
function hasI18nImport(content) {
  return /import\s+{[^}]*useTranslation[^}]*}\s+from\s+['"]react-i18next['"]/.test(content) ||
         /import\s+{[^}]*t[^}]*}\s+from\s+['"]react-i18next['"]/.test(content) ||
         /import\s+i18n\s+from/.test(content);
}

/**
 * 添加国际化导入到文件
 */
function addI18nImports(content) {
  if (hasI18nImport(content)) {
    return content; // 如果已经有导入，直接返回
  }
  
  // 在文件开头添加国际化导入
  const i18nImport = "import { useTranslation } from 'react-i18next';\n";
  
  // 查找导入语句的结束位置
  const importRegex = /(import\s+.*?;)/g;
  let lastImportMatch;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    lastImportMatch = match;
  }
  
  if (lastImportMatch) {
    const insertIndex = lastImportMatch.index + lastImportMatch[0].length + 1;
    return content.slice(0, insertIndex) + i18nImport + content.slice(insertIndex);
  } else {
    // 如果没有找到导入语句，添加到文件开头
    return i18nImport + '\n' + content;
  }
}

/**
 * 检查函数或组件中是否已经有useTranslation钩子
 */
function hasUseTranslationHook(content) {
  return /const\s+{[^}]*t[^}]*}\s+=\s+useTranslation\s*\(\)/.test(content) ||
         /const\s+{[^}]*t[^}]*,\s*i18n[^}]*}\s+=\s+useTranslation\s*\(\)/.test(content) ||
         /const\s+t\s+=\s+useTranslation\s*\(\)/.test(content);
}

/**
 * 添加useTranslation钩子到函数组件
 */
function addUseTranslationHook(content) {
  if (hasUseTranslationHook(content)) {
    return content; // 如果已经有钩子，直接返回
  }
  
  // 查找函数组件的开始，通常是函数定义后面
  const functionRegex = new RegExp('(const\\s+\\w+\\s*=\\s*\\([^)]*\\)\\s*=>|function\\s+\\w+\\s*\\([^)]*\\)|const\\s+\\w+\\s*=\\s*function\\s*\\([^)]*\\)|export\\s+default\\s+(function\\s+\\w+|const\\s+\\w+\\s+=))', 'g');
  const match = functionRegex.exec(content);
  
  if (match) {
    const insertIndex = match.index + match[0].length;
    
    // 查找最近的 '{' 或 '=>' 以确定钩子插入位置
    const remainingContent = content.slice(insertIndex);
    const braceIndex = remainingContent.indexOf('{');
    const arrowIndex = remainingContent.indexOf('=>');
    
    let actualInsertIndex = insertIndex;
    if (braceIndex !== -1 && (arrowIndex === -1 || braceIndex < arrowIndex)) {
      actualInsertIndex = insertIndex + braceIndex + 1;
    } else if (arrowIndex !== -1) {
      // 查找 '=>' 后的第一个 '{' 或换行
      const arrowPart = remainingContent.slice(arrowIndex + 2);
      const nextBrace = arrowPart.indexOf('{');
      const nextNewLine = arrowPart.indexOf('
');
      
      if (nextBrace !== -1 && (nextNewLine === -1 || nextBrace < nextNewLine)) {
        actualInsertIndex = insertIndex + arrowIndex + 2 + nextBrace + 1;
      } else if (nextNewLine !== -1) {
        actualInsertIndex = insertIndex + arrowIndex + 2 + nextNewLine + 1;
      } else {
        actualInsertIndex = insertIndex + arrowIndex + 2;
      }
    }
    
    // 确保在函数体开始处添加钩子
    const hookLine = '  const { t } = useTranslation();
';
    
    // 检查是否有足够的缩进
    const beforeInsert = content.slice(0, actualInsertIndex);
    const afterInsert = content.slice(actualInsertIndex);
    
    // 检查是否已经有其他钩子，如果有，插入到它们之后
    const useEffectMatch = beforeInsert.match(/(  useEffect.*?;?
)/g);
    if (useEffectMatch && useEffectMatch.length > 0) {
      // 在最后一个useEffect之后插入
      const lastUseEffect = beforeInsert.lastIndexOf('  useEffect');
      actualInsertIndex = beforeInsert.indexOf(';', lastUseEffect) + 2; // +2 to include ; and 

    }
    
    return content.slice(0, actualInsertIndex) + hookLine + content.slice(actualInsertIndex);
  }
  
  return content;
}

/**
 * 替换文件中的文本为国际化键
 */
function replaceTextWithKeys(content, textToKeyMap) {
  let modifiedContent = content;
  
  // 按文本长度降序排列，优先替换较长的文本，避免冲突
  const sortedEntries = Array.from(textToKeyMap.entries())
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [text, key] of sortedEntries) {
    // 跳过太短的文本，避免误替换
    if (text.length < 2) continue;
    
    // 使用更精确的正则表达式来替换字符串字面量
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(["'\`])${escapedText}\1`, 'g');
    
    let match;
    while ((match = regex.exec(modifiedContent)) !== null) {
      const fullMatch = match[0];
      const quote = match[1];
      
      // 检查这个字符串是否在注释中或在不需要替换的上下文中
      const beforeMatch = modifiedContent.substring(0, match.index);
      const lastCommentIndex = beforeMatch.lastIndexOf('//');
      const lastBlockCommentEnd = beforeMatch.lastIndexOf('*/');
      const lastBlockCommentStart = beforeMatch.lastIndexOf('/*');
      
      // 检查是否在单行注释中
      if (lastCommentIndex !== -1 && (lastBlockCommentEnd === -1 || lastCommentIndex > lastBlockCommentEnd)) {
        const lastNewLine = beforeMatch.lastIndexOf('\n');
        if (lastNewLine === -1 || lastCommentIndex > lastNewLine) {
          continue; // 在注释中，跳过
        }
      }
      
      // 检查是否在块注释中
      if (lastBlockCommentStart !== -1 && 
          (lastBlockCommentEnd === -1 || lastBlockCommentStart > lastBlockCommentEnd)) {
        continue; // 在块注释中，跳过
      }
      
      // 替换字符串为国际化函数调用
      const replacement = `{t('${key}')}`;
      modifiedContent = modifiedContent.substring(0, match.index) + 
                       replacement + 
                       modifiedContent.substring(match.index + fullMatch.length);
      
      // 更新正则表达式的索引
      regex.lastIndex = match.index + replacement.length;
    }
  }
  
  return modifiedContent;
}

/**
 * 处理单个文件
 */
function processFile(filePath, textToKeyMap) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换文本为国际化键
    let modifiedContent = replaceTextWithKeys(content, textToKeyMap);
    
    // 如果内容有变化，添加国际化导入
    if (modifiedContent !== content) {
      modifiedContent = addI18nImports(modifiedContent);
      modifiedContent = addUseTranslationHook(modifiedContent);
      
      // 写回文件
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
