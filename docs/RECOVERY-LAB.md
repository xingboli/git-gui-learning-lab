# Git GUI 安全恢复实验

所有实验都只在练习分支或安全文本上进行。开始前先确认 VS Code 左下角不是 `main`；如果是，请点击分支名并选择 **Create new branch / 创建新分支**，输入 `practice/recovery-lab`。

## 实验 1：丢弃未暂存的单文件修改

1. 打开 `practice/conflict-note.txt`，末尾随意添加一句文字并保存。
2. 打开左侧 **源代码管理 / Source Control**。
3. 点击 Changes 下的文件，先阅读红绿差异。
4. 在文件上右键，选择 **Discard Changes / 放弃更改**。
5. VS Code 会要求确认。确认后文件恢复，Changes 列表为空。

判断标准：只适用于你确定不要、而且尚未提交的修改。这里丢弃后通常无法依靠 Git 找回。

## 实验 2：取消暂存，而不是删除修改

1. 再次修改同一文件并保存。
2. 点击文件右侧 `+`，文件进入 Staged Changes。
3. 点击 Staged Changes 中该文件右侧 `-`，执行 **Unstage Changes / 取消暂存**。
4. 文件应回到 Changes，编辑内容仍然存在。

暂存区只是“下一次提交的候选内容”。取消暂存不会撤销你写的代码。

## 实验 3：解决真实的 add/add 冲突

本仓库的 PR #7 与 #8 保存了完整示范。独立复刻时按以下顺序操作：

1. 从同一个最新 `main` 创建 `practice/conflict-a` 和 `practice/conflict-b`。
2. 在 A 中新建 `practice/conflict-note.txt`，内容为“提交前先检查差异”，提交并发布。
3. 切回尚未包含 A 的 `main`，在 B 中新建同一路径，内容为“合并前先同步最新 main”，提交并发布。
4. 先合并 A 的 PR。
5. 更新本地 `main`，切回 B，打开命令面板并执行 **Git: Merge Branch...**，选择 `main`。
6. VS Code 标记冲突文件。打开 **Resolve in Merge Editor / 在合并编辑器中解决**。
7. 不要机械选择 Current 或 Incoming；最终文件保留两条建议：

   ```text
   冲突练习的最终提醒：
   1. 合并前先同步最新 main。
   2. 提交前先检查差异。

   解决原则：理解两边意图，保留正确的最终内容，而不是机械地选择一边。
   ```

8. 点击 **Complete Merge / 完成合并**，暂存并提交 `docs: resolve conflict by combining guidance`。
9. 同步 B；回到 PR，确认冲突提示消失、检查通过后再合并。

## 实验 4：用 Revert PR 撤销已发布错误

本仓库的 PR #9 故意把首页建议改错，PR #10 负责恢复。

1. 打开已经合并的错误 PR。
2. 点击时间线中的 **Revert**。
3. GitHub 自动创建 `revert-...` 分支和反向提交，并进入新 PR 表单。
4. 标题使用 `revert: 恢复正确的 Git 工作流建议`。
5. 描述写清原错误、恢复结果和验证方式，再创建 PR。
6. 等待 Test 成功，检查 Files changed 确实恢复原文，然后合并。
7. 在 Actions 中等待 main 的 Test 与 Deploy 成功，最后打开 Pages 验证。

为什么不用 Reset 或强制推送：错误提交已经进入公共 `main`，其他人可能已经获取。Revert 增加一个可审查的反向提交，不否认已经发生的历史。

## 实验完成后的清理

1. 确认所有有价值的修改已经提交或确定不要。
2. 切回 `main`，点击 **Sync Changes / 同步更改**。
3. 在分支菜单中删除本地 `practice/recovery-lab`。
4. 如果分支已发布，在 GitHub 分支页删除对应远端分支。
5. 最终源代码管理面板应显示没有待处理修改。

## 故障排查命令附录

只有在 GUI 状态无法解释时才使用终端：

```powershell
git status
git branch --show-current
git log --oneline --graph --decorate --all
```

它们都是只读检查，不会改变项目历史。

