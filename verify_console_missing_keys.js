const fs = require('fs');
const path = require('path');

/**
 * 验证控制台中报告的缺失键是否已正确添加
 */
function verifyMissingKeys() {
  console.log('验证控制台中报告的缺失键是否已正确添加...\n');
  
  const enPath = './lib/i18n/en';
  const zhPath = './lib/i18n/zh-CN';
  
  // 控制台错误日志中提到的缺失键列表
  const reportedMissingKeys = [
    'shared.common.fast',
    'shared.common.slow',
    'settings.common.website_settings',
    'settings.common.user_settings',
    'settings.common.english',
    'settings.common.flag_us',
    'shared.common.search',
    'stats.common.latest_batch',
    'stats.common.gas_tracker',
    'shared.common.728x90',
    'shared.common.transaction_info',
    'addresses.common.incoming_txn',
    'addresses.common.outgoing_txn',
    'addresses.common.txn_to_the_same_address',
    'shared.common.token_transfer',
    'tokens.common.discord'
  ];
  
  let allKeysFound = true;
  
  for (const key of reportedMissingKeys) {
    const keyParts = key.split('.');
    const moduleName = keyParts[0]; // shared, settings, stats, addresses, tokens
    const fullKey = key;
    
    // 检查英文文件
    const enModulePath = path.join(enPath, moduleName);
    const enJsonFile = path.join(enModulePath, 'common.json');
    
    let enFound = false;
    if (fs.existsSync(enJsonFile)) {
      const enContent = JSON.parse(fs.readFileSync(enJsonFile, 'utf8'));
      if (enContent[fullKey]) {
        enFound = true;
      }
    }
    
    // 检查中文文件
    const zhModulePath = path.join(zhPath, moduleName);
    const zhJsonFile = path.join(zhModulePath, 'common.json');
    
    let zhFound = false;
    if (fs.existsSync(zhJsonFile)) {
      const zhContent = JSON.parse(fs.readFileSync(zhJsonFile, 'utf8'));
      if (zhContent[fullKey]) {
        zhFound = true;
      }
    }
    
    console.log(`${key}:`);
    console.log(`  英文: ${enFound ? '✓ 存在' : '✗ 缺失'}`);
    console.log(`  中文: ${zhFound ? '✓ 存在' : '✗ 缺失'}`);
    
    if (!enFound || !zhFound) {
      allKeysFound = false;
    }
    console.log('');
  }
  
  if (allKeysFound) {
    console.log('✓ 所有控制台中报告的缺失键都已正确添加到翻译文件中！');
  } else {
    console.log('✗ 仍有部分键缺失，需要进一步修复。');
  }
  
  return allKeysFound;
}

// 运行验证
verifyMissingKeys();