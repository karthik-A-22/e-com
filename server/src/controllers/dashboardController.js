const Product = require("../models/Product");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({
      role: { $ne: "admin" },
    });
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({
      totalProducts,
      totalUsers,
      recentProducts,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load dashboard data." });
  }
};

module.exports = { getDashboardStats };
