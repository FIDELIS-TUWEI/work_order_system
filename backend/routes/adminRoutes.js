const express = require("express");
const router = express.Router();
const { createManager } = require("../controllers/adminController");

router.post("/createManager", createManager);

module.exports = router;