const express = require('express');
const { newTask } = require('../controllers/taskController');
const router = express.Router();

router.post("/newtask", newTask);

module.exports = router;