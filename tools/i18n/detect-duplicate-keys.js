const fs = require('fs');
const path = require('path');

// 检测国际化文件中的重复key
function detectDuplicateKeys() {
  console.log('开始检测国际化资源中的重复key...');
  
  const i18nDir = path.join(__dirname, '../../lib/i18n');
  const zhDir = path.join(i18nDir, 'zh-CN');
  const enDir = path.join(i18nDir, 'en');
  
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
  
  // 检查单个文件中的重复key
  function checkDuplicatesInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonObj = JSON.parse(content);
      
      const keyCounts = {};
      const duplicateKeys = [];
      
      for (const key in jsonObj) {
        if (keyCounts[key]) {
          keyCounts[key]++;
          duplicateKeys.push(key);
        } else {
          keyCounts[key] = 1;
        }
      }
      
      if (duplicateKeys.length > 0) {
        console.log(`\n文件 ${path.relative(i18nDir, filePath)} 中发现重复key:`);
        for (const key of duplicateKeys) {
          console.log(`  - ${key} (出现 ${keyCounts[key]} 次)`);
        }
        return duplicateKeys;
      }
      
      return [];
    } catch (error) {
      console.error(`解析文件出错 ${filePath}:`, error.message);
      return [];
    }
  }
  
  // 检查所有中文国际化文件
  const zhFiles = walkDir(zhDir);
  let totalDuplicateFiles = 0;
  let totalDuplicates = 0;
  
  console.log('\n=== 检查中文国际化文件 ===');
  for (const file of zhFiles) {
    const duplicates = checkDuplicatesInFile(file);
    if (duplicates.length > 0) {
      totalDuplicateFiles++;
      totalDuplicates += duplicates.length;
    }
  }
  
  // 检查所有英文国际化文件
  const enFiles = walkDir(enDir);
  
  console.log('\n=== 检查英文国际化文件 ===');
  for (const file of enFiles) {
    const duplicates = checkDuplicatesInFile(file);
    if (duplicates.length > 0) {
      totalDuplicateFiles++;
      totalDuplicates += duplicates.length;
    }
  }
  
  console.log('\n=== 检测结果 ===');
  console.log(`总共发现 ${totalDuplicateFiles} 个文件包含重复key`);
  console.log(`总共发现 ${totalDuplicates} 个重复key`);
  
  // 保存检测结果
  const report = {
    totalDuplicateFiles,
    totalDuplicates,
    timestamp: new Date().toISOString(),
    details: []
  };
  
  // 重新运行检测并保存详细信息
  for (const file of [...zhFiles, ...enFiles]) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const jsonObj = JSON.parse(content);
      
      const keyCounts = {};
      const duplicateKeys = [];
      
      for (const key in jsonObj) {
        if (keyCounts[key]) {
          keyCounts[key]++;
          if (!duplicateKeys.includes(key)) {
            duplicateKeys.push(key);
          }
        } else {
          keyCounts[key] = 1;
        }
      }
      
      if (duplicateKeys.length > 0) {
        report.details.push({
          file: path.relative(i18nDir, file),
          duplicates: duplicateKeys.map(key => ({
            key,
            count: keyCounts[key]
          }))
        });
      }
    } catch (error) {
      console.error(`解析文件出错 ${file}:`, error.message);
    }
  }
  
  const reportPath = path.join(__dirname, '../../iflow/国际化资源重复key检测报告.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n详细报告已保存到: ${reportPath}`);
  
  return report;
}

detectDuplicateKeys();