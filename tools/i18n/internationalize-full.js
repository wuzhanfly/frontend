#!/usr/bin/env node

/**
 * 国际化完整流程工具
 * 按顺序执行所有国际化步骤
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 配置
const CONFIG = {
  // 输出文件路径
  EXTRACTED_KEYS_FILE: './i18n-extracted-keys.json',
  LOCALES_DIR: './lib/i18n/locales',
  // 脚本路径
  SCRIPTS: {
    EXTRACT: './tools/i18n/extract-keys.js',
    SETUP: './tools/i18n/setup-i18n-components.js',
    REPLACE: './tools/i18n/replace-text-with-keys.js'
  }
};

/**
 * 执行命令
 */
function execCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`执行命令: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      cwd: cwd,
      stdio: 'inherit'
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`命令失败，退出码: ${code}`));
      }
    });
  });
}

/**
 * 检查脚本是否存在
 */
function checkScripts() {
  const missingScripts = [];
  
  Object.values(CONFIG.SCRIPTS).forEach(script => {
    if (!fs.existsSync(script)) {
      missingScripts.push(script);
    }
  });
  
  if (missingScripts.length > 0) {
    throw new Error(`缺少脚本文件: ${missingScripts.join(', ')}`);
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('开始国际化流程...');
    
    // 检查脚本是否存在
    checkScripts();
    
    // 参数处理
    const sourceDir = process.argv[2] || './';
    const targetDir = process.argv[3] || './';
    
    console.log(`源目录: ${sourceDir}`);
    console.log(`目标目录: ${targetDir}`);
    
    // 步骤1: 提取键值对
    console.log('\n步骤1: 提取键值对...');
    await execCommand('node', [CONFIG.SCRIPTS.EXTRACT, sourceDir, CONFIG.EXTRACTED_KEYS_FILE]);
    
    // 检查是否提取到键
    if (!fs.existsSync(CONFIG.EXTRACTED_KEYS_FILE)) {
      throw new Error('提取键值对失败，未生成输出文件');
    }
    
    const keyData = JSON.parse(fs.readFileSync(CONFIG.EXTRACTED_KEYS_FILE, 'utf8'));
    if (keyData.keys.length === 0) {
      console.log('警告: 未找到需要国际化的文本');
      return;
    }
    
    console.log(`提取到 ${keyData.keys.length} 个键`);
    
    // 步骤2: 为组件添加国际化支持
    console.log('\n步骤2: 为组件添加国际化支持...');
    await execCommand('node', [CONFIG.SCRIPTS.SETUP, targetDir]);
    
    // 步骤3: 替换硬编码文本
    console.log('\n步骤3: 替换硬编码文本...');
    await execCommand('node', [CONFIG.SCRIPTS.REPLACE, CONFIG.EXTRACTED_KEYS_FILE, targetDir]);
    
    console.log('\n国际化流程完成!');
    console.log(`- 提取的键值对保存在: ${CONFIG.EXTRACTED_KEYS_FILE}`);
    console.log(`- 所有组件已设置国际化支持并替换了硬编码文本`);
    console.log(`- 语言包文件需要手动创建或使用现成的`);
    
  } catch (error) {
    console.error('\n国际化流程失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}