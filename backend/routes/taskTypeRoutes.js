const express = require("express");
const router = express.Router();
const { createTasktype } = require("../controllers/taskTypeController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/type/create", isAuthenticated, createTasktype);

module.exports = router;