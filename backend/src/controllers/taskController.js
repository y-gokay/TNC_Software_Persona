const taskService = require("../services/taskService");
const { sendSuccess } = require("../utils/response");
const AppError = require("../utils/AppError");
const { toPositiveInt } = require("../utils/normalize");
const catchAsync = require("../utils/catchAsync");

function getTasks(req, res) {
  const result = taskService.getAllTasks(req.query);

  if (result.pagination) {
    return sendSuccess(res, result.items, 200, { pagination: result.pagination });
  }

  return sendSuccess(res, result.items);
}

function getTaskById(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Task not found", 404);
  }

  const task = taskService.getTaskById(id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return sendSuccess(res, task);
}

function searchTasks(req, res) {
  const tasks = taskService.searchTasks(req.query.keyword);
  return sendSuccess(res, tasks);
}

function createTask(req, res) {
  const task = taskService.createTask(req.body);
  return sendSuccess(res, task, 201);
}

function updateTask(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Task not found", 404);
  }

  const task = taskService.updateTask(id, req.body);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return sendSuccess(res, task);
}

function deleteTask(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Task not found", 404);
  }

  const deleted = taskService.deleteTask(id);

  if (!deleted) {
    throw new AppError("Task not found", 404);
  }

  return sendSuccess(res, { message: "Task deleted" });
}

module.exports = {
  getTasks: catchAsync(getTasks),
  getTaskById: catchAsync(getTaskById),
  searchTasks: catchAsync(searchTasks),
  createTask: catchAsync(createTask),
  updateTask: catchAsync(updateTask),
  deleteTask: catchAsync(deleteTask),
};
