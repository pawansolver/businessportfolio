const { nodeEnv } = require("../config");

/**
 * Global error handler middleware — must be last app.use()
 */
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  console.error(`[ERROR] ${statusCode} — ${message}`);
  if (nodeEnv === "development") console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message,
    ...(nodeEnv === "development" && { stack: err.stack }),
  });
};

/**
 * 404 handler — mount before errorHandler
 */
const notFoundHandler = (_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

module.exports = { errorHandler, notFoundHandler };
