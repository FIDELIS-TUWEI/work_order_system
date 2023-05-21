const express = require("express");
const router = express.Router();
const { addTask, getTasks, getTask, editTask } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);
router.get("/gettasks", getTasks);
router.get("/gettask/:id", getTask);
router.put("/edittask/:id", editTask);


module.exports = router;