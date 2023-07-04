const express = require('express');
const { createTask, updateTask, deleteTask, getTasks, get, createTaskTask, getTask } = require('../controllers/taskController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/task/create", isAuthenticated, createTask);
router.get("/tasks/getall", getTasks);
router.get("/tasks/gettask/:id", getTask);
router.delete("/tasks/delete/:id", deleteTask);
router.put("/tasks/update/:id", updateTask);

module.exports = router;