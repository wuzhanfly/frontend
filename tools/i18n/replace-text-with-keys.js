#!/usr/bin/env node

/**
 * 文本替换工具
 * 将硬编码文本替换为国际化键
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
  // 提取的键文件路径
  KEYS_FILE: './i18n-extracted-keys.json'
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
 * 替换JSX文本节点中的硬编码文本
 */
function replaceJsxText(content, keyMap) {
  // 匹配JSX文本节点，但不匹配已经使用t()函数的文本
  const jsxTextRegex = /(>)([^<{>\n]+?)(<)/g;
  
  return content.replace(jsxTextRegex, (match, prefix, text, suffix) => {
    const trimmedText = text.trim();
    
    // 检查是否在键映射中
    if (keyMap.has(trimmedText) && trimmedText.length > 1) {
      const key = keyMap.get(trimmedText);
      // 如果文本包含换行或缩进，保持格式
      const leadingSpace = text.match(/^\s*/)[0];
      const trailingSpace = text.match(/\s*$/)[0];
      return `${prefix}${leadingSpace}{t('${key}')}${trailingSpace}${suffix}`;
    }
    
    return match;
  });
}

/**
 * 替换JSX属性中的硬编码文本
 */
function replaceJsxAttributes(content, keyMap) {
  // 匹配JSX属性值，但只处理特定的可翻译属性
  const jsxAttrRegex = /(\w+)=("|')([^"']+?)\2/g;
  
  return content.replace(jsxAttrRegex, (match, attrName, quote, attrValue) => {
    // 只处理需要翻译的属性
    const translatableAttrs = ['placeholder', 'title', 'alt', 'aria-label', 'label', 'helperText', 'emptyText', 'fallbackText', 'loadingText'];
    
    if (translatableAttrs.includes(attrName.toLowerCase()) && keyMap.has(attrValue)) {
      const key = keyMap.get(attrValue);
      return `${attrName}={t('${key}')}`;
    }
    
    return match;
  });
}

/**
 * 替换文件中的硬编码文本
 */
function replaceTextInFile(filePath, keyMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查文件是否已有国际化支持
  if (!content.includes("useTranslation")) {
    console.log(`文件未设置国际化支持，跳过: ${filePath}`);
    return false;
  }
  
  const originalContent = content;
  
  // 替换JSX文本节点
  content = replaceJsxText(content, keyMap);
  
  // 替换JSX属性
  content = replaceJsxAttributes(content, keyMap);
  
  // 如果内容有变化，写入文件
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`更新文件: ${filePath}`);
    return true;
  }
  
  return false;
}

/**
 * 主函数
 */
function main() {
  const keysFile = process.argv[2] || CONFIG.KEYS_FILE;
  const targetDir = process.argv[3] || './';
  
  // 读取提取的键
  if (!fs.existsSync(keysFile)) {
    console.error(`键文件不存在: ${keysFile}`);
    process.exit(1);
  }
  
  const keysData = JSON.parse(fs.readFileSync(keysFile, 'utf8'));
  console.log(`载入 ${keysData.keys.length} 个键`);
  
  // 创建键映射（原始文本 -> 国际化键）
  const keyMap = new Map();
  keysData.keys.forEach(keyEntry => {
    keyMap.set(keyEntry.text, keyEntry.key);
  });
  
  console.log('开始替换硬编码文本...');
  
  let updatedCount = 0;
  
  // 检查目标是否为单个文件
  if (fs.existsSync(targetDir)) {
    const stat = fs.statSync(targetDir);
    if (stat.isFile() && shouldProcessFile(targetDir)) {
      // 处理单个文件
      if (replaceTextInFile(targetDir, keyMap)) {
        updatedCount++;
      }
    } else if (stat.isDirectory()) {
      // 处理目录
      CONFIG.TARGET_DIRS.forEach(dir => {
        const dirPath = path.join(targetDir, dir);
        if (fs.existsSync(dirPath)) {
          console.log(`处理目录: ${dir}`);
          walkDirectory(dirPath, (filePath) => {
            if (replaceTextInFile(filePath, keyMap)) {
              updatedCount++;
            }
          });
        } else {
          console.log(`目录不存在: ${dirPath}`);
        }
      });
    }
  }
  
  console.log(`完成! 更新了 ${updatedCount} 个文件`);
  console.log('硬编码文本已替换为国际化键');
}

// 执行主函数
if (require.main === module) {
  main();
}