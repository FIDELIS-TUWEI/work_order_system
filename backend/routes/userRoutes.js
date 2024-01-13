const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser, countAllUsers, countActiveUsers} = require('../controllers/userController');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/all-users", protect, restrict(['admin', "superadmin"]), cacheMiddleware, getAllUsers);
router.get("/single/user/:id", protect, cacheMiddleware, singleUser);
router.get("/count/total-users", protect, cacheMiddleware, countAllUsers);
router.get("/count/active-users", protect, cacheMiddleware, countActiveUsers);
router.put("/edit/user/:id", protect, restrict(['admin', "superadmin"]),  editUser);
router.delete("/admin/user/delete/:id", protect, restrict(['admin', "superadmin"]), deleteUser);


module.exports = router;