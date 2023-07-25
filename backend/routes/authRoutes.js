const express = require("express");
const router = express.Router();
const { register, login, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", isAuthenticated, isAdmin, register);
router.post("/login", isAuthenticated, login);
router.get("/logout", isAuthenticated, logout);
router.get("/:id/info", isAuthenticated, userProfile);

module.exports = router;