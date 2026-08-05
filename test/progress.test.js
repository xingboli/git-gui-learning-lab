import assert from "node:assert/strict";
import test from "node:test";

import {
  STEP_IDS,
  STORAGE_KEY,
  calculateProgress,
  createEmptyProgress,
  loadProgress,
  normalizeProgress,
  resetProgress,
  saveProgress,
  toggleStep,
} from "../src/progress.js";

function createMemoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

test("empty progress starts with every step incomplete", () => {
  const progress = createEmptyProgress();

  assert.deepEqual(Object.keys(progress), STEP_IDS);
  assert.equal(calculateProgress(progress).completed, 0);
  assert.equal(calculateProgress(progress).percent, 0);
});

test("partial progress returns the correct percentage", () => {
  const progress = {
    ...createEmptyProgress(),
    workspace: true,
    commit: true,
    branch: true,
  };

  assert.deepEqual(calculateProgress(progress), {
    completed: 3,
    total: 8,
    percent: 38,
    isComplete: false,
  });
});

test("all completed steps produce a complete summary", () => {
  const progress = Object.fromEntries(STEP_IDS.map((id) => [id, true]));

  assert.deepEqual(calculateProgress(progress), {
    completed: 8,
    total: 8,
    percent: 100,
    isComplete: true,
  });
});

test("toggling a step twice restores its original state", () => {
  const original = createEmptyProgress();
  const toggled = toggleStep(original, "workspace");
  const restored = toggleStep(toggled, "workspace");

  assert.equal(toggled.workspace, true);
  assert.deepEqual(restored, original);
});

test("invalid and old storage data is normalized safely", () => {
  assert.deepEqual(normalizeProgress(null), createEmptyProgress());
  assert.deepEqual(normalizeProgress(["workspace"]), createEmptyProgress());
  assert.deepEqual(normalizeProgress({ workspace: "yes" }), createEmptyProgress());

  const storage = createMemoryStorage({ [STORAGE_KEY]: "not-json" });
  assert.deepEqual(loadProgress(storage), createEmptyProgress());
});

test("save and load round-trip only known boolean fields", () => {
  const storage = createMemoryStorage();
  const input = { workspace: true, unknown: true };

  assert.equal(saveProgress(input, storage), true);
  assert.equal(loadProgress(storage).workspace, true);
  assert.equal(Object.hasOwn(loadProgress(storage), "unknown"), false);
});

test("reset removes stored progress and returns an empty state", () => {
  const storage = createMemoryStorage({
    [STORAGE_KEY]: JSON.stringify({ workspace: true }),
  });

  assert.deepEqual(resetProgress(storage), createEmptyProgress());
  assert.deepEqual(loadProgress(storage), createEmptyProgress());
});
