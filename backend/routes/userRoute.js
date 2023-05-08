const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOut, getUser } = require("../controllers/userController");

// user route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getuser", getUser);

module.exports = router;