const express = require("express");
const router = express.Router();
const { addTask, getTasks, getTask, editTask, deleteTask } = require("../controllers/Task-controller");

// routes
router.post("/addtask", addTask);
router.get("/gettasks", getTasks);
router.get("/gettask/:id", getTask);
router.put("/edittask/:id", editTask);
router.delete("/:id", deleteTask);


module.exports = router;