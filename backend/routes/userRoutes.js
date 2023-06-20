const express = require('express');
const router = express.Router();
const { signUp, signIn, logout, singleUser, updateUser, deleteUser } = require('../controllers/userController');

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logout);
router.get("/user/:id", singleUser);
router.patch("/update-user", updateUser);
router.delete("delete-user", deleteUser);

module.exports = router;