const express = require("express");
const router = express.Router();
const { addTask, getTasks, getTask, editTask } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);
router.get("/gettasks", getTasks);
router.get("/:id", getTask);
router.put("/:id", editTask);


module.exports = router;