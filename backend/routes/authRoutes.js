const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", protect, isAdmin, register);
router.post("/login",  login);
router.get("/logout", logout);

module.exports = router;