# 国际化工作流程与文档生成格式

## 工作流程
1. 查看当前已完成的模块
2. 识别剩余需要处理的模块
3. 按照字母顺序处理剩余模块的国际化
4. 为每个模块创建国际化进度文档
5. 标记当前模块任务为已完成
6. 继续处理下一个模块

## 文档生成格式
每个模块的进度文档应遵循以下格式：

```
# ModuleName Module Internationalization Progress

## Module: ModuleName
- Module Path: ui/moduleName/**
- Status: processing
- Progress: 0/total_count

## Hardcoded Texts Found:
1. Key: module.submodule.key_name
   Text: "Text to translate"
   Status: detected
   Line: ui/moduleName/Component.tsx:line_number

[更多条目...]

## Dependencies:

## Created Keys:
- module.submodule.key_name
[更多键名...]

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5
```

## 状态代码说明
- detected (1): 已检测到硬编码文本
- processing (2): 正在处理中
- completed (3): 已完成
- verified (4): 已验证
- finalized (5): 已完成并确认
