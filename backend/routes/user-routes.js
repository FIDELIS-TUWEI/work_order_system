const express = require('express');
const router = express.Router();
const { signUp, signIn, logout, singleUser } = require("../controllers/user-controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logout);
router.get("/user/:id", singleUser);

module.exports = router;