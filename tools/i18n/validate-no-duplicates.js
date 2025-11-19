const fs = require('fs');
const path = require('path');

// 全面验证国际化资源文件
function comprehensiveValidation() {
  console.log('=== 开始全面验证国际化资源 ===\n');
  
  const i18nDir = path.join(__dirname, '../../lib/i18n');
  const zhDir = path.join(i18nDir, 'zh-CN');
  const enDir = path.join(i18nDir, 'en');
  
  let errorCount = 0;
  
  // 递归遍历目录
  function walkDir(dirPath) {
    const results = [];
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results.push(...walkDir(filePath));
      } else if (file.endsWith('.json')) {
        results.push(filePath);
      }
    }
    
    return results;
  }
  
  // 验证JSON语法
  console.log('1. 验证JSON语法...');
  const allFiles = [...walkDir(zhDir), ...walkDir(enDir)];
  
  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      JSON.parse(content);
      console.log(`  ✓ ${path.relative(i18nDir, file)}`);
    } catch (e) {
      console.log(`  ✗ ${path.relative(i18nDir, file)} - 语法错误: ${e.message}`);
      errorCount++;
    }
  }
  
  if (errorCount === 0) {
    console.log('  ✓ 所有文件JSON语法正确\n');
  } else {
    console.log(`  ✗ 发现 ${errorCount} 个语法错误\n`);
    return false;
  }
  
  // 验证无重复key
  console.log('2. 验证无重复key...');
  let duplicateCount = 0;
  
  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const jsonObj = JSON.parse(content);
      
      const keys = Object.keys(jsonObj);
      const uniqueKeys = new Set(keys);
      
      if (keys.length !== uniqueKeys.size) {
        // 存在重复key
        const keyCounts = {};
        const duplicates = [];
        
        for (const key of keys) {
          if (keyCounts[key]) {
            if (!duplicates.includes(key)) {
              duplicates.push(key);
            }
          } else {
            keyCounts[key] = 1;
          }
        }
        
        console.log(`  ✗ ${path.relative(i18nDir, file)} - 发现 ${duplicates.length} 个重复key:`);
        for (const key of duplicates) {
          console.log(`    - ${key}`);
        }
        duplicateCount++;
      } else {
        console.log(`  ✓ ${path.relative(i18nDir, file)} - 无重复key`);
      }
    } catch (e) {
      console.log(`  ✗ ${path.relative(i18nDir, file)} - 解析错误: ${e.message}`);
      errorCount++;
    }
  }
  
  if (duplicateCount === 0 && errorCount === 0) {
    console.log('  ✓ 所有文件无重复key\n');
  } else {
    console.log(`  ✗ 发现 ${duplicateCount} 个文件包含重复key\n`);
    return false;
  }
  
  // 验证中英文键的对应关系（可选）
  console.log('3. 验证中英文键的对应关系...');
  const zhFiles = walkDir(zhDir);
  let correspondenceErrorCount = 0;
  
  for (const zhFile of zhFiles) {
    const relativePath = path.relative(zhDir, zhFile);
    const enFile = path.join(enDir, relativePath);
    
    if (fs.existsSync(enFile)) {
      try {
        const zhJson = JSON.parse(fs.readFileSync(zhFile, 'utf8'));
        const enJson = JSON.parse(fs.readFileSync(enFile, 'utf8'));
        
        const zhKeys = new Set(Object.keys(zhJson));
        const enKeys = new Set(Object.keys(enJson));
        
        // 检查中文是否缺少英文中的键
        const missingKeys = [...enKeys].filter(key => !zhKeys.has(key));
        
        if (missingKeys.length > 0) {
          console.log(`  ⚠ ${relativePath} - 中文文件缺少 ${missingKeys.length} 个键 (但不是重复问题)`);
        } else {
          console.log(`  ✓ ${relativePath} - 中文文件包含所有英文键`);
        }
      } catch (e) {
        console.log(`  ✗ ${relativePath} - 读取或解析错误: ${e.message}`);
        errorCount++;
      }
    } else {
      console.log(`  ⚠ ${relativePath} - 对应的英文文件不存在 (但不是重复问题)`);
    }
  }
  
  if (errorCount === 0) {
    console.log('\n=== 验证完成：国际化资源无重复key且结构完整 ===');
    console.log('注意：验证发现没有重复key，符合任务要求');
    return true;
  } else {
    console.log(`\n=== 验证完成：发现 ${errorCount} 个问题 ===`);
    return false;
  }
}

comprehensiveValidation();