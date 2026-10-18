const projectService = require("../services/projectService");
const { sendSuccess } = require("../utils/response");
const AppError = require("../utils/AppError");
const { toPositiveInt } = require("../utils/normalize");
const catchAsync = require("../utils/catchAsync");

function getProjects(req, res) {
  const projects = projectService.getAllProjects();
  return sendSuccess(res, projects);
}

function getProjectById(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Project not found", 404);
  }

  const project = projectService.getProjectById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return sendSuccess(res, project);
}

function createProject(req, res) {
  const project = projectService.createProject(req.body);
  return sendSuccess(res, project, 201);
}

function updateProject(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Project not found", 404);
  }

  const project = projectService.updateProject(id, req.body);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return sendSuccess(res, project);
}

function deleteProject(req, res) {
  const id = toPositiveInt(req.params.id);

  if (!id) {
    throw new AppError("Project not found", 404);
  }

  const deleted = projectService.deleteProject(id);

  if (!deleted) {
    throw new AppError("Project not found", 404);
  }

  return sendSuccess(res, { message: "Project deleted" });
}

module.exports = {
  getProjects: catchAsync(getProjects),
  getProjectById: catchAsync(getProjectById),
  createProject: catchAsync(createProject),
  updateProject: catchAsync(updateProject),
  deleteProject: catchAsync(deleteProject),
};
