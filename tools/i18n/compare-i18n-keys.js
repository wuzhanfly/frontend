const fs = require('fs');
const path = require('path');

// 定义国际化资源文件路径
const enDir = path.join(__dirname, '../../lib/i18n/en');
const zhDir = path.join(__dirname, '../../lib/i18n/zh-CN');

// 读取目录下所有国际化文件
function getAllJsonFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...getAllJsonFiles(filePath));
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  }
  
  return results;
}

// 读取JSON文件内容
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return {};
  }
}

// 比较英文和中文的国际化资源
function compareI18nResources(enJson, zhJson) {
  const missingKeys = [];
  
  for (const [key, value] of Object.entries(enJson)) {
    if (!zhJson.hasOwnProperty(key)) {
      missingKeys.push({
        key: key,
        enValue: value
      });
    }
  }
  
  return missingKeys;
}

// 按目录结构处理国际化文件
function processI18nFiles() {
  const enFiles = getAllJsonFiles(enDir);
  const report = {};
  
  for (const enFile of enFiles) {
    const relativePath = path.relative(enDir, enFile);
    const zhFile = path.join(zhDir, relativePath);
    
    const enJson = readJsonFile(enFile);
    
    let zhJson = {};
    if (fs.existsSync(zhFile)) {
      zhJson = readJsonFile(zhFile);
    }
    
    const missingKeys = compareI18nResources(enJson, zhJson);
    
    if (missingKeys.length > 0) {
      report[relativePath] = {
        enFile: enFile,
        zhFile: zhFile,
        missingKeys: missingKeys
      };
    }
  }
  
  return report;
}

// 生成报告
function generateReport() {
  console.log('开始比较中英文国际化资源...');
  const report = processI18nFiles();
  
  // 输出到控制台
  console.log('\n=== 中英文国际化资源差异报告 ===');
  
  let totalMissingKeys = 0;
  for (const [filePath, data] of Object.entries(report)) {
    console.log(`\n文件: ${filePath}`);
    console.log(`缺失键数量: ${data.missingKeys.length}`);
    
    for (const item of data.missingKeys) {
      console.log(`  - ${item.key}: "${item.enValue}"`);
    }
    
    totalMissingKeys += data.missingKeys.length;
  }
  
  console.log(`\n总计缺失键数量: ${totalMissingKeys}`);
  
  // 保存报告到文件
  const reportPath = path.join(__dirname, '../../iflow/国际化资源差异报告.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n详细报告已保存到: ${reportPath}`);
  
  // 生成缺失键的中文翻译（简单处理，实际上需要手动或AI翻译）
  const missingKeysWithZhTranslations = {};
  
  for (const [filePath, data] of Object.entries(report)) {
    missingKeysWithZhTranslations[filePath] = {};
    
    for (const item of data.missingKeys) {
      // 这里简单地将英文内容作为占位符，实际使用时需要替换为真正的中文翻译
      missingKeysWithZhTranslations[filePath][item.key] = item.enValue; // TODO: 需要真正的中文翻译
    }
  }
  
  const translationPath = path.join(__dirname, '../../iflow/待翻译的中文国际化资源.json');
  fs.writeFileSync(translationPath, JSON.stringify(missingKeysWithZhTranslations, null, 2), 'utf8');
  console.log(`待翻译的中文国际化资源已保存到: ${translationPath}`);
  
  return report;
}

// 执行比较
generateReport();