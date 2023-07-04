const express = require("express");
const router = express.Router();
const { createTasktype } = require("../controllers/taskTypeController");

router.post("/type/create", createTasktype);

module.exports = router;