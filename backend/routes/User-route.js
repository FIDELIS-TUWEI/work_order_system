const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/User-controller");

// routes
router.post("/register", registerUser);

