const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser} = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get("/all-users", protect, isAdmin, getAllUsers);
router.get("/user/:id", protect, isAdmin, singleUser);
router.put("/edit/:id", protect, isAdmin,  editUser);
router.delete("/admin/user/delete/:id", protect, isAdmin, deleteUser);


module.exports = router;