const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

const TASKS_FILE = path.join(DATA_DIR, "tasks.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

const TASK_STATUSES = ["pending", "inProgress", "completed"];
const TASK_PRIORITIES = ["low", "medium", "high"];
const SORT_FIELDS = ["id", "title", "status", "priority", "assignee", "createdAt", "updatedAt"];

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

module.exports = {
  TASKS_FILE,
  PROJECTS_FILE,
  USERS_FILE,
  TASK_STATUSES,
  TASK_PRIORITIES,
  SORT_FIELDS,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
};
