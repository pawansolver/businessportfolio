const { body, param, query, validationResult } = require("express-validator");
const { badRequest } = require("../utils/apiResponse");

const VALID_SERVICES = [
  "web-dev",
  "ecommerce",
  "mobile-app",
  "ui-ux",
  "saas-software",
  "digital-marketing",
  "graphic-branding",
  "maintenance-support",
];

const VALID_STATUSES = ["new", "read", "replied", "archived"];

/** Run validation rules and short-circuit on failure */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return badRequest(res, "Validation failed", errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })));
  }
  next();
};

/** Validation rules for creating a contact */
const createContactRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-().]{7,20}$/).withMessage("Invalid phone number format"),

  body("service")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(VALID_SERVICES).withMessage(`Service must be one of: ${VALID_SERVICES.join(", ")}`),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 characters"),

  handleValidation,
];

/** Validation rules for updating a contact (all fields optional) */
const updateContactRules = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-().]{7,20}$/).withMessage("Invalid phone number format"),

  body("service")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(VALID_SERVICES).withMessage(`Service must be one of: ${VALID_SERVICES.join(", ")}`),

  body("message")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 characters"),

  body("status")
    .optional()
    .isIn(VALID_STATUSES).withMessage(`Status must be one of: ${VALID_STATUSES.join(", ")}`),

  body("notes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage("Notes must be under 1000 characters"),

  handleValidation,
];

/** Validation rule for status-only patch */
const updateStatusRules = [
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(VALID_STATUSES).withMessage(`Status must be one of: ${VALID_STATUSES.join(", ")}`),

  handleValidation,
];

/** UUID param validation */
const uuidParamRules = [
  param("id").isUUID().withMessage("Invalid contact ID"),
  handleValidation,
];

/** List query validation */
const listQueryRules = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be 1–100").toInt(),
  query("status").optional().isIn([...VALID_STATUSES, ""]).withMessage("Invalid status filter"),
  query("service").optional().isIn([...VALID_SERVICES, ""]).withMessage("Invalid service filter"),
  query("order").optional().isIn(["asc", "desc"]).withMessage("Order must be asc or desc"),
  handleValidation,
];

module.exports = {
  createContactRules,
  updateContactRules,
  updateStatusRules,
  uuidParamRules,
  listQueryRules,
};
