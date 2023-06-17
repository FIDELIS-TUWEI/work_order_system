const express = require('express');
const router = express.Router();
const { signUp, signIn, singleUser, userProfile, logout, getAllUsers } = require('../controllers/auth');
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post('/signup', isAuthenticated, signUp);
router.post('/signin', signIn);
router.get("/logout", logout);
router.get("/all-users", isAdmin(["create", "read", "update", "delete"]), getAllUsers);
router.get("/getme", userProfile);
router.get("/user/:id", singleUser);



module.exports = router;