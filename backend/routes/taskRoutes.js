const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { protect, isAdmin } = require('../middleware/authMiddleware');


router.post("/tasks/create", protect, createTask);
router.get("/tasks/getall", protect,  getTasks);
router.get("/task/:id", protect, isAdmin, singleTask);
router.put("/task/update/:task_id", protect, isAdmin, updateTask);
router.delete("/tasks/delete/:id", protect, isAdmin, deleteTask);

module.exports = router;