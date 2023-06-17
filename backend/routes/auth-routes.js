const express = require('express');
const router = express.Router();
const { signUp, signIn, singleUser, userProfile, logout, getAllUsers } = require('../controllers/auth');
const { auth, isUser, isAdmin } = require("../middleware/authMiddleware");

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get("/logout", logout);
router.get("/all-users", isAdmin, getAllUsers);
router.get("/getme", userProfile);
router.get("/user/:id", singleUser);



module.exports = router;