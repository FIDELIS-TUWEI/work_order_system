const express = require('express');
const router = express.Router();
const { updateUser, getAllUsers, singleUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get("/all-users", isAuthenticated, isAdmin, getAllUsers);
router.get("/user/:id",isAuthenticated, singleUser);
router.put("/update-user/:id", updateUser);


module.exports = router;