const { Op }                    = require("sequelize");
const { Contact, STATUS_TYPES } = require("../models/Contact");
const { success, created, paginated, notFound, badRequest } = require("../utils/apiResponse");

// ─────────────────────────────────────────────────────────────────────────────
// 1. CREATE  —  POST /api/contacts
// ─────────────────────────────────────────────────────────────────────────────
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone = "", service = null, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone:      phone || "",
      service:    service || null,
      message,
      ip_address: req.ip || "",
    });

    return created(res, contact, "Contact inquiry submitted successfully");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return badRequest(res, "Validation failed",
        err.errors.map((e) => ({ field: e.path, message: e.message }))
      );
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. READ ALL  —  GET /api/contacts
//    ?page=1&limit=10&status=new&service=web-dev&search=pawan&sort=createdAt&order=desc
// ─────────────────────────────────────────────────────────────────────────────
exports.getAllContacts = async (req, res, next) => {
  try {
    const page   = Math.max(parseInt(req.query.page)  || 1, 1);
    const limit  = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;

    const { status, service, search, sort = "created_at", order = "DESC" } = req.query;

    const where = {};
    if (status)  where.status  = status;
    if (service) where.service = service;
    if (search) {
      where[Op.or] = [
        { name:  { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const validSortFields = ["created_at", "updated_at", "name", "email", "status"];
    const sortField = validSortFields.includes(sort) ? sort : "created_at";
    const sortOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { count, rows } = await Contact.findAndCountAll({
      where,
      order:  [[sortField, sortOrder]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return paginated(res, rows, {
      total:     count,
      page,
      limit,
      totalPages,
      hasNext:   page < totalPages,
      hasPrev:   page > 1,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. READ ONE  —  GET /api/contacts/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return notFound(res, "Contact not found");

    // Auto-mark as read when admin views it
    if (contact.status === "new") {
      await contact.update({ status: "read" });
    }

    return success(res, contact);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. FULL UPDATE  —  PUT /api/contacts/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return notFound(res, "Contact not found");

    const allowed = ["name", "email", "phone", "service", "message", "status", "notes"];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    if (!Object.keys(updates).length) {
      return badRequest(res, "No valid fields provided for update");
    }

    await contact.update(updates);

    return success(res, contact, "Contact updated successfully");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return badRequest(res, "Validation failed",
        err.errors.map((e) => ({ field: e.path, message: e.message }))
      );
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. PATCH STATUS  —  PATCH /api/contacts/:id/status
// ─────────────────────────────────────────────────────────────────────────────
exports.updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return notFound(res, "Contact not found");

    await contact.update({ status: req.body.status });

    return success(res, contact, `Status updated to "${req.body.status}"`);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return badRequest(res, "Validation failed",
        err.errors.map((e) => ({ field: e.path, message: e.message }))
      );
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. DELETE  —  DELETE /api/contacts/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return notFound(res, "Contact not found");

    await contact.destroy();

    return success(res, null, "Contact deleted successfully");
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// STATS  —  GET /api/contacts/stats
// ─────────────────────────────────────────────────────────────────────────────
exports.getStats = async (_req, res, next) => {
  try {
    const { sequelize } = require("../models");
    const { QueryTypes } = require("sequelize");

    const [byStatus, byService, total] = await Promise.all([
      sequelize.query(
        `SELECT status, COUNT(*)::int AS count FROM contacts GROUP BY status`,
        { type: QueryTypes.SELECT }
      ),
      sequelize.query(
        `SELECT service, COUNT(*)::int AS count FROM contacts WHERE service IS NOT NULL GROUP BY service`,
        { type: QueryTypes.SELECT }
      ),
      Contact.count(),
    ]);

    return success(res, {
      total,
      byStatus:  Object.fromEntries(byStatus.map((r) => [r.status, r.count])),
      byService: Object.fromEntries(byService.map((r) => [r.service, r.count])),
    });
  } catch (err) {
    next(err);
  }
};
