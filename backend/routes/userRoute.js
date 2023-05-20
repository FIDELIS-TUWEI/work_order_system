const express = require("express");
const router = express.Router();
const { 
    addUser, getUsers
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/add", addUser);
router.get("/all", getUsers)

module.exports = router;