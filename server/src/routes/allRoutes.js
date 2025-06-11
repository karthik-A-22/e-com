const express = require("express");
const authRoutes = require("./authRoutes");

const router = express.Router();

// Register all route modules here
router.use("/auth", authRoutes);

module.exports = router;
