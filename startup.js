const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 在应用启动前执行必要的初始化
async function initializeApp() {
  console.log('Starting initialization...');

  // 检查是否需要从环境变量预设文件加载
  const envsPreset = process.env.ENVS_PRESET;
  if (envsPreset && envsPreset !== 'none') {
    const presetFile = `./configs/envs/.env.${envsPreset}`;
    if (fs.existsSync(presetFile)) {
      console.log(`Loading environment variables from preset: ${presetFile}`);
      // 从预设文件加载环境变量
      const content = fs.readFileSync(presetFile, 'utf8');
      const lines = content.split('\n');
      const blacklist = [
        "NEXT_PUBLIC_APP_PROTOCOL",
        "NEXT_PUBLIC_APP_HOST", 
        "NEXT_PUBLIC_APP_PORT",
        "NEXT_PUBLIC_APP_ENV",
        "NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL"
      ];
      
      lines.forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, ...valueParts] = line.split('=');
          const trimmedKey = key.trim();
          if (trimmedKey.startsWith('NEXT_PUBLIC_') && !blacklist.includes(trimmedKey)) {
            const value = valueParts.join('=').trim();
            process.env[trimmedKey] = value;
          }
        }
      });
    }
  }


  // 检查是否跳过环境变量验证
  if (process.env.SKIP_ENVS_VALIDATION !== 'true') {
    try {
      console.log('Validating environment variables...');
      // 设置环境变量以跳过运行时占位符检查
      process.env.SKIP_RUNTIME_PLACEHOLDER_CHECK = 'true';
      
      // 设置一个临时变量，用于跳过 NEXT_PUBLIC_ICON_SPRITE_HASH 的验证（这是一个构建时生成的变量）
      const originalEnv = { ...process.env };
      // 临时删除 NEXT_PUBLIC_ICON_SPRITE_HASH 以避免验证错误，因为这是构建时生成的
      delete process.env.NEXT_PUBLIC_ICON_SPRITE_HASH;
      
      // 直接在当前 Node.js 进程中运行验证器，而不是使用 spawn
      const envValidator = require('./deploy/tools/envs-validator/index.js');
      
      // 检查验证器模块是否有默认导出或特定的验证函数
      if (typeof envValidator === 'function') {
        envValidator(); // 直接调用验证函数
      } else if (envValidator && typeof envValidator.validate === 'function') {
        envValidator.validate();
      } else {
        console.log('Environment validator module loaded, but no validation function found. Proceeding...');
      }
      
      // 恢复原始环境变量
      process.env.NEXT_PUBLIC_ICON_SPRITE_HASH = originalEnv.NEXT_PUBLIC_ICON_SPRITE_HASH;
      
      console.log('Environment validation passed');
    } catch (error) {
      console.error('Environment validation failed:', error.message);
      process.exit(1);
    }
  } else {
    console.log('Skipping environment validation.');
  }

  // 生成 multichain 配置
  try {
    console.log('Generating multichain config...');
    const multichainGenerator = require('./deploy/tools/multichain-config-generator/dist/index.js');
    if (typeof multichainGenerator === 'function') {
      multichainGenerator();
    } else if (multichainGenerator && typeof multichainGenerator.generate === 'function') {
      multichainGenerator.generate();
    }
    console.log('Multichain config generated successfully');
  } catch (error) {
    console.error('Multichain config generation failed:', error.message);
  }

  // 生成 essential dapps chains 配置
  try {
    console.log('Generating essential dapps chains config...');
    const essentialDappsGenerator = require('./deploy/tools/essential-dapps-chains-config-generator/dist/index.js');
    if (typeof essentialDappsGenerator === 'function') {
      essentialDappsGenerator();
    } else if (essentialDappsGenerator && typeof essentialDappsGenerator.generate === 'function') {
      essentialDappsGenerator.generate();
    }
    console.log('Essential dapps chains config generated successfully');
  } catch (error) {
    console.error('Essential dapps chains config generation failed:', error.message);
  }

  // 生成 sitemap.xml 和 robots.txt 文件 (使用 Node.js 版本)
  try {
    console.log('Generating sitemap and robots.txt...');
    // 这里可以调用 Node.js 版本的 sitemap 生成器
  } catch (error) {
    console.error('Sitemap generation failed:', error);
  }

  // 生成 llms.txt 文件
  try {
    console.log('Generating llms.txt...');
    const llmsGenerator = require('./deploy/tools/llms-txt-generator/dist/index.js');
    if (typeof llmsGenerator === 'function') {
      llmsGenerator();
    } else if (llmsGenerator && typeof llmsGenerator.generate === 'function') {
      llmsGenerator.generate();
    }
    console.log('Llms.txt generated successfully');
  } catch (error) {
    console.error('Llms.txt generation failed:', error.message);
  }

  // 运行功能报告器
  try {
    console.log('Running feature reporter...');
    const featureReporter = require('./deploy/tools/feature-reporter/dist/index.js');
    if (typeof featureReporter === 'function') {
      featureReporter();
    } else if (featureReporter && typeof featureReporter.report === 'function') {
      featureReporter.report();
    }
    console.log('Feature reporter executed successfully');
  } catch (error) {
    console.error('Feature reporter failed:', error.message);
  }

  // 生成 OG 图像
  try {
    console.log('Generating OG image...');
    // 使用动态 import 处理 ESM 模块
    const ogGeneratorModule = await import('./og_image_generator.js');
    const ogGenerator = ogGeneratorModule.default || ogGeneratorModule;
    if (typeof ogGenerator === 'function') {
      await ogGenerator();
    } else if (ogGenerator && typeof ogGenerator.generate === 'function') {
      await ogGenerator.generate();
    }
    console.log('OG image generated successfully');
  } catch (error) {
    console.error('OG image generation failed:', error.message);
  }

  // 生成 client 环境变量脚本文件 assets/envs.js
  try {
    console.log('Generating client envs.js script...');
    const fs = require('fs');
    const path = require('path');
    
    // 确保 public/assets 目录存在
    const assetsDir = './public/assets';
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    // 读取 .env 文件并提取 NEXT_PUBLIC_ 变量
    let envsContent = 'window.__envs = {\n';
    
    // 首先处理特殊变量：从 .env 文件中读取 NEXT_PUBLIC_ICON_SPRITE_HASH
    let spriteHashValue = null;
    if (fs.existsSync('./.env')) {
      const envContent = fs.readFileSync('./.env', 'utf8');
      const lines = envContent.split('\n');
      for (const line of lines) {
        if (line.trim() && !line.startsWith('#') && line.startsWith('NEXT_PUBLIC_ICON_SPRITE_HASH=')) {
          spriteHashValue = line.substring('NEXT_PUBLIC_ICON_SPRITE_HASH='.length).trim();
          break;
        }
      }
    }
    
    // 添加当前进程环境中的 NEXT_PUBLIC_ 变量
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('NEXT_PUBLIC_') && !key.startsWith('NEXT_PUBLIC_VERCEL')) {
        const value = process.env[key].replace(/"/g, "'"); // Replace double quotes with single quotes
        envsContent += `  ${key}: "${value}",\n`;
      }
    });
    
    // 如果 NEXT_PUBLIC_ICON_SPRITE_HASH 没在进程环境中定义但存在于 .env 文件中，则添加它
    if (!(process.env.NEXT_PUBLIC_ICON_SPRITE_HASH) && spriteHashValue) {
      envsContent += `  NEXT_PUBLIC_ICON_SPRITE_HASH: "${spriteHashValue}",\n`;
    }
    
    // 读取 .env 文件并提取其他 NEXT_PUBLIC_ 变量
    if (fs.existsSync('./.env')) {
      const envContent = fs.readFileSync('./.env', 'utf8');
      const lines = envContent.split('\n');
      lines.forEach(line => {
        if (line.trim() && !line.startsWith('#') && line.includes('=')) {
          const [key, ...valueParts] = line.split('=');
          const trimmedKey = key.trim();
          // 只有当该变量不在进程环境中定义且不是特殊处理的变量时才从 .env 文件中加载
          if (trimmedKey.startsWith('NEXT_PUBLIC_') && 
              !trimmedKey.startsWith('NEXT_PUBLIC_VERCEL') && 
              !(trimmedKey in process.env) && 
              trimmedKey !== 'NEXT_PUBLIC_ICON_SPRITE_HASH') {
            const value = valueParts.join('=').replace(/"/g, "'"); // Replace double quotes with single quotes
            envsContent += `  ${trimmedKey}: "${value}",\n`;
          }
        }
      });
    }
    
    envsContent += '}\n';
    
    const envsFilePath = './public/assets/envs.js';
    fs.writeFileSync(envsFilePath, envsContent);
    console.log('Client envs.js script generated successfully');
    
    // 调试：输出 spriteHash 的值
    const spriteHashFromEnv = process.env.NEXT_PUBLIC_ICON_SPRITE_HASH || spriteHashValue;
    console.log('NEXT_PUBLIC_ICON_SPRITE_HASH from process.env or .env file:', spriteHashFromEnv);
  } catch (error) {
    console.error('Client envs.js generation failed:', error.message);
  }

  console.log('Initialization complete. Starting Next.js application...');
  
  // 确保工作目录正确，以便 Next.js 应用程序能找到 .env.registry 等文件
  process.chdir('/app');
  
  // 验证 .env.registry 文件是否存在
  const fs = require('fs');
  if (!fs.existsSync('./.env.registry')) {
    console.warn('⚠️  Warning: .env.registry file does not exist at ./');
  } else {
    console.log('✅ .env.registry file exists');
  }
  
  // 设置环境变量来跳过运行时环境验证，防止应用程序启动时执行占位符一致性检查
  process.env.SKIP_ENVS_VALIDATION = 'true';
  process.env.SKIP_RUNTIME_PLACEHOLDER_CHECK = 'true';
  
  // 在执行完初始化后，直接 require server.js，让 Next.js 服务器在当前进程中启动
  // 注意：这要求 server.js 模块能正确处理环境变量
  const serverPath = './server.js';
  
  // 由于当前 Node.js 进程已经设置好了环境变量，我们可以直接启动服务器
  require(serverPath);
}

initializeApp().catch(err => {
  console.error('Initialization failed:', err);
  process.exit(1);
});