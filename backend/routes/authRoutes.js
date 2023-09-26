const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo, updatePassword } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin"]), signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.post("/update/password", protect, restrict(["admin", "superadmin"]), updatePassword);
router.get("/userInfo", protect, getUserInfo);

module.exports = router;