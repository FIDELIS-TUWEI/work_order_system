const express = require('express');
const router = express.Router();
const { createTask, displayTask, taskCategory, updateTask, deleteTask } = require("../controllers/task-controller");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");


router.post("/tasks/create", isAuthenticated, isAdmin, createTask);
router.get("/tasks/all", displayTask);
router.get("/tasks/category", taskCategory);
router.put("/tasks/update/:id", isAuthenticated, isAdmin, updateTask);
router.delete("/tasks/delete/:id", isAuthenticated, isAdmin, deleteTask);

module.exports = router;