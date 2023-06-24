const express = require('express');
const { newTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post("/newtask", newTask);
router.delete("/tasks/delete/:id", deleteTask);
router.put("/tasks/update/:id", updateTask);

module.exports = router;