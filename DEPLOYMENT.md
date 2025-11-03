# Blockscout 前端项目部署文档

## 项目概述

Blockscout 前端是一个基于 Next.js 的区块链浏览器前端应用，用于浏览和交互区块链数据。

## 技术栈

### 核心框架
- **Next.js**: React 框架，用于构建服务端渲染的 Web 应用
- **React**: JavaScript UI 库
- **TypeScript**: JavaScript 的超集，提供类型安全

### UI 组件库
- **Chakra UI**: 组件库，用于构建用户界面
- **Emotion**: CSS-in-JS 库，用于样式处理

### 状态管理
- **TanStack Query (React Query)**: 服务端状态管理
- **React Context**: 应用状态管理

### 数据可视化
- **D3.js**: 数据可视化库
- **SVG**: 矢量图形渲染

### 区块链集成
- **viem**: 以太坊 JavaScript 库
- **wagmi**: 以太坊 React Hooks 库
- **Reown AppKit**: 钱包连接库

### 工具和实用库
- **GraphQL**: API 查询语言
- **Rollbar**: 错误监控
- **Mixpanel**: 用户行为分析
- **GrowthBook**: 功能标志和 A/B 测试

## 开发工具

### 包管理
- **Yarn**: 包管理器 (版本 4.10.3)
- **Corepack**: Node.js 内置的包管理器管理工具

### 构建工具
- **Webpack**: 模块打包工具
- **ESBuild**: JavaScript 打包和压缩工具
- **Babel**: JavaScript 编译器

### 代码质量
- **ESLint**: JavaScript/TypeScript 代码检查工具
- **Prettier**: 代码格式化工具
- **Husky**: Git 钩子工具
- **lint-staged**: Git 暂存区文件检查工具

### 测试工具
- **Jest**: JavaScript 测试框架
- **Playwright**: 端到端测试框架
- **React Testing Library**: React 组件测试库

### 类型检查
- **TypeScript**: 静态类型检查器

## 部署环境

### 运行时环境
- **Node.js**: JavaScript 运行时 (版本 22.11.0)
- **Docker**: 容器化平台

### 构建环境
- **Alpine Linux**: 轻量级 Linux 发行版（用于 Docker 镜像）
- **Python**: 构建依赖 (版本 3)
- **Make**: 构建工具
- **GCC**: C 编译器 (用于原生模块构建)

## 构建流程

### 1. 依赖安装阶段
```bash
# 安装项目依赖
yarn install

# 安装各工具依赖
cd deploy/tools/feature-reporter && yarn install
cd deploy/tools/envs-validator && yarn install
# ... 其他工具依赖安装
```

### 2. 构建阶段
```bash
# 构建 SVG 精灵图
./deploy/scripts/build_sprite.sh

# 收集环境变量
./deploy/scripts/collect_envs.sh ./docs/ENVS.md

# Next.js 构建
yarn build
```

### 3. 工具构建
```bash
# 构建各工具
cd deploy/tools/feature-reporter && yarn build
cd deploy/tools/envs-validator && yarn build
# ... 其他工具构建
```

## 部署流程

### Docker 部署（推荐）

#### 1. 构建 Docker 镜像
```bash
# 使用标准构建脚本
yarn build:docker

# 或直接使用 Docker 命令
docker build -t blockscout-frontend:local .
```

#### 2. 运行 Docker 容器
```bash
# 使用本地镜像运行
yarn start:docker:local

# 或直接使用 Docker 命令
docker run -p 3000:3000 --env-file .env.local blockscout-frontend:local
```

### 环境变量配置

应用通过环境变量进行配置，主要变量包括：
- `NEXT_PUBLIC_NETWORK_NAME`: 网络名称
- `NEXT_PUBLIC_NETWORK_ID`: 链 ID
- `NEXT_PUBLIC_API_HOST`: 后端 API 主机
- `NEXT_PUBLIC_API_PROTOCOL`: API 协议 (http/https)

完整环境变量列表请参考 `docs/ENVS.md` 文件。

### 入口点脚本

容器启动时会执行 `entrypoint.sh` 脚本，该脚本会：
1. 加载预设环境变量
2. 下载外部资产
3. 验证环境变量
4. 生成 favicon
5. 生成 OG 图片
6. 生成多链配置
7. 生成站点地图
8. 启动 Next.js 应用

## 监控和日志

### OpenTelemetry
支持 OpenTelemetry 分布式追踪和指标收集。

### Prometheus
支持通过 Prometheus 收集应用指标。

### 日志
使用 Pino 作为日志记录器，支持结构化日志输出。

## 性能优化

### 静态资源优化
- 使用 Next.js 图像优化
- SVG 精灵图减少 HTTP 请求
- 资源压缩和缓存

### 代码分割
- Next.js 自动代码分割
- 动态导入减少初始包大小

### 缓存策略
- HTTP 缓存头设置
- 浏览器缓存优化
- 服务端渲染缓存

## 安全性

### 内容安全策略 (CSP)
通过中间件实现严格的内容安全策略。

### 环境变量安全
- 仅将必要的环境变量暴露给客户端
- 敏感信息不在客户端暴露

### 依赖安全
- 定期更新依赖
- 使用 yarn audit 检查安全漏洞

## 故障排除

### 常见问题

1. **Docker 构建失败**
   - 检查 Docker daemon 是否运行
   - 确认用户具有 Docker 权限
   - 检查网络连接和依赖下载

2. **环境变量验证失败**
   - 检查必需的环境变量是否设置
   - 确认环境变量格式正确
   - 查看验证日志获取详细信息

3. **应用启动失败**
   - 检查日志输出
   - 确认所有依赖服务可访问
   - 验证配置文件正确性

### 日志查看
```bash
# 查看容器日志
docker logs <container_id>
```

## 扩展和定制

### 主题定制
通过 Chakra UI 主题系统进行 UI 定制。

### 功能开关
使用 GrowthBook 进行功能标志管理。

### 多链支持
通过配置支持多链环境。

## 维护

### 依赖更新
定期运行 `yarn upgrade` 更新依赖。

### 安全扫描
使用 `yarn audit` 进行安全漏洞扫描。

### 性能监控
定期检查应用性能指标和用户反馈。