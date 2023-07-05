const express = require('express');
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/task/create", isAuthenticated, createTask);
router.get("/tasks/getall", getTasks);
router.get("/task/:id", singleTask);
router.put("/task/update/:task_id", updateTask);
router.delete("/tasks/delete/:id", deleteTask);

module.exports = router;