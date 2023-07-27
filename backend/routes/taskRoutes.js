const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');


router.post("/tasks/create", createTask);
router.get("/tasks/getall",  getTasks);
router.get("/task/:id", isAdmin, singleTask);
router.put("/task/update/:task_id", isAdmin, updateTask);
router.delete("/tasks/delete/:id", isAdmin, deleteTask);

module.exports = router;