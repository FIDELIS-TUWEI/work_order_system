const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo, forgotPassword, passwordReset } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin"]), signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.get("/userInfo", protect, getUserInfo);
router.post("/forgot/password", protect, restrict(["admin", "superadmin"]), forgotPassword);
router.post("/reset/password", protect, restrict(["admin", "superadmin"]), passwordReset);


module.exports = router;