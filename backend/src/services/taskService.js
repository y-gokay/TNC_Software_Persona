const { TASKS_FILE, SORT_FIELDS, DEFAULT_PAGE, DEFAULT_LIMIT } = require("../constants");
const { readJson, writeJson, nextId, today } = require("./jsonStore");
const userService = require("./userService");
const projectService = require("./projectService");
const AppError = require("../utils/AppError");
const { normalizeName } = require("../utils/normalize");

function withRelations(task) {
  const user = userService.getUserById(task.userId);
  const project = projectService.getProjectById(task.projectId);

  return {
    ...task,
    user: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      : null,
    project: project
      ? {
          id: project.id,
          name: project.name,
        }
      : null,
  };
}

function resolveAssignee(userId, assignee) {
  let user = null;

  if (userId !== undefined && userId !== null && userId !== "") {
    user = userService.getUserById(Number(userId));
  } else if (assignee) {
    user = userService.getUserByName(assignee);
  }

  if (!user) {
    throw new AppError("User not found", 400);
  }

  return {
    userId: user.id,
    assignee: user.name,
  };
}

function resolveProject(projectId) {
  const project = projectService.getProjectById(Number(projectId));

  if (!project) {
    throw new AppError("Project not found", 400);
  }

  return project.id;
}

function getAllTasks(query = {}) {
  let tasks = readJson(TASKS_FILE);

  if (query.status) {
    tasks = tasks.filter((task) => task.status === query.status);
  }

  if (query.priority) {
    tasks = tasks.filter((task) => task.priority === query.priority);
  }

  if (query.assignee) {
    const assignee = normalizeName(query.assignee);
    tasks = tasks.filter((task) => normalizeName(task.assignee) === assignee);
  }

  if (query.sort && SORT_FIELDS.includes(query.sort)) {
    const order = query.order === "desc" ? -1 : 1;
    const field = query.sort;

    tasks = [...tasks].sort((a, b) => {
      if (a[field] < b[field]) {
        return -1 * order;
      }
      if (a[field] > b[field]) {
        return 1 * order;
      }
      return 0;
    });
  }

  const mapped = tasks.map(withRelations);
  const paginate = query.page !== undefined || query.limit !== undefined;

  if (!paginate) {
    return { items: mapped };
  }

  const page = Math.max(Number(query.page) || DEFAULT_PAGE, 1);
  const limit = Math.max(Number(query.limit) || DEFAULT_LIMIT, 1);
  const total = mapped.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;

  return {
    items: mapped.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

function getTaskById(id) {
  const tasks = readJson(TASKS_FILE);
  const task = tasks.find((item) => item.id === id);
  return task ? withRelations(task) : null;
}

function searchTasks(keyword) {
  if (!keyword || String(keyword).trim() === "") {
    throw new AppError("Keyword is required", 400);
  }

  const query = String(keyword).toLocaleLowerCase("tr-TR");
  const tasks = readJson(TASKS_FILE);

  return tasks
    .filter(
      (task) =>
        task.title.toLocaleLowerCase("tr-TR").includes(query) ||
        task.description.toLocaleLowerCase("tr-TR").includes(query)
    )
    .map(withRelations);
}

function createTask(payload) {
  const tasks = readJson(TASKS_FILE);
  const now = today();
  const assignee = resolveAssignee(payload.userId, payload.assignee);
  const projectId = resolveProject(payload.projectId);

  const task = {
    id: nextId(tasks),
    title: String(payload.title).trim(),
    description: String(payload.description).trim(),
    status: "pending",
    priority: payload.priority,
    assignee: assignee.assignee,
    userId: assignee.userId,
    projectId,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);
  writeJson(TASKS_FILE, tasks);
  return withRelations(task);
}

function updateTask(id, payload) {
  const tasks = readJson(TASKS_FILE);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  const updates = { ...payload };
  delete updates.id;
  delete updates.createdAt;
  delete updates.updatedAt;

  if (updates.title) {
    updates.title = String(updates.title).trim();
  }

  if (updates.description) {
    updates.description = String(updates.description).trim();
  }

  if (updates.userId !== undefined || updates.assignee !== undefined) {
    Object.assign(updates, resolveAssignee(updates.userId, updates.assignee));
  }

  if (updates.projectId !== undefined) {
    updates.projectId = resolveProject(updates.projectId);
  }

  tasks[index] = {
    ...tasks[index],
    ...updates,
    id: tasks[index].id,
    createdAt: tasks[index].createdAt,
    updatedAt: today(),
  };

  writeJson(TASKS_FILE, tasks);
  return withRelations(tasks[index]);
}

function deleteTask(id) {
  const tasks = readJson(TASKS_FILE);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  writeJson(TASKS_FILE, tasks);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  searchTasks,
  createTask,
  updateTask,
  deleteTask,
};
