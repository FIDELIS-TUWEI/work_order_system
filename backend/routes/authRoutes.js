const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo, forgotPassword, resetPassword, refresh } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin"]), signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.get("/userInfo", protect, getUserInfo);
router.get("/refresh", refresh);
router.post("/forgot/password", protect, forgotPassword);
router.patch("/reset/password/:token", protect, resetPassword);


module.exports = router;