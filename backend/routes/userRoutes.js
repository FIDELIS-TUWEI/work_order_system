const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser, countAllUsers, countActiveUsers} = require('../controllers/userController');
const { restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/all-users", restrict(['admin', "superadmin"]), cacheMiddleware, getAllUsers);
router.get("/single/user/:id", cacheMiddleware, singleUser);
router.get("/count/total-users", cacheMiddleware, countAllUsers);
router.get("/count/active-users", cacheMiddleware, countActiveUsers);
router.put("/edit/user/:id", restrict(['admin', "superadmin"]),  editUser);
router.delete("/admin/user/delete/:id", restrict(['admin', "superadmin"]), deleteUser);


module.exports = router;