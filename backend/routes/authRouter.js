const express = require("express");
const router = express.Router();
const { 
    register, login, getUsers, getUser, editUser, deleteUser
} = require("../controllers/authController");

// user route
router.get("/all", getUsers);
router.get("/getuser/:id", getUser);
router.post("/register", register);
router.post("/login", login);
router.put("/edituser/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;