const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createTask } = require("../controllers/taskController");
router.post("/create", verifyToken, createTask);

module.exports = router;
