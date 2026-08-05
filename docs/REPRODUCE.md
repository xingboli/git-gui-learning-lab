# 从空目录复刻完整项目

目标：使用 VS Code 内置源代码管理和 GitHub 网页，完成从初始化到 `v1.0.0` 发布。Git 提交不以命令行为主；终端只运行项目测试。

## 0. 先认识四个位置

- VS Code 左下角：当前分支。
- 左侧分叉图标：**源代码管理 / Source Control**，查看差异、暂存和提交。
- GitHub **Pull requests**：合并前的说明、检查与讨论。
- GitHub **Actions**：测试和部署是否真的完成。

每次操作都遵循“先看状态 → 做一个动作 → 再确认结果”。

## 1. 从空目录到首次发布

1. 新建空目录 `git-gui-learning-lab`，使用 VS Code 的 **File → Open Folder / 文件 → 打开文件夹** 打开它。
2. 点击源代码管理图标，选择 **Initialize Repository / 初始化仓库**。
3. 点击左下角默认分支名，若不是 `main`，选择 **Rename Branch / 重命名分支** 并输入 `main`。
4. 为公开仓库设置隐私邮箱。VS Code 没有仓库级提交身份表单，因此只在集成终端执行一次 `git config --local user.name xingboli` 和 `git config --local user.email xingboli@users.noreply.github.com`。这是身份设置，不是命令行提交，也不会修改全局配置。
5. 创建 `.gitignore`、`LICENSE`、`README.md`、`package.json`。内容对应本仓库提交 [`9864778`](https://github.com/xingboli/git-gui-learning-lab/commit/9864778)。
6. 在 Source Control 点击每个文件查看差异；确认四个文件属于同一“初始化”目的。
7. 点击 Changes 标题右侧 `+` 暂存全部，输入 `chore: initialize learning lab`，点击 **Commit / 提交**。
8. 点击 **Publish Branch / 发布分支**，选择 **Publish to GitHub public repository / 发布到 GitHub 公开仓库**，仓库名输入 `git-gui-learning-lab`。
9. 浏览器打开仓库，确认可见性为 Public、默认分支为 `main`、只出现一笔提交。

检查点：VS Code 没有 Changes；GitHub Code 页显示四个初始文件。

## 2. 用第一个 Issue 和功能分支做界面

1. GitHub 进入 **Issues → New issue**。
2. 标题：`构建语义化、响应式的学习清单界面`。正文和验收项参考本仓库 Issue #1。
3. 回到 VS Code，点击左下角 `main` → **Create new branch / 创建新分支**，输入 `feature/checklist-ui`。
4. 创建 `index.html`，内容参考提交 [`43339b0`](https://github.com/xingboli/git-gui-learning-lab/commit/43339b0)。检查差异、暂存该文件并提交 `feat: add semantic learning checklist`。
5. 创建 `styles.css`，内容参考提交 [`399eafd`](https://github.com/xingboli/git-gui-learning-lab/commit/399eafd)。单独提交 `style: add responsive visual system`。
6. 点击 **Publish Branch**。
7. GitHub 进入 **Pull requests → New pull request**，base 选 `main`，compare 选 `feature/checklist-ui`。
8. 标题：`feat: 构建学习清单界面`。正文必须包含为什么修改、修改列表、验证方式和 `Closes #1`。
9. 创建 PR，逐个查看 **Commits** 和 **Files changed**。确认无意外文件后点击 **Merge pull request**，保留合并提交；随后 **Delete branch**。
10. VS Code 切回 `main`，点击 **Sync Changes**。

检查点：Issue #1 自动关闭；PR 保留两笔职责不同的提交；本地 `main` 包含页面和样式。

## 3. 添加进度、本地保存和测试

1. 创建 Issue：`保存学习进度并加入自动化测试`，参考本仓库 Issue #3。
2. 从最新 `main` 创建 `feature/progress-storage`。
3. 创建 `src/progress.js`，参考 [`b43b49b`](https://github.com/xingboli/git-gui-learning-lab/commit/b43b49b)，提交 `feat: add progress state model`。
4. 创建 `src/app.js`，参考 [`93e637d`](https://github.com/xingboli/git-gui-learning-lab/commit/93e637d)，提交 `feat: persist checklist interactions`。
5. 创建 `test/progress.test.js`，参考 [`58a9d56`](https://github.com/xingboli/git-gui-learning-lab/commit/58a9d56)。在 VS Code 终端运行 `node --test`，看到 7 项通过后提交 `test: cover progress and storage behavior`。
6. 发布分支，创建 PR：`feat: 保存学习进度并加入测试`，正文添加 `Closes #3` 和测试结果。
7. 审查三笔提交后合并、删除远端分支、同步本地 `main`。

检查点：刷新网页后选择仍保留；非法 localStorage 内容不会让页面崩溃；重置需要确认。

## 4. 让 PR 自动测试，让 main 自动部署

1. 创建 Issue：`通过 Actions 测试并部署 GitHub Pages`，参考 Issue #5。
2. 从最新 `main` 创建 `ci/pages-deployment`。
3. 创建 `.github/workflows/pages.yml`，直接使用本仓库当前文件，提交 `ci: test and deploy GitHub Pages`。
4. 发布分支并创建 PR：`ci: 测试并部署 GitHub Pages`，正文写 `Closes #5`。
5. 打开 PR 的 **Checks**：Test 必须成功；Deploy 必须显示 Skipped，因为 PR 不能发布正式站点。
6. GitHub 打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
7. 合并 PR。打开 **Actions → Test and deploy Pages**，确认 main 的 Test 和 Deploy 均为绿色。
8. 在运行摘要中点击部署地址 `https://xingboli.github.io/git-gui-learning-lab/`。

检查点：PR 只测试不部署；main 先测试后部署；运行摘要显示 `github-pages` 环境和线上 URL。

## 5. 完成冲突与恢复实验

严格按照[安全恢复实验](RECOVERY-LAB.md)完成：

- PR #7 与 #8：两条分支修改同一路径，保留真实冲突解决提交。
- PR #9 与 #10：错误文案进入 main 后，通过 GitHub Revert PR 恢复。

每次 main 变化后都等 Actions 完成，再验证 Pages。不要用强制推送缩短历史。

## 6. 发布准备 PR

1. 从最新 `main` 创建 `docs/release-guide`。
2. 用当前仓库内容补齐 `README.md`、`CHANGELOG.md` 和 `docs/` 下三份教程。
3. 检查所有文档链接，运行 `node --test`。
4. 发布分支并创建 PR：`docs: 完成 v1.0.0 学习与发布指南`。
5. PR 正文列出文档、测试结果、Pages 地址和发布清单；等待 Test 成功后合并。
6. 等待 main 的 Test 与 Deploy 成功，在线复查清单、保存、刷新和重置。

## 7. 创建 v1.0.0 Release

1. GitHub Code 页右侧点击 **Releases → Draft a new release**。
2. 点击 **Choose a tag**，输入 `v1.0.0`，选择 **Create new tag: v1.0.0 on publish**；Target 必须是 `main`。
3. 标题：`v1.0.0 — VS Code Git GUI 完整学习项目`。
4. 正文包含：主要功能、自动化验证、Pages 地址、复刻教程入口和已知上游警告。
5. 不勾选 prerelease。点击 **Publish release**。
6. 打开 Release，确认标签、源代码压缩包和正文可见。

## 8. 最终清理与验收

1. GitHub 分支页删除所有已合并的远端功能分支，只保留 `main`。
2. VS Code 切到 `main` 并同步；Source Control 应没有未提交文件。
3. 依次确认：Issues 已关闭、PR 已合并、最新 Actions 成功、Pages 可访问、Release 为 `v1.0.0`。
4. 打开提交图，找到功能合并、冲突解决和 revert 历史。

## GUI 无法解释时的只读检查

以下命令不会修改仓库：

```powershell
git status
git branch --show-current
git log --oneline --graph --decorate --all
```

如果命令结果与 GUI 不一致，先停止提交或合并，确认当前分支和待处理修改后再继续。
