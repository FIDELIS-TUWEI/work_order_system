const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo, forgotPassword, resetPassword, changePassword } = require("../controllers/authController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin"]), signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.get("/userInfo", protect, getUserInfo);
router.put("/update/password/:id", protect, restrict(["admin", "superadmin"]), changePassword);

module.exports = router;