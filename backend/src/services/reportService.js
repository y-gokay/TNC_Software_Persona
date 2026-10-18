const { TASKS_FILE } = require("../constants");
const { readJson } = require("./jsonStore");

function getTasksByStatus(status) {
  const tasks = readJson(TASKS_FILE);
  return tasks.filter((task) => task.status === status);
}

function getSummary() {
  const tasks = readJson(TASKS_FILE);

  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "inProgress").length,
  };
}

module.exports = {
  getTasksByStatus,
  getSummary,
};
