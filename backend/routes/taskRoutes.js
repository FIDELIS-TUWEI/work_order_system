const express = require('express');
const { newTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

router.post("/newtask", newTask);
router.put("/tasks/update/:id", updateTask);

module.exports = router;