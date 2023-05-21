const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const { addTask } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);


module.exports = router;