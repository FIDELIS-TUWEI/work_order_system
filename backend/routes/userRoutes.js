const express = require('express');
const router = express.Router();
const { createNewUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController');

router.post("/register", createNewUser);
router.get("/all-users", getAllUsers);
router.delete("delete-user", deleteUser);
router.put("/update-user", updateUser);

module.exports = router;