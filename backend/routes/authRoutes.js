const express = require("express");
const { register, login, logout, userProfile } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", userProfile);

module.exports = router;