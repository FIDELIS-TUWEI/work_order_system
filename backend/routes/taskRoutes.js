const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { protect, restrict } = require('../middleware/authMiddleware');


router.post("/tasks/create", protect, createTask);
router.get("/tasks/getall", protect, restrict(["admin", "hod", "supervisor"]),  getTasks);
router.get("/task/:id", protect, singleTask);
router.put("/task/update/:task_id", protect, updateTask);
router.delete("/tasks/delete/:id", protect, deleteTask);

module.exports = router;