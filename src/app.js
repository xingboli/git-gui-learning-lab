import {
  STEP_IDS,
  calculateProgress,
  loadProgress,
  resetProgress,
  saveProgress,
  toggleStep,
} from "./progress.js";

const NEXT_ACTIONS = [
  "打开 VS Code 的源代码管理面板，先学会判断工作区是否干净。",
  "选择一个小而完整的修改，检查差异后再暂存和提交。",
  "从最新 main 创建功能分支，让未完成工作与稳定版本隔离。",
  "发布当前分支，在 GitHub 上确认远端已经收到提交。",
  "创建 Pull Request，写清修改原因、内容和验证方式。",
  "用练习文件制造一次冲突，理解两边意图后保留正确结果。",
  "区分未发布与已发布错误，选择丢弃修改或创建 Revert PR。",
  "确认测试和 Pages 部署成功，然后创建版本标签与 Release。",
  "八个检查点已完成。回到教程，从空目录独立复刻一次吧！",
];

const cards = [...document.querySelectorAll("[data-step-id]")];
const completedCount = document.querySelector("#completed-count");
const totalCount = document.querySelector("#total-count");
const progressMessage = document.querySelector("#progress-message");
const progressBar = document.querySelector("#progress-bar");
const nextAction = document.querySelector("#next-action-text");
const resetButton = document.querySelector("#reset-progress");
const resetDialog = document.querySelector("#reset-dialog");

let progress = loadProgress();

function render() {
  const summary = calculateProgress(progress);

  cards.forEach((card) => {
    const stepId = card.dataset.stepId;
    const checkbox = card.querySelector("input[type='checkbox']");
    checkbox.checked = progress[stepId];
  });

  completedCount.textContent = String(summary.completed);
  totalCount.textContent = String(summary.total);
  progressBar.style.width = `${summary.percent}%`;
  progressMessage.textContent = summary.isComplete
    ? "你已经走完一次完整的 Git 工作流。"
    : `已完成 ${summary.percent}%，下一步只专注一个检查点。`;
  nextAction.textContent = NEXT_ACTIONS[summary.completed];
}

cards.forEach((card) => {
  const checkbox = card.querySelector("input[type='checkbox']");
  const stepId = card.dataset.stepId;

  if (!STEP_IDS.includes(stepId)) {
    return;
  }

  checkbox.addEventListener("change", () => {
    progress = toggleStep(progress, stepId);
    saveProgress(progress);
    render();
  });
});

resetButton.addEventListener("click", () => {
  if (typeof resetDialog.showModal === "function") {
    resetDialog.showModal();
    return;
  }

  if (window.confirm("重置所有学习进度？")) {
    progress = resetProgress();
    render();
  }
});

resetDialog.addEventListener("close", () => {
  if (resetDialog.returnValue === "confirm") {
    progress = resetProgress();
    render();
  }
});

render();
