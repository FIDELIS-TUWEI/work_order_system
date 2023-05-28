const express = require("express");
const router = express.Router();
const { 
    getUsers, getUser, editUser, deleteUser
} = require("../controllers/userController");

// user route
router.get("/all", getUsers);
router.get("/getuser/:id", getUser);
router.put("/edituser/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;