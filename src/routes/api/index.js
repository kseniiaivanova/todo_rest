const express = require("express");
const router = express.Router();

const listRoutes = require("./listRoutes");
const todoRoutes = require("./todoRoutes");

router.use("/lists", listRoutes);
router.use("/todos", todoRoutes);

const authRoutes = require("./authRoutes");
//const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
//router.use("/users", userRoutes);

module.exports = router;
