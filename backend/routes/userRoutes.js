const express = require('express');
const router = express.Router();
const { createNewUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController');

router.post("/register", createNewUser);
router.get("/all-users", getAllUsers);
router.patch("/update-user", updateUser);
router.delete("delete-user", deleteUser);

module.exports = router;