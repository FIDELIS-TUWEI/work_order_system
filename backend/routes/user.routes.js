const express = require('express');
const router = express.Router();
const { getAllUsers, getProfile, updateUser, deleteUser, countAllUsers, countActiveUsers} = require('../controllers/user.controller');
const { protect, restrict, cacheMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.get("/all-users", protect, restrict(['admin', "superadmin"]), cacheMiddleware, getAllUsers);
router.get("/profile/:username", protect, cacheMiddleware, getProfile);
router.get("/count/total-users", protect, cacheMiddleware, countAllUsers);
router.get("/count/active-users", protect, cacheMiddleware, countActiveUsers);
router.put("/update/:id", protect,  updateUser);
router.delete("/admin/user/delete/:id", protect, isAdmin, restrict(["superadmin"]), deleteUser);


module.exports = router;