const express = require('express');
const router = express.Router();
const { createTask, displayTask, taskCategory, updateTask, deleteTask } = require("../controllers/task-controller");
const { isAuthenticated } = require("../middleware/authMiddleware");


router.post("/tasks/create", isAuthenticated, createTask);
router.get("/tasks/all", displayTask);
router.get("/tasks/category", taskCategory);
router.put("/tasks/update/:id", isAuthenticated, updateTask);
router.delete("/tasks/delete/:id", isAuthenticated, deleteTask);

module.exports = router;