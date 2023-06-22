const express = require('express');
const router = express.Router();
const { createNewUser, updateUser, getAllUsers, singleUser } = require('../controllers/userController');

router.post("/register", createNewUser);
router.get("/all-users", getAllUsers);
router.get("/user/:id", singleUser);
router.put("/update-user/:id", updateUser);


module.exports = router;