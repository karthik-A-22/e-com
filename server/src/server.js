// File: src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const allRoutes = require("./routes/allRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true, // if you're using cookies or sessions
  })
);
app.use(express.json());

// Routes
app.use("/api/v1", allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
