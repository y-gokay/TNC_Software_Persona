const userService = require("../services/userService");
const { sendSuccess } = require("../utils/response");
const AppError = require("../utils/AppError");
const { toPositiveInt } = require("../utils/normalize");
const catchAsync = require("../utils/catchAsync");

function getUsers(req, res) {
  const users = userService.getAllUsers();
  return sendSuccess(res, users);
}

function getUserById(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("User not found", 404);
  }

  const user = userService.getUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sendSuccess(res, user);
}

function createUser(req, res) {
  const user = userService.createUser(req.body);
  return sendSuccess(res, user, 201);
}

function updateUser(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("User not found", 404);
  }

  const user = userService.updateUser(id, req.body);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sendSuccess(res, user);
}

function deleteUser(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("User not found", 404);
  }

  const deleted = userService.deleteUser(id);

  if (!deleted) {
    throw new AppError("User not found", 404);
  }

  return sendSuccess(res, { message: "User deleted" });
}

module.exports = {
  getUsers: catchAsync(getUsers),
  getUserById: catchAsync(getUserById),
  createUser: catchAsync(createUser),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
