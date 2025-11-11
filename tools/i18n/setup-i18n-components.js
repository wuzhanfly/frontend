#!/usr/bin/env node

/**
 * 国际化组件设置工具
 * 为组件添加国际化支持（导入语句、hook等）
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 需要处理的目录
  TARGET_DIRS: ['ui', 'pages', 'components', 'toolkit'],
  // 需要排除的目录
  EXCLUDE_DIRS: ['node_modules', '.next', 'dist', '.git', 'public', 'i18n', 'test'],
  // 需要处理的文件扩展名
  FILE_EXTENSIONS: ['.tsx', '.jsx'],
  // 已处理标记
  PROCESSED_MARKER: '// i18n-ready'
};

/**
 * 检查文件是否应该被处理
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return CONFIG.FILE_EXTENSIONS.includes(ext);
}

/**
 * 检查目录是否应该被排除
 */
function shouldExcludeDir(dirPath) {
  const dirName = path.basename(dirPath);
  return CONFIG.EXCLUDE_DIRS.includes(dirName);
}

/**
 * 检查文件是否已处理过
 */
function isAlreadyProcessed(content) {
  return content.includes(CONFIG.PROCESSED_MARKER) || content.includes("useTranslation");
}

/**
 * 添加国际化导入
 */
function addI18nImports(content) {
  // 检查是否已有国际化导入
  if (content.includes("useTranslation") || content.includes("react-i18next")) {
    return content;
  }
  
  // 在所有导入后添加国际化导入
  const importRegex = /(import\s+.*?;)/g;
  const matches = content.match(importRegex);
  
  if (matches && matches.length > 0) {
    const lastImport = matches[matches.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport) + lastImport.length;
    
    const newImport = "\nimport { useTranslation } from 'react-i18next';\n";
    return content.substring(0, lastImportIndex) + newImport + content.substring(lastImportIndex);
  } else {
    // 如果没有导入语句，添加在文件开头
    return "import { useTranslation } from 'react-i18next';\n\n" + content;
  }
}

/**
 * 添加useTranslation hook到组件函数开始处
 */
function addUseTranslationHook(content) {
  // 检查是否已有useTranslation hook
  if (content.includes("const { t } = useTranslation()")) {
    return content;
  }
  
  // 查找函数组件的开始
  const functionRegex = /(function\s+\w+\s*\(.*?\)\s*{)|(const\s+\w+\s*=\s*\(.*?\)\s*=>\s*{)|(const\s+\w+\s*=\s*function\s*\(.*?\)\s*{)/;
  const arrowFunctionRegex = /const\s+\w+\s*=\s*\(\s*\w*\s*\)\s*=>\s*`([^`]|\.)*`/; // 跳过模板字符串函数
  
  // 检查是否是模板字符串函数
  if (arrowFunctionRegex.test(content)) {
    return content;
  }
  
  const match = content.match(functionRegex);
  if (match) {
    const insertPos = content.indexOf('{', match.index) + 1;
    const hookCode = '\n  const { t } = useTranslation();\n';
    return content.substring(0, insertPos) + hookCode + content.substring(insertPos);
  }
  
  // 查找类组件
  const classRegex = /(class\s+\w+\s+extends\s+React\.Component\s*{)|(class\s+\w+\s+extends\s+Component\s*{)/;
  const classMatch = content.match(classRegex);
  if (classMatch) {
    const insertPos = content.indexOf('{', classMatch.index) + 1;
    const hookCode = '\n  render() {\n    const { t } = useTranslation();\n';
    const closingBrace = content.indexOf('\n  }', insertPos);
    if (closingBrace > -1) {
      return content.substring(0, insertPos) + hookCode + content.substring(insertPos, closingBrace) + '\n  }\n' + content.substring(closingBrace + 3);
    }
  }
  
  return content;
}

/**
 * 为组件添加国际化支持
 */
function setupComponentI18n(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已处理过
  if (isAlreadyProcessed(content)) {
    console.log(`跳过已处理文件: ${filePath}`);
    return false;
  }
  
  // 添加国际化导入
  content = addI18nImports(content);
  
  // 添加useTranslation hook
  content = addUseTranslationHook(content);
  
  // 添加处理标记
  content = CONFIG.PROCESSED_MARKER + '\n' + content;
  
  // 写入文件
  fs.writeFileSync(filePath, content);
  console.log(`处理文件: ${filePath}`);
  
  return true;
}

/**
 * 递归遍历目录
 */
function walkDirectory(dirPath, callback) {
  if (shouldExcludeDir(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkDirectory(fullPath, callback);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      callback(fullPath);
    }
  }
}

/**
 * 主函数
 */
function main() {
  const arg = process.argv[2];
  
  console.log('开始为组件添加国际化支持...');
  
  let processedCount = 0;
  
  // 检查参数是否为单个文件
  if (arg && fs.existsSync(arg)) {
    const stat = fs.statSync(arg);
    if (stat.isFile() && shouldProcessFile(arg)) {
      // 处理单个文件
      console.log(`处理文件: ${arg}`);
      if (setupComponentI18n(arg)) {
        processedCount++;
      }
    } else if (stat.isDirectory()) {
      // 处理目录
      CONFIG.TARGET_DIRS.forEach(dir => {
        const dirPath = path.join(arg, dir);
        if (fs.existsSync(dirPath)) {
          console.log(`处理目录: ${dir}`);
          walkDirectory(dirPath, (filePath) => {
            if (setupComponentI18n(filePath)) {
              processedCount++;
            }
          });
        } else {
          console.log(`目录不存在: ${dirPath}`);
        }
      });
    }
  } else {
    // 处理默认目录
    CONFIG.TARGET_DIRS.forEach(dir => {
      const dirPath = path.join('./', dir);
      if (fs.existsSync(dirPath)) {
        console.log(`处理目录: ${dir}`);
        walkDirectory(dirPath, (filePath) => {
          if (setupComponentI18n(filePath)) {
            processedCount++;
          }
        });
      } else {
        console.log(`目录不存在: ${dirPath}`);
      }
    });
  }
  
  console.log(`完成! 处理了 ${processedCount} 个组件文件`);
  console.log('所有组件现在都已准备好使用国际化功能');
}

// 执行主函数
if (require.main === module) {
  main();
}