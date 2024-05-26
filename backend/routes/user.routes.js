const express = require('express');
const router = express.Router();
const { getUsers, getProfile, updateUser, deleteUser, countUsers, countActiveUsers, getUser} = require('../controllers/user.controller');
const { protect, restrict, cacheMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.get("/", protect, restrict(['admin', "superadmin"]), cacheMiddleware, getUsers);
router.get("/:id", protect, restrict(["superadmin", "admin"]), getUser);
router.get("/profile/:username", protect, cacheMiddleware, getProfile);
router.get("/count/users", protect, cacheMiddleware, countUsers);
router.get("/count/active", protect, cacheMiddleware, countActiveUsers);
router.put("/update/:id", protect, restrict(["superadmin", "admin"]),  updateUser);
router.delete("/admin/delete/:id", protect, isAdmin, restrict(["superadmin"]), deleteUser);


module.exports = router;