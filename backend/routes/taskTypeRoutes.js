const express = require("express");
const router = express.Router();
const { createTasktype, allTaskType } = require("../controllers/taskTypeController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/type/create", isAuthenticated, createTasktype);
router.get("/type/tasks", allTaskType);

module.exports = router;