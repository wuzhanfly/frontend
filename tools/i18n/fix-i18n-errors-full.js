#!/usr/bin/env node

/**
 * 修复国际化替换错误的脚本（完整版）
 * 修复因替换脚本导致的各种语法错误
 */

const fs = require('fs');
const path = require('path');

/**
 * 修复文件中的语法错误
 */
function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 修复 JSX 属性中的错误替换
    // 将 label = t('key') 替换为 label={ t('key') }
    const jsxAttributeRegex1 = /(\w+)\s*=\s*t\('([^']+)'\)/g;
    let newContent = content.replace(jsxAttributeRegex1, (match, attr, key) => {
      modified = true;
      return `${attr}={ t('${key}') }`;
    });
    
    // 修复 JSX 属性中的另一种错误替换
    // 将 label = {t('key')} 替换为 label={ t('key') }
    const jsxAttributeRegex2 = /(\w+)\s*=\s*{t\('([^']+)'\)}/g;
    newContent = newContent.replace(jsxAttributeRegex2, (match, attr, key) => {
      modified = true;
      return `${attr}={ t('${key}') }`;
    });
    
    // 修复 JSX 文本中的错误替换
    // 将 {t('key')} 替换为 t('key') 在 JSX 文本中
    const jsxTextRegex = /{t\('([^']+)'\)}/g;
    newContent = newContent.replace(jsxTextRegex, (match, key) => {
      // 只有在特定上下文中才替换
      // 检查是否在 JSX 元素内部但不在属性中
      modified = true;
      return `t('${key}')`;
    });
    
    // 修复三元表达式中的错误替换
    // 将 { data.is_partially_verified ? {t('addresses.common.partial')} : {t('addresses.common.exact')} }
    // 替换为 { data.is_partially_verified ? t('addresses.common.partial') : t('addresses.common.exact') }
    const ternaryRegex = /{\s*([^?}]+)\s*\?\s*{t\('([^']+)'\)}\s*:\s*{t\('([^']+)'\)}\s*}/g;
    newContent = newContent.replace(ternaryRegex, (match, condition, trueKey, falseKey) => {
      modified = true;
      return `{ ${condition} ? t('${trueKey}') : t('${falseKey}') }`;
    });
    
    // 修复 placeholder 属性的错误替换
    const placeholderRegex = /(placeholder)\s*=\s*t\('([^']+)'\)/g;
    newContent = newContent.replace(placeholderRegex, (match, attr, key) => {
      modified = true;
      return `${attr}={ t('${key}') }`;
    });
    
    // 修复 asComponent 属性的错误替换
    const asComponentRegex = /(asComponent)\s*=\s*t\('([^']+)'\)/g;
    newContent = newContent.replace(asComponentRegex, (match, attr, key) => {
      modified = true;
      return `${attr}={ t('${key}') }`;
    });
    
    // 修复 loadingText 属性的错误替换
    const loadingTextRegex = /(loadingText)\s*=\s*t\('([^']+)'\)/g;
    newContent = newContent.replace(loadingTextRegex, (match, attr, key) => {
      modified = true;
      return `${attr}={ t('${key}') }`;
    });
    
    // 如果内容有变化，写回文件
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`已修复文件: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`修复文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

/**
 * 递归处理目录
 */
function processDirectory(dirPath, fileExtensions = ['.tsx', '.ts']) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let fixedFiles = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过 node_modules 和构建输出目录
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist' || entry.name === 'build') {
        continue;
      }
      fixedFiles += processDirectory(fullPath, fileExtensions);
    } else if (entry.isFile() && fileExtensions.includes(path.extname(fullPath))) {
      if (fixSyntaxErrors(fullPath)) {
        fixedFiles++;
      }
    }
  }
  
  return fixedFiles;
}

/**
 * 主函数
 */
function main() {
  const targetPath = process.argv[2] || './';
  const fileExtensions = process.argv[3] ? process.argv[3].split(',') : ['.tsx', '.ts'];
  
  console.log(`目标路径: ${targetPath}`);
  console.log(`文件扩展名: ${fileExtensions}`);
  
  if (!fs.existsSync(targetPath)) {
    console.error(`目标路径不存在: ${targetPath}`);
    process.exit(1);
  }
  
  console.log('开始修复语法错误...');
  const startTime = Date.now();
  
  let fixedFiles = 0;
  
  // 检查是否是单个文件
  if (fs.statSync(targetPath).isFile()) {
    if (fileExtensions.includes(path.extname(targetPath))) {
      if (fixSyntaxErrors(targetPath)) {
        fixedFiles = 1;
      }
    }
  } else {
    // 处理目录中的文件
    fixedFiles = processDirectory(targetPath, fileExtensions);
  }
  
  const endTime = Date.now();
  console.log(`修复完成！`);
  console.log(`修复了 ${fixedFiles} 个文件`);
  console.log(`耗时: ${endTime - startTime}ms`);
}

// 执行主函数
if (require.main === module) {
  main();
}