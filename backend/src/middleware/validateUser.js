const AppError = require("../utils/AppError");
const { isEmpty } = require("../utils/normalize");

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

function validateCreateUser(req, res, next) {
  const { name, email } = req.body;

  if (isEmpty(name)) {
    return next(new AppError("User name is required", 400));
  }

  if (isEmpty(email) || !isValidEmail(email)) {
    return next(new AppError("User email is invalid", 400));
  }

  next();
}

function validateUpdateUser(req, res, next) {
  const { name, email } = req.body;

  if (name !== undefined && isEmpty(name)) {
    return next(new AppError("User name is required", 400));
  }

  if (email !== undefined && (isEmpty(email) || !isValidEmail(email))) {
    return next(new AppError("User email is invalid", 400));
  }

  next();
}

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
