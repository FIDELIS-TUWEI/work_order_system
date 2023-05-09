const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOut, getUser, loginStatus, updateUser } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", updateUser);

module.exports = router;