const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get("/all-users", isAuthenticated, isAdmin, getAllUsers);
router.get("/user/:id",isAuthenticated, singleUser);
router.put("/edit/:id", isAuthenticated, isAdmin, editUser);
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);


module.exports = router;