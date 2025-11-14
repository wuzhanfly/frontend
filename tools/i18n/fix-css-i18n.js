#!/usr/bin/env node

/**
 * 修复CSS值国际化错误的脚本
 * 该脚本会查找并修复被错误国际化的CSS值
 */

const fs = require('fs');
const path = require('path');

// 定义常见的CSS值模式，这些不应该被国际化
const CSS_VALUE_PATTERNS = [
  // CSS过渡和动画
  'all 0.3s ease',
  'all 0.2s ease-in-out',
  'all 0.5s ease',
  'all 0.1s ease',
  'transform 0.3s ease',
  'opacity 0.3s ease',
  'background-color 0.3s ease',
  'color 0.3s ease',
  
  // CSS timing functions
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'step-start',
  'step-end',
  
  // CSS其他常用值
  'none',
  'auto',
  'normal',
  'inherit',
  'initial',
  'unset'
];

// 需要修复的文件列表
const TARGET_FILES = [
  'ui/games/Puzzle15.tsx'
];

/**
 * 修复文件中的CSS值国际化错误
 */
function fixCssI18nErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    console.log(`处理文件: ${filePath}`);
    
    // 对每个CSS值模式进行修复
    for (const cssValue of CSS_VALUE_PATTERNS) {
      // 查找被错误国际化的CSS值
      const i18nRegex = new RegExp(`t\\(['"]([^'"]*${cssValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^'"]*)['"]\\)`, 'g');
      
      let match;
      while ((match = i18nRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const key = match[1];
        
        console.log(`  发现错误国际化: ${fullMatch} -> "${cssValue}"`);
        
        // 替换为直接的CSS值字符串
        const replacement = `"${cssValue}"`;
        content = content.replace(fullMatch, replacement);
        modified = true;
      }
      
      // 查找对象属性中的错误国际化
      const objPropRegex = new RegExp(`([a-zA-Z_][a-zA-Z0-9_-]*)\\s*:\\s*{t\\(['"]([^'"]*${cssValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^'"]*)['"]\\)}`, 'g');
      
      let objMatch;
      while ((objMatch = objPropRegex.exec(content)) !== null) {
        const fullMatch = objMatch[0];
        const propName = objMatch[1];
        const key = objMatch[2];
        
        console.log(`  发现对象属性中的错误国际化: ${fullMatch} -> ${propName}: "${cssValue}"`);
        
        // 替换为直接的CSS值字符串
        const replacement = `${propName}: "${cssValue}"`;
        content = content.replace(fullMatch, replacement);
        modified = true;
      }
    }
    
    // 特殊处理Puzzle15.tsx中的transition属性
    const transitionRegex = /transition:\\s*t\\(['"]games\\.common\\.all_03s_ease['"]\\)/g;
    if (transitionRegex.test(content)) {
      content = content.replace(transitionRegex, 'transition: "all 0.3s ease"');
      modified = true;
      console.log('  修复了Puzzle15.tsx中的transition属性');
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  已修复文件: ${filePath}`);
      return true;
    } else {
      console.log(`  文件无需修复: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

/**
 * 从提取的JSON文件中移除CSS值相关的键
 */
function removeCssKeysFromJson(jsonFilePath) {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      console.log(`文件不存在: ${jsonFilePath}`);
      return false;
    }
    
    const content = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(content);
    let modified = false;
    
    console.log(`处理JSON文件: ${jsonFilePath}`);
    
    // 移除与CSS值相关的键
    for (const [key, value] of Object.entries(data)) {
      const message = typeof value === 'string' ? value : value.defaultMessage;
      
      if (typeof message === 'string') {
        // 检查是否是CSS值
        const isCssValue = CSS_VALUE_PATTERNS.some(cssValue => 
          message.includes(cssValue) || 
          message === cssValue
        );
        
        if (isCssValue) {
          console.log(`  移除CSS相关键: ${key} = "${message}"`);
          delete data[key];
          modified = true;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  已更新JSON文件: ${jsonFilePath}`);
      return true;
    } else {
      console.log(`  JSON文件无需修改: ${jsonFilePath}`);
      return false;
    }
  } catch (error) {
    console.error(`处理JSON文件 ${jsonFilePath} 时出错:`, error.message);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始修复CSS值国际化错误...');
  const startTime = Date.now();
  
  let fixedFiles = 0;
  
  // 修复目标文件
  for (const filePath of TARGET_FILES) {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath) && fixCssI18nErrors(fullPath)) {
      fixedFiles++;
    }
  }
  
  // 修复提取的JSON文件
  const jsonFiles = [
    './tools/i18n/extracted/games.json',
    './tools/i18n/filtered/games.json'
  ];
  
  for (const jsonFile of jsonFiles) {
    const fullPath = path.join(process.cwd(), jsonFile);
    if (removeCssKeysFromJson(fullPath)) {
      fixedFiles++;
    }
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
