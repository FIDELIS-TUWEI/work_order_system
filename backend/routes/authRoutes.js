const express = require("express");
const router = express.Router();
const { signupUser, login, logout } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", signupUser);
router.post("/login",  login);
router.get("/logout", logout);

module.exports = router;