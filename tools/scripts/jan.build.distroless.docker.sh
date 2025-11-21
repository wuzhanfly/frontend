#!/bin/bash

# remove previous assets
rm -rf ./public/assets/configs
rm -rf ./public/assets/multichain
rm -rf ./public/assets/envs.js

# 创建 build_info 目录
mkdir -p ./build_info

# 获取当前日期时间作为日志文件名
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="./build_info/build_$TIMESTAMP.log"

# 获取 git 信息
GIT_COMMIT_SHA=$(git rev-parse --short HEAD)
GIT_TAG=$(git describe --tags --abbrev=0)

echo "Starting Docker build at $(date)" | tee $LOG_FILE
echo "Git commit SHA: $GIT_COMMIT_SHA" | tee -a $LOG_FILE
echo "Git tag: $GIT_TAG" | tee -a $LOG_FILE

# 从 .env.local 文件解析环境变量并传递给 docker build
ENV_ARGS=""
if [ -f .env.local ]; then
    echo "Loading environment variables from .env.local"
    # 解析 .env.local 文件，跳过注释行并为每个变量设置构建参数
    while IFS= read -r line; do
        # 跳过注释和空行
        if [[ $line =~ ^# ]] || [[ -z $line ]]; then
            continue
        fi
        
        # 检查是否包含等号
        if [[ $line == *"="* ]]; then
            key=$(echo $line | cut -d '=' -f 1)
            value=$(echo $line | cut -d '=' -f 2-)
            # 使用单引号包围值以处理特殊字符
            ENV_ARGS="$ENV_ARGS --build-arg $key='$value'"
        fi
    done < .env.local
fi

# 构建 Docker 镜像，传递必要的构建参数
# 使用数组来安全地构建命令
build_cmd=(docker build -f Dockerfile_distroless_minimal)
build_cmd+=(--progress=plain --no-cache)
build_cmd+=(--build-arg GIT_COMMIT_SHA="$GIT_COMMIT_SHA")
build_cmd+=(--build-arg GIT_TAG="$GIT_TAG")

# 添加从 .env.local 解析的环境变量
while IFS= read -r line; do
    if [[ $line =~ ^# ]] || [[ -z $line ]]; then
        continue
    fi
    
    if [[ $line == *"="* ]]; then
        key=$(echo $line | cut -d '=' -f 1)
        value=$(echo $line | cut -d '=' -f 2-)
        build_cmd+=(--build-arg "$key=$value")
    fi
done < .env.local

build_cmd+=(-t blockscout-frontend:distroless ./)

# 执行构建命令并输出到日志
"${build_cmd[@]}" 2>&1 | tee -a $LOG_FILE


BUILD_RESULT=${PIPESTATUS[0]}

if [ $BUILD_RESULT -eq 0 ]; then
  echo "Docker build completed successfully at $(date)" | tee -a $LOG_FILE
  
  # 创建 docker_build_file 目录
  mkdir -p ./docker_build_file
  
  # 导出 Docker 镜像为 tar 文件
  TAR_FILE="./docker_build_file/blockscout-frontend-distroless-$(date +"%Y%m%d%H%M%S").tar"
  echo "Exporting Docker image to $TAR_FILE" | tee -a $LOG_FILE
  docker save -o "$TAR_FILE" blockscout-frontend:distroless 2>&1 | tee -a $LOG_FILE
  EXPORT_RESULT=${PIPESTATUS[0]}
  
  if [ $EXPORT_RESULT -eq 0 ]; then
    echo "Docker image exported successfully to $TAR_FILE" | tee -a $LOG_FILE
    
    # 压缩 tar 文件以减小大小
    echo "Compressing $TAR_FILE" | tee -a $LOG_FILE
    gzip "$TAR_FILE" 2>&1 | tee -a $LOG_FILE
    GZIP_RESULT=${PIPESTATUS[0]}
    
    if [ $GZIP_RESULT -eq 0 ]; then
      echo "Docker image compressed successfully to ${TAR_FILE}.gz" | tee -a $LOG_FILE
    else
      echo "Failed to compress Docker image" | tee -a $LOG_FILE
    fi
  else
    echo "Failed to export Docker image" | tee -a $LOG_FILE
  fi
else
  echo "Docker build failed at $(date) with exit code $BUILD_RESULT" | tee -a $LOG_FILE
fi

exit $BUILD_RESULT