const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.get("/userInfo", protect, getUserInfo);

module.exports = router;