const express = require('express');
const router = express.Router();
const { signUp, signIn, singleUser, logout, getAllUsers, updateUser } = require('../controllers/auth');
const { auth, isUser, isAdmin } = require("../middleware/authMiddleware");

router.post('/signup', auth, isAdmin, signUp);
router.post('/signin', signIn);
router.get("/logout", logout);
router.get("/all-users", isAdmin, getAllUsers);
router.get("/user/:id", isUser, singleUser);
router.patch("update-user/:id", auth, isAdmin, updateUser);



module.exports = router;