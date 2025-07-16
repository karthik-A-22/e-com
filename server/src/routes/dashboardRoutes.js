const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { verifyAdmin, verifyToken } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, verifyAdmin, getDashboardStats);

module.exports = router;
