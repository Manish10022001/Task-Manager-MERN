const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { createTask, getTasks } = require("../controllers/taskController");

router.get("/", verifyToken, getTasks);
router.post("/create", verifyToken, createTask);

module.exports = router;
