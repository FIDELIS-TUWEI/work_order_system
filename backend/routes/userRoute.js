const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// user route
router.post("/register", registerUser);

module.exports = router;