const express = require("express");
const router = express.Router();
const { 
    register, login, getUsers, getUser, editUser, deleteUser
} = require("../controllers/authController");
const { protect } = require("../controllers/authController")

// user route
router.get("/all", protect, getUsers);
router.get("/getuser/:id", protect, getUser);
router.post("/register", register);
router.post("/login", login);
router.put("/edituser/:id", protect, editUser);
router.delete("/delete/:id", protect, deleteUser);

module.exports = router;