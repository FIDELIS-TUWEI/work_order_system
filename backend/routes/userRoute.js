const express = require("express");
const router = express.Router();
const { 
    createUser, loginUser, 
    logOut, getAllUsers, loginStatus, 
    updateUser,
    deleteUser
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getallusers", getAllUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.delete("/deleteuser", protect, deleteUser);

module.exports = router;