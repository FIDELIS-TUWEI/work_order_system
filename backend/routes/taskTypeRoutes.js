const express = require("express");
const router = express.Router();
const { createTasktype, allTaskType, updateTaskType, deleteTaskType } = require("../controllers/taskTypeController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/type/create", isAuthenticated, isAdmin, createTasktype);
router.get("/type/tasks", allTaskType);
router.put("/type/update/:type_id", isAuthenticated, isAdmin, updateTaskType);
router.delete("/type/delete/:type_id", isAuthenticated, isAdmin, deleteTaskType);

module.exports = router;