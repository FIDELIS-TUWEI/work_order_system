const express = require('express');
const router = express.router();
const { register } = require("../controllers/user-controller");

router.post("/register", register);

module.exports = router;