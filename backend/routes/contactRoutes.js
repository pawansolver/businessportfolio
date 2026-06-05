const express = require("express");
const router  = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  updateContactStatus,
  deleteContact,
  getStats,
} = require("../controllers/contactController");


// ── Stats (before /:id so it is not treated as a UUID param)
router.get("/stats", getStats);

// ── 1. CREATE
router.post("/", createContact);

// ── 2. READ ALL
router.get("/", getAllContacts);

// ── 3. READ ONE
router.get("/:id", getContactById);

// ── 4. FULL UPDATE
router.put("/:id", updateContact);

// ── 5. STATUS PATCH
router.patch("/:id/status", updateContactStatus);

// ── 6. DELETE
router.delete("/:id", deleteContact);

module.exports = router;
