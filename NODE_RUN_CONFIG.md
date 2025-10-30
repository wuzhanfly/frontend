# Node.js 运行配置说明

本文档旨在说明如何为 Blockscout 前端项目配置 Node.js 运行环境，特别是与本地开发相关的配置。

## 1. 环境变量配置

项目主要通过环境变量进行配置。在本地运行时，推荐使用 `.env.local` 文件来管理这些变量。

### 1.1 `.env.local` 文件

- **位置**: 项目根目录
- **作用**: 存放本地开发所需的环境变量，此文件应被 `.gitignore` 排除，以防止敏感信息被提交到代码库。
- **示例**: 项目中已提供 `.env.local.example` 文件，可作为创建 `.env.local` 的模板。

### 1.2 关键配置项

以下是一些在本地运行时常见的关键配置项：

- **`NEXT_PUBLIC_APP_HOST`**: 应用监听的主机地址 (例如 `localhost` 或 `192.168.0.135`)。
- **`NEXT_PUBLIC_APP_PORT`**: 应用监听的端口 (例如 `3000`)。
- **`NEXT_PUBLIC_API_HOST`**: 后端 Blockscout API 的主机地址。
- **`NEXT_PUBLIC_API_PORT`**: 后端 Blockscout API 的端口 (如果非标准端口)。
- **`NEXT_PUBLIC_NETWORK_RPC_URL`**: 连接区块链节点的 RPC URL。
- **`NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_API_HOST`**: 多链聚合器 API 的主机地址。**注意**：在本地开发环境中，如果不需要多链功能，应将其设置为空 (`NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_API_HOST=`) 以避免与 Node.js 特定模块 (如 `fs`) 相关的错误。

## 2. 解决特定问题的配置

### 2.1 "Module not found: Can't resolve 'fs'" 错误 与 "Cannot read properties of undefined (reading 'map')" 错误

这两个错误通常与多链（Multichain）特别是 Optimism Superchain 功能的配置和代码加载有关。

1.  **确保功能禁用**:
    在 `.env.local` 中设置 `NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_API_HOST=`。这是防止加载多链相关代码的最简单方法。
    **此外，还应在 `.env.local` 中显式设置 `NEXT_PUBLIC_OP_SUPERCHAIN_ENABLED=false`。** 这能确保在构建（Build）阶段，打包工具就能确定相关功能被禁用，从而进行正确的代码优化（如 Tree Shaking），避免分析和打包那些仅在服务器端运行或特定功能启用时才需要的代码（例如包含 `fs` 模块的代码）。
2.  **代码层面的修复**:
    `configs/multichain/index.ts` 文件已被修改，以解决此问题：
    *   函数现在是同步的，以兼容其调用点。
    *   添加了早期返回逻辑：如果 `opSuperchain` 功能未在 `configs/app/features/opSuperchain.ts` 中启用（这通常由 `NEXT_PUBLIC_OP_SUPERCHAIN_ENABLED` 环境变量控制），函数将直接返回 `undefined`，从而避免加载任何与 Node.js `fs` 模块相关的代码。
    *   在确实需要加载服务器端配置时，使用 `require` 进行延迟加载，并包裹在 `try...catch` 中以处理加载失败的情况。
    *   这确保了在不需要多链功能的场景下（如你的 zkStack BNB Chain 配置），不会尝试加载或解析包含 Node.js 特定模块的文件，从根本上杜绝了这两个错误。

## 3. 启动应用

在完成 `.env.local` 配置后，可以通过以下命令启动开发服务器：

```bash
# 安装依赖 (如果尚未安装)
yarn install

# 启动开发服务器
yarn dev
# 或者，如果需要指定不同的端口
# yarn dev -p 3001
```

服务器启动后，通常可以在 `http://localhost:3000` (或你在 `.env.local` 中配置的其他地址和端口) 访问应用。

## 4. 注意事项

- 确保后端 Blockscout API 服务在 `NEXT_PUBLIC_API_HOST` 指定的地址和端口上可访问。
- 确保配置的 `NEXT_PUBLIC_NETWORK_RPC_URL` 是有效的，并且可以访问目标区块链网络。
- 如果遇到网络连接问题 (如 `ECONNRESET`)，请检查你的网络连接、防火墙设置或代理配置。