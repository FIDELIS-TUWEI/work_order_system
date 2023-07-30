const express = require("express");
const router = express.Router();
const { signupUser, login, logout } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict("admin"), signupUser);
router.post("/login",  login);
router.get("/logout", logout);

module.exports = router;