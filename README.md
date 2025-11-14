## Store

Keyer 插件和脚本商店索引仓库

### 提交方式

通过提交 GitHub Issue 来添加 extension 或 script

### Issue 规范

- **Label**: 只能从 `extension` 和 `script` 选择（自动添加）
- **内容格式**: `repo:owner/repository`

### 自动化流程

当提交 issue 后，GitHub Actions 会自动：

1. 读取目标仓库的 `package.json`，提取以下字段：
   ```json
   {
     "icon": "🚀",
     "name": "app-launcher",
     "title": "App Launcher",
     "desc": "Launch macOS applications",
     "version": "1.0.0"
   }
   ```

2. **Extension 处理**:
   - 追加信息到 `app.json`
   - 创建提交
   - 关闭 issue

3. **Script 处理**:
   - 追加信息到 `app.json`
   - 下载脚本文件到 `scripts/` 目录
   - 文件命名: `{name}{extension}` (如 `finder-to-terminal.sh`)
   - 创建提交
   - 关闭 issue

### 重复检查

- `name` 不允许重复
- 如果已存在同名项，issue 会被标记为 `duplicate` 并关闭

### 目录结构

```
store/
├── app.json          # 所有 extension 和 script 的索引
├── scripts/          # 存储所有提交的脚本文件
│   ├── README.md
│   └── *.sh|.js|.py  # 脚本文件
└── .github/
    ├── ISSUE_TEMPLATE/
    └── workflows/
```