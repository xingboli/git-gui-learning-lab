# Git GUI Learning Lab

一个用 VS Code 图形界面学习 Git 与 GitHub 工作流的完整小项目。重点不是背命令，而是知道：**现在为什么要做这件事，做完去哪里确认。**

[在线体验](https://xingboli.github.io/git-gui-learning-lab/) · [完整复刻教程](docs/REPRODUCE.md) · [场景决策表](docs/WHEN-TO-DO-WHAT.md) · [安全恢复实验](docs/RECOVERY-LAB.md)

## 这个仓库真实经历了什么

- 从空目录初始化并发布为公开 GitHub 仓库。
- 通过功能分支、Issue 和 Pull Request 完成界面与进度保存。
- 在 PR 上自动测试，在 `main` 测试通过后部署 GitHub Pages。
- 用两个分支制造并解决一次安全的 add/add 冲突。
- 合并一条故意错误的文案，再通过 GitHub Revert PR 恢复。
- 从稳定的 `main` 创建 `v1.0.0` 标签与 GitHub Release。

你可以在仓库的 **Pull requests**、**Actions** 和提交图中看到这些记录，而不是只读一份虚构示例。

## 项目功能

- 八个 Git 工作流检查点。
- 学习进度、百分比和下一步建议。
- 使用 `git-learning-checklist:v1` 在浏览器本地保存状态。
- 非法或旧存储数据自动恢复默认值。
- 确认后重置全部进度。
- 响应式布局、键盘焦点和减少动画支持。
- 7 项零依赖 Node 自动化测试。

## 项目结构

```text
.
├─ .github/workflows/pages.yml  # 测试与 Pages 部署
├─ docs/                        # 中文学习文档
├─ practice/conflict-note.txt   # 冲突实验的最终结果
├─ src/app.js                   # 浏览器交互
├─ src/progress.js              # 可测试的状态模型
├─ test/progress.test.js        # Node 内置测试
├─ index.html
├─ styles.css
└─ package.json
```

## 本地查看与测试

网页本身没有构建步骤。可使用 VS Code 的本地服务器扩展，或在终端运行任意静态文件服务器打开项目根目录。

自动化测试使用 Node 内置测试运行器：

```powershell
node --test
```

这条命令用于验证项目，不是 Git 教学步骤。

## 建议学习顺序

1. 先读[什么时候做什么](docs/WHEN-TO-DO-WHAT.md)，建立判断框架。
2. 按[完整复刻教程](docs/REPRODUCE.md)从空目录操作一次。
3. 在[安全恢复实验](docs/RECOVERY-LAB.md)中练习撤销、冲突与 revert。
4. 回到 GitHub 查看真实 PR、Actions 和 Release，把界面状态与历史对应起来。

## 隐私与许可证

本仓库使用仓库级 GitHub 隐私邮箱，避免把个人邮箱写入公开提交历史。项目采用 [MIT License](LICENSE)。

