const fs = require('fs');
const path = require('path');

/**
 * 根据实际缺失键列表修复翻译文件
 */
function fixSpecificMissingKeys() {
  console.log('开始修复特定的缺失翻译键...');
  
  const enPath = './lib/i18n/en';
  const zhPath = './lib/i18n/zh-CN';
  
  // 需要添加的缺失键列表
  const missingKeys = {
    'shared': {
      'shared.common.fast': 'Fast',
      'shared.common.slow': 'Slow',
      'shared.common.search': 'Search',
      'shared.common.728x90': '728x90',
      'shared.common.transaction_info': 'Transaction info',
      'shared.common.token_transfer': 'Token transfer'
    },
    'settings': {
      'settings.common.website_settings': 'Website Settings',
      'settings.common.user_settings': 'User Settings',
      'settings.common.english': 'English',
      'settings.common.flag_us': 'Flag US'
    },
    'stats': {
      'stats.common.latest_batch': 'Latest Batch',
      'stats.common.gas_tracker': 'Gas Tracker'
    },
    'addresses': {
      'addresses.common.incoming_txn': 'Incoming Transaction',
      'addresses.common.outgoing_txn': 'Outgoing Transaction',
      'addresses.common.txn_to_the_same_address': 'Transaction to the same address'
    },
    'tokens': {
      'tokens.common.discord': 'Discord'
    }
  };
  
  // 为每个模块添加缺失的键
  for (const [moduleName, keysToAdd] of Object.entries(missingKeys)) {
    console.log(`处理模块: ${moduleName}`);
    
    // 处理英文文件
    const enModulePath = path.join(enPath, moduleName);
    const enJsonFile = path.join(enModulePath, 'common.json');
    
    let enContent = {};
    if (fs.existsSync(enJsonFile)) {
      enContent = JSON.parse(fs.readFileSync(enJsonFile, 'utf8'));
    } else {
      if (!fs.existsSync(enModulePath)) {
        fs.mkdirSync(enModulePath, { recursive: true });
      }
    }
    
    let enUpdated = false;
    for (const [key, value] of Object.entries(keysToAdd)) {
      if (!enContent[key]) {
        enContent[key] = value;
        enUpdated = true;
        console.log(`  添加英文翻译: ${key} = "${value}"`);
      }
    }
    
    if (enUpdated) {
      fs.writeFileSync(enJsonFile, JSON.stringify(enContent, null, 2));
      console.log(`  已更新英文文件: ${enJsonFile}`);
    }
    
    // 处理中文文件
    const zhModulePath = path.join(zhPath, moduleName);
    const zhJsonFile = path.join(zhModulePath, 'common.json');
    
    let zhContent = {};
    if (fs.existsSync(zhJsonFile)) {
      zhContent = JSON.parse(fs.readFileSync(zhJsonFile, 'utf8'));
    } else {
      if (!fs.existsSync(zhModulePath)) {
        fs.mkdirSync(zhModulePath, { recursive: true });
      }
    }
    
    let zhUpdated = false;
    for (const [key, value] of Object.entries(keysToAdd)) {
      if (!zhContent[key]) {
        // 提供中文翻译
        const chineseTranslations = {
          'shared.common.fast': '快速',
          'shared.common.slow': '慢速',
          'shared.common.search': '搜索',
          'shared.common.728x90': '728x90',
          'shared.common.transaction_info': '交易信息',
          'shared.common.token_transfer': '代币转账',
          'settings.common.website_settings': '网站设置',
          'settings.common.user_settings': '用户设置',
          'settings.common.english': '英语',
          'settings.common.flag_us': '美国国旗',
          'stats.common.latest_batch': '最新批次',
          'stats.common.gas_tracker': 'Gas追踪器',
          'addresses.common.incoming_txn': '入账交易',
          'addresses.common.outgoing_txn': '出账交易',
          'addresses.common.txn_to_the_same_address': '到相同地址的交易',
          'tokens.common.discord': 'Discord'
        };
        
        zhContent[key] = chineseTranslations[key] || value;
        zhUpdated = true;
        console.log(`  添加中文翻译: ${key} = "${zhContent[key]}"`);
      }
    }
    
    if (zhUpdated) {
      fs.writeFileSync(zhJsonFile, JSON.stringify(zhContent, null, 2));
      console.log(`  已更新中文文件: ${zhJsonFile}`);
    }
  }
  
  console.log('\n特定缺失键修复完成！');
}

// 运行修复
fixSpecificMissingKeys();