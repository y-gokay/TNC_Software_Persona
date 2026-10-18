const { PROJECTS_FILE, TASKS_FILE } = require("../constants");
const { readJson, writeJson, nextId, today } = require("./jsonStore");
const AppError = require("../utils/AppError");

function getAllProjects() {
  return readJson(PROJECTS_FILE);
}

function getProjectById(id) {
  const projects = readJson(PROJECTS_FILE);
  return projects.find((project) => project.id === id) || null;
}

function createProject(payload) {
  const projects = readJson(PROJECTS_FILE);
  const now = today();

  const project = {
    id: nextId(projects),
    name: String(payload.name).trim(),
    description: String(payload.description).trim(),
    createdAt: now,
    updatedAt: now,
  };

  projects.push(project);
  writeJson(PROJECTS_FILE, projects);
  return project;
}

function updateProject(id, payload) {
  const projects = readJson(PROJECTS_FILE);
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    return null;
  }

  const updates = { ...payload };
  delete updates.id;
  delete updates.createdAt;
  delete updates.updatedAt;

  if (updates.name) {
    updates.name = String(updates.name).trim();
  }

  if (updates.description) {
    updates.description = String(updates.description).trim();
  }

  projects[index] = {
    ...projects[index],
    ...updates,
    id: projects[index].id,
    createdAt: projects[index].createdAt,
    updatedAt: today(),
  };

  writeJson(PROJECTS_FILE, projects);
  return projects[index];
}

function deleteProject(id) {
  const projects = readJson(PROJECTS_FILE);
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    return false;
  }

  const tasks = readJson(TASKS_FILE);
  if (tasks.some((task) => task.projectId === id)) {
    throw new AppError("Project has related tasks", 400);
  }

  projects.splice(index, 1);
  writeJson(PROJECTS_FILE, projects);
  return true;
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
