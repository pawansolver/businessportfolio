/**
 * Standardized API response helpers
 */

const success = (res, data = null, message = "Success", statusCode = 200) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

const created = (res, data, message = "Created successfully") =>
  success(res, data, message, 201);

const paginated = (res, data, meta, message = "Success") =>
  res.status(200).json({ success: true, message, meta, data });

const error = (res, message = "Something went wrong", statusCode = 500, errors = null) => {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

const notFound = (res, message = "Resource not found") => error(res, message, 404);

const badRequest = (res, message = "Bad request", errors = null) =>
  error(res, message, 400, errors);

module.exports = { success, created, paginated, error, notFound, badRequest };
