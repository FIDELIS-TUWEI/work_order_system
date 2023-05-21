const express = require("express");
const router = express.Router();
const { addTask, getTasks } = require("../controllers/taskController");

// routes
router.post("/addtask", addTask);
router.get("/gettasks", getTasks);


module.exports = router;