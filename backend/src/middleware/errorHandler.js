const { sendError } = require("../utils/response");

function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendError(res, "Invalid JSON", 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return sendError(res, message, statusCode);
}

module.exports = errorHandler;
