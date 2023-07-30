const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks, singleTask } = require('../controllers/taskController');
const { protect, restrict } = require('../middleware/authMiddleware');


router.post("/tasks/create", protect, restrict(["admin", "hod", "supervisor"]), createTask);
router.get("/tasks/getall", protect, restrict(["admin", "hod", "supervisor"]),  getTasks);
router.get("/task/:id", protect, restrict(["admin", "supervisor"]), singleTask);
router.put("/task/update/:task_id", protect, restrict(["admin", "supervisor"]), updateTask);
router.delete("/tasks/delete/:id", protect, restrict(["admin"]), deleteTask);

module.exports = router;