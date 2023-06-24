const express = require('express');
const router = express.Router();
const { createNewUser, updateUser, getAllUsers, singleUser } = require('../controllers/userController');
const { login, logout } = require('../controllers/authController');

router.post("/register", createNewUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all-users", getAllUsers);
router.get("/user/:id", singleUser);
router.put("/update-user/:id", updateUser);


module.exports = router;