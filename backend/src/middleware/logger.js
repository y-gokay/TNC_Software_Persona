function logger(req, res, next) {
  const timestamp = new Date().toISOString().slice(0, 19);
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
