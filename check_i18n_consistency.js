const fs = require('fs');
const path = require('path');

// 获取所有模块的路径
const enDir = path.join(__dirname, 'lib/i18n/en');
const zhDir = path.join(__dirname, 'lib/i18n/zh-CN');

// 读取目录
const enModules = fs.readdirSync(enDir);
const zhModules = fs.readdirSync(zhDir);

console.log('=== 模块数量对比 ===');
console.log('English modules:', enModules.length, enModules);
console.log('Chinese modules:', zhModules.length, zhModules);

// 检查每个模块的键一致性
const allResults = [];

for (const module of enModules) {
  const enCommonPath = path.join(enDir, module, 'common.json');
  const zhCommonPath = path.join(zhDir, module, 'common.json');
  
  if (!fs.existsSync(enCommonPath)) {
    console.log(`Missing English file for module: ${module}`);
    continue;
  }
  
  if (!fs.existsSync(zhCommonPath)) {
    console.log(`Missing Chinese file for module: ${module}`);
    continue;
  }
  
  try {
    const enCommon = require(enCommonPath);
    const zhCommon = require(zhCommonPath);
    
    const enKeys = Object.keys(enCommon);
    const zhKeys = Object.keys(zhCommon);
    
    const missingInZh = enKeys.filter(key => !zhKeys.includes(key));
    const missingInEn = zhKeys.filter(key => !enKeys.includes(key));
    
    const result = {
      module: module,
      enCount: enKeys.length,
      zhCount: zhKeys.length,
      missingInZh: missingInZh,
      missingInEn: missingInEn
    };
    
    allResults.push(result);
    
    if (missingInZh.length > 0 || missingInEn.length > 0) {
      console.log(`\n=== ${module} 模块不一致 ===`);
      console.log(`English keys: ${enKeys.length}`);
      console.log(`Chinese keys: ${zhKeys.length}`);
      if (missingInZh.length > 0) {
        console.log(`Missing in Chinese:`, missingInZh);
      }
      if (missingInEn.length > 0) {
        console.log(`Missing in English:`, missingInEn);
      }
    }
  } catch (error) {
    console.log(`Error processing module ${module}:`, error.message);
  }
}

// 汇总结果
console.log('\n=== 汇总结果 ===');
let totalEnKeys = 0;
let totalZhKeys = 0;
let modulesWithIssues = 0;

for (const result of allResults) {
  totalEnKeys += result.enCount;
  totalZhKeys += result.zhCount;
  
  if (result.missingInZh.length > 0 || result.missingInEn.length > 0) {
    modulesWithIssues++;
  }
}

console.log(`Total modules checked: ${allResults.length}`);
console.log(`Modules with issues: ${modulesWithIssues}`);
console.log(`Total English keys: ${totalEnKeys}`);
console.log(`Total Chinese keys: ${totalZhKeys}`);