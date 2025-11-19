const fs = require('fs');
const path = require('path');

// 验证国际化文件的完整性和结构
function runComprehensiveValidation() {
  console.log('=== 开始全面验证国际化文件 ===\n');
  
  // 1. 验证所有 JSON 文件的语法正确性
  console.log('1. 验证 JSON 语法...');
  const i18nDir = path.join(__dirname, '../../lib/i18n');
  const zhDir = path.join(i18nDir, 'zh-CN');
  const enDir = path.join(i18nDir, 'en');
  
  const validateJsonSyntax = (dirPath, dirName) => {
    const files = walkDir(dirPath);
    let errorCount = 0;
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          JSON.parse(content);
          console.log(`  ✓ ${path.relative(i18nDir, file)}`);
        } catch (e) {
          console.log(`  ✗ ${path.relative(i18nDir, file)} - 语法错误: ${e.message}`);
          errorCount++;
        }
      }
    }
    
    return errorCount;
  };
  
  function walkDir(dirPath) {
    const results = [];
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results.push(...walkDir(filePath));
      } else {
        results.push(filePath);
      }
    }
    
    return results;
  }
  
  let totalErrors = 0;
  totalErrors += validateJsonSyntax(zhDir, 'zh-CN');
  totalErrors += validateJsonSyntax(enDir, 'en');
  
  if (totalErrors === 0) {
    console.log('  ✓ 所有 JSON 文件语法正确\n');
  } else {
    console.log(`  ✗ 发现 ${totalErrors} 个 JSON 语法错误\n`);
    return false;
  }
  
  // 2. 验证中英文键的对应关系
  console.log('2. 验证中英文键的对应关系...');
  
  const validateKeyCorrespondence = (enPath, zhPath, filePath) => {
    try {
      const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      const zhJson = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
      
      const enKeys = new Set(Object.keys(enJson));
      const zhKeys = new Set(Object.keys(zhJson));
      
      const missingKeys = [...enKeys].filter(key => !zhKeys.has(key));
      
      if (missingKeys.length > 0) {
        console.log(`  ✗ ${filePath} - 中文文件缺失 ${missingKeys.length} 个键:`);
        for (const key of missingKeys.slice(0, 5)) { // 只显示前5个缺失的键
          console.log(`    - ${key}`);
        }
        if (missingKeys.length > 5) {
          console.log(`    ... 还有 ${missingKeys.length - 5} 个`);
        }
        return false;
      } else {
        console.log(`  ✓ ${filePath} - 中文文件包含所有英文键`);
        return true;
      }
    } catch (e) {
      console.log(`  ✗ ${filePath} - 读取或解析错误: ${e.message}`);
      return false;
    }
  };
  
  const enFiles = walkDir(enDir);
  let correspondenceErrors = 0;
  
  for (const enFile of enFiles) {
    if (enFile.endsWith('.json')) {
      const relativePath = path.relative(enDir, enFile);
      const zhFile = path.join(zhDir, relativePath);
      
      if (fs.existsSync(zhFile)) {
        if (!validateKeyCorrespondence(enFile, zhFile, relativePath)) {
          correspondenceErrors++;
        }
      } else {
        console.log(`  ✗ ${relativePath} - 中文文件不存在`);
        correspondenceErrors++;
      }
    }
  }
  
  if (correspondenceErrors === 0) {
    console.log('  ✓ 所有文件的中英文键对应关系正确\n');
  } else {
    console.log(`  ✗ 发现 ${correspondenceErrors} 个键对应关系错误\n`);
    return false;
  }
  
  // 3. 验证值的合理性（非空值等）
  console.log('3. 验证翻译值的合理性...');
  const validateTranslationValues = (zhPath, filePath) => {
    try {
      const zhJson = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
      const emptyValues = [];
      
      for (const [key, value] of Object.entries(zhJson)) {
        if (value === null || value === undefined || (typeof value === 'string' && value === '')) {
          emptyValues.push(key);
        }
      }
      
      if (emptyValues.length > 0) {
        console.log(`  ✗ ${filePath} - 发现 ${emptyValues.length} 个空值:`);
        for (const key of emptyValues.slice(0, 5)) {
          console.log(`    - ${key}`);
        }
        if (emptyValues.length > 5) {
          console.log(`    ... 还有 ${emptyValues.length - 5} 个`);
        }
        return false;
      } else {
        console.log(`  ✓ ${filePath} - 所有翻译值都不为空`);
        return true;
      }
    } catch (e) {
      console.log(`  ✗ ${filePath} - 读取或解析错误: ${e.message}`);
      return false;
    }
  };
  
  const zhFiles = walkDir(zhDir);
  let valueErrors = 0;
  
  for (const zhFile of zhFiles) {
    if (zhFile.endsWith('.json')) {
      const relativePath = path.relative(zhDir, zhFile);
      if (!validateTranslationValues(zhFile, relativePath)) {
        valueErrors++;
      }
    }
  }
  
  if (valueErrors === 0) {
    console.log('  ✓ 所有翻译值都合理\n');
  } else {
    console.log(`  ✗ 发现 ${valueErrors} 个值合理性问题\n`);
    return false;
  }
  
  console.log('=== 验证完成：所有检查通过！ ===');
  return true;
}

runComprehensiveValidation();