const express = require("express");
const router = express.Router();
const { addTask, getTasks } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);
router.get("/tasks", getTasks)


module.exports = router;