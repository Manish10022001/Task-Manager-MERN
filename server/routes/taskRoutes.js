const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const { validateQuery } = require("../middleware/validate");

router.get("/", verifyToken, validateQuery, getTasks);
router.post("/create", verifyToken, createTask);
router.put("/update/:id", verifyToken, updateTask);
router.patch("/update/:id", verifyToken, toggleTaskStatus);
router.delete("/delete/:id", verifyToken, deleteTask);

module.exports = router;
