const express = require("express");
const router = express.Router();
const { 
    addUser, loginUser, 
    logOut, getAllUsers, loginStatus, 
    updateUser,
    deleteUser
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/add", addUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getusers", getAllUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", updateUser);
router.delete("/deleteuser", protect, deleteUser);

module.exports = router;