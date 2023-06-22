const express = require('express');
const router = express.Router();
const { createNewUser, updateUser, getAllUsers, deleteUser, singleUser } = require('../controllers/userController');

router.post("/register", createNewUser);
router.get("/all-users", getAllUsers);
router.get("/user/:id", singleUser);
router.delete("delete-user", deleteUser);
router.put("/update-user", updateUser);

module.exports = router;