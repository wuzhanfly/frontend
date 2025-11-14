#!/usr/bin/env node

/**
 * 修复国际化替换错误的脚本
 * 修复因替换脚本导致的语法错误
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
    
    // 修复对象属性中的错误替换
    // 将 {t('key')} 替换为 t('key') 在对象属性中
    const objectPropertyRegex = /(\w+):\s*{t\('([^']+)'\)}/g;
    const newContent = content.replace(objectPropertyRegex, (match, key, translationKey) => {
      modified = true;
      return `${key}: t('${translationKey}')`;
    });
    
    // 修复默认参数中的错误替换
    // 将 {t('key')} 替换为 t('key') 在函数默认参数中
    const defaultParamRegex = /(\w+)\s*=\s*{t\('([^']+)'\)}/g;
    const newContent2 = newContent.replace(defaultParamRegex, (match, param, translationKey) => {
      modified = true;
      return `${param} = t('${translationKey}')`;
    });
    
    // 如果内容有变化，写回文件
    if (modified) {
      fs.writeFileSync(filePath, newContent2, 'utf8');
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