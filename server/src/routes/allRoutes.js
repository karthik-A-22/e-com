const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const router = express.Router();

// Register all route modules here
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
