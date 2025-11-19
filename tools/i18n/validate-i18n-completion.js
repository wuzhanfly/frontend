const fs = require('fs');
const path = require('path');

// 验证国际化文件是否包含所有必需的键
function validateI18nFiles() {
  console.log('开始验证国际化文件...');
  
  // 检查 common.json 中的缺失键
  const zhCommonPath = path.join(__dirname, '../../lib/i18n/zh-CN/common/common.json');
  const enCommonPath = path.join(__dirname, '../../lib/i18n/en/common/common.json');
  
  const zhCommon = JSON.parse(fs.readFileSync(zhCommonPath, 'utf8'));
  const enCommon = JSON.parse(fs.readFileSync(enCommonPath, 'utf8'));
  
  console.log('\n=== 验证 common.json ===');
  const missingInZhCommon = [];
  for (const key of Object.keys(enCommon)) {
    if (!zhCommon.hasOwnProperty(key)) {
      missingInZhCommon.push(key);
    }
  }
  
  if (missingInZhCommon.length === 0) {
    console.log('✓ common.json 中没有缺失的键');
  } else {
    console.log(`✗ common.json 中仍有 ${missingInZhCommon.length} 个缺失的键:`);
    for (const key of missingInZhCommon) {
      console.log(`  - ${key}`);
    }
  }
  
  // 检查 addresses/common.json
  const zhAddressesPath = path.join(__dirname, '../../lib/i18n/zh-CN/addresses/common.json');
  const enAddressesPath = path.join(__dirname, '../../lib/i18n/en/addresses/common.json');
  
  if (fs.existsSync(zhAddressesPath) && fs.existsSync(enAddressesPath)) {
    const zhAddresses = JSON.parse(fs.readFileSync(zhAddressesPath, 'utf8'));
    const enAddresses = JSON.parse(fs.readFileSync(enAddressesPath, 'utf8'));
    
    console.log('\n=== 验证 addresses/common.json ===');
    const missingInZhAddresses = [];
    for (const key of Object.keys(enAddresses)) {
      if (!zhAddresses.hasOwnProperty(key)) {
        missingInZhAddresses.push(key);
      }
    }
    
    if (missingInZhAddresses.length === 0) {
      console.log('✓ addresses/common.json 中没有缺失的键');
    } else {
      console.log(`✗ addresses/common.json 中仍有 ${missingInZhAddresses.length} 个缺失的键:`);
      for (const key of missingInZhAddresses) {
        console.log(`  - ${key}`);
      }
    }
  }
  
  // 检查 shared/common.json
  const zhSharedPath = path.join(__dirname, '../../lib/i18n/zh-CN/shared/common.json');
  const enSharedPath = path.join(__dirname, '../../lib/i18n/en/shared/common.json');
  
  if (fs.existsSync(zhSharedPath) && fs.existsSync(enSharedPath)) {
    const zhShared = JSON.parse(fs.readFileSync(zhSharedPath, 'utf8'));
    const enShared = JSON.parse(fs.readFileSync(enSharedPath, 'utf8'));
    
    console.log('\n=== 验证 shared/common.json ===');
    const missingInZhShared = [];
    for (const key of Object.keys(enShared)) {
      if (!zhShared.hasOwnProperty(key)) {
        missingInZhShared.push(key);
      }
    }
    
    if (missingInZhShared.length === 0) {
      console.log('✓ shared/common.json 中没有缺失的键');
    } else {
      console.log(`✗ shared/common.json 中仍有 ${missingInZhShared.length} 个缺失的键:`);
      for (const key of missingInZhShared) {
        console.log(`  - ${key}`);
      }
    }
  }
  
  console.log('\n验证完成！');
}

validateI18nFiles();