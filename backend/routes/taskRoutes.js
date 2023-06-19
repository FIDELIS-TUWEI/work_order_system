const express = require('express');
const router = express.Router();
const { createTask, displayTask, taskCategory, updateTask, deleteTask } = require("../controllers/taskController");


router.post("/tasks/create", createTask);
router.get("/tasks/all", displayTask);
router.get("/tasks/category", taskCategory);
router.put("/tasks/update/:id", updateTask);
router.delete("/tasks/delete/:id", deleteTask);

module.exports = router;