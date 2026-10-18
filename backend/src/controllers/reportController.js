const reportService = require("../services/reportService");
const { sendSuccess } = require("../utils/response");
const catchAsync = require("../utils/catchAsync");

function getCompleted(req, res) {
  const tasks = reportService.getTasksByStatus("completed");
  return sendSuccess(res, tasks);
}

function getPending(req, res) {
  const tasks = reportService.getTasksByStatus("pending");
  return sendSuccess(res, tasks);
}

function getSummary(req, res) {
  const summary = reportService.getSummary();
  return sendSuccess(res, summary);
}

module.exports = {
  getCompleted: catchAsync(getCompleted),
  getPending: catchAsync(getPending),
  getSummary: catchAsync(getSummary),
};
