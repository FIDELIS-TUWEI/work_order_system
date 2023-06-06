const express = require("express");
const router = express.Router();
const { AdminAuth } = require("../controllers/AdminController");


router.post("/admin-login", AdminAuth);

module.exports = router;