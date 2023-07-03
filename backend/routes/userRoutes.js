const express = require('express');
const router = express.Router();
const { updateUser, getAllUsers, singleUser } = require('../controllers/userController');

router.get("/all-users", getAllUsers);
router.get("/user/:id", singleUser);
router.put("/update-user/:id", updateUser);


module.exports = router;