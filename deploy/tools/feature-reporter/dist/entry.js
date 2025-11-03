/* eslint-disable no-console */
// 简化版本的feature reporter，不依赖TypeScript编译
console.log();
console.log(`📋 Here is the list of the features enabled for the running instance. 
To adjust their configuration, please refer to the documentation - https://github.com/blockscout/frontend/blob/main/docs/ENVS.md#app-features
`);
// 由于我们无法在构建时访问完整的配置，我们只显示一个通用消息
console.log('    [ ] Features configuration will be available at runtime');
console.log();
