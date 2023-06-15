const express = require('express');
const router = express.Router();
const { signUp, signIn, singleUser, userProfile, logout, getAllUsers } = require('../controllers/auth');
const { isAuthenticated, authorizeUser } = require("../middleware/authMiddleware");


router.post('/signup',isAuthenticated, authorizeUser(["admin", "hod"]), signUp);
router.post('/signin', signIn);
router.get("/logout", logout);
router.get("/all-users", authorizeUser(["admin"]), getAllUsers);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);



module.exports = router;