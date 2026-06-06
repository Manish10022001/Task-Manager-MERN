const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

router.get("/", verifyToken, getTasks);
router.post("/create", verifyToken, createTask);
router.put("/update/:id", verifyToken, updateTask);
router.patch("/update/:id", verifyToken, toggleTaskStatus);
module.exports = router;
