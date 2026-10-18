const { USERS_FILE, TASKS_FILE } = require("../constants");
const { readJson, writeJson, nextId, today } = require("./jsonStore");
const AppError = require("../utils/AppError");
const { normalizeName } = require("../utils/normalize");

function getAllUsers() {
  return readJson(USERS_FILE);
}

function getUserById(id) {
  const users = readJson(USERS_FILE);
  return users.find((user) => user.id === id) || null;
}

function getUserByName(name) {
  const users = readJson(USERS_FILE);
  const normalized = normalizeName(name);
  return users.find((user) => normalizeName(user.name) === normalized) || null;
}

function createUser(payload) {
  const users = readJson(USERS_FILE);
  const email = String(payload.email).trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new AppError("Email already exists", 400);
  }

  const now = today();
  const user = {
    id: nextId(users),
    name: String(payload.name).trim(),
    email,
    role: payload.role ? String(payload.role).trim() : "developer",
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  writeJson(USERS_FILE, users);
  return user;
}

function updateUser(id, payload) {
  const users = readJson(USERS_FILE);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const updates = { ...payload };
  delete updates.id;
  delete updates.createdAt;
  delete updates.updatedAt;

  if (updates.email) {
    const email = String(updates.email).trim().toLowerCase();
    if (users.some((user) => user.id !== id && user.email.toLowerCase() === email)) {
      throw new AppError("Email already exists", 400);
    }
    updates.email = email;
  }

  if (updates.name) {
    updates.name = String(updates.name).trim();
  }

  users[index] = {
    ...users[index],
    ...updates,
    id: users[index].id,
    createdAt: users[index].createdAt,
    updatedAt: today(),
  };

  writeJson(USERS_FILE, users);
  return users[index];
}

function deleteUser(id) {
  const users = readJson(USERS_FILE);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  const tasks = readJson(TASKS_FILE);
  if (tasks.some((task) => task.userId === id)) {
    throw new AppError("User has assigned tasks", 400);
  }

  users.splice(index, 1);
  writeJson(USERS_FILE, users);
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
