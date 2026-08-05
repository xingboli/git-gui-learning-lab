export const STORAGE_KEY = "git-learning-checklist:v1";

export const STEP_IDS = Object.freeze([
  "workspace",
  "commit",
  "branch",
  "sync",
  "pr",
  "conflict",
  "recover",
  "release",
]);

export function createEmptyProgress() {
  return Object.fromEntries(STEP_IDS.map((id) => [id, false]));
}

export function normalizeProgress(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return createEmptyProgress();
  }

  return Object.fromEntries(STEP_IDS.map((id) => [id, value[id] === true]));
}

export function toggleStep(progress, stepId) {
  const normalized = normalizeProgress(progress);

  if (!STEP_IDS.includes(stepId)) {
    return normalized;
  }

  return { ...normalized, [stepId]: !normalized[stepId] };
}

export function calculateProgress(progress) {
  const normalized = normalizeProgress(progress);
  const completed = STEP_IDS.filter((id) => normalized[id]).length;

  return {
    completed,
    total: STEP_IDS.length,
    percent: Math.round((completed / STEP_IDS.length) * 100),
    isComplete: completed === STEP_IDS.length,
  };
}

export function loadProgress(storage = globalThis.localStorage) {
  try {
    const rawValue = storage.getItem(STORAGE_KEY);
    return rawValue ? normalizeProgress(JSON.parse(rawValue)) : createEmptyProgress();
  } catch {
    return createEmptyProgress();
  }
}

export function saveProgress(progress, storage = globalThis.localStorage) {
  const normalized = normalizeProgress(progress);

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress(storage = globalThis.localStorage) {
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // A blocked storage API should not prevent the in-memory reset.
  }

  return createEmptyProgress();
}
