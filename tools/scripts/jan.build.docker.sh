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

docker build -f Dockerfile_Jan \
  --progress=plain \
  --no-cache \
  --build-arg GIT_COMMIT_SHA=$GIT_COMMIT_SHA \
  --build-arg GIT_TAG=$GIT_TAG \
  -t blockscout-frontend:local ./ 2>&1 | tee -a $LOG_FILE

BUILD_RESULT=${PIPESTATUS[0]}

if [ $BUILD_RESULT -eq 0 ]; then
  echo "Docker build completed successfully at $(date)" | tee -a $LOG_FILE
  
  # 创建 docker_build_file 目录
  mkdir -p ./docker_build_file
  
  # 导出 Docker 镜像为 tar 文件
  TAR_FILE="./docker_build_file/blockscout-frontend-$(date +"%Y%m%d%H%M%S").tar"
  echo "Exporting Docker image to $TAR_FILE" | tee -a $LOG_FILE
  docker save -o "$TAR_FILE" blockscout-frontend:local 2>&1 | tee -a $LOG_FILE
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
