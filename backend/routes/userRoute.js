const express = require("express");
const router = express.Router();
const { 
    getUsers, getUser, editUser, deleteUser
} = require("../controllers/userController");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken")
// user route
router.get("/all", verifyAdmin, verifyToken, getUsers);
router.get("/getuser/:id", verifyAdmin, verifyUser, verifyToken, getUser);
router.put("/edituser/:id", verifyAdmin, verifyUser, verifyToken, editUser);
router.delete("/delete/:id", verifyAdmin, verifyUser, verifyToken, deleteUser);

module.exports = router;