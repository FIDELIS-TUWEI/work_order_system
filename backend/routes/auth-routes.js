const express = require('express');
const router = express.Router();
const { signUp, signIn, singleUser, userProfile, logout } = require('../controllers/auth');
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");


router.post('/signup',isAuthenticated, isAdmin(["admin", "hod"]), signUp);
router.post('/signin', signIn);
router.get("/logout", logout);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);


module.exports = router;