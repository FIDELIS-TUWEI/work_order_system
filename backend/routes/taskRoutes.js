const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.post("/tasks/create", createTask);
router.get("/tasks/getall", getTasks);
router.get("/task/:id", singleTask);
router.put("/task/update/:task_id", updateTask);
router.delete("/tasks/delete/:id", deleteTask);

module.exports = router;