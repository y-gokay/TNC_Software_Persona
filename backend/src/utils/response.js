function sendSuccess(res, data, statusCode = 200, extra = {}) {
  return res.status(statusCode).json({
    success: true,
    data,
    ...extra,
  });
}

function sendError(res, error, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error,
  });
}

module.exports = {
  sendSuccess,
  sendError,
};
