const express = require("express");
const router = express.router;
const { assignRole } = require("../controllers/role");

router.post("/role", assignRole)