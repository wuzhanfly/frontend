# Blockscout 前端 Docker 部署文档 (基于 Dockerfile_Jan)

## 项目概述

Blockscout 前端是一个基于 Next.js 的区块链浏览器前端应用，用于浏览和交互区块链数据。本部署文档详细说明基于 Dockerfile_Jan 构建和部署的完整流程。

## 技术栈分析

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

## 构建环境要求

### 系统要求
- Docker 20.10 或更高版本
- Docker Buildx (Docker 19.03+ 默认包含)
- 确保有足够的磁盘空间 (至少 5GB 可用)

### 硬件要求
- 至少 4GB RAM（建议 8GB 或更多）
- 至少 2 个 CPU 核心

## 构建阶段分析

### 阶段 1: Dependencies (deps)

#### 1.1 基础镜像
- **工具**: Docker
- **命令**: `FROM node:22.11.0-alpine AS deps`
- **说明**: 使用 Node.js 22.11.0 的 Alpine Linux 镜像作为基础镜像，创建名为 deps 的构建阶段

#### 1.2 系统依赖安装
- **工具**: Alpine Linux 包管理器 (apk)
- **命令**: `RUN apk add --no-cache libc6-compat python3 make g++ bash git`
- **说明**: 安装构建过程中需要的系统依赖
  - `libc6-compat`: 兼容库
  - `python3`: Python 3 解释器
  - `make`: 构建工具
  - `g++`: C++ 编译器
  - `bash`: Shell
  - `git`: 版本控制

#### 1.3 Node.js 工具配置
- **工具**: Corepack (Node.js 内置包管理器管理工具)
- **命令**: 
  ```
  RUN corepack enable && corepack prepare yarn@4.10.3 --activate
  ```
- **说明**: 启用 Corepack 并准备 Yarn 4.10.3

#### 1.4 Yarn 配置
- **工具**: Yarn 4.10.3
- **命令**:
  ```
  RUN echo "nodeLinker: node-modules" > .yarnrc.yml
  RUN echo "npmRegistryServer: \"https://registry.npmmirror.com\"" >> .yarnrc.yml
  RUN echo "enableTelemetry: false" >> .yarnrc.yml
  RUN echo "enableImmutableInstalls: true" >> .yarnrc.yml
  RUN echo "npmScopes:" >> .yarnrc.yml
  RUN echo "  vanilla-extract:" >> .yarnrc.yml
  RUN echo "    npmRegistryServer: \"https://registry.yarnpkg.com\"" >> .yarnrc.yml
  ```
- **说明**: 配置 Yarn 使用国内镜像源以加速依赖下载

#### 1.5 应用依赖安装
- **工具**: Yarn, Node.js
- **命令**:
  ```
  COPY package.json yarn.lock tsconfig.json ./
  COPY types ./types
  COPY lib ./lib
  COPY configs/app ./configs/app
  COPY toolkit/theme ./toolkit/theme
  COPY toolkit/utils ./toolkit/utils
  COPY toolkit/components/forms/validators/url.ts ./toolkit/components/forms/validators/url.ts
  RUN yarn install --network-timeout 200000
  ```
- **说明**: 复制项目文件并安装依赖

#### 1.6 工具依赖安装

##### 1.6.1 Feature Reporter 依赖
- **工具**: Yarn, Bash
- **命令**:
  ```
  WORKDIR /feature-reporter
  COPY ./deploy/tools/feature-reporter/package.json ./
  RUN if [ -f ./deploy/tools/feature-reporter/.yarnrc.yml ]; then cp ./deploy/tools/feature-reporter/.yarnrc.yml ./; else echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN if [ ! -f ./deploy/tools/feature-reporter/yarn.lock ]; then touch yarn.lock; fi
  RUN echo "Installing dependencies for feature-reporter"
  RUN yarn install --network-timeout 200000
  RUN echo "Installation completed for feature-reporter"
  RUN ls -la
  ```
- **说明**: 安装 Feature Reporter 工具的依赖

##### 1.6.2 环境变量验证器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /envs-validator
  COPY ./deploy/tools/envs-validator/package.json ./deploy/tools/envs-validator/yarn.lock ./
  RUN if [ ! -f ./deploy/tools/envs-validator/yarn.lock ]; then touch yarn.lock; fi
  RUN if [ ! -f ./.yarnrc.yml ]; then echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN yarn install --network-timeout 100000
  ```
- **说明**: 安装环境变量验证器的依赖

##### 1.6.3 Favicon 生成器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /favicon-generator
  COPY ./deploy/tools/favicon-generator/package.json ./deploy/tools/favicon-generator/yarn.lock ./
  RUN if [ ! -f ./deploy/tools/favicon-generator/yarn.lock ]; then touch yarn.lock; fi
  RUN if [ ! -f ./.yarnrc.yml ]; then echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN yarn install --network-timeout 100000
  ```
- **说明**: 安装 Favicon 生成器的依赖

##### 1.6.4 站点地图生成器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /sitemap-generator
  COPY ./deploy/tools/sitemap-generator/package.json ./deploy/tools/sitemap-generator/yarn.lock ./
  RUN if [ ! -f ./deploy/tools/sitemap-generator/yarn.lock ]; then touch yarn.lock; fi
  RUN if [ ! -f ./.yarnrc.yml ]; then echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN yarn install --network-timeout 100000
  ```
- **说明**: 安装站点地图生成器的依赖

##### 1.6.5 多链配置生成器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /multichain-config-generator
  COPY ./deploy/tools/multichain-config-generator/package.json ./deploy/tools/multichain-config-generator/yarn.lock ./
  RUN if [ -f ./deploy/tools/multichain-config-generator/.yarnrc.yml ]; then cp ./deploy/tools/multichain-config-generator/.yarnrc.yml ./; else echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN if [ ! -f ./deploy/tools/multichain-config-generator/yarn.lock ]; then touch yarn.lock; fi
  RUN echo "Installing dependencies for multichain-config-generator"
  RUN yarn install --frozen-lockfile --network-timeout 100000
  RUN echo "Installation completed for multichain-config-generator"
  RUN ls -la
  ```
- **说明**: 安装多链配置生成器的依赖

##### 1.6.6 Essential DApps 链配置生成器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /essential-dapps-chains-config-generator
  COPY ./deploy/tools/essential-dapps-chains-config-generator/package.json ./deploy/tools/essential-dapps-chains-config-generator/yarn.lock ./
  RUN if [ -f ./deploy/tools/essential-dapps-chains-config-generator/.yarnrc.yml ]; then cp ./deploy/tools/essential-dapps-chains-config-generator/.yarnrc.yml ./; else echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN if [ ! -f ./deploy/tools/essential-dapps-chains-config-generator/yarn.lock ]; then touch yarn.lock; fi
  RUN echo "Installing dependencies for essential-dapps-chains-config-generator"
  RUN yarn install --frozen-lockfile --network-timeout 100000
  RUN echo "Installation completed for essential-dapps-chains-config-generator"
  RUN ls -la
  ```
- **说明**: 安装 Essential DApps 链配置生成器的依赖

##### 1.6.7 llms.txt 生成器依赖
- **工具**: Yarn
- **命令**:
  ```
  WORKDIR /llms-txt-generator
  COPY ./deploy/tools/llms-txt-generator/package.json ./deploy/tools/llms-txt-generator/yarn.lock ./
  RUN if [ -f ./deploy/tools/llms-txt-generator/.yarnrc.yml ]; then cp ./deploy/tools/llms-txt-generator/.yarnrc.yml ./; else echo "nodeLinker: node-modules" > .yarnrc.yml; fi
  RUN if [ ! -f ./deploy/tools/llms-txt-generator/yarn.lock ]; then touch yarn.lock; fi
  RUN echo "Installing dependencies for llms-txt-generator"
  RUN yarn install --frozen-lockfile --network-timeout 100000
  RUN echo "Installation completed for llms-txt-generator"
  RUN ls -la
  ```
- **说明**: 安装 llms.txt 生成器的依赖

### 阶段 2: Build (builder)

#### 2.1 基础镜像
- **工具**: Docker
- **命令**: `FROM node:22.11.0-alpine AS builder`
- **说明**: 使用 Node.js 22.11.0 的 Alpine Linux 镜像作为基础镜像，创建名为 builder 的构建阶段

#### 2.2 构建依赖安装
- **工具**: Alpine Linux 包管理器 (apk)
- **命令**: `RUN apk add --no-cache --upgrade libc6-compat bash jq`
- **说明**: 安装构建过程中需要的系统依赖，包括 jq (JSON 处理工具)

#### 2.3 Node.js 工具配置
- **工具**: Corepack
- **命令**: `RUN corepack enable && corepack prepare yarn@4.10.3 --activate`
- **说明**: 启用 Corepack 并准备 Yarn 4.10.3

#### 2.4 构建参数设置
- **工具**: Docker ARG/ENV
- **命令**:
  ```
  ARG GIT_COMMIT_SHA
  ENV NEXT_PUBLIC_GIT_COMMIT_SHA=$GIT_COMMIT_SHA
  ARG GIT_TAG
  ENV NEXT_PUBLIC_GIT_TAG=$GIT_TAG
  ARG NEXT_OPEN_TELEMETRY_ENABLED
  ENV NEXT_OPEN_TELEMETRY_ENABLED=$NEXT_OPEN_TELEMETRY_ENABLED
  ENV NODE_ENV=production
  ```
- **说明**: 设置构建参数和环境变量

#### 2.5 应用构建
- **工具**: Next.js, Node.js, Yarn
- **命令**:
  ```
  WORKDIR /app
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  RUN set -a
  RUN source ./deploy/scripts/build_sprite.sh
  RUN ./deploy/scripts/collect_envs.sh ./docs/ENVS.md
  RUN set +a
  ENV NODE_OPTIONS="--max-old-space-size=4096"
  RUN find ./deploy/tools/feature-reporter -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
  RUN NEXT_LINT=false yarn build
  ```
- **说明**: 
  - 复制依赖和源代码
  - 构建 SVG 精灵图
  - 收集环境变量
  - 设置 Node.js 内存选项
  - 清理 feature-reporter 的构建目录
  - 执行 Next.js 构建

#### 2.6 工具构建

##### 2.6.1 Feature Reporter 构建
- **工具**: Yarn
- **命令**:
  ```
  COPY --from=deps /feature-reporter/node_modules ./deploy/tools/feature-reporter/node_modules
  RUN cd ./deploy/tools/feature-reporter && if [ ! -f yarn.lock ]; then touch yarn.lock; fi
  RUN cd ./deploy/tools/feature-reporter && yarn compile_config
  RUN cd ./deploy/tools/feature-reporter && yarn build
  ```
- **说明**: 复制依赖并构建 Feature Reporter

##### 2.6.2 环境变量验证器构建
- **工具**: Yarn
- **命令**:
  ```
  COPY --from=deps /envs-validator/node_modules ./deploy/tools/envs-validator/node_modules
  RUN cd ./deploy/tools/envs-validator && if [ ! -f yarn.lock ]; then touch yarn.lock; fi
  RUN cd ./deploy/tools/envs-validator && yarn build
  ```
- **说明**: 复制依赖并构建环境变量验证器

##### 2.6.3 多链配置生成器构建
- **工具**: Yarn
- **命令**:
  ```
  COPY --from=deps /multichain-config-generator/node_modules ./deploy/tools/multichain-config-generator/node_modules
  RUN cd ./deploy/tools/multichain-config-generator && if [ ! -f yarn.lock ]; then touch yarn.lock; fi
  RUN cd ./deploy/tools/multichain-config-generator && yarn build
  ```
- **说明**: 复制依赖并构建多链配置生成器

##### 2.6.4 Essential DApps 链配置生成器构建
- **工具**: Yarn
- **命令**:
  ```
  COPY --from=deps /essential-dapps-chains-config-generator/node_modules ./deploy/tools/essential-dapps-chains-config-generator/node_modules
  RUN cd ./deploy/tools/essential-dapps-chains-config-generator && if [ ! -f yarn.lock ]; then touch yarn.lock; fi
  RUN cd ./deploy/tools/essential-dapps-chains-config-generator && yarn build
  ```
- **说明**: 复制依赖并构建 Essential DApps 链配置生成器

##### 2.6.5 llms.txt 生成器构建
- **工具**: Yarn
- **命令**:
  ```
  COPY --from=deps /llms-txt-generator/node_modules ./deploy/tools/llms-txt-generator/node_modules
  RUN cd ./deploy/tools/llms-txt-generator && if [ ! -f yarn.lock ]; then touch yarn.lock; fi
  RUN cd ./deploy/tools/llms-txt-generator && yarn build
  ```
- **说明**: 复制依赖并构建 llms.txt 生成器

### 阶段 3: Run (runner)

#### 3.1 基础镜像
- **工具**: Docker
- **命令**: `FROM node:22.11.0-alpine AS runner`
- **说明**: 使用 Node.js 22.11.0 的 Alpine Linux 镜像作为基础镜像，创建名为 runner 的运行阶段

#### 3.2 运行时依赖安装
- **工具**: Alpine Linux 包管理器 (apk)
- **命令**: `RUN apk add --no-cache --upgrade bash curl jq unzip`
- **说明**: 安装运行时需要的系统依赖

#### 3.3 用户和权限设置
- **工具**: Linux 用户管理
- **命令**:
  ```
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs
  RUN mkdir .next
  RUN chown nextjs:nodejs .next
  ```
- **说明**: 创建 Node.js 用户和组，设置权限

#### 3.4 应用文件复制
- **工具**: Docker COPY
- **命令**:
  ```
  COPY --from=builder /app/next.config.js ./
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/package.json ./package.json
  ```
- **说明**: 复制 Next.js 配置文件、公共文件和包文件

#### 3.5 工具文件复制
- **工具**: Docker COPY
- **命令**:
  ```
  COPY --from=builder /app/deploy/tools/envs-validator/index.js ./envs-validator.js
  COPY --from=builder /app/deploy/tools/feature-reporter/dist ./deploy/tools/feature-reporter/dist
  COPY --from=builder /app/deploy/tools/multichain-config-generator/dist ./deploy/tools/multichain-config-generator/dist
  COPY --from=builder /app/deploy/tools/llms-txt-generator/dist ./deploy/tools/llms-txt-generator/dist
  COPY --from=builder /app/deploy/tools/essential-dapps-chains-config-generator/dist ./deploy/tools/essential-dapps-chains-config-generator/dist
  ```
- **说明**: 复制各工具的构建输出文件

#### 3.6 脚本文件复制
- **工具**: Docker COPY
- **命令**:
  ```
  COPY --chmod=755 ./deploy/scripts/entrypoint.sh .
  COPY --chmod=755 ./deploy/scripts/validate_envs.sh .
  COPY --chmod=755 ./deploy/scripts/make_envs_script.sh .
  COPY --chmod=755 ./deploy/scripts/download_assets.sh .
  COPY ./deploy/scripts/og_image_generator.js .
  COPY --chmod=755 ./deploy/scripts/favicon_generator.sh .
  COPY --from=builder /app/deploy/tools/favicon-generator ./deploy/tools/favicon-generator
  RUN chmod -R 777 ./deploy/tools/favicon-generator
  RUN chmod -R 777 ./public
  COPY --chmod=755 ./deploy/scripts/sitemap_generator.sh .
  COPY --from=builder /app/deploy/tools/sitemap-generator ./deploy/tools/sitemap-generator
  ```
- **说明**: 复制部署脚本和设置权限

#### 3.7 环境文件复制
- **工具**: Docker COPY
- **命令**:
  ```
  COPY --from=builder /app/.env.registry .
  COPY --from=builder /app/.env .
  ```
- **说明**: 复制环境变量注册表和环境变量文件

#### 3.8 预设配置复制
- **工具**: Docker COPY
- **命令**:
  ```
  ARG ENVS_PRESET
  ENV ENVS_PRESET=$ENVS_PRESET
  COPY ./configs/envs ./configs/envs
  ```
- **说明**: 复制环境变量预设配置

#### 3.9 应用文件复制
- **工具**: Docker COPY
- **命令**:
  ```
  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  ```
- **说明**: 复制 Next.js 应用的静态文件和独立输出

#### 3.10 启动配置
- **工具**: Docker
- **命令**:
  ```
  ENTRYPOINT ["./entrypoint.sh"]
  USER nextjs
  EXPOSE 3000
  ENV PORT=3000
  CMD ["node", "server.js"]
  ```
- **说明**: 设置容器入口点、用户、端口暴露和启动命令

## 构建和部署命令

### 1. 构建 Docker 镜像
```bash
# 使用项目提供的构建脚本
./tools/scripts/jan.build.docker.sh

# 或直接使用 Docker 命令
docker build -f Dockerfile_Jan \
  --progress=plain \
  --no-cache \
  --build-arg GIT_COMMIT_SHA=$(git rev-parse --short HEAD) \
  --build-arg GIT_TAG=$(git describe --tags --abbrev=0) \
  -t blockscout-frontend:local ./
```

### 2. 运行容器
```bash
# 使用预配置的环境变量文件运行
docker run -p 3000:3000 --env-file .env.local blockscout-frontend:local

# 或使用环境变量
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_NETWORK_NAME="Your Network Name" \
  -e NEXT_PUBLIC_NETWORK_ID=12345 \
  -e NEXT_PUBLIC_API_HOST="your-api-host.com" \
  -e NEXT_PUBLIC_API_PROTOCOL="https" \
  blockscout-frontend:local

# 或在后台运行
docker run -d -p 3000:3000 \
  --name blockscout-frontend \
  --restart unless-stopped \
  --env-file .env.local \
  blockscout-frontend:local
```

### 3. 部署到生产环境
```bash
# 构建生产镜像
docker build -f Dockerfile_Jan \
  --build-arg GIT_COMMIT_SHA=$(git rev-parse --short HEAD) \
  --build-arg GIT_TAG=$(git describe --tags --abbrev=0) \
  -t your-registry/blockscout-frontend:latest .

# 推送镜像到仓库
docker push your-registry/blockscout-frontend:latest

# 在生产环境运行
docker run -d -p 3000:3000 \
  --name blockscout-frontend \
  --restart unless-stopped \
  --env-file /path/to/production.env \
  your-registry/blockscout-frontend:latest
```

### 4. 容器管理命令
```bash
# 查看运行中的容器
docker ps | grep blockscout-frontend

# 查看容器日志
docker logs blockscout-frontend

# 查看实时日志
docker logs -f blockscout-frontend

# 进入容器
docker exec -it blockscout-frontend sh

# 停止容器
docker stop blockscout-frontend

# 重启容器
docker restart blockscout-frontend

# 删除容器
docker rm blockscout-frontend
```

## 环境变量配置

### 必需环境变量
- `NEXT_PUBLIC_NETWORK_NAME`: 网络显示名称
- `NEXT_PUBLIC_NETWORK_ID`: 链 ID
- `NEXT_PUBLIC_API_HOST`: 后端 API 主机
- `NEXT_PUBLIC_API_PROTOCOL`: API 协议 (http/https)

### 可选环境变量
- `NEXT_PUBLIC_APP_HOST`: 应用主机
- `NEXT_PUBLIC_APP_PROTOCOL`: 应用协议
- `NEXT_PUBLIC_APP_PORT`: 应用端口
- `NEXT_PUBLIC_NETWORK_RPC_URL`: RPC URL
- `NEXT_PUBLIC_NETWORK_CURRENCY_NAME`: 代币名称
- `NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL`: 代币符号

### 功能开关环境变量
- `NEXT_PUBLIC_ROLLUP_TYPE`: Rollup 类型
- `NEXT_PUBLIC_IS_ACCOUNT_SUPPORTED`: 账户功能支持
- `NEXT_PUBLIC_GAS_TRACKER_ENABLED`: Gas 跟踪器启用
- `NEXT_PUBLIC_MARKETPLACE_ENABLED`: 市场功能启用

完整环境变量列表请参考 `docs/ENVS.md` 文件。

## 监控和日志

### 应用启动脚本
容器启动时会执行 `entrypoint.sh` 脚本，该脚本会：
1. 加载预设环境变量
2. 下载外部资产
3. 验证环境变量
4. 生成 favicon
5. 生成 OG 图片
6. 生成多链配置
7. 生成站点地图
8. 生成 llms.txt 文件
9. 启动 Next.js 应用

### 日志查看
```bash
# 查看容器日志
docker logs <container_id>

# 查看实时日志
docker logs -f <container_id>

# 查看最近的日志
docker logs --tail 100 <container_id>
```

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
   - 确认构建上下文包含所有必需文件

2. **环境变量验证失败**
   - 检查必需的环境变量是否设置
   - 确认环境变量格式正确
   - 查看验证日志获取详细信息
   - 可以设置 `SKIP_ENVS_VALIDATION=true` 跳过验证

3. **应用启动失败**
   - 检查日志输出
   - 确认所有依赖服务可访问
   - 验证配置文件正确性

4. **多链功能配置问题**
   - 确认 `NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_API_HOST` 设置正确
   - 检查多链配置生成器是否正常工作

5. **Superchain 功能配置问题**
   - 确认 `NEXT_PUBLIC_OP_SUPERCHAIN_ENABLED` 设置正确

### 日志查看
```bash
# 查看容器日志
docker logs <container_id>

# 查看应用日志
docker exec -it <container_id> cat /app/logs/app.log
```

## 维护

### 依赖更新
定期运行 `yarn upgrade` 更新依赖。

### 安全扫描
使用 `yarn audit` 进行安全漏洞扫描。

### 性能监控
定期检查应用性能指标和用户反馈。

### 镜像清理
```bash
# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源
docker system prune
```

## 用到的工具总结

### 系统工具
- **Docker**: 容器化平台
- **Alpine Linux**: 轻量级 Linux 发行版
- **apk**: Alpine Linux 包管理器
- **bash**: Shell 脚本解释器
- **curl**: HTTP 客户端
- **jq**: JSON 处理工具
- **unzip**: 文件解压工具
- **git**: 版本控制系统
- **make**: 构建工具
- **g++**: C++ 编译器
- **python3**: Python 解释器

### Node.js 生态工具
- **Node.js**: JavaScript 运行时 (版本 22.11.0)
- **Yarn**: 包管理器 (版本 4.10.3)
- **Corepack**: Node.js 包管理器管理工具
- **Next.js**: React 框架
- **TypeScript**: JavaScript 超集

### 构建工具
- **Webpack**: 模块打包工具
- **esbuild**: JavaScript 打包和压缩工具
- **TSC**: TypeScript 编译器

### 部署脚本工具
- **entrypoint.sh**: 容器启动入口点
- **validate_envs.sh**: 环境变量验证脚本
- **make_envs_script.sh**: 环境变量脚本生成器
- **download_assets.sh**: 外部资源下载脚本
- **build_sprite.sh**: SVG 精灵图构建脚本
- **collect_envs.sh**: 环境变量收集脚本
- **favicon_generator.sh**: Favicon 生成脚本
- **sitemap_generator.sh**: 站点地图生成脚本
- **og_image_generator.js**: Open Graph 图片生成脚本