const AppError = require("../utils/AppError");
const { isEmpty } = require("../utils/normalize");

function validateCreateProject(req, res, next) {
  const { name, description } = req.body;

  if (isEmpty(name)) {
    return next(new AppError("Project name is required", 400));
  }

  if (isEmpty(description)) {
    return next(new AppError("Project description is required", 400));
  }

  next();
}

function validateUpdateProject(req, res, next) {
  const { name, description } = req.body;

  if (name !== undefined && isEmpty(name)) {
    return next(new AppError("Project name is required", 400));
  }

  if (description !== undefined && isEmpty(description)) {
    return next(new AppError("Project description is required", 400));
  }

  next();
}

module.exports = {
  validateCreateProject,
  validateUpdateProject,
};
