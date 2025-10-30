import type { MultichainConfig } from 'types/multichain';

import config from 'configs/app';
import { isBrowser } from 'toolkit/utils/isBrowser';

/**
 * 获取多链配置
 * @returns {MultichainConfig | undefined} 配置对象或 undefined
 * 
 * 注意：此函数现在是同步的。如果 opSuperchain 功能未启用或环境是浏览器，
 * 则直接返回 undefined，避免加载包含 Node.js 特定模块 (如 'fs') 的 config.nodejs.ts。
 * 这样可以防止在浏览器环境中或非 Superchain 网络上出现相关错误。
 */
const multichainConfig: () => MultichainConfig | undefined = () => {
  // 如果 opSuperchain 功能未启用，直接返回 undefined
  if (!config.features.opSuperchain.isEnabled) {
    return;
  }

  // 如果在浏览器环境，尝试从 window 对象获取配置
  if (isBrowser()) {
    return window.__multichainConfig;
  }

  // 仅在服务器端且 opSuperchain 功能启用时，才尝试加载 Node.js 特定配置
  // 但为了保持函数同步，我们在这里需要同步导入，这可能会导致 'fs' 模块问题
  // 因此，如果当前网络不是 Superchain (即 opSuperchain.isEnabled 为 false)，则不应执行到这里
  // 为了更彻底地解决 'fs' 问题，我们将依赖于环境变量来控制 multichain 功能的启用
  // 并在代码中确保非 Superchain 网络不执行到加载 config.nodejs.ts 的逻辑
  // 如果确实需要在服务器端加载，可以考虑使用 require，并捕获错误
  try {
    // 使用 require 以延迟加载，仅当确实需要时才加载
    // 但请注意，如果此文件在构建时被分析，仍可能触发 'fs' 错误
    // 最好的方法是确保 opSuperchain 功能被禁用时，此代码路径不被执行
    const configNodejsModule = require('configs/multichain/config.nodejs');
    return configNodejsModule.getValue();
  } catch (error) {
    // 如果加载失败（例如，在不支持 'fs' 的环境或配置文件不存在时），返回 undefined
    console.warn('Failed to load multichain config from file:', error);
    return;
  }
};

export default multichainConfig;
