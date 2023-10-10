const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser, countAllUsers, countActiveUsers} = require('../controllers/userController');
const { protect, restrict } = require('../middleware/authMiddleware');

router.get("/all-users", protect, restrict(['admin', "superadmin"]), getAllUsers);
router.get("/user/:id", protect, singleUser);
router.get("/count/total-users", protect, countAllUsers);
router.get("/count/active-users", protect, countActiveUsers);
router.put("/edit/:id", protect, restrict(['admin', "superadmin"]),  editUser);
router.delete("/admin/user/delete/:id", protect, restrict(['admin', "superadmin"]), deleteUser);


module.exports = router;