const express = require("express");
const router = express.Router();
const { addTask } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);


module.exports = router;