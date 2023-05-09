const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOut, getUser } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);

module.exports = router;