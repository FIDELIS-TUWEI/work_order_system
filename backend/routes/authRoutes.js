const express = require("express");
const router = express.Router();
const { register, login, logout, userProfile, refresh } = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", isAuthenticated, isAdmin, register);
router.post("/login",  login);
router.get("/logout", logout);
router.get("/refresh", refresh);
router.get("/:id/info", isAuthenticated, userProfile);

module.exports = router;