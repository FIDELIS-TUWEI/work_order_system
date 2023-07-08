const express = require("express");
const router = express.Router();
const { register, login, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/info", isAuthenticated, userProfile);

module.exports = router;