const { TASK_PRIORITIES, TASK_STATUSES } = require("../constants");
const AppError = require("../utils/AppError");
const { isEmpty } = require("../utils/normalize");

function validateCreateTask(req, res, next) {
  const { title, description, priority, assignee, projectId } = req.body;

  if (isEmpty(title)) {
    return next(new AppError("Task title is required", 400));
  }

  if (isEmpty(description)) {
    return next(new AppError("Task description is required", 400));
  }

  if (isEmpty(priority) || !TASK_PRIORITIES.includes(priority)) {
    return next(new AppError("Task priority is invalid", 400));
  }

  if (isEmpty(assignee) && req.body.userId === undefined) {
    return next(new AppError("Task assignee is required", 400));
  }

  if (projectId === undefined || projectId === null || Number.isNaN(Number(projectId))) {
    return next(new AppError("Task projectId is required", 400));
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, priority, status, assignee } = req.body;

  if (title !== undefined && isEmpty(title)) {
    return next(new AppError("Task title is required", 400));
  }

  if (description !== undefined && isEmpty(description)) {
    return next(new AppError("Task description is required", 400));
  }

  if (priority !== undefined && !TASK_PRIORITIES.includes(priority)) {
    return next(new AppError("Task priority is invalid", 400));
  }

  if (status !== undefined && !TASK_STATUSES.includes(status)) {
    return next(new AppError("Task status is invalid", 400));
  }

  if (assignee !== undefined && isEmpty(assignee)) {
    return next(new AppError("Task assignee is required", 400));
  }

  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
