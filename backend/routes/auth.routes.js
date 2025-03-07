const express = require("express");
const router = express.Router();
const { register, login, logout, getMe, changePassword } = require("../controllers/auth.controller");
const { protect, restrict } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

// Prevent brute-force attackes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // 3 login attempts
    message: "Too many Login attempts, please try again later!",
});

router.post("/register", protect, restrict(["admin", "superadmin"]), register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.put("/update/password/:id", protect, restrict(["admin", "superadmin"]), changePassword);

module.exports = router;