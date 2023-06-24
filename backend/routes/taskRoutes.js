const express = require('express');
const { newTask, updateTask, deleteTask, getTasks, getTask } = require('../controllers/taskController');
const router = express.Router();

router.post("/tasks/newtask", newTask);
router.get("/tasks/getall", getTasks);
router.get("/tasks/gettask/:id", getTask);
router.delete("/tasks/delete/:id", deleteTask);
router.put("/tasks/update/:id", updateTask);

module.exports = router;