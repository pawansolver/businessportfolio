const express = require("express");
const contactRoutes = require("./contactRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/contacts", contactRoutes);

module.exports = router;
