const express = require("express");
const router = express.Router();
const { addTask, getTasks, getTask, editTask, deleteTask } = require("../controllers/taskController");
const { protect, restrict } = require("../controllers/authController");

// routes
router.post("/addtask", addTask);
router.get("/gettasks", protect, getTasks);
router.get("/gettask/:id", getTask);
router.put("/edittask/:id", protect, editTask);
router.delete("/:id", protect, restrict('admin'), deleteTask);


module.exports = router;