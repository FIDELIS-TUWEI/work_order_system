const express = require("express");
const router = express.Router();
const { 
    addUser, getUsers, getUser, editUser, deleteUser
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/add", addUser);
router.get("/all", getUsers);
router.get("/getuser/:id", getUser);
router.put("/edituser/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;